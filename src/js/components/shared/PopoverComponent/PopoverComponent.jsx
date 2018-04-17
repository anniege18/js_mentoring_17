import React, { PureComponent } from 'react';

class PopoverComponent extends PureComponent {

    componentDidMount() {
        document.addEventListener('click', this.onOutsideClick, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onOutsideClick, true);
    }

    onOutsideClick = (e) => {
        const domNode = this.modal;

        if (!domNode || !domNode.contains(e.target)) {
            this.close();
        }
    }
}

export default PopoverComponent;