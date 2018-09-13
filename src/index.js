import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './Router/AppRouter';
import registerServiceWorker from './registerServiceWorker';

import 'core-js/es6/map';
import 'core-js/es6/set';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './Reducers';
const store = createStore(reducer)
ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
