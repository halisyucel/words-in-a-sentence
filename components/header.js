import React from 'react';
import { useRouter } from 'next/router';
import Input from './input';
import Title from './title';
import styles from '../styles/header.module.css';

const Header = () => {
	const router = useRouter();
	return (
		<div className={styles.header}>
			<Title
				className={styles.header__title}
				size={'small'}
				style={{ marginBottom: '0' }}
			/>
			<Input
				className={styles.header__search}
				placeholder={'search a word'}
				size={'small'}
				onSubmit={(value) => router.push(`/word/${value}`)}
			/>
		</div>
	);
};

export default Header;
