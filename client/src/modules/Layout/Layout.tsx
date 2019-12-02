import React, { FC, ReactChild } from 'react';
import { Container, Header, Sidebar, Body } from './Layout.styles';

interface Props {
    children: ReactChild;
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
