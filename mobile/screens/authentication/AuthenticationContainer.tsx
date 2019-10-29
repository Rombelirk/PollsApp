import React, { FC } from 'react';
import authQuery from './AuthenticationQuery'
import Authentication from './Authentication'
import client from '../../client'
import { LoginInput } from '../../__generated__/globalTypes';
import { AuthenticationQuery } from './__generated__/AuthenticationQuery'

const AuthenticationContainer: FC = () => {
    const onFormSubmit = async ({ login, password }) => {
        const data: AuthenticationQuery = await client.query<LoginInput>({
            query: authQuery, variables: {
                loginCreds: {
                    login,
                    password
                }
            }
        })
    }

    return (
        <Authentication onFormSubmit={onFormSubmit} />
    )
}

export default AuthenticationContainer;

