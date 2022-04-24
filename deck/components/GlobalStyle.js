const commonHeadingsStyle = {
  display: 'block',
  color: '#44843c',
  margin: '0',
  padding: '24px',
  width: '75%',
  textAlign: 'right'
}

export const GlobalStyle = {
    body: {
      height: 'calc(100% - 10vh)',
      textAlign: 'right'
    },
    p: {
      textAlign: 'right'
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