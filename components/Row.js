import React from 'react'
import styled from "styled-components";

export const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: ${props => props.alignCenter ? 'space-around': 'space-between'};
  width: 80%;
`
