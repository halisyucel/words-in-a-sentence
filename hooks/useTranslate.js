import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCoords } from '../lib/helper';
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ id, sentence, text}) => {
	const token = useSelector(state => state.settings.token);
	const [translation, setTranslation] = useState({
		loading: true,
		text: '',
	});
	useEffect(() => {
		setTranslation({ loading: true, text: '' });
	}, [id, text]);
	useEffect(() => {
		if (token !== null) {
			const getData = () => {
				axios({
					method: 'get',
					url: '/api/gtranslate',
					params: { word: sentence },
					headers: {
						'x-access-token': token,
					}
				})
					.then(res => setTranslation({ loading: false, text: res.data.data }))
					.catch(_err => setTranslation({ loading: false, text: 'could not be translated' }));
			};
			if (text === null && translation.text.trim() === '') {
				const { top } = getCoords(document.getElementById(id));
				if ((window.scrollY + window.innerHeight) > top)
					getData();
				else {
					let isPassed = false;
					const translationScrollEvent = () => {
						if ((window.scrollY + window.innerHeight) > top && !isPassed) {
							isPassed = true;
							getData();
							window.addEventListener('scroll', translationScrollEvent);
						}
					};
					window.addEventListener('scroll', translationScrollEvent);
					return () => window.removeEventListener('scroll', translationScrollEvent);
				}
			}
		}
	}, [id, sentence, text, token, translation.text]);
	return {
		loading: translation.loading,
		translatedText: translation.text,
	};
}