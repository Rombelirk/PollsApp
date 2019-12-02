import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-areas:
        'header header header'
        'sidebar body body';
    grid-template-rows: 60px auto;
    grid-template-columns: 20% 1fr;
    height: 100vh;
`;
export const Header = styled.div`
    grid-area: header;
    background-color: red;
`;

export const Sidebar = styled.div`
    grid-area: sidebar;
    background-color: blue;
`;

export const Body = styled.div`
    grid-area: body;
`;
