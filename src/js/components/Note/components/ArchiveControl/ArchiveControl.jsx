import React from 'react';
import { archive } from './archiveControl.scss';

const ArchiveControl = ({ onClick }) => (
  <button className={archive} onClick={onClick} title="Select note">
      <i className='fa fa-check' />
  </button>
);

export default ArchiveControl;