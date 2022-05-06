import React from 'react'
import { createRoot } from 'react-dom/client'

import Index from './App'
import GlobalStyle from './GlobalStyle'


const root = createRoot(document.getElementById('root'))
root.render(
  <>
    <Index/>
    <GlobalStyle/>
  </>
)
