import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

