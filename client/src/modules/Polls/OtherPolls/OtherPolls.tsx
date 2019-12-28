import React, { FC } from 'react';
import { useQuery, useMutation } from 'react-apollo'
import OtherPollsQuery from './OtherPollsQuery'
import { getPollsToAnswer } from './__generated__/getPollsToAnswer'
import VoteMutation from './VoteMutation'


interface Props {

}

const OtherPolls: FC<Props> = ({ }) => {
    const { data, error, loading } = useQuery<getPollsToAnswer>(OtherPollsQuery)
    const [mutate, stuff] = useMutation(VoteMutation)
    if (loading || error || !data) {
        return null
    }



    const polls = data.getPollsToAnswer;
    const vote = (pollId: string, optionId: string): void => {

        mutate({ variables: { id: pollId, optionId }, refetchQueries: [{ query: OtherPollsQuery }] })
    }
    return <div>
        <b>Polls</b>
        {
            polls.map(poll => {
                return <div>{poll.title}

                    {
                        poll.options.map(option => <div onClick={() => vote(poll._id, option._id)}><i>{option.option}</i></div>)
                    }
                    <br></br>
                    <br>
                    </br>
                </div>
            })
        }</div>
}

export default OtherPolls