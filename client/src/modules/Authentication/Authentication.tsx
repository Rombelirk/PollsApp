import React, { FC, useState, FormEvent, MouseEventHandler } from 'react';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button'

enum AuthCredentials {
    login = 'login',
    password = 'password',
}

interface Props { }

const Authentication: FC<Props> = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onFieldChange = (type: AuthCredentials) => (event: FormEvent<HTMLInputElement>) => {
        if (type === AuthCredentials.login) {
            return setLogin(event.currentTarget.value);
        }
        return setPassword(event.currentTarget.value);
    };

    const onSubmit: MouseEventHandler<HTMLElement> = (event) => {
        console.log(login, password)
    }

    return (
        <div>
            <Input value={login} onChange={onFieldChange(AuthCredentials.login)} />
            <Input value={password} onChange={onFieldChange(AuthCredentials.password)} />
            <Button onClick={onSubmit}>Submit</Button>
        </div>
    );
};

export default Authentication;
