import React from "react";
// import styled from 'styled-components';

import "./app-header.css";

// Так работает styled-components, создаем переменную сразу со стилем
// const Header = styled.div`
//     display: flex;
//     align-items: flex-end;
//     justify-content: space-between;
//     h1 {
//         font-size: 26px;
//         color: ${props => props.colored ? 'red' : 'black'}
//         :hover {
//             color: blue;
//         }
//     }
//     h2 {
//         font-size: 1.2rem;
//         color: grey;
//     }
// `;
// Внизу, в return, вместо div'а пишем <Header>...</Header>

const AppHeader = () => {
    return (
        <div className="app-header d-flex">
            <h1>
                Andrei Kav
            </h1>
            <h2>
                5 posts, liked 0
            </h2>
        </div>
    )
}

export default AppHeader;