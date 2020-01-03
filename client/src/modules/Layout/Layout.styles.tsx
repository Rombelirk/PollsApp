import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-areas:
        'header header header'
        'sidebar body body';
    grid-template-rows: 60px auto;
    grid-template-columns: 200px 1fr;
    height: 100vh;
`;
export const Header = styled.div`
    grid-area: header;
    background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
`;

export const Sidebar = styled.div`
    grid-area: sidebar;
    background: linear-gradient(to bottom, #323232 0%, #3f3f3f 40%, #1c1c1c 150%),
        linear-gradient(to top, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.25) 200%);
    background-blend-mode: multiply;
    color: white;
`;

export const Body = styled.div`
    grid-area: body;
`;
