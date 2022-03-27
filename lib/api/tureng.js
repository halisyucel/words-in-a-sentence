import axios from 'axios';
import { JSDOM } from 'jsdom';

export const getTurengData = async ({ word }) => {
	const response = await axios.get(`https://tureng.com/tr/turkce-ingilizce/${word}`);
	const dom = new JSDOM(response.data);
	const document = dom.window.document;
	const table = [];
	const nodes = Array.from(document.querySelectorAll('h2 + table'));
	try {
		for (const node of nodes) {
			const tbody = Array.from(node.querySelectorAll('tbody > tr'));
			for (const row of tbody) {
				const tds = Array.from(row.querySelectorAll('td'));
				if (tds.length === 5)
					table.push({
						type: 'row',
						category: tds[1].textContent.trim(),
						english: tds[2].querySelector('a').textContent.trim(),
						wordType: tds[2].querySelector('i').textContent.trim(),
						turkish: tds[3].textContent.trim()
					});
			}
		}
	} catch (e) {
		return table;
	}
	return table;
};