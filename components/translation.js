import React from 'react';
import { SiGoogletranslate } from 'react-icons/si';
import PropTypes from 'prop-types';
import Loading from './loading';
import styles from '../styles/sentences.module.css';
import useTranslate from '../hooks/useTranslate';

const Translation = ({ id, sentence, text }) => {
 	const { loading, translatedText } = useTranslate({ id, sentence, text });
	return (
		<div id={id} className={styles.sentences__result__translation}>
			{text === null ? (
				loading ? <Loading text={'translating'} /> : <>
					<div className={styles.sentences__result__translation__text}>{translatedText}</div>
					<a
						className={styles.sentences__result__translation__translated}
						href={`https://translate.google.com/`}
						target={'_blank'}
						rel={'noreferrer'}
					>
						<SiGoogletranslate />
					</a>
				</>
			) : text}
		</div>
	);
};

Translation.propTypes = {
	id: PropTypes.string.isRequired,
	sentence: PropTypes.string.isRequired,
	text: PropTypes.string
};

export default Translation;
