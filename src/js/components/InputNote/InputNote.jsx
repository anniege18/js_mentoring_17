import React from 'react';
import PopoverComponent from '../shared/PopoverComponent';
import { omit } from 'lodash';
import styles from './inputNote.scss';

const initState  = {
    edit: false,
    title: '',
    text: ''
};

class InputNote extends PopoverComponent {
    state = this.props.note ?
      { edit: true, ...this.props.note } :
      initState;

    close = () => {
        this.setState({
            edit: false,
        });
    }

    handleAreaChange = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    handleTextFocus = () => {
        this.setState({
            edit: true,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onClick(omit(this.state, ['edit']));
        this.setState({
            ...initState
        });
    }


    render() {
        const { edit, title, text } = this.state;

        return (
            <form
                className={ styles.form }
                ref={(node) => { this.modal = node; }}
                onSubmit={this.handleSubmit}
            >

                {
                    edit &&
                        <input
                            type="text"
                            className={ styles.title }
                            value={title}
                            onChange={this.handleTitleChange}
                            placeholder="Title"
                        />
                }

                <textarea
                    className={ styles.text }
                    value={text}
                    onChange={this.handleAreaChange}
                    onFocus={this.handleTextFocus}
                    placeholder="Take a note..."
                />
                {
                    edit &&
                        <input
                          className={ styles.submit }
                          type="submit"
                          value="Done"
                        />
                }
            </form>
        );
    }
}

export default InputNote;