import React from 'react';
import { createSlug } from '../lib/helper';
import PropTypes from 'prop-types';
import Pagination from './pagination';
import Loading from './loading';
import Translation from './translation';
import Sentence from './sentence';
import useSentences from '../hooks/useSentences';

const Sentences = ({ word, title, url, endpoint, color, pageSize }) => {
	const { loading, results, page, setPage } = useSentences({ word, endpoint });
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
					size={pageSize}
					onChange={(e) => setPage(e)}
				/>
			</div>
			{[ ...results.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize) ]
				.map((result, index) => (
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
	color: PropTypes.string,
	pageSize: PropTypes.number.isRequired
};

export default Sentences;
