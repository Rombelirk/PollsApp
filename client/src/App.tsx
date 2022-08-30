import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import AuthenticationContainer from './modules/Authentication/AuthenticationContainer';
import PrivateRoute from './wrappers/PrivateRoute';
import Polls from './modules/Polls/Polls';
import Layout from './modules/Layout/Layout';
import { ApolloProvider } from 'react-apollo';
import client from './client';
const history = createBrowserHistory();
//test
const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={history}>
                <Switch>
                    <Route path='/auth' component={AuthenticationContainer} />
                    <Layout>
                        <PrivateRoute path='/' component={Polls} />
                    </Layout>
                </Switch>
            </Router>
        </ApolloProvider>
    );
};

export default App;
