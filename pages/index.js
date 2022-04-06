import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Input from '../components/input';
import Title from '../components/title';
import styles from '../styles/home.module.css';

const Home = () => {
	const router = useRouter();
	return (
		<Layout
			header={false}
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div className={styles.home}>
				<Title className={styles.home__title} />
				<Input
					placeholder={'search a word'}
					onSubmit={(value) => router.push(`/word/${value}`)}
				/>
			</div>
		</Layout>
	);
};

export default Home;
