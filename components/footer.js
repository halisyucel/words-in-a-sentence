import styles from '../styles/footer.module.css';
import React from 'react';

const Footer = () => {
	return (
		<div className={styles.footer}>
			<a href={'https://halisyucel.me'} target={'_blank'} rel={'noreferrer'}>
				halis yücel
			</a>
			<a
				href={'https://github.com/halisycel/words-in-a-sentence-tr'}
				target={'_blank'}
				rel={'noreferrer'}
			>
				github.com
			</a>
		</div>
	);
};

export default Footer;
