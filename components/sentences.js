import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Pagination from './pagination';
import Loading from './loading';
import { createSlug } from '../lib/helper';
import Translation from './translation';
import Sentence from './sentence';

// TODO - add a button to get data from clipboard

const Sentences = ({ word, title, url, endpoint, color }) => {
	const [loading, setLoading] = useState(true);
	const [results, setResults] = useState([]);
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
	return (
		<div className={'sentences'}>
			<div className={'sentences__header'} style={{ backgroundColor: color }}>
				<a href={url} target={'_blank'} rel={'noreferrer'}>
					{title}
					{loading ? <Loading /> :
						(results.length === 0 ? <span>no results found</span> :
							<span className={'sentences__header__number'}>{`${results.length} results found`}</span>)}
				</a>
				<Pagination
					value={page}
					total={results.length}
					size={10}
					onChange={(e) => setPage(e)}
				/>
			</div>
			{[ ...results.slice((page - 1) * 10, ((page - 1) * 10) + 10) ].map((result, index) => (
				<div key={index} className={'sentences__result'}>
					<Sentence
						word={word}
						text={result.sentence}
					/>
					<Translation
						id={`${createSlug(word)}-${createSlug(title)}-${createSlug(result.sentence)}`}
						sentence={result.sentence}
						text={result.translation}
					/>
				</div>
			))}
		</div>
	);
};

Sentences.propTypes = {
	word: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	endpoint: PropTypes.string.isRequired,
	color: PropTypes.string
};

export default Sentences;
