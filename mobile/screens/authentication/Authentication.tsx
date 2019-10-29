import React, { useState, FC } from 'react';
import { Text } from 'react-native';
import { Container, InputContainer, Form, TextInput, SubmitButton } from './Authentication.styles';

interface Props {
    onFormSubmit: (credentials: { login: string; password: string }) => void;
}

enum Credentials {
    login = 'login',
    password = 'password'
}

const Authentication: FC<Props> = ({ onFormSubmit }) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = e => {
        onFormSubmit({ login, password });
    }

    const onInputChange = (type: string) => (text: string) => {
        if (type === Credentials.login) {
            setLogin(text)
        } else if (Credentials.password) {
            setPassword(text)
        }
    }

    return (
        <Container>
            <Form>
                <InputContainer>
                    <Text>Login</Text>
                    <TextInput onChangeText={onInputChange(Credentials.login)} value={login} />
                </InputContainer>
                <InputContainer>
                    <Text>Password</Text>
                    <TextInput onChangeText={onInputChange(Credentials.password)} password={true} />
                </InputContainer>
                <InputContainer>
                    <SubmitButton title="Submit" onPress={onSubmit} />
                </InputContainer>
            </Form>
        </Container>
    )
}

export default Authentication;

