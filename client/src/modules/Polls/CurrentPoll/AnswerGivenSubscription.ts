import gql from 'graphql-tag';

const answerGiven = gql`
    subscription answerGiven($userId: String!) {
        answerGiven(userId: $userId) {
            _id
            title
            options {
                _id
                option
            }
            votes {
                optionId
            }
        }
    }
`;

export default answerGiven;
