import React from 'react';
import { connect } from 'react-redux';
import Popup from '../../../shared/Popup';
import LabelsForm from '../../../LabelsForm';
import ColorsForm from '../../../ColorsForm';
import { removeNote, updateNote } from '../../../../actions';
import styles from './noteControls.scss';

const LabelsButton = ({ onClick }) => (
  <button className={styles.controlsBtn} onClick={onClick}>Labels</button>
);

const ColorsButton = ({ onClick }) => (
  <button className={styles.controlsBtn} onClick={onClick}>Colors</button>
);


const NoteControls = ({ id, onDelete, onUpdate, noteLabels, noteColor }) => {
    return (
      <section className={styles.controls}>
        <Popup
            Button={ColorsButton}
        >
          <ColorsForm noteColor={noteColor} onUpdate={onUpdate} id={id} />
        </Popup>

        <Popup
          Button={LabelsButton}
        >
            <LabelsForm noteLabels={noteLabels} onUpdate={onUpdate} id={id} />
        </Popup>

        <button className={styles.controlsBtn} onClick={() => { onDelete(id); }}>
            Delete
        </button>
      </section>
    );
};

export default connect(
    null,
    (dispatch) => ({
        onDelete: (id) => { dispatch(removeNote(id)); },
        onUpdate: (id, payload) => { dispatch(updateNote(id, payload)); }
    })
)(NoteControls);