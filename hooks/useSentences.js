import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ word, endpoint }) => {
	const token = useSelector(state => state.settings.token);
	const [loading, setLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);
	useEffect(() => {
		if (token !== null) {
			setLoading(true);
			setResults([]);
			axios({
				method: 'get',
				url: endpoint,
				params: { word },
				headers: {
					'x-access-token': token,
				},
			})
				.then(response => {
					setResults(response.data.data);
					setPage(1);
					setLoading(false);
				})
				.catch(_error => {
					setResults([]);
					setPage(1);
					setLoading(false);
				});
		}
	}, [endpoint, token, word]);
	return { loading, results, page, setPage };
}