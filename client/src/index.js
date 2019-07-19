import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './index.css';
import './assets/bootstrap/bootstrap.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();