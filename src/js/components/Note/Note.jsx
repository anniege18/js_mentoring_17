import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import NoteControls from './components/NoteControls';
import PinControl from './components/PinControl';
import ArchiveControl from './components/ArchiveControl';
import Labels from './components/Labels'
import styles from './note.scss';

const setBackgroundColor = (color) => ({
   backgroundColor: color
});

const setActiveStyle = selected =>
  classNames(
    styles.note,
    { [styles.noteSelected]: selected }
  );

const Content = ({title, text}) => (
  <div>
      {
          title &&
          <h2 className={ styles.noteTitle }>
              { title }
          </h2>
      }
      <p className={ styles.noteText }>
          { text }
      </p>
  </div>
);

class Note extends PureComponent {
    state = {
      selected: false,
    };

    onSelect = (id) => {
        this.setState({
            selected: !this.state.selected,
        }, () => {
            this.props.onSelect(id, this.state.selected);
        });
    }

    render () {
        const {
            note: {
                id, title, text, labels, color, pined
            },
            match: {
                path
            }
        } = this.props;

        const { selected } = this.state;
        const handleArchiveClick = () => { this.onSelect(id) };
        const notePath = `${path !== '/' ? path : ''}/edit/${id}`;

        return (
          <div
            className={ setActiveStyle(selected) }
            style={ setBackgroundColor(color) }
          >
              <section>
                  <div className={styles.upperControls}>
                    <ArchiveControl
                      selected={selected}
                      onClick={handleArchiveClick}
                    />
                    <PinControl
                      id={id}
                      pined={pined}
                    />
                  </div>
                  <Link to={notePath}>
                    <Content title={title} text={text} />
                  </Link>
              </section>
              <section>
                  {
                      labels.length > 0 ?
                        <Labels labels={labels} /> :
                        null
                  }
                  <NoteControls
                    id={id}
                    noteLabels={labels}
                    noteColor={color}
                  />
              </section>
          </div>
        );
    }
}

export default withRouter(Note);