import React from 'react';
import styles from '../styles/notification.module.css';
import { TiTick } from 'react-icons/ti';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Notification = () => {
	const notification = useSelector((state) => state.notification);
	const icon = () => {
		switch (notification.type) {
			case 'success':
				return <TiTick />;
			case 'error':
				return <FaTimes />;
			default:
				return <TiTick />;
		}
	};
	return (
		<div className={styles.notification} style={{ bottom: notification.visible ? '1.5rem' : '-5rem' }}>
			<div
				className={`${styles.notification__icon} ${styles['notification__icon__' + notification.type]}`}
			>
				{icon()}
			</div>
			<div className={styles.notification__text}>{notification.text}</div>
		</div>
	);
};

export default Notification;
