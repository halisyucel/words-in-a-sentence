import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Pagination from './pagination';
import { SiGoogletranslate } from 'react-icons/si';
import Loading from './loading';
import { MdContentCopy } from 'react-icons/md';
import { copyTextToClipboard } from '../lib/helper';

// TODO - add a button to copy the sentence to the clipboard
// TODO - add a button to get data from clipboard



const SentenceResults = ({ word, title, url, endpoint, color }) => {
	const [loading, setLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [seenResults, setSeenResults] = useState([]);
	const [page, setPage] = useState(1);
	useEffect(() => {
		setLoading(true);
		setResults([]);
		axios({
			method: 'get',
			url: endpoint,
			params: { word }
		})
			.then(response => {
				setResults(response.data.data);
				setPage(1);
				setLoading(false);
			})
			.catch(error => {
				console.log(error);
				setResults([]);
				setPage(1);
				setLoading(false);
			});
	}, [endpoint, word]);
	useEffect(() => {
		setSeenResults([ ...results.slice((page - 1) * 10, ((page - 1) * 10) + 10) ]);
	}, [page, results]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const translatedSeenResults = [];
		for (const result of seenResults) {
			if (!result.translation) {
				const translateResponse = await axios({
					method: 'get',
					url: '/api/gtranslate',
					params: {word: result.sentence}
				});
				translatedSeenResults.push({
					...result,
					translation: translateResponse.data.data,
					isTranslated: true
				});
			} else {
				translatedSeenResults.push(result);
			}
		}
		if (JSON.stringify(translatedSeenResults) !== JSON.stringify(seenResults))
			setSeenResults(translatedSeenResults);
		// TODO buraya bir şey eklenecek sayfa değiştirince de sonradan yeniliyor
	}, [seenResults]);
	return (
		<div className={'sentence_results'}>
			<div className={'sentence_results__header'} style={{ backgroundColor: color }}>
				<a href={url} target={'_blank'} rel={'noreferrer'}>
					{title}
					{loading ? <Loading /> :
						(results.length === 0 ? <span>no results found</span> :
							<span className={'sentence_results__header__number'}>{`${results.length} results found`}</span>)}
				</a>
				<Pagination
					value={page}
					total={results.length}
					size={10}
					onChange={(e) => setPage(e)}
				/>
			</div>
			{seenResults.map((result, index) => (
				<div key={index} className={'sentence_results__result'}>
					<div className={'sentence_results__result__sentence'}>
						<div
							className={'sentence_results__result__sentence__text'}
							dangerouslySetInnerHTML={{ __html: result.sentence.replaceAll(word, `<b>${word}</b>`)}}
						/>
						<div
							className={'sentence_results__result__sentence__copy'}
							title={'Copy to clipboard'}
							onClick={() => copyTextToClipboard(result.sentence)}
						>
							<MdContentCopy />
						</div>
					</div>
					<div className={'sentence_results__result__translation'}>
						{result.translation === null ? <Loading text={'translating'} /> : <>
							<div className={'sentence_results__result__translation__text'}>{result.translation}</div>
							{result.isTranslated && <a
								className={'sentence_results__result__translation__translated'}
								href={`https://translate.google.com/`}
								target={'_blank'}
								rel={'noreferrer'}
							>
								<SiGoogletranslate />
							</a>}
						</>}
					</div>
				</div>
			))}
		</div>
	);
};

SentenceResults.propTypes = {
	word: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	endpoint: PropTypes.string.isRequired,
	color: PropTypes.string
};

export default SentenceResults;
