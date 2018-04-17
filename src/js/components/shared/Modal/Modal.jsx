import React from 'react';
import ReactDOM from 'react-dom';
import PopoverComponent from '../PopoverComponent';
import styles from './modal.scss';

const modalRoot = document.getElementById('modal-root');

class Modal extends PopoverComponent {
    constructor(props) {
        super(props);
        this.close = this.props.close;
    }

    componentDidMount() {
        document.body.className = 'modal-open';
    }

    componentWillUnmount() {
        document.body.className = '';
    }

    render() {
        return ReactDOM.createPortal(
          <div className={styles.modalOverlay}>
              <div className={styles.modal} ref={(node) => { this.modal = node; }}>
              { this.props.children }
              </div>
          </div>,
          modalRoot,
        );
    }
}

export default Modal;