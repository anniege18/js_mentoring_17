import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './sidebar.scss';

const Sidebar = () => (
  <aside className={styles.aside}>
    <ul className={styles.navList}>
        <li className={styles.navItem}>
            <NavLink
              exact
              to='/'
              activeClassName={styles.activeNavLink}
            >
                Notes
            </NavLink>
        </li>
        <li className={styles.navItem}>
            <NavLink
              exact
              to='/archive'
              activeClassName={styles.activeNavLink}
            >
                Archive
            </NavLink>
        </li>
    </ul>
  </aside>
);

export default Sidebar;
