import { getIcon } from '../lib/components/notification';
import { setNotification } from '../redux/slices/notification';
import styles from '../styles/notification.module.css';
import Button from './button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Notification = ({ id, type, text, visible, position, button, buttonText, buttonHref }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [width, setWidth] = useState(100);
	const generateStyle = useCallback(() => {
		switch (position) {
			case 'topLeft':
				return {
					top: visible ? '1.5rem' : '-5rem',
					left: '1.5rem',
				};
			case 'topRight':
				return {
					top: visible ? '1.5rem' : '-5rem',
					right: '1.5rem',
				};
			case 'topCenter':
				return {
					bottom: visible ? '1.5rem' : '-5rem',
					left: `calc(50% - ${width / 2}px)`,
				};
			case 'bottomLeft':
				return {
					bottom: visible ? '1.5rem' : '-5rem',
					left: '1.5rem',
				};
			case 'bottomRight':
				return {
					bottom: visible ? '1.5rem' : '-5rem',
					right: '1.5rem',
				};
			case 'bottomCenter':
				return {
					bottom: visible ? '1.5rem' : '-5rem',
					left: `calc(50% - ${width / 2}px)`,
				};
			default:
				return {};
		}
	}, [width, visible, position]);
	useEffect(() => visible && setWidth(document.getElementById(id).offsetWidth), [id, visible]);
	return (
		<div id={id} className={styles.notification} style={generateStyle()}>
			<div
				className={`${styles.notification__icon} ${styles['notification__icon__' + type]}`}
			>
				{getIcon({ type })}
			</div>
			<div className={styles.notification__text}>{text}</div>
			{button && (
				<Button
					onClick={() => {
						if (buttonHref) {
							router.push(buttonHref).then(() => {
								dispatch(
									setNotification({
										id: 'clipboard',
										visible: false,
									}),
								);
							});
						}
					}}
				>
					{buttonText}
				</Button>
			)}
		</div>
	);
};

Notification.propTypes = {
	type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
	text: PropTypes.string,
	visible: PropTypes.bool,
	position: PropTypes.oneOf([
		'topLeft',
		'topRight',
		'topCenter',
		'bottomLeft',
		'bottomRight',
		'bottomCenter',
	]),
	button: PropTypes.bool,
	buttonText: PropTypes.string,
	buttonHref: PropTypes.string,
};

Notification.defaultProps = {
	type: 'success',
	text: '',
	visible: false,
	position: 'bottomCenter',
	button: false,
	buttonText: '',
	buttonHref: null,
};

export default Notification;
