import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { omit } from 'lodash';
import InputNote from '../InputNote';
import Modal from '../shared/Modal';
import { updateNote } from '../../actions';


class EditPage extends PureComponent {

    handleClick = (state) => {
        this.props.updateNote(state);
        this.close();
    }

    close = () => {
        const { path } = this.props;
        const backUrl = path.replace('/edit', '');
        this.props.history.push(backUrl);
    }

    render() {
        const { note } = this.props;
        return (
          <Modal close={this.close}>
              <InputNote note={note} onClick={this.handleClick} />
          </Modal>
        );
    }
}

export default compose(
  withRouter,
  connect(
    ({ notes }, { match: { params: { noteId }}}) =>
    ({
        note: notes.filter(({ id }) => id === +noteId)[0]
    }),
    (dispatch) => ({
        updateNote: state => {
            dispatch(updateNote(state.id, { ...omit(state, 'id') }));
        }
    })))(EditPage);