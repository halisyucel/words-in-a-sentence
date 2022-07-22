import styles from '../styles/toolbar.module.css';
import Settings from './settings';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';

const Toolbar = ({ word }) => {
	const [settingsPopupVisibility, setSettingsPopupVisibility] = useState(false);
	useEffect(() => {
		if (settingsPopupVisibility) {
			document.body.style.overflow = 'hidden';
			document.body.style.userSelect = 'none';
		} else {
			document.body.style.overflow = 'auto';
			document.body.style.userSelect = 'auto';
		}
	}, [settingsPopupVisibility]);
	return (
		<div className={styles.toolbar}>
			<div className={styles.toolbar__text}>
				results for your search{' '}
				<span className={styles.toolbar__text__highlight}>{word}</span>
			</div>
			<div
				className={styles.toolbar__button}
				onClick={() => setSettingsPopupVisibility(true)}
			>
				<AiTwotoneSetting />
			</div>
			<Settings
				visibility={settingsPopupVisibility}
				onVisibility={setSettingsPopupVisibility}
			/>
		</div>
	);
};

Toolbar.propTypes = {
	word: PropTypes.string.isRequired,
};

export default Toolbar;
