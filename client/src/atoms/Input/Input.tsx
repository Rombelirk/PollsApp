import React, { FC, FormEvent } from 'react';
import { TextInput } from './Input.styles';

interface Props {
    value?: string;
    onChange?: (event: FormEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = (props) => {
    return <TextInput {...props} />;
};

export default Input;
