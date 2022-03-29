import React from 'react';
import Header from './header';
import PropTypes from 'prop-types';
import Notification from './notification';

const Layout = ({ children, style, header }) => {
	return (
		<div className={'layout'}>
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
