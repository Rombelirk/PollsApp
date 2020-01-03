import gql from 'graphql-tag';
import currentPoll from './CurrentPoll/CurrentPollQuery';

const pollsQuery = gql`
    query PollsQuery {
        getSelfInfo {
            _id
            login
            ...CurrentPoll
        }
    }
    ${currentPoll}
`;

export default pollsQuery;
