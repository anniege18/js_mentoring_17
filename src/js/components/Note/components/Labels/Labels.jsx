import React from 'react';
import { connect } from 'react-redux';
import { applyFilter } from '../../../../actions';
import styles from './labels.scss';

const Labels = ({ labels, applyFilter }) => (
    <ul className={styles.list}>
      {
          labels.length > 0 && labels.map(label => (
            <li
              className={styles.item}
              onClick={() => applyFilter('labels', label)}
            >
                # { label }
            </li>
          ))
      }
    </ul>
);

export default connect(
  null,
  { applyFilter }
)(Labels);