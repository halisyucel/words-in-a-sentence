import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Title = ({ style, size }) => {
	const _style = (className) => {
		switch (size) {
			case 'small':
				return `${className} ${className + '_small'}`;
			default:
				return className;
		}
	}
	return (
		<div className={_style('title')} style={style}>
			<Link href={'/'}>
				<a>words in a sentence</a>
			</Link>
			<img src={'/flag.svg'} alt={'TR'}/>
		</div>
	);
};

Title.propTypes = {
	style: PropTypes.object,
	size: PropTypes.string
};

Title.defaultProps = {
	style: {},
	size: 'normal'
};

export default Title;
