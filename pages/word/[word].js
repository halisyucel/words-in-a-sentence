import Layout from '../../components/layout';
import Toolbar from '../../components/toolbar';
import useClipboard from '../../hooks/useClipboard';
import { settingsToElement } from '../../lib/pages/[word]';
import { setToken } from '../../redux/slices/settings';
import jwt from 'jsonwebtoken';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet'; 

const Word = ({ word, token }) => {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);
	useEffect(() => dispatch(setToken(token)), [dispatch, token]);
	useClipboard({ word });
	return (
		<Layout style={{ padding: '1rem' }}>
			<Helmet>
				<title>{word} | Words in a Sentence &#127481;&#127479;</title>
			</Helmet>
			<Toolbar word={word} />
			{Object.values(settings.components)
				.filter((item) => item.visible)
				.sort((a, b) => a.index - b.index)
				.map((item) =>
					settingsToElement({
						name: item.name,
						key: item.index,
						word: word,
					}),
				)}
		</Layout>
	);
};

const getServerSideProps = async ({ params }) => {
	const token = jwt.sign(
		{ exp: Math.floor(Date.now() / 1000) + 60 * 60 },
		process.env.JWT_SECRET,
	);
	return { props: { word: params.word, token } };
};

export default Word;

export { getServerSideProps };
