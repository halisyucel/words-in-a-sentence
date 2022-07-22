import axios from 'axios';
import { JSDOM } from 'jsdom'

export const getMerriamWebsterData = async ({ word }) => {
    const response = await axios.get(`https://www.merriam-webster.com/dictionary/${word}`);
	const dom = new JSDOM(response.data);
	const document = dom.window.document;
    
    const isError = document.querySelector('.mispelled-word');
    if (isError) return [];

    const firstSection = Array.from(document.querySelectorAll('#examples-anchor > div.in-sentences > span'));
    const sentencesFromFirstSection = firstSection.map(section => section.textContent.trim());

    const secondSection = Array.from(document.querySelectorAll('#examples-anchor > div.on-web.read-more-content-hint-container > .ex-sent.sents'));
    const sentencesFromSecondSection = secondSection.map(section => section.querySelector('.t.has-aq').textContent.trim());

    return [ ...[
        ...sentencesFromFirstSection,
        ...sentencesFromSecondSection
    ].map(sentence => ({
        sentence,
        translation: null
    })) ];
}