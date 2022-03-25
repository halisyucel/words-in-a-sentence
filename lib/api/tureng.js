import axios from 'axios';
import { JSDOM } from 'jsdom';

export const getTurengData = async ({ word }) => {
	const response = await axios.get(`https://tureng.com/tr/turkce-ingilizce/${word}`);
	const dom = new JSDOM(response.data);
	const document = dom.window.document;

};