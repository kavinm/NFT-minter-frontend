import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux'
import { accountReducer } from './reducers/accountReducer';
import { Provider } from 'react-redux';

export const store = createStore(accountReducer)




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
