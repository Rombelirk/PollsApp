import React, { FC } from 'react';
import CLOSE_CURRENT_POLL from './CloseCurrentPollMutation'
import ANSWER_GIVEN_SUBSCRIPTION from './AnswerGivenSubscription'
import { PollsQuery_getSelfInfo_currentPoll } from '../__generated__/PollsQuery'
import { answerGiven } from './__generated__/answerGiven'
import { useMutation, useSubscription } from 'react-apollo'


interface Props {
    currentPoll: PollsQuery_getSelfInfo_currentPoll | null;
    userId: string;
}

const CurrentPoll: FC<Props> = ({ currentPoll, userId }) => {

    const [closeCurrentPoll, { data }] = useMutation(CLOSE_CURRENT_POLL)

    useSubscription<answerGiven>(
        ANSWER_GIVEN_SUBSCRIPTION, { variables: { userId } }
    );

    const closePoll = () => {
        closeCurrentPoll()
    }

    if (!currentPoll) return null;
    return <div style={{ backgroundColor: "red" }} onClick={closePoll}> {currentPoll._id} {currentPoll.title}
        <div>
            Votes count: {currentPoll.votes.length}
        </div>
        <div>
            {currentPoll.options.map(el => el.option)}
        </div>
    </div>
}

export default CurrentPoll