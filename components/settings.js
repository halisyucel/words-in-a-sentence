import useComponentsSettings from '../hooks/useComponentsSettings';
import useDetectClipboardSettings from '../hooks/useDetectClipboardSettings';
import styles from '../styles/settings.module.css';
import Switch from './switch';
import PropTypes from 'prop-types';
import React from 'react';
import { BsGripVertical, BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';

const Settings = ({ visibility, onVisibility }) => {
	const { detectClipboard, setDetectClipboard, detectClipboardIsBlocked } =
		useDetectClipboardSettings();
	const { components, setVisibility, dragItem, setDragItem } = useComponentsSettings();
	return (
		<div className={styles.settings} style={{ display: visibility ? 'flex' : 'none' }}>
			<div className={styles.settings__box}>
				<div className={styles.settings__box__title}>
					<div className={styles.settings__box__title__text}>Settings</div>
					<div
						className={styles.settings__box__title__close}
						onClick={() => onVisibility(false)}
					>
						<FaTimes />
					</div>
				</div>
				<div className={styles.settings__box__detect_clipboard}>
					<div className={styles.settings__box__detect_clipboard__text}>
						allow detect clipboard
						<div
							className={styles.settings__box__detect_clipboard__text__blocked}
							style={{ display: detectClipboardIsBlocked ? 'block' : 'none' }}
						>
							~ blocked by browser
						</div>
					</div>
					<Switch
						disabled={detectClipboardIsBlocked}
						value={detectClipboard}
						onChange={(value) => setDetectClipboard(value)}
					/>
				</div>
				<div className={styles.settings__box__list}>
					{Object.values(components)
						.sort((x, y) => x.index - y.index)
						.map((item) => {
							return (
								<div
									key={item.name}
									className={styles.settings__box__list__item__wrapper}
									aria-label={
										Object.keys(components).length === item.index
											? 'last'
											: null
									}
								>
									<div
										className={styles.settings__box__list__item}
										aria-disabled={
											!(dragItem.name === item.name && dragItem.active)
										}
										aria-label={item.fade ? 'fade' : null}
										style={
											dragItem.name === item.name && dragItem.active
												? { top: dragItem.top }
												: null
										}
									>
										<div
											className={styles.settings__box__list__item__move}
											onMouseDown={(e) => {
												setDragItem({
													active: true,
													name: item.name,
													top: 0,
													originTop: e.clientY,
												});
											}}
										>
											<BsGripVertical />
										</div>
										<div className={styles.settings__box__list__item__text}>
											{item.text}
										</div>
										<div
											className={styles.settings__box__list__item__visibility}
											onClick={() => setVisibility({ name: item.name })}
										>
											{item.visible ? <BsEye /> : <BsEyeSlash />}
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

Settings.propTypes = {
	visibility: PropTypes.bool.isRequired,
	onVisibility: PropTypes.func.isRequired,
};

export default Settings;
