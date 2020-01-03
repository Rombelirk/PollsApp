import React, { FC } from 'react';
import CLOSE_CURRENT_POLL from './CloseCurrentPollMutation';
import ANSWER_GIVEN_SUBSCRIPTION from './AnswerGivenSubscription';
import { PollsQuery_getSelfInfo_currentPoll } from '../__generated__/PollsQuery';
import { answerGiven } from './__generated__/answerGiven';
import { useMutation, useSubscription } from 'react-apollo';
import { Card } from '../../../atoms/Card/Card.styles';
import { ResponsivePie } from '@nivo/pie';
import { PieContainer } from './CurrentPoll.styles';
import { pieSettings } from './pieSettings';

interface Props {
    currentPoll: PollsQuery_getSelfInfo_currentPoll | null;
    userId: string;
}

const CurrentPoll: FC<Props> = ({ currentPoll, userId }) => {
    const [closeCurrentPoll, { data }] = useMutation(CLOSE_CURRENT_POLL);

    useSubscription<answerGiven>(ANSWER_GIVEN_SUBSCRIPTION, { variables: { userId } });

    const closePoll = () => {
        closeCurrentPoll();
    };
    if (!currentPoll) return null;
    const hr = currentPoll.options.map((option) => {
        return {
            id: option._id,
            label: option.option,
            value: 0,
        };
    });

    currentPoll.votes.forEach((vote) => {
        const option = hr.find((el) => el.id === vote.optionId);
        if (!option) return;
        option.value += 1;
    });

    return (
        <Card onClick={closePoll}>
            {' '}
            {currentPoll.title}
            <PieContainer>
                <ResponsivePie
                    data={hr}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            translateY: 56,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000',
                                    },
                                },
                            ],
                        },
                    ]}
                    {...pieSettings}
                />
            </PieContainer>
        </Card>
    );
};

export default CurrentPoll;
