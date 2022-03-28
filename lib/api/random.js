import axios from 'axios';
import { JSDOM } from 'jsdom';

export const getRandomWord = async () => {
	try {
		const response = await axios.get('https://randomword.com/');
		const dom = new JSDOM(response.data);
		const document = dom.window.document;
		return document.getElementById('random_word').textContent;
	} catch (error) {
		return 'sorry';
	}
}