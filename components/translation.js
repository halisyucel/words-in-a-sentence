import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from './loading';
import { SiGoogletranslate } from 'react-icons/si';
import { getCoords } from '../lib/helper';
import axios from 'axios';

const TranslationText = ({ text }) => {
	return (<>
		<div className={'sentence_results__result__translation__text'}>{text}</div>
		<a
			className={'sentence_results__result__translation__translated'}
			href={`https://translate.google.com/`}
			target={'_blank'}
			rel={'noreferrer'}
		>
			<SiGoogletranslate />
		</a>
	</>);
}

const Translation = ({ id, sentence, text }) => {
	const [translation, setTranslation] = useState({
		loading: true,
		text: '',
	});
	useEffect(() => {
		setTranslation({ loading: true, text: '' });
	}, [id, text]);
	useEffect(() => {
		const getData = () => {
			axios({ method: 'get', url: '/api/gtranslate', params: {word: sentence} })
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
	}, [id, sentence, text, translation.text]);
	return (
		<div id={id} className={'sentence_results__result__translation'}>
			{text === null ? (translation.loading ?
				<Loading text={'translating'} /> : <TranslationText text={translation.text} />) : text}
		</div>
	);
};

Translation.propTypes = {
	id: PropTypes.string.isRequired,
	sentence: PropTypes.string.isRequired,
	text: PropTypes.string
};

export default Translation;
