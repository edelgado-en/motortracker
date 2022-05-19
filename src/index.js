import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Account } from './components/Account';

ReactDOM.render(
  <React.StrictMode>
    <Account>
      <App />
    </Account>
  </React.StrictMode>,
  document.getElementById('root')
);

