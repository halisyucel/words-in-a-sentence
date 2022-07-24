import styles from '../styles/layout.module.css';
import Footer from './footer';
import Header from './header';
import Notification from './notification';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const Layout = ({ children, style, header }) => {
	const notification = useSelector((state) => state.notification);
	return (
		<div className={styles.layout}>
			<Head>
				<title>Words in a Sentence &#127481;&#127479;</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />
				<meta name="description" content={'Words in a Sentence'} />
				<meta name="keywords" content="words, sentence, word, in, sentence" />
				<meta name="robots" content="index, follow" />
				
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/icon-144x144.png" />
				<link rel="icon" href="/icon-144x144.png" type={'image/png'} sizes={'144x144'} />
				<link rel="icon" href="/icon-192x192.png" type={'image/png'} sizes={'192x192'} />
				<link rel="icon" href="/icon-384x384.png" type={'image/png'} sizes={'384x384'} />
				<link rel="icon" href="/icon-512x512.png" type={'image/png'} sizes={'512x512'} />
				{/* open graph */}
				<meta property="og:title" content={'Words in a Sentence'} />
				<meta property="og:site_name" content={'Words in a Sentence'} />
				<meta property="og:url" content={'https://words-in-a-sentence-tr.vercel.app/'} />
				<meta property="og:description" content={'Words in a Sentence'} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={'/ogimage.jpg'} />
				{/* twitter card */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={'Words in a Sentence'} />
				<meta name="twitter:description" content={'Words in a Sentence'} />
				<meta name="twitter:image" content={'/ogimage.jpg'} />
				{/* android */}
				<meta name="theme-color" content={'#f68177'} />
				<meta name="mobile-web-app-capable" content="yes" />
				{/* ios */}
				<meta name="apple-mobile-web-app-title" content={'Words in a Sentence'} />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				{/* windows */}
				<meta name="msapplication-navbutton-color" content={'#f68177'} />
				<meta name="msapplication-TileColor" content={'#f68177'} />
				<meta name="msapplication-TileImage" content={'/icon-144x144.png'} />
				{/* pinned sites */}
				<meta name="application-name" content={'Words in a Sentence'} />
				<meta name="msapplication-tooltip" content={'Words in a Sentence'} />
				<meta name="msapplication-starturl" content="/" />
			</Head>
			{header && <Header />}
			<div style={style} className={styles.layout__body}>
				{children}
			</div>
			{Object.keys(notification).map((key) => (
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
	header: true,
};

export default Layout;
