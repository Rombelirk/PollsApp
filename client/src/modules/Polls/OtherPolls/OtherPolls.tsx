import React, { FC, useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from 'react-apollo'
import OtherPollsQuery from './OtherPollsQuery'
import { getPollsToAnswer } from './__generated__/getPollsToAnswer'
import VoteMutation from './VoteMutation'
import POLL_CREATED_SUBSCRIPTION from './PollCreatedSubscription'
import client from '../../../client'


interface Props {
    userId: string;
}

const OtherPolls: FC<Props> = ({ userId }) => {
    const { data, error, loading, subscribeToMore } = useQuery<getPollsToAnswer>(OtherPollsQuery);

    const obj = useSubscription(POLL_CREATED_SUBSCRIPTION, {
        variables: { userId }, onSubscriptionData: (a) => {
            console.log("fetched", a)
            client.query({ query: OtherPollsQuery, fetchPolicy: "network-only" })
        }
    })


    useEffect(() => {
        const unsubscribe = subscribeToMore({ document: POLL_CREATED_SUBSCRIPTION, variables: { userId } });
        return () => unsubscribe();
    }, [subscribeToMore]);

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
                        poll.options.map(option => <div style={{ backgroundColor: "green" }} onClick={() => vote(poll._id, option._id)}><i>{option.option}</i></div>)
                    }
                    <br></br>
                    <br>
                    </br>
                </div>
            })
        }</div>
}

export default OtherPolls