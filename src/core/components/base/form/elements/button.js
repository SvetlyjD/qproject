import React from 'react'
import { Button as ButtonLib } from '@ui-kitten/components'

export function Button({ element }) {
  const { render, title } = element
  const content = render
    ? typeof render === 'function'
      ? render()
      : render
    : title
    ? typeof title === 'function'
      ? title()
      : title
    : ''
  return <ButtonLib {...element}>{content}</ButtonLib>
}

export default Button
