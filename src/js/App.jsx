import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect }  from 'react-redux';
import Page from './components/Page';

import { getNotes } from './actions';

const notesKey = 'notes';
const archivedNotesKey = 'archivedNotes';

const routes = [
    {
        path: '/',
        component: Page,
        exact: true,
        notesKey,
    },
    {
        path: '/edit',
        component: Page,
        notesKey,
    },
    {
        path: '/archive',
        exact: true,
        component: Page,
        notesKey: archivedNotesKey
    },
    {
        path: '/archive/edit',
        component: Page,
        notesKey: archivedNotesKey
    }
];

class App extends PureComponent {
    componentWillMount() {
        this.props.getNotes();
    }

    render() {
        return (
          <Router>
                  <Switch>
                      {
                          routes.map((route, index) => (
                            <Route
                              key={index}
                              path={route.path}
                              exact={route.exact}
                              render={ () => <route.component  notes={this.props[route.notesKey]} /> }
                            />
                          ))
                      }
                  </Switch>
          </Router>
        );
    }
}

export default connect(
  ({ notes }) => ({
      [notesKey]: notes.filter(({ archived }) => !archived),
      [archivedNotesKey]: notes.filter(({ archived }) => archived),
  }),
  { getNotes })(App);
