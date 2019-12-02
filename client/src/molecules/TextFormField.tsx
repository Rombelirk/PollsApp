import React, { FC } from 'react';
import Input from '../atoms/Input/Input';
import { Container, Title } from './TextFormField.styles';

interface Props {
    title: string;
    value: string;
}

const TextFormField: FC<Props> = ({ title, value }) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Input value={value} />
        </Container>
    );
};

export default TextFormField;
