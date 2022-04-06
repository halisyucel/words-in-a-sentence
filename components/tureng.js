import React from 'react';
import PropTypes from 'prop-types';
import Pagination from './pagination';
import useSentences from '../hooks/useSentences';
import styles from '../styles/tureng.module.css';

const Tureng = ({ word }) => {
	const { loading, results, page, setPage } = useSentences({ word, endpoint: '/api/tureng' });
	return (
		<div className={styles.tureng}>
			<div className={styles.tureng__header}>
				<a href={`https://tureng.com/tr/turkce-ingilizce/${word}`} target={'_blank'} rel={'noreferrer'}>
					tureng.com
					{loading ? <span>loading...</span> :
					(results.length === 0 ? <span>no results found</span> :
						<span className={styles.tureng__header__number}>{`${results.length} results found`}</span>)}
				</a>
				<Pagination
					value={page}
					total={results.length}
					size={10}
					onChange={(e) => setPage(e)}
				/>
			</div>
			{[ ...results.slice((page - 1) * 10, ((page - 1) * 10) + 10) ].map((result, index) => (
				<div key={index} className={styles.tureng__result}>
					<div className={styles.tureng__result__category}>{result.category}</div>
					<div className={styles.tureng__result__english}>
						{result.english}&nbsp;&nbsp;&nbsp;<i>{result.wordType}</i>
					</div>
					<div className={styles.tureng__result__turkish}>{result.turkish}</div>
				</div>
			))}
		</div>
	);
};

Tureng.propTypes = {
	word: PropTypes.string.isRequired
};

export default Tureng;
