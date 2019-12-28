import React, { FC, useState, FormEvent, MouseEventHandler } from 'react';
import { AuthForm } from './Authentication.styles';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';

enum AuthCredentials {
    login = 'login',
    password = 'password',
}

interface Props {
    onFormSubmit: (creds: { login: string; password: string }) => void;
}

const Authentication: FC<Props> = ({ onFormSubmit }) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onFieldChange = (type: AuthCredentials) => (event: FormEvent<HTMLInputElement>) => {
        if (type === AuthCredentials.login) {
            return setLogin(event.currentTarget.value);
        }
        return setPassword(event.currentTarget.value);
    };

    const onSubmit: MouseEventHandler<HTMLElement> = (event) => {
        onFormSubmit({ login, password });
    };

    return (
        <AuthForm>
            <Input value={login} onChange={onFieldChange(AuthCredentials.login)} />
            <Input value={password} onChange={onFieldChange(AuthCredentials.password)} />
            <Button onClick={onSubmit}>Submit</Button>
        </AuthForm>
    );
};

export default Authentication;
