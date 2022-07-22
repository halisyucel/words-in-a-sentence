import styles from '../styles/button.module.css';
import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ children, onClick, style }) => {
	return (
		<div className={styles.button} onClick={onClick} style={style}>
			{children}
		</div>
	);
};

Button.propTypes = {
	onClick: PropTypes.func,
	style: PropTypes.object,
};

Button.defaultProps = {
	onClick: null,
	style: {},
};

export default Button;
