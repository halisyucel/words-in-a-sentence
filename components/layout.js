import React from 'react';
import Header from './header';
import PropTypes from 'prop-types';
import styles from '../styles/layout.module.css';
import Creator from './creator';

const Layout = ({ children, style }) => {
	return (
		<div style={style} className={styles.layout}>
			<Header />
			{children}
			<Creator />
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	style: PropTypes.object
};

Layout.defaultProps = {
	style: {}
};

export default Layout;
