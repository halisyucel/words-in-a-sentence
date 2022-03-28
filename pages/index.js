import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Input from '../components/input';
import Title from '../components/title';
import axios from 'axios';

const Home = () => {
	const router = useRouter();
	const [word, setWord] = useState('');
	useEffect(() => {
		axios({ method: 'get', url: '/api/random' })
			.then(response => {
				setWord(response.data.data);
			})
	}, []);
	return (
		<Layout
			header={false}
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div className={'home'}>
				<Title />
				<Input
					placeholder={'search a word'}
					onSubmit={(value) => router.push(`/word/${value}`)}
				/>
				<a className={'home__link'} href={`/word/${word}`}>i feel myself luck</a>
			</div>
		</Layout>
	);
};

export default Home;
