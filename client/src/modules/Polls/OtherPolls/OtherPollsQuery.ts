import gql from 'graphql-tag';

const getPollsToAnswer = gql`
    query getPollsToAnswer {
        getPollsToAnswer {
            _id
            title
            options {
                _id
                option
            }
        }
    }
`;

export default getPollsToAnswer;
