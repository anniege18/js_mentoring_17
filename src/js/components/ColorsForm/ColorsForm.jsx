import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { colors } from '../../helpers';
import styles from './colorsForm.scss';

const setStyle = (color) => ({ backgroundColor: color });

const ColorsForm = ({ noteColor, id, onUpdate }) => (
    <div className={styles.container}>
        <ul className={styles.list}>
            {
                colors.map((color, i) => (
                  <li
                    key={i}
                    onClick={() => { onUpdate(id, { color })}}
                    className={
                        classNames(
                          styles.item,
                          { [styles.itemActive]: color === noteColor  }
                        )
                    }
                    style={setStyle(color)}
                  />
                ))
            }
        </ul>
    </div>
);

export default ColorsForm;