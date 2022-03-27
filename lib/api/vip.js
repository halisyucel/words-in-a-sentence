import axios from 'axios';
import { JSDOM } from 'jsdom';

export const getSentences = async ({ word }) => {
	const response = await axios.get(`http://vipingilizce.net/kelime/${word}/?tumunu_goster=ok`);;
	const dom = new JSDOM(response.data);
	const document = dom.window.document;
	if (document.querySelector('.HataMesaj') !== null)
		return [];
	else {
		let sentencesNodes = Array.from(document.querySelectorAll('.Cumleler > p'));
		sentencesNodes = sentencesNodes.concat(Array.from(document.querySelectorAll('#divDigerCumleler > p')));
		return sentencesNodes.map(sentenceNode => {
			let sentence = '';
			let translation = '';
			let brIsPassed = false;
			Array.from(sentenceNode.childNodes).forEach(node => {
				if (node.nodeName === 'BR') {
					brIsPassed = true;
				} else {
					if (brIsPassed)
						translation += node.textContent;
					else
						sentence += node.textContent;
				}
			});
			return { sentence, translation: translation === '' ? null : translation };
		});
	}
};