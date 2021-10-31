import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { NotFound } from '@page/NotFound/NotFound';
import NotFound from '@page/NotFound/NotFound';

import './app.scss';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};
ReactDOM.render(<App />, document.getElementById('app'));