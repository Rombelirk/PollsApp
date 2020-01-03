import React, { FC, useState } from 'react';
import { useMutation } from 'react-apollo';
import CREATE_POLL from './CreatePollMutation';
import Input from '../../../atoms/Input/Input';
import Button from '../../../atoms/Button/Button';
import Popup from '../../../atoms/Popup/Popup';

interface Props {
    showCreatePollPopup: boolean;
    closePopup: () => void;
}

const CreatePollFormContainer: FC<Props> = ({ showCreatePollPopup, closePopup }) => {
    const [question, setQuestion] = useState<string>('');
    const [optionOne, setOptionOne] = useState<string>('');
    const [optionTwo, setOptionTwo] = useState<string>('');

    const [createPoll, { data }] = useMutation(CREATE_POLL);

    const onCreatePollSubmit = async () => {
        const response = await createPoll({
            variables: {
                title: question,
                options: [optionOne, optionTwo],
            },
        });

        closePopup();
    };

    return (
        <>
            {showCreatePollPopup && (
                <Popup show={showCreatePollPopup}>
                    Question
                    <Input value={question} onChange={(e) => setQuestion(e.currentTarget.value)} />
                    Option1
                    <Input value={optionOne} onChange={(e) => setOptionOne(e.currentTarget.value)} />
                    Option2
                    <Input value={optionTwo} onChange={(e) => setOptionTwo(e.currentTarget.value)} />
                    <Button onClick={onCreatePollSubmit}>Create Poll</Button>
                </Popup>
            )}
        </>
    );
};

export default CreatePollFormContainer;
