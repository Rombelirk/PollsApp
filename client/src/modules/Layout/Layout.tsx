import React, { FC, ReactChild } from 'react';
import { Container, Header, Sidebar, Body } from './Layout.styles';
import Button from '../../atoms/Button/Button'
import { withRouter, RouteComponentProps } from 'react-router'

interface Props extends RouteComponentProps {
    children: ReactChild;
}

const Layout: FC<Props> = ({ children, history }) => {
    const logout = () => {
        localStorage.setItem("jwtToken", "");
        history.push('/auth')
    }
    return (
        <Container>
            <Header><Button onClick={logout}>Log out</Button></Header>
            <Sidebar>Sidebar</Sidebar>
            <Body>{children}</Body>
        </Container>
    );
};

export default withRouter(Layout);
