import React from 'react'

export const ProfileImage = ({src, alt, size = '100%'}) => (
  <img
    src={src}
    alt={alt}
    style={{borderRadius: '50%', width: size, height: size}}
  />
)
