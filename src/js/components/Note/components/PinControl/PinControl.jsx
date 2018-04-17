import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { updateNote } from '../../../../actions';
import { pin, pinActive } from './pinControl.scss';

class PinControl extends PureComponent {
    state = {
        pined: this.props.pined,
    };

    togglePin = () => {
        const { id, onUpdate } = this.props;

        this.setState({
            pined: !this.state.pined
        }, () => {
            onUpdate(id, { pined: this.state.pined })
        });
    }

    render() {
        const { pined } = this.state;
        return (
          <button
            className={classNames(pin, { [pinActive]: pined })}
            onClick={this.togglePin}
          >
            <i className='fa fa-thumb-tack' />
          </button>
        );
    }
}


export default connect(
  null,
  (dispatch) => ({
      onUpdate: (id, payload) => { dispatch(updateNote(id, payload)); }
  })
)(PinControl);