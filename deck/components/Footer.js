import React from "react";
import { LeanMindFixedBottom } from "./LeanMind.js";
import { Ulises } from "./Ulises.js";
import { SocialHandle } from "./SocialHandle";

export const Footer = React.memo(() => (
  <div>
    <LeanMindFixedBottom />

    <SocialHandle />

    <Ulises />
  </div>
));
