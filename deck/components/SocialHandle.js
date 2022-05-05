import React from 'react'
import styled from "styled-components";

const SocialHandleStyle = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    padding-bottom: 36px;
    width: 100%;
    z-index: 1;

    .social-handle {
        display: inline-block;
        color: #0e717f;
        font-size: 2rem;
    }
`

export const SocialHandle = React.memo(() => (
    <SocialHandleStyle size="10vh">
        <span className='social-handle'>@ulisesantana</span>
    </SocialHandleStyle>
))
