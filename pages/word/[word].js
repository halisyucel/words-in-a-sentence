import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import Toolbar from '../../components/toolbar';
import Tureng from '../../components/tureng';
import Sentences from '../../components/sentences';
import Button from '../../components/button';
import { pushNotification } from '../../lib/components/notification';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../redux/slices/notification';
import { sleep } from '../../lib/helper';

const Word = ({ word }) => {
	const dispatch = useDispatch();
	const [firstClipboardText, setFirstClipboardText] = useState('');
	const [clipboardText, setClipboardText] = useState('');
	useEffect(() => {
		const interval = setInterval(() => {
			navigator.clipboard.readText()
				.then(text => {
					if (text.trim() !== '')
						if (text.trim().length <= 15) {
							if (firstClipboardText === '')
								setFirstClipboardText(text.trim());
							else if ((text.trim() !== clipboardText) && (text.trim() !== firstClipboardText))
								setClipboardText(text.trim());
						}
				})
				.catch(_err => (0));
		}, 1000);
		return () => clearInterval(interval);
	}, [firstClipboardText, clipboardText]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		if (clipboardText.trim() !== '') {
			await dispatch(setNotification({
				id: 'clipboard',
				visible: false,
			}));
			await sleep(500);
			await pushNotification({
				id: 'clipboard',
				type: 'info',
				text: `found the word "${clipboardText}"`,
				button: true,
				buttonText: 'Search',
				buttonHref: `/word/${clipboardText}`,
				interval: 8000
			});
		}
	}, [dispatch, clipboardText]);
	return (
		<Layout style={{ padding: '1rem' }}>
			<Toolbar word={word} />
			<Tureng word={word} />
			<Sentences
				word={word}
				title={'vipingilizce.net'}
				url={`http://vipingilizce.net/kelime/${word}/`}
				endpoint={'/api/vip'}
				color={'var(--color-vip)'}
			/>
			<Sentences
				word={word}
				title={'yourdictionary.com'}
				url={`https://sentence.yourdictionary.com/${word}`}
				endpoint={'/api/yourdictionary'}
				color={'var(--color-yourdictionary)'}
			/>
		</Layout>
	);
};

const getServerSideProps = async ({ params }) => {
	return { props: { word: params.word } };
};

export default Word;

export { getServerSideProps };