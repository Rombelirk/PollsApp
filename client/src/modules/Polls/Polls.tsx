import React, { FC, useState } from 'react';
import Button from '../../atoms/Button/Button'
import CreatePollForm from './CreatePollForm/CreatePollFormContainer'
import { useQuery } from 'react-apollo'
import pollsQuery from './PollsQuery'
import CurrentPoll from './CurrentPoll/CurrentPoll'
import OtherPolls from './OtherPolls/OtherPolls'

interface Props { }

const Polls: FC<Props> = () => {
    const [showCreatePollPopup, setShowCreatePollPopup] = useState<boolean>(false)

    const { data, loading, error } = useQuery(pollsQuery);
    if (loading || error) return null;


    const { getSelfInfo } = data

    const onCreatePollClick = () => {
        setShowCreatePollPopup(true)
    }

    const closeCreatePollPopup = () => {
        setShowCreatePollPopup(false)
    }

    return <>
        <Button onClick={onCreatePollClick} >Create Poll</Button>
        <CurrentPoll currentPoll={getSelfInfo.currentPoll} />
        <OtherPolls />
        <CreatePollForm closePopup={closeCreatePollPopup} showCreatePollPopup={showCreatePollPopup} />
    </>;
};

export default Polls;
