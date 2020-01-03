import gql from 'graphql-tag';

const pollCreated = gql`
    subscription pollCreated($userId: String!) {
        pollCreated(userId: $userId) {
            _id
        }
    }
`;

export default pollCreated;
