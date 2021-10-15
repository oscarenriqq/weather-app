import React from 'react';
import ReactDOM from 'react-dom';

import { Header } from './components/Header';
import { Weather } from './components/Weather';

import './index.css'

ReactDOM.render(
  <div className="container-sm">
    <Header />
    <Weather />
  </div>,
  document.getElementById('root')
);
