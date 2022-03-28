import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Pagination from './pagination';

const VipResults = ({ word }) => {
	const [loading, setLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		setLoading(true);
		setResults([]);
		const vipResponse = await axios({
			method: 'get',
			url: `/api/vip`,
			params: { word }
		});
		setPage(1);
		setResults(vipResponse.data.data);
		console.log(vipResponse.data.data);
		setLoading(false);
	}, [word]);
	return (
		<div className={'vip_results'}>
			<div className={'vip_results__header'}>
				<a href={`http://vipingilizce.net/kelime/${word}/`} target={'_blank'} rel={'noreferrer'}>
					vipingilizce.net
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
				<div key={index} className={'vip_results__result'}>
					<div className={'vip_results__result__sentence'}>{result.sentence}</div>
					<div className={'vip_results__result__translation'}>{result.translation}</div>
				</div>
			))}
		</div>
	);
};

VipResults.propTypes = {
	word: PropTypes.string.isRequired
};

export default VipResults;
