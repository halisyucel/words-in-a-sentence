import React, { useState, useCallback, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';
import styles from '../styles/input.module.css';

const Input = ({ className, placeholder, onSubmit, size, style }) => {
	const setStyle = (_className) => {
		switch (size) {
			case 'small':
				return `${styles[_className]} ${styles[_className + '_small']}` + (className ? ` ${className}` : '');
			default:
				return styles[_className] + (className ? ` ${className}` : '');
		}
	}
	const [inputId, setInputId] = useState('');
	const [value, setValue] = useState('');
	const [focus, setFocus] = useState(false);
	const isFocus = useCallback(() => value.trim() !== '' ? true : focus, [ value, focus ]);
	const submit = useCallback((inlineValue=null) => {
		if (inlineValue !== null && typeof inlineValue === 'string')
			onSubmit(inlineValue);
		else if (value.trim() !== '')
			onSubmit(value);
	}, [ value , onSubmit ]);
	useEffect(() => {
		setInputId(`input-${Math.floor(Math.random() * 10000)}`);
	}, []);
	useEffect(() => {
		if (inputId !== '')
			setValue(document.getElementById(inputId).value);
	}, [ inputId ]);
	return (
		<div className={setStyle('search')} style={style}>
			<input
				id={inputId === '' ? null : inputId}
				defaultValue={''}
				className={setStyle('search__input')}
				type={'text'}
				spellCheck={false}
				onFocus={() => setFocus(true)}
				onKeyDown={(e) => (e.key === 'Enter') &&
					submit(document.getElementById(inputId).value.trim())}
				onBlur={() => {
					setValue(document.getElementById(inputId).value);
					setFocus(false)
				}}
			/>
			<div
				onClick={() => document.getElementById(inputId).focus()}
				className={`${setStyle('search__placeholder')} ${isFocus() ? 
					setStyle('search__placeholder__focus') : ''}`}
			>
				{placeholder}
			</div>
			<div
				className={setStyle('search__icon')}
				onClick={submit}
			>
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
	style: PropTypes.object
};

Input.defaultProps = {
	className: '',
	placeholder: 'search a word',
	size: 'normal',
	style: {}
};

export default Input;
