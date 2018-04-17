import React from 'react';
import PopoverComponent from '../../shared/PopoverComponent';
import styles from './popup.scss';

class Popup extends PopoverComponent {
    state = {
        open: false
    };

    handleClick = () => {
        this.setState({
            open: !this.state.open
        });
    }

    close = () => {
        this.setState({
            open: false
        });
    }

    render() {
        const { Button } = this.props;
        const { open } = this.state;

        return (
          <div className={styles.wrapper}  ref={(node) => { this.modal = node; }}>
              <Button onClick={this.handleClick} />
              <div className={styles.popup}>
                  {
                      open && this.props.children
                  }
              </div>
          </div>
        );
    }
};

export default Popup;