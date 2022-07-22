import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const Loading = ({ text }) => {
	const [dots, setDots] = useState('.');
	useEffect(() => {
		const interval = setInterval(() => {
			if (dots === '...') setDots('.');
			else setDots(dots + '.');
		}, 500);
		return () => clearInterval(interval);
	}, [dots]);
	return (
		<span>
			{text}
			{dots}
		</span>
	);
};

Loading.propTypes = {
	text: PropTypes.string,
};

Loading.defaultProps = {
	text: 'loading',
};

export default Loading;
