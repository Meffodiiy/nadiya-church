/* App */

import React from 'react'
import styled from 'styled-components'

import { IAppStyledProps } from './types'


const RootContainer: React.FC<IAppStyledProps> = styled.div<IAppStyledProps>`
  width: 100vw;
  height: 100vh;
  padding: 0 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-size: 8rem;
  font-weight: bold;
  text-shadow: 6px 5px #656565;
  text-align: center;

  background-color: ${({ backgroundColor }) => backgroundColor};

  transition: background-color .3s ease-out 0s;
`


export {
  RootContainer
}
