import React from 'react';
import { useSelector } from 'react-redux';
import Header from './header';
import PropTypes from 'prop-types';
import Notification from './notification';
import Head from 'next/head';

const Layout = ({ children, style, header }) => {
	const notification = useSelector(state => state.notification);
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
			{Object.keys(notification).map(key => (
				<Notification
					id={key}
					key={key}
					visible={notification[key].visible}
					type={notification[key].type}
					text={notification[key].text}
					position={notification[key].position}
					button={notification[key].button}
					buttonText={notification[key].buttonText}
					buttonHref={notification[key].buttonHref}
				/>
			))}
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
