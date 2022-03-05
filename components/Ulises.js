import React from 'react'
import styled from "styled-components";
import isotype from '../assets/ulisesantana.webp'

const UlisesStyle = styled.div`
    align-items: center;
    bottom: 16px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 24px;
    z-index: 1;

    .logo {
        height: 100px;
    }
`

export const Ulises = React.memo(() => (
    <UlisesStyle>
        <img className="logo" src={isotype} alt="ulisesantana.dev" />
    </UlisesStyle>
))
