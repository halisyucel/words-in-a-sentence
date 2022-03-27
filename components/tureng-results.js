import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from './pagination';

const TurengResults = ({ word, results }) => {
	const [page, setPage] = useState(1);
	const [seenResults, setSeenResults] = useState([ ...results.slice(0, 10) ]);
	useEffect(() => {
		setSeenResults([ ...results.slice((page - 1) * 10, ((page - 1) * 10) + 10) ]);
	}, [page, results]);
	useEffect(() => {
		setPage(1);
		setSeenResults([ ...results.slice(0, 10) ]);
	}, [results, word]);
	return (
		<div className={'tureng_results'}>
			<div className={'tureng_results__header'}>
				<a href={`https://tureng.com/tr/turkce-ingilizce/${word}`} target={'_blank'} rel={'noreferrer'}>
					tureng.com
					<span>{results.length === 0 ? 'no' : results.length} results found</span>
				</a>
				<Pagination
					value={page}
					total={results.length}
					size={10}
					onChange={(e) => setPage(e)}
				/>
			</div>
			{seenResults.map((result, index) => (
				<div key={index} className={'tureng_results__result'}>
					<div className={'tureng_results__result__category'}>{result.category}</div>
					<div className={'tureng_results__result__english'}>
						{result.english}&nbsp;&nbsp;&nbsp;<i>{result.wordType}</i>
					</div>
					<div className={'tureng_results__result__turkish'}>{result.turkish}</div>
				</div>
			))}
		</div>
	);
};

TurengResults.propTypes = {
	word: PropTypes.string.isRequired,
	results: PropTypes.array.isRequired
};

export default TurengResults;
