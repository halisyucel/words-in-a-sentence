import React from 'react';
import styles from '../styles/home.module.css';
import Layout from '../components/layout';
import Input from '../components/input';

const Home = () => {
	return (
		<Layout style={{
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<div className={styles.home}>
				<div className={styles.home__title}>
					words in a sentence
					<img src={'/flag.svg'} alt={'TR'}/>
				</div>
				<Input
					placeholder={'search a word'}
				/>
			</div>
		</Layout>
	);
};

export default Home;
