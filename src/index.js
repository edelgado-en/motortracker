import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Account } from './components/Account';
import { BrowserRouter, HashRouter } from 'react-router-dom';

ReactDOM.render(
    <Account>
      <App />
    </Account>,
  document.getElementById('root')
);

