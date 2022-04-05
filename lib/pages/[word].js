import React from 'react';
import Tureng from '../../components/tureng';
import Sentences from '../../components/sentences';

export const configToElement = ({ name, key, word }) => {
	switch (name) {
		case 'tureng':
			return <Tureng
				key={key}
				word={word}
			/>;
		case 'vip':
			return <Sentences
				key={key}
				word={word}
				title={'vipingilizce.net'}
				url={`http://vipingilizce.net/kelime/${word}/`}
				endpoint={'/api/vip'}
				color={'var(--color-vip)'}
				pageSize={10}
			/>;
		case 'yourdictionary':
			return <Sentences
				key={key}
				word={word}
				title={'yourdictionary.com'}
				url={`https://sentence.yourdictionary.com/${word}`}
				endpoint={'/api/yourdictionary'}
				color={'var(--color-yourdictionary)'}
				pageSize={5}
			/>;
		default:
			return null;
	}
}