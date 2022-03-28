import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Pagination from './pagination';
import axios from 'axios';

const TurengResults = ({ word }) => {
	const [loading, setLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		setLoading(true);
		setResults([]);
		const turengResponse = await axios({
			method: 'get',
			url: `/api/tureng`,
			params: { word }
		});
		setPage(1);
		setResults(turengResponse.data.data);
		setLoading(false);
	}, [word]);
	return (
		<div className={'tureng_results'}>
			<div className={'tureng_results__header'}>
				<a href={`https://tureng.com/tr/turkce-ingilizce/${word}`} target={'_blank'} rel={'noreferrer'}>
					tureng.com
					{loading ? <span>loading...</span> :
						<span>{results.length === 0 ? 'no' : results.length} results found</span>}
				</a>
				<Pagination
					value={page}
					total={results.length}
					size={10}
					onChange={(e) => setPage(e)}
				/>
			</div>
			{[ ...results.slice((page - 1) * 10, ((page - 1) * 10) + 10) ].map((result, index) => (
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
	word: PropTypes.string.isRequired
};

export default TurengResults;
