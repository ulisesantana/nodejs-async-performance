import React from "react";
import { LeanMindFixedBottom } from "./LeanMind.js";
import { Ulises } from "./Ulises.js";

export const Footer = React.memo(() => (
  <div>
    <LeanMindFixedBottom />
    <Ulises />
  </div>
));
