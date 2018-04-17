import React from 'react';
import Search from './../Search';
import styles from './header.scss';

const Header = ({ labels, dropFilter, addToArchive, selectedCount, archive }) => {
    const handleClick = () => dropFilter('labels');
    return (
      <header className={styles.header}>
          <h1 className={styles.title}>Google Keep</h1>
          <Search/>

          {
              labels ? (
                <div className={styles.labels}>
                  <span># { labels }</span>
                  <i
                    className='fa fa-times'
                    role='button'
                    onClick={handleClick}
                  />
                </div>
              ) : null
          }

          <button
            title="Add to archive"
            className={styles.archive}
            onClick={addToArchive}
          >
              { !!selectedCount && selectedCount }
              {
                  archive ? (
                    <i className='fa fa-undo' />
                  ) : (
                    <i className='fa fa-archive' />
                  )
              }
          </button>
      </header>
    );
};

export default Header;


