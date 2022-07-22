import styles from '../styles/switch.module.css';
import PropTypes from 'prop-types';
import React from 'react';

const Switch = ({ value, onChange, disabled }) => {
	return (
		<div
			className={styles.switch}
			data-state={disabled ? 'disabled' : null}
			onClick={() => !disabled && onChange(!value)}
		>
			<div className={styles.switch__key} data-value={value ? 'on' : 'off'} />
			<div className={styles.switch__lock} />
		</div>
	);
};

Switch.propTypes = {
	value: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

Switch.defaultProps = {
	disabled: false,
};

export default Switch;
