import { useState, useEffect } from 'react';
import lookie from 'lookie';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	const [detectClipboard, setDetectClipboard] = useState(true);
	const [detectClipboardIsBlocked, setDetectClipboardIsBlocked] = useState(false);
	useEffect(() => {
		const allowDetectClipboardFromLocalStorage = lookie.get('allowDetectClipboard');
		if (allowDetectClipboardFromLocalStorage !== null)
			setDetectClipboard(allowDetectClipboardFromLocalStorage);
		else
			lookie.set('allowDetectClipboard', true)
	}, []);
	useEffect(() => lookie.set('allowDetectClipboard', detectClipboard), [detectClipboard]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		if (navigator) {
			const permissionResult = await navigator.permissions.query({
				name: 'clipboard-read',
				allowWithoutGesture: false
			});
			if (!(permissionResult.state === 'granted' || permissionResult.state === 'prompt')) {
				setDetectClipboard(false);
				setDetectClipboardIsBlocked(true);
			}
		} else {
			setDetectClipboard(false);
			setDetectClipboardIsBlocked(true);
		}
	}, [])
	return {
		detectClipboard,
		setDetectClipboard,
		detectClipboardIsBlocked
	}
}