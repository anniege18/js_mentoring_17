import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { without } from 'lodash';
import { addLabel } from '../../actions';
import styles from './labelsForm.scss';

class LabelsForm extends PureComponent {
    state = {
        newLabel: '',
    };

    handleChange = (e) => {
        this.setState({
            newLabel: e.target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.newLabel.trim() !== '')  {
            this.props.addLabel(this.state.newLabel);
        }

        this.setState({
            newLabel: '',
        });
    }

    handleChangeChk = (e, label) => {
        const { id, noteLabels, onUpdate } = this.props;

        const labels = e.target.checked ?
          noteLabels.concat(label) :
          without(noteLabels, label);
        onUpdate(id, { labels });
    }

    render() {
        const { labels, noteLabels } = this.props;
        const { newLabel } = this.state;
        return (
            <form className={styles.form} onSubmit={this.handleSubmit}>
              <input
                type="text"
                className={styles.input}
                value={newLabel}
                onChange={this.handleChange}
                placeholder="Enter label name"
              />

              {
                  newLabel &&
                    <input className={styles.submit} type="submit" value={ `+ Create '${newLabel}'`}/>
              }

              <ul className={styles.list}>
                  {
                      !newLabel && labels && labels.map(label => (
                        <li className={styles.item}>
                            <input
                              type="checkbox"
                              checked={noteLabels.includes(label)}
                              onChange={(e) => this.handleChangeChk(e, label)}
                            />
                            <label
                              className={styles.label}
                            >
                                {label}
                            </label>
                        </li>
                      ))
                  }
              </ul>
            </form>
        );
    }
}

export default connect(
  ({ labels }) => ({ labels }),
  { addLabel }
)(LabelsForm);