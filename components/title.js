import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from '../styles/title.module.css';

const Title = ({ className, style, size }) => {
	return (
		<div aria-label={size} className={`${styles.title} ${className}`.trim()} style={style}>
			<Link href={'/'}>
				<a>words in a sentence</a>
			</Link>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={'/flag.svg'} alt={'TR'}/>
		</div>
	);
};

Title.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	size: PropTypes.string
};

Title.defaultProps = {
	className: '',
	style: {},
	size: 'normal'
};

export default Title;
