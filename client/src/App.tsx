import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import AuthenticationContainer from './modules/Authentication/AuthenticationContainer';
import PrivateRoute from './wrappers/PrivateRoute';
import Tasks from './modules/Tasks/Tasks';
import Layout from './modules/Layout/Layout';
import { ApolloProvider } from 'react-apollo';
import client from './client';
const history = createBrowserHistory();

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={history}>
                <Switch>
                    <Route path='/auth' component={AuthenticationContainer} />
                    <Layout>
                        <PrivateRoute path='/' component={Tasks} />
                    </Layout>
                </Switch>
            </Router>
        </ApolloProvider>
    );
};

export default App;
