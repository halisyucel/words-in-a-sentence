import { setNotification } from '../../redux/slices/notification';
import store from '../../redux/store';
import { sleep } from '../helper';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { TiInfoLarge, TiTick, TiWarningOutline } from 'react-icons/ti';

export const getIcon = ({ type }) => {
	switch (type) {
		case 'success':
			return <TiTick />;
		case 'error':
			return <FaTimes />;
		case 'warning':
			return <TiWarningOutline />;
		case 'info':
			return <TiInfoLarge />;
		default:
			return <TiTick />;
	}
};

export const pushNotification = async ({
	id,
	type,
	text,
	position = 'bottomCenter',
	button = false,
	buttonText = '',
	buttonHref = null,
	interval = 3000,
}) => {
	const notification = {
		id,
		type,
		text,
		position,
		button,
		buttonText,
		buttonHref,
	};
	store.dispatch(setNotification({ ...notification, visible: false }));
	await sleep(10);
	store.dispatch(setNotification({ ...notification, visible: true }));
	await sleep(interval);
	if (id === 'copy-notification')
		store.dispatch(setNotification({ ...notification, visible: false }));
	else if (store.getState().notification.clipboard.text === text)
		store.dispatch(setNotification({ ...notification, visible: false }));
};
