import React, { useEffect } from 'react';
import Layout from '../../components/layout';
import Toolbar from '../../components/toolbar';
import axios from 'axios';
import TurengResults from '../../components/tureng-results';

const Word = ({ word, tureng, vip }) => {
	return (
		<Layout style={{ padding: '1rem' }}>
			<Toolbar word={word} />
			<TurengResults word={word} results={tureng} />
		</Layout>
	);
};

const getServerSideProps = async ({ params }) => {
	const turengResponse = await axios({
		method: 'get',
		url: `${process.env.API_URL}/tureng`,
		params: { word: params.word }
	});
	const vipResponse = await axios({
		method: 'get',
		url: `${process.env.API_URL}/vip`,
		params: { word: params.word }
	});
	return {
		props: {
			word: params.word,
			tureng: turengResponse.data.status ? turengResponse.data.data : [],
			vip: vipResponse.data.status ? vipResponse.data.data : []
		},
	};
};

export default Word;

export { getServerSideProps };