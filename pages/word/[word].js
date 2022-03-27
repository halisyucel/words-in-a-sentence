import React, { useEffect } from 'react';
import Layout from '../../components/layout';
import Toolbar from '../../components/toolbar';
import axios from 'axios';
import TurengResults from '../../components/tureng-results';

const Word = ({ word }) => {
	return (
		<Layout style={{ padding: '1rem' }}>
			<Toolbar word={word} />
			<TurengResults word={word} />
		</Layout>
	);
};

const getServerSideProps = async ({ params }) => {
	return { props: { word: params.word } };
};

export default Word;

export { getServerSideProps };