import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import * as serviceWorker from './serviceWorker';
import store  from "./redux/store.js";
import {CookiesProvider} from "react-cookie";


if(process.env.REACT_APP_BASE_NODE_ENV === 'development'){
    console.log(process.env)
}

//include redux and cookie provider
ReactDOM.render(<Provider store={store()}><CookiesProvider> <App /></CookiesProvider></Provider>, document.getElementById('root'));


serviceWorker.unregister();
