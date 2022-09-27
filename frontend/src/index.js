import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * 스토어 생성
 */
const store = createStore(rootReducer, composeWithDevTools());

root.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider> 
);