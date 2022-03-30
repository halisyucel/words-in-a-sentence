import React from 'react';
import Header from './header';
import PropTypes from 'prop-types';
import Notification from './notification';
import Head from 'next/head';

const Layout = ({ children, style, header }) => {
	return (
		<div className={'layout'}>
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
				<title>Words In A Translation &#127481;&#127479;</title>
				<meta name="description" content="Words In A Translation" />
				<meta name="keywords" content="words, sentence, word, in, sentence" />
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />

			</Head>
			{header && <Header />}
			<div style={style} className={'layout__body'}>{children}</div>
			<Notification />
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	style: PropTypes.object,
	header: PropTypes.bool,
};

Layout.defaultProps = {
	style: {},
	header: true
};

export default Layout;
