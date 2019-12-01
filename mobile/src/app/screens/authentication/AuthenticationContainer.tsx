import React, { FC } from 'react';
import authQuery from './AuthenticationQuery'
import Authentication from './Authentication'
import client from '../../../client'
import { LoginInput } from '../../__generated__/globalTypes';
import { AuthenticationQuery } from './__generated__/AuthenticationQuery'
import { storeData } from '../../helpers/asyncStorage'
import { useHistory } from 'react-router-dom'
import { withRouter } from 'react-router'

const AuthenticationContainer: FC = () => {
    const history = useHistory()
    const onFormSubmit = async ({ login, password }) => {
        try {
            const res: { data: AuthenticationQuery } = await client.query<LoginInput>({
                query: authQuery, variables: {
                    loginCreds: {
                        login,
                        password
                    }
                }
            });
            console.log(res)
            await storeData("jwtToken", res.data.login.jwtToken);
            history.push("/")


        } catch (e) {
            console.log(e)
        }


    }

    return (
        <Authentication onFormSubmit={onFormSubmit} />
    )
}

export default withRouter(AuthenticationContainer);

