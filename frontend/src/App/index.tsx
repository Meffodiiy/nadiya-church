/* App */

import React, { useEffect, useState } from 'react'

import { RootContainer } from './styles'
import { EColors } from './types'


const App = () => {

  const [content, setContent] = useState<string>('')
  const [color, setColor] = useState<EColors>(EColors.BLUE)

  useEffect(() => {
    const loop = () => {
      fetch('/getPendingMessage')
        .then(response => response.json())
        .then(({ isNew, content }) => {
          if (isNew) {
            setContent(content)
            setColor(prevColor => getRandomColor(prevColor))
          }
          setTimeout(loop, 1000)
        })
    }
    setTimeout(loop, 0)
  }, [])

  return (
    <RootContainer backgroundColor={color}>
      { content }
    </RootContainer>
  )
}


export default App


const getRandomColor = (currentColor: EColors): EColors => {
  let colors = Object.values(EColors)
  colors = colors.filter(c => c !== currentColor)
  return colors[Math.floor(Math.random() * colors.length)]
}
