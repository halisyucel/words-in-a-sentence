import styles from '../styles/footer.module.css';
import React from 'react';

const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.footer__github}>
				View source on&nbsp;
				<a
					href={'https://github.com/halisycel/words-in-a-sentence-tr'}
					target={'_blank'}
					rel={'noreferrer'}
				>
					Github
				</a>
			</div>
			&#8226;
			<div className={styles.footer__creator}>
				Created by&nbsp;
				<a href={'https://halisyucel.dev'} target={'_blank'} rel={'noreferrer'}>
					Halis Yücel
				</a>
			</div>
		</div>
	);
};

export default Footer;
