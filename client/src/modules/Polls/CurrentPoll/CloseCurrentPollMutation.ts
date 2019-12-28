import gql from 'graphql-tag';

const closeCurrentPoll = gql`
    mutation closeCurrentPoll {
        closeCurrentPoll{
            _id
            currentPoll {
                _id
            }
        }
    }
`;

export default closeCurrentPoll;