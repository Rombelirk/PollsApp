import gql from 'graphql-tag';

const vote = gql`
    mutation giveAnswer($id: String!, $optionId: String!) {
        giveAnswer( input: {
                _id: $id
                optionId: $optionId
            } 
            ){
           _id
        }
    }
`;

export default vote;