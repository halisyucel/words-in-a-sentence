import styles from '../styles/input.module.css';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

const Input = ({ className, placeholder, onSubmit, size, style }) => {
	const [inputId, setInputId] = useState('');
	const [value, setValue] = useState('');
	const [focus, setFocus] = useState(false);
	const isFocus = useCallback(() => (value.trim() !== '' ? true : focus), [value, focus]);
	const submit = useCallback(
		(inlineValue = null) => {
			if (inlineValue !== null && typeof inlineValue === 'string') onSubmit(inlineValue);
			else if (value.trim() !== '') onSubmit(value);
		},
		[value, onSubmit],
	);
	useEffect(() => {
		setInputId(`input-${Math.floor(Math.random() * 10000)}`);
	}, []);
	useEffect(() => {
		if (inputId !== '') setValue(document.getElementById(inputId).value);
	}, [inputId]);
	return (
		<div className={`${styles.search} ${className}`.trim()} style={style}>
			<input
				data-size={size}
				id={inputId === '' ? null : inputId}
				defaultValue={''}
				className={styles.search__input}
				type={'text'}
				spellCheck={false}
				onFocus={() => setFocus(true)}
				onKeyDown={(e) =>
					e.key === 'Enter' && submit(document.getElementById(inputId).value.trim())
				}
				onBlur={() => {
					setValue(document.getElementById(inputId).value);
					setFocus(false);
				}}
			/>
			<div
				data-size={size}
				onClick={() => document.getElementById(inputId).focus()}
				className={`${styles.search__placeholder} ${
					isFocus() ? styles.search__placeholder__focus : ''
				}`.trim()}
			>
				{placeholder}
			</div>
			<div data-size={size} className={styles.search__icon} onClick={submit}>
				<FiSearch />
			</div>
		</div>
	);
};

Input.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	onSubmit: PropTypes.func,
	size: PropTypes.string,
	style: PropTypes.object,
};

Input.defaultProps = {
	className: '',
	placeholder: 'search a word',
	size: 'normal',
	style: {},
};

export default Input;
