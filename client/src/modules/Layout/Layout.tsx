import React, { FC, ReactNode } from 'react';
import { Container, Header, Sidebar, Body } from './Layout.styles';

interface Props {
    children: ReactNode[];
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <Container>
            <Header>Header</Header>
            <Sidebar>Sidebar</Sidebar>
            <Body>{children}</Body>
        </Container>
    );
};

export default Layout;
