import React from 'react';
import { useSelector } from 'react-redux';
import Header from './header';
import PropTypes from 'prop-types';
import Notification from './notification';
import Head from 'next/head';
import Footer from './footer';
import styles from '../styles/layout.module.css';

const Layout = ({ children, style, header }) => {
	const notification = useSelector(state => state.notification);
	return (
		<div className={styles.layout}>
			<Head>
				<title>{process.env.NEXT_PUBLIC_SITE_TITLE} &#127481;&#127479;</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
				<meta name="description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
				<meta name="keywords" content="words, sentence, word, in, sentence" />
				<meta name="robots" content="noindex, nofollow" />
				<link rel="icon" type="image/x-icon" href={'/favicon.png'} />
				{/* open graph */}
				<meta property="og:title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
				<meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
				<meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
				<meta property="og:description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={process.env.NEXT_PUBLIC_SITE_CARD_IMAGE} />
				{/* twitter card */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
				<meta name="twitter:description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
				<meta name="twitter:image" content={process.env.NEXT_PUBLIC_SITE_CARD_IMAGE} />
				{/* android */}
				<meta name="theme-color" content={process.env.NEXT_PUBLIC_SITE_THEME_COLOR} />
				<meta name="mobile-web-app-capable" content="yes" />
				{/* ios */}
				<meta name="apple-mobile-web-app-title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				{/* windows */}
				<meta name="msapplication-navbutton-color" content={process.env.NEXT_PUBLIC_SITE_THEME_COLOR} />
				<meta name="msapplication-TileColor" content={process.env.NEXT_PUBLIC_SITE_THEME_COLOR} />
				<meta name="msapplication-TileImage" content={'/favicon.png'} />
				{/* pinned sites */}
				<meta name="application-name" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
				<meta name="msapplication-tooltip" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
				<meta name="msapplication-starturl" content="/" />
			</Head>
			{header && <Header />}
			<div style={style} className={styles.layout__body}>{children}</div>
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
			<Footer />
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
