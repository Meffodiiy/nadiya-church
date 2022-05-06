import React, { useState, useEffect } from 'react'


const App = () => {

  const [content, setContent] = useState('')

  useEffect(() => {
    const loop = () => {
      fetch('/getPendingMessage')
        .then(response => response.json())
        .then(({ isNew, content }) => {
          if (isNew)
            setContent(content)
          setTimeout(loop, 1000)
        })
    }
    setTimeout(loop, 0)
  }, [])

  return (
    <h1>
      { content }
    </h1>
  )
}

export default App
