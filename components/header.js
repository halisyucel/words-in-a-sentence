import React from 'react';
import { useRouter } from 'next/router';
import Input from './input';
import Title from './title';

const Header = () => {
	const router = useRouter();
	return (
		<div className={'header'}>
			<Title size={'small'} />
			<Input
				placeholder={'search a word'}
				size={'small'}
				onSubmit={(value) => router.push(`/word/${value}`)}
			/>
		</div>
	);
};

export default Header;
