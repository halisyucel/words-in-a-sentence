import React from 'react';
import Layout from '../../components/layout';
import Toolbar from '../../components/toolbar';
import TurengResults from '../../components/tureng-results';
import SentenceResults from '../../components/sentence-results';

const Word = ({ word }) => {
	return (
		<Layout style={{ padding: '1rem' }}>
			<Toolbar word={word} />
			<TurengResults word={word} />
			<SentenceResults
				word={word}
				title={'vipingilizce.net'}
				url={`http://vipingilizce.net/kelime/${word}`}
				endpoint={'/api/vip'}
			/>
			<SentenceResults
				word={word}
				title={'yourdictionary.com'}
				url={`https://sentence.yourdictionary.com/${word}`}
				endpoint={'/api/yourdictionary'}
				color={'#1976d2'}
			/>
		</Layout>
	);
};

const getServerSideProps = async ({ params }) => {
	return { props: { word: params.word } };
};

export default Word;

export { getServerSideProps };