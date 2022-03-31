import React from 'react';
import PropTypes from 'prop-types';
import { copyTextToClipboard } from '../lib/helper';
import { MdContentCopy } from 'react-icons/md';

const Sentence = ({ word, text }) => {
	return (
		<div className={'sentences__result__sentence'}>
			<div
				className={'sentences__result__sentence__text'}
				dangerouslySetInnerHTML={{ __html: text.replaceAll(word, `<b>${word}</b>`)}}
			/>
			<div
				className={'sentences__result__sentence__copy'}
				title={'Copy to clipboard'}
				onClick={() => copyTextToClipboard(text)}
			>
				<MdContentCopy />
			</div>
		</div>
	);
};

Sentence.propTypes = {
	word: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

export default Sentence;
