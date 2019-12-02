import { Route, Redirect } from 'react-router';
import React, { FC } from 'react';
import { RouteProps } from 'react-router';

interface Props extends RouteProps {}

const PrivateRoute: FC<Props> = (props) => {
    if (!localStorage.getItem('jwtToken')) {
        return <Redirect to='/auth' />;
    }

    return <Route {...props} />;
};

export default PrivateRoute;
