import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import Reducer from './_reducers/index';

import 'antd/dist/antd.css';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore);

ReactDOM.render(
  <Provider
    store = {createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);