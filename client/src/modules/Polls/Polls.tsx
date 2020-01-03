import React, { FC, useState, useEffect } from 'react';
import Button from '../../atoms/Button/Button';
import CreatePollForm from './CreatePollForm/CreatePollFormContainer';
import { useQuery } from 'react-apollo';
import pollsQuery from './PollsQuery';
import { PollsQuery } from './__generated__/PollsQuery';
import CurrentPoll from './CurrentPoll/CurrentPoll';
import OtherPolls from './OtherPolls/OtherPolls';

interface Props {}

const Polls: FC<Props> = () => {
    const [showCreatePollPopup, setShowCreatePollPopup] = useState<boolean>(false);

    const { data, loading, error } = useQuery<PollsQuery>(pollsQuery);

    if (loading || error) return null;

    const getSelfInfo = data && data.getSelfInfo ? data.getSelfInfo : undefined;
    if (!getSelfInfo) return null;

    const onCreatePollClick = () => {
        setShowCreatePollPopup(true);
    };

    const closeCreatePollPopup = () => {
        setShowCreatePollPopup(false);
    };

    return (
        <>
            <Button onClick={onCreatePollClick}>Create Poll</Button>
            <CurrentPoll currentPoll={getSelfInfo.currentPoll} userId={getSelfInfo._id} />
            <OtherPolls userId={getSelfInfo._id} />
            <CreatePollForm closePopup={closeCreatePollPopup} showCreatePollPopup={showCreatePollPopup} />
        </>
    );
};

export default Polls;
