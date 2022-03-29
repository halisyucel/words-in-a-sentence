import { pushNotification } from './components/notification';

const fallbackCopyTextToClipboard = (text) => {
	let textArea = document.createElement("textarea");
	textArea.value = text;

	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		let successful = document.execCommand('copy');
		if (successful)
			pushNotification({ type: 'success', text: 'Copied to clipboard' });
	} catch (err) {
		pushNotification({ type: 'error', text: 'Unable to copy to clipboard' });
	}

	document.body.removeChild(textArea);
}
export const copyTextToClipboard = (text) => {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(
		() => pushNotification({ type: 'success', text: 'Copied to clipboard' }),
		(_error) => pushNotification({ type: 'error', text: 'Unable to copy to clipboard' })
	);
};