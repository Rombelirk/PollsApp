import React, { FC } from 'react';
import CLOSE_CURRENT_POLL from './CloseCurrentPollMutation'
import { CurrentPoll_currentPoll } from './__generated__/CurrentPoll'
import { useMutation } from 'react-apollo'


interface Props {
    currentPoll: CurrentPoll_currentPoll
}

const CurrentPoll: FC<Props> = ({ currentPoll }) => {

    const [closeCurrentPoll, { data }] = useMutation(CLOSE_CURRENT_POLL)

    const closePoll = () => {
        closeCurrentPoll()
    }

    if (!currentPoll) return null;
    return <div onClick={closePoll}> {currentPoll._id} {currentPoll.title} <div>{currentPoll.options.map(el => el.option)}</div></div>
}

export default CurrentPoll