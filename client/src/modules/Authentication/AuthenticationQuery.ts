import gql from 'graphql-tag';

const authQuery = gql`
    query AuthenticationQuery($login: String!, $password: String!) {
        login(input: { login: $login, password: $password }) {
            jwtToken
            user {
                _id
                login
            }
        }
    }
`;

export default authQuery;
