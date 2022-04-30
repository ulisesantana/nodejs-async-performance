import React from 'react'
import {CodeSurfer} from "code-surfer";

const theme = {
  colors: {
    background: "transparent",
    text: "#333",
    primary: "#4876d6"
  },
  styles: {
    CodeSurfer: {
      pre: {
        color: "text",
        backgroundColor: "background"
      },
      code: {
        color: "text",
        backgroundColor: "background"
      },
      tokens: {
        "comment cdata doctype": {
          fontStyle: "italic"
        },
        "builtin changed keyword punctuation operator tag deleted string attr-value char number inserted": {
          color: "primary"
        },
        "line-number": {
          opacity: 0.8
        }
      },
      title: {
        backgroundColor: "background",
        color: "text"
      },
      subtitle: {
        color: "#d6deeb",
        backgroundColor: "rgba(10,10,10,0.9)"
      },
      unfocused: {
        // only the opacity of unfocused code can be changed
        opacity: 0.1
      }
    }
  }
};

export const Code = ({children}) => (
  <CodeSurfer theme={theme}>

    {children}

  </CodeSurfer>  
)