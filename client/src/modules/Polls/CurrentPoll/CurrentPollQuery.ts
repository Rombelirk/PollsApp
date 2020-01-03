import gql from 'graphql-tag';

const currentPoll = gql`
    fragment CurrentPoll on UserDto {
        currentPoll {
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

export default currentPoll;
