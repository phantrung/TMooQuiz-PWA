import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../Loading';
// import withTracker from '../../plugins/googleanalytics';
import {Route} from 'react-router';

export const LazyRoute = (props) => {
    const component = Loadable({
        loader: props.component,
        loading: () => <div><Loading className="loading"/></div>,
    });

    return <Route {...props} component={component} />;
};

export const LazyComponent = (props) => {
    const Component = Loadable({
        loader: props.component,
        loading: () => <div><Loading className="loading"/></div>,
    });

    return <Component {...props} />;
};


