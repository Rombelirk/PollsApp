import React, { FC, ReactNode } from 'react';
import { Container, Card } from './Popup.styles';

interface Props {
    show: boolean;
    children: ReactNode;
}

const Popup: FC<Props> = ({ show, children }) => {
    return <Container>
        <Card>
            {children}
        </Card>
    </Container>
};

export default Popup;
