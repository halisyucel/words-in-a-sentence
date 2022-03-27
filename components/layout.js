import React from 'react';
import Header from './header';
import PropTypes from 'prop-types';
import Creator from './creator';

const Layout = ({ children, style, header }) => {
	return (
		<div className={'layout'}>
			{header && <Header />}
			<div style={style} className={'layout__body'}>{children}</div>
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
