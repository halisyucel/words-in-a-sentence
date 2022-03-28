import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Pagination from './pagination';
import { SiGoogletranslate } from 'react-icons/si';
import Loading from './loading';

// TODO bizim kelimelerin altı çizilecek

const VipResults = ({ word }) => {
	const [loading, setLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [seenResults, setSeenResults] = useState([]);
	const [page, setPage] = useState(1);
	useEffect(() => {
		setLoading(true);
		setResults([]);
		axios({
			method: 'get',
			url: `/api/vip`,
			params: { word }
		}).then(response => {
			setResults(response.data.data);
			setPage(1);
			setLoading(false);
		});
	}, [word]);
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
	}, [seenResults]);
	return (
		<div className={'vip_results'}>
			<div className={'vip_results__header'}>
				<a href={`http://vipingilizce.net/kelime/${word}/`} target={'_blank'} rel={'noreferrer'}>
					vipingilizce.net
					{loading ? <Loading /> :
						(results.length === 0 ? <span>no results found</span> :
							<span className={'vip_results__header__number'}>{`${results.length} results found`}</span>)}
				</a>
				<Pagination
					value={page}
					total={results.length}
					size={10}
					onChange={(e) => setPage(e)}
				/>
			</div>
			{seenResults.map((result, index) => (
				<div key={index} className={'vip_results__result'}>
					<div className={'vip_results__result__sentence'}>{result.sentence}</div>
					<div className={'vip_results__result__translation'}>
						{result.translation === null ? <Loading text={'translating'} /> : <>
							<div className={'vip_results__result__translation__text'}>{result.translation}</div>
							{result.isTranslated && <a
								className={'vip_results__result__translation__translated'}
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

VipResults.propTypes = {
	word: PropTypes.string.isRequired
};

export default VipResults;
