import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Router from './router/Router';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from "react-redux";
import store from "./store/index";

ReactDOM.render( < Provider store = { store } > < BrowserRouter > < Router / >
    </BrowserRouter></Provider > , document.getElementById('root'));
serviceWorker.unregister();