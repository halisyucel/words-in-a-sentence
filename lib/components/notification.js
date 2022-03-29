import store from '../../redux/store';
import { setNotification } from '../../redux/slices/notification';

export const pushNotification = ({ type, text, interval=3000 }) => {
	store.dispatch(setNotification({ type, text, visible: true }));
	const timer = setTimeout(() => {
		store.dispatch(setNotification({ type, text, visible: false }));
	}, interval);
	return () => clearTimeout(timer);
};