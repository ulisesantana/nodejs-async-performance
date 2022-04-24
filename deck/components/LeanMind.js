import React from "react";
import styled from "styled-components";
import isotype from "../assets/images/leanmind-isotipo.svg";
import anagram from "../assets/images/leanmind-anagrama.svg";

const LogoStyle = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: ${props => props.size};
  z-index: 1;

  .isotype {
    width: calc(${props => props.size} * 0.4);
  }

  .anagram {
    padding-top: calc(${props => props.size} * 0.083333);
    width: calc(${props => props.size} * 0.55);
  }
`;

export const LeanMind = ({size = '300px'}) => (
  <LogoStyle size={size}>
    <img
      className="isotype"
      src={isotype}
      alt="Lean Mind Isotype"
    />
    <img
      className="anagram"
      src={anagram}
      alt="Lean Mind Anagram"
    />
  </LogoStyle>
);

export const LeanMindFixedBottom = React.memo(() => (
  <div
    style={{
      bottom: "16px",
      position: "absolute",
      left: "24px",
    }}
  >
    <LeanMind size="20vh" />
  </div>
));
