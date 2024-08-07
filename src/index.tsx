import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppWithRedux } from './app/AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { HashRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  </HashRouter>


);



