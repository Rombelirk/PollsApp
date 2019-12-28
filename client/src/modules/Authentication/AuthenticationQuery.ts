
import gql from 'graphql-tag';

const authQuery = gql`
    query AuthenticationQuery($input: LoginInput!) {
        login(input: $input) {
            jwtToken
            user {
                _id
                login
            }
        }
    }
`;

export default authQuery;
