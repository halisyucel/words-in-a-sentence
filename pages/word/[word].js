import React from 'react';
import Layout from '../../components/layout';
import Toolbar from '../../components/toolbar';

const Word = ({ word }) => {
	return (
		<Layout style={{ padding: '1rem' }}>
			<Toolbar word={word} />
		</Layout>
	);
};

const getServerSideProps = async ({ params }) => {
	return {
		props: {
			word: params.word,
		},
	};
};

export default Word;

export { getServerSideProps };