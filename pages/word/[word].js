import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configToElement } from '../../lib/pages/[word]';
import { setToken } from '../../redux/slices/config';
import Layout from '../../components/layout';
import Toolbar from '../../components/toolbar';
import useClipboard from '../../hooks/useClipboard';
import jwt from 'jsonwebtoken';

const Word = ({ word, token }) => {
	const dispatch = useDispatch();
	const config = useSelector((state) => state.config);
	useEffect(() => dispatch(setToken(token)), [dispatch, token]);
	useClipboard({ word, config });
	return (
		<Layout style={{ padding: '1rem' }}>
			<Toolbar word={word} />
			{Object.values(config.components)
				.filter(item => item.visible)
				.sort((a, b) => a.index - b.index)
				.map(item => configToElement({
					name: item.name,
					key: item.index,
					word: word
				}))}
		</Layout>
	);
};

const getServerSideProps = async ({ params }) => {
	const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.JWT_SECRET);
	return { props: { word: params.word, token } };
};

export default Word;

export { getServerSideProps };