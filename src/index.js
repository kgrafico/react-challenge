import React from 'react';
import ReactDOM from 'react-dom';
import scss from './style/styles.scss'

import { BrowserRouter } from "react-router-dom";
// import * as loginService from "./services/loginService";

import App from './App';

const title = '';

ReactDOM.render(
    <BrowserRouter>
    <App title={title} />
    </BrowserRouter>,
    document.getElementById('root')
);

// serviceWorker.unregister();