const commonHeadingsStyle = {
  color: '#44843c',
  margin: '0',
  padding: '24px 0',
  textAlign: 'center'
}

export const GlobalStyle = {
    Slide: {
      background: 'white',
      color: '#333',
      height: 'calc(100% - 10vh)',
      padding: '24px',
      width: 'calc(100% - 20vw)',
    },
    p: {
      textAlign: 'center'
    },
    h1: {
      ...commonHeadingsStyle
    },
    h2: {
      ...commonHeadingsStyle
    },
    h3: {
      ...commonHeadingsStyle
    },
    h4: {
      ...commonHeadingsStyle
    },
    h5: {
      ...commonHeadingsStyle
    },
    h6: {
      ...commonHeadingsStyle
    }
}