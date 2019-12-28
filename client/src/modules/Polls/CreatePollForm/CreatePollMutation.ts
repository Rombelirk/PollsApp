import gql from 'graphql-tag';

const createPoll = gql`
    mutation createPoll(
        $options: [String!]!
        $title: String!

    ) {
        createPoll(
            input: {
                options: $options
                title: $title
            }
        ) {
            _id
            currentPoll {
                _id
                title
                options {
                    _id
                    option
                }
                votes {
                    user {
                        _id
                        login
                    }
                    optionId
                }
            }
        }
    }
`;

export default createPoll;
