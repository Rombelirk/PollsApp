import React, { FC } from 'react';
import authQuery from './AuthenticationQuery';
import Authentication from './Authentication';
import client from '../../client';
import { LoginInput } from '../../../__generated__/globalTypes';
import { AuthenticationQuery } from './__generated__/AuthenticationQuery';
import { withRouter, RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps { }

const AuthenticationContainer: FC<Props> = ({ history }) => {
    const onFormSubmit = async (creds: LoginInput) => {
        try {
            const result = await client.query<AuthenticationQuery, { input: LoginInput }>({
                query: authQuery,
                variables: { input: creds },
            });

            if (result.data.login.jwtToken) {
                localStorage.setItem('jwtToken', result.data.login.jwtToken);
                history.push('/');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return <Authentication onFormSubmit={onFormSubmit} />;
};

export default withRouter(AuthenticationContainer);
