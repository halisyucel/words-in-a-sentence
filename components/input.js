import React, { useState, useCallback, useEffect } from 'react';
import styles from '../styles/input.module.css';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

const Input = ({ placeholder, onSubmit }) => {
	const [inputId, setInputId] = useState('');
	const [value, setValue] = useState('');
	const [focus, setFocus] = useState(false);
	const isFocus = useCallback(() => {
		if (value.trim() !== '')
			return true;
		else
			return focus;
	}, [ value, focus ]);
	const submit = useCallback(() => {
		if (value.trim() !== '')
			onSubmit(value);
	}, [ value, onSubmit ]);
	useEffect(() => {
		setInputId(`input-${Math.floor(Math.random() * 10000)}`);
	}, []);
	return (
		<div className={styles.search}>
			<input
				id={inputId === '' ? null : inputId}
				value={value}
				className={styles.search__input}
				type={'text'}
				spellCheck={false}
				onChange={(e) => setValue(e.target.value)}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			/>
			<div
				onClick={() => document.getElementById(inputId).focus()}
				className={`${styles.search__placeholder} ${isFocus() ? styles.search__placeholder__focus : ''}`}
			>
				{placeholder}
			</div>
			<div
				className={styles.search__icon}
				onClick={submit}
			>
				<FiSearch />
			</div>
		</div>
	);
};

Input.propTypes = {
	placeholder: PropTypes.string,
	onSubmit: PropTypes.func
};

export default Input;
