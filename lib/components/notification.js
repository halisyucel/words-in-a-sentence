import store from '../../redux/store';
import { setNotification } from '../../redux/slices/notification';
import { sleep } from '../helper';

export const pushNotification = async ({
	id,
	type,
	text,
	position='bottomCenter',
	button=false,
	buttonText='',
	buttonHref=null,
	interval=3000
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
	if (store.getState().notification.clipboard.text === text)
		store.dispatch(setNotification({ ...notification, visible: false }));
};