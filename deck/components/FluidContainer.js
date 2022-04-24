import styled from "styled-components";
import { isPortrait } from "../helpers";

export const FluidContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${() => isPortrait() ? 'column' : 'row'};
  justify-content: space-around;
  width: 100%;
  height: 100%;
`
