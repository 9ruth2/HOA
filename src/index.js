import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import initFirebase from './Firebase'
import moment from 'moment';
import { BrowserRouter as Router } from 'react-router-dom';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

initFirebase()

ReactDOM.render(getRoot(), document.getElementById('root'));

function getRoot() {
    return (
        <Router>
            <App />
        </Router>
    )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
