import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/core/containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as categories } from './app/categories/reducers/categories';
import { reducer as posts } from './app/posts/reducers/posts';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

const rootReducer = combineReducers({categories, posts});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,

    document.getElementById('root')
);
registerServiceWorker();
