import React, { FC, MouseEventHandler } from 'react';
import { BaseButton } from './Button.styles';

interface Props {
    value?: string;
    onClick?: MouseEventHandler<HTMLElement>;
}

const Button: FC<Props> = (props) => {
    return <BaseButton onClick={props.onClick} {...props} />;
};

export default Button;
