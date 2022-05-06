import React, { useState, useEffect, useRef } from 'react'


const App = () => {

  const [content, setContent] = useState('')

  const longPollingIsOn = useRef(false)

  useEffect(() => {
    if (longPollingIsOn.current) return
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
    longPollingIsOn.current = true
  }, [])

  return (
    <h1>
      { content }
    </h1>
  )
}

export default App
