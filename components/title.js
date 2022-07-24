import styles from '../styles/title.module.css';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const Title = ({ className, style, size }) => {
	return (
		<div data-size={size} className={`${styles.title} ${className}`.trim()} style={style}>
			<Link href={'/'}>
				<a>words in a sentence</a>
			</Link>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img 
				src={'/flag.svg'} 
				alt={'TR'}
				width={'42'}
				height={'32'}	
			/>
		</div>
	);
};

Title.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	size: PropTypes.string,
};

Title.defaultProps = {
	className: '',
	style: {},
	size: 'normal',
};

export default Title;
