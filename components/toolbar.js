import React from 'react';
import PropTypes from 'prop-types';
import { AiTwotoneSetting } from 'react-icons/ai';

const Toolbar = ({ word }) => {
	return (
		<div className={'toolbar'}>
			<div className={'toolbar__text'}>
				results for your search <span className={'toolbar__text__highlight'}>{word}</span>
			</div>
			<input type={'checkbox'} id={'toolbar-checkbox'}/>
			<label htmlFor={'toolbar-checkbox'} className={'toolbar__settings'}>
				<AiTwotoneSetting />
			</label>
		</div>
	);
};

Toolbar.propTypes = {
	word: PropTypes.string.isRequired
};

export default Toolbar;
