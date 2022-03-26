import React from 'react';
import styles from '../styles/creator.module.css';

const Creator = () => {
	return (
		<div className={styles.creator}>
			<a href={process.env.CREATOR_WEB_SITE} target={'_blank'}>
				{process.env.CREATOR}
			</a>
			<div className={'dot'}/>
			<a href={process.env.REPO_URL} target={'_blank'}>
				repository
			</a>
		</div>
	);
};

export default Creator;
