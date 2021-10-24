import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Github, GithubCallback, SignUp } from '@page/auth';
import { NotFound } from '@page/not-found';
import { Home } from '@page/home';
import { Town } from '@page/town';

import './app.scss';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/signUp' component={SignUp} exact />
                <Route path='/auth' component={Github} exact />
                <Route path='/auth/githubcallback' component={GithubCallback} />
                <Route path='/' component={Home} exact />
                <Route path='/town' component={Town} exact />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};
ReactDOM.render(<App />, document.getElementById('app'));