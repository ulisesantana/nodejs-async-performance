import React from 'react'
import styled from "styled-components";
import isotype from '../assets/images/ulisesantana.webp'

const UlisesStyle = styled.div`
    align-items: center;
    bottom: 24px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 24px;
    z-index: 1;

    .logo {
        height: ${props => props.size};
    }
`

export const Ulises = React.memo(() => (
    <UlisesStyle size="10vh">
        <img 
            className="logo" 
            src={isotype} 
            alt="ulisesantana.dev" 
        />
    </UlisesStyle>
))
