import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { sleep } from '../lib/helper';
import { setNotification } from '../redux/slices/notification';
import { pushNotification } from '../lib/components/notification';
import lookie from 'lookie';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ word }) => {
	const dispatch = useDispatch();
	const [notificationClipboardText, setNotificationClipboardText] = useState('');
	const [refreshUseEffect, setRefreshUseEffect] = useState(0);
	const isClipboardTextVerified = useCallback((text) => {
		if (text === undefined) return false;
		if (text === null) return false;
		if (typeof text !== 'string') return false;
		if (text.trim() === '') return false;
		if (text.trim() === word) return false;
		if (text.trim().length > 15) return false;
		return !text.trim().match(/[.,:;<>'^+%&()=_{}|*\/\\\[\]]/gm);
	}, [word]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		if (navigator) {
			const permissionResult = await navigator.permissions.query({
				name: 'clipboard-read',
				allowWithoutGesture: false
			});
			if (permissionResult.state === 'granted' || permissionResult.state === 'prompt') {
				if (lookie.get('firstClipboardText') !== 'first-clipboard-text-expired') {
					try {
						lookie.set('firstClipboardText',
							((await navigator.clipboard.readText()) || 'first-clipboard-text-expired').trim());
					} catch (_error) {
						await sleep(2000);
						setRefreshUseEffect(Math.ceil(Math.random() * 10000));
					}
				}
				const interval = setInterval(() => {
					if (lookie.get('allowDetectClipboard'))
						navigator.clipboard.readText()
							.then(clipboardText => {
								if (isClipboardTextVerified(clipboardText))
									if (clipboardText !== lookie.get('firstClipboardText'))
										if (clipboardText !== lookie.get('lastClipboardText')) {
											lookie.set('lastClipboardText', clipboardText);
											setNotificationClipboardText(clipboardText);
											if (lookie.get('firstClipboardText') !== 'first-clipboard-text-expired')
												lookie.set('firstClipboardText', 'first-clipboard-text-expired');
										}
							})
							.catch(() => (0));
				}, 2000);
				return () => clearInterval(interval);
			}
		}
	}, [refreshUseEffect, isClipboardTextVerified]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		if (notificationClipboardText.trim() !== '') {
			await dispatch(setNotification({
				id: 'clipboard',
				visible: false,
			}));
			await sleep(500);
			await pushNotification({
				id: 'clipboard',
				type: 'info',
				text: `found the word "${notificationClipboardText.trim()}"`,
				button: true,
				buttonText: 'Search',
				buttonHref: `/word/${notificationClipboardText.trim()}`,
				interval: 8000
			});
		}
	}, [dispatch, notificationClipboardText]);
}