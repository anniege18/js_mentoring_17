import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { union } from 'lodash';

import EditPage from '../EditPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import InputNote from '../InputNote';
import Note from '../Note';

import { applyFilters } from '../../helpers'
import { addNote, getNotes, dropFilter, archiveNote } from '../../actions';

import styles from './page.scss';


class Page extends Component {
    state = {
        selectedNotes: [],
    };

    componentWillReceiveProps(nextProps) {
        const { selectedNotes } = this.state;
        if (!selectedNotes.length) return;

        this.setState({
            selectedNotes: selectedNotes.filter(id => nextProps.notes.map(({id}) => id).includes(id))
        });
    }

    onSelect = (id, selected) => {
        const { selectedNotes } = this.state;

        this.setState({
            selectedNotes: selected ? union(selectedNotes, [id]) : selectedNotes.filter(currId => currId !== id),
        });
    }

    onAddToArchive = () => {
        const { selectedNotes } = this.state;
        const { match: { path } } = this.props;
        const archive = path.indexOf('archive') !== -1;

        if (!selectedNotes.length) return;

        selectedNotes.forEach(id => {
            this.props.archiveNote(id, !archive);
        });

        this.setState({
            selectedNotes: []
        });
    }

    render() {
        const { notes, filters, match: { path } } = this.props;
        const { selectedNotes } = this.state;

        const archive = path.indexOf('archive') !== -1;
        const nestedRoutePath = `${ path !=='/' && path }/:noteId`;

        const { labels } = filters;
        const pinedNotes = notes.filter(({ pined }) => pined);
        const unpinedNotes = notes.filter(({ pined }) => !pined);
        const filteredNotes = (notes) => applyFilters(filters, notes);

        return (
          <Fragment>
              <Header
                labels={ labels }
                archive={archive}
                selectedCount={selectedNotes.length}
                dropFilter={ this.props.dropFilter }
                addToArchive={ this.onAddToArchive }
              />
              <Sidebar/>
              <main className={ styles.main }>
                  <InputNote onClick={this.props.addNote} />
                  {
                      pinedNotes.length > 0 && (
                        <div className={ `${styles.container} ${styles.containerPinned}` }>
                            <h2 className={styles.title}>Pinned:</h2>
                              {
                                  pinedNotes.map(note =>
                                    <Note
                                      key={note.id}
                                      note={note}
                                      onSelect={this.onSelect}
                                    />
                                  )
                              }
                      </div>)
                  }
                  <div className={ styles.container }>
                      {
                          pinedNotes.length > 0 ? (
                                filteredNotes(unpinedNotes).length ?
                                  filteredNotes(unpinedNotes).map(note =>
                                      <Note
                                        key={note.id}
                                        note={note}
                                        onSelect={this.onSelect}
                                      />
                                  ) : ''
                          ) : (
                                filteredNotes(notes).length ?
                                  filteredNotes(notes).map(note =>
                                    <Note
                                      key={note.id}
                                      note={note}
                                      onSelect={this.onSelect}
                                    />
                                ) : notes.length ? 'No items found' : ''
                          )
                      }
                  </div>
                  <Route
                    exact
                    path={nestedRoutePath}
                    render={() => <EditPage path={path} />}
                  />
              </main>
          </Fragment>);
    }
};

export default withRouter(connect(
    ({ filters }) => ({ filters }),
    { addNote, getNotes, dropFilter, archiveNote }
)(Page));