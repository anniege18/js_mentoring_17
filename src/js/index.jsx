import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import App from './App';
import saga from './sagas';
import '../css/main.scss';

const sagaMiddleware = createSagaMiddleware();
const root = document.getElementById('root');

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
          logger,
          sagaMiddleware
        ),
    )
);

sagaMiddleware.run(saga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  root);
