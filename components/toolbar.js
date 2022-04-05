import React, { useState, useEffect } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { setConfig } from '../redux/slices/config';
import PropTypes from 'prop-types';
import styles from '../styles/toolbar.module.css';

// TODO clipboard auto-copy allow section
// TODO "did you mean"

const Toolbar = ({ word }) => {
	const dispatch = useDispatch();
	const config = useSelector((state) => state.config.components);
	const [firstCheck, setFirstCheck] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			document.body.style.userSelect = 'none';
		} else {
			document.body.style.overflow = 'auto';
			document.body.style.userSelect = 'auto';
		}
	}, [isOpen]);
	useEffect(() => {

	}, [dispatch]);
	return (
		<div className={styles.toolbar}>
			<div className={styles.toolbar__text}>
				results for your search <span className={styles.toolbar__text__highlight}>{word}</span>
			</div>
			<div
				className={styles.toolbar__settings}
				onClick={() => setIsOpen(!isOpen)}
			>
				<AiTwotoneSetting />
			</div>
			<div className={styles.toolbar__settings__page} style={{ display: isOpen ? 'flex' : 'none' }}>
				<div className={styles.toolbar__settings__page__box}>
					<div className={styles.toolbar__settings__page__box__title}>
						<div className={styles.toolbar__settings__page__box__title__text}>
							Settings
						</div>
						<div
							className={styles.toolbar__settings__page__box__title__close}
							onClick={() => setIsOpen(false)}
						>
							<FaTimes />
						</div>
					</div>
					<div className={styles.toolbar__settings__page__box__list}>
						{Object.values(config).sort((x, y) => (x.index - y.index)).map((item, index) => (
							<div
								key={index}
								className={
									(styles.toolbar__settings__page__box__list__item + ' ' +
									(item.active ? styles.toolbar__settings__page__box__list__item__active : '')).trim()
								}
							>
								<div
									className={styles.toolbar__settings__page__box__list__item__title}
								>
									<div className={styles.toolbar__settings__page__box__list__item__title__text}>
										{item.name}
									</div>
									<div
										style={{ visibility: item.index !== 1 ? 'visible' : 'hidden' }}
										className={styles.toolbar__settings__page__box__list__item__title__icon}
										onClick={() => dispatch(indexUp({ name: item.name }))}
									>
										<BsChevronUp />
									</div>
									<div
										style={{ visibility: item.index !== (Object.keys(config).length) ? 'visible' : 'hidden' }}
										className={styles.toolbar__settings__page__box__list__item__title__icon}
										onClick={() => dispatch(indexDown({ name: item.name }))}
									>
										<BsChevronDown />
									</div>
									<div
										className={styles.toolbar__settings__page__box__list__item__title__icon}
										onClick={() => dispatch(toggleVisibility({ name: item.name }))}
									>
										{item.visible ? <FaEye /> : <FaEyeSlash />}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

Toolbar.propTypes = {
	word: PropTypes.string.isRequired
};

export default Toolbar;
