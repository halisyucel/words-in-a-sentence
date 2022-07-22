import styles from '../styles/pagination.module.css';
import PropTypes from 'prop-types';
import React from 'react';
import {
	BsChevronDoubleLeft,
	BsChevronLeft,
	BsChevronDoubleRight,
	BsChevronRight,
} from 'react-icons/bs';

const Pagination = ({ value, onChange, size, total }) => {
	const lastValue = Math.ceil(total / size);
	return total === 0 ? null : (
		<div className={styles.pagination}>
			<div
				aria-disabled={[1, 2].includes(value) ? 'true' : 'false'}
				className={styles.pagination__item__chevron}
				onClick={() => ![1, 2].includes(value) && onChange(1)}
			>
				<BsChevronDoubleLeft />
			</div>
			<div
				aria-disabled={[1, 2].includes(value) ? 'true' : 'false'}
				className={`${styles.pagination__item__chevron} ${styles.pagination__item__chevron__inside}`}
				onClick={() => ![1, 2].includes(value) && onChange(value - 1)}
			>
				<BsChevronLeft />
			</div>
			{value - 2 > 0 && value === lastValue && (
				<div className={styles.pagination__item} onClick={() => onChange(value - 2)}>
					{value - 2}
				</div>
			)}
			{value - 1 !== 0 && (
				<div className={styles.pagination__item} onClick={() => onChange(value - 1)}>
					{value - 1}
				</div>
			)}
			<div aria-label={'active-page'} className={styles.pagination__item}>
				{value}
			</div>
			{lastValue !== value && (
				<div className={styles.pagination__item} onClick={() => onChange(value + 1)}>
					{value + 1}
				</div>
			)}
			{lastValue >= value + 2 && value === 1 && (
				<div className={styles.pagination__item} onClick={() => onChange(value + 2)}>
					{value + 2}
				</div>
			)}
			<div
				aria-disabled={[lastValue - 1, lastValue].includes(value) ? 'true' : 'false'}
				className={`${styles.pagination__item__chevron} ${styles.pagination__item__chevron__inside}`}
				onClick={() => ![lastValue - 1, lastValue].includes(value) && onChange(value + 1)}
			>
				<BsChevronRight />
			</div>
			<div
				aria-disabled={[lastValue - 1, lastValue].includes(value) ? 'true' : 'false'}
				className={styles.pagination__item__chevron}
				onClick={() => ![lastValue - 1, lastValue].includes(value) && onChange(lastValue)}
			>
				<BsChevronDoubleRight />
			</div>
		</div>
	);
};

Pagination.propTypes = {
	value: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	total: PropTypes.number.isRequired,
	size: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
	value: 1,
	total: 0,
	size: 10,
};

export default Pagination;
