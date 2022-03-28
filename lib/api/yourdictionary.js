import axios from 'axios';
import { JSDOM } from 'jsdom';

export const getYourDictionaryData = async ({ word }) => {
	const response = await axios.get(`https://sentence.yourdictionary.com/${word}`);
	const dom = new JSDOM(response.data);
	const document = dom.window.document;
	return Array.from(document.querySelectorAll('.sentence-item__text')).map(item => {
		const sentence = item.textContent;
		return { sentence, translation: null };
	})
};