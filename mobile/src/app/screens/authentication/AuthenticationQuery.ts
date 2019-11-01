
import gql from 'graphql-tag';

const authQuery = gql`
    query AuthenticationQuery ($loginCreds: LoginInput!) {
        login(input: $loginCreds) {
            jwtToken
            user {
                _id
                login
            }
        }
    }
`;

export default authQuery