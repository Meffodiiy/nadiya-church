/* App */

import { ReactNode } from 'react'

enum EColors {
  PURPLE = '#c56cf0',
  PINK = '#ffb8b8',
  RED = '#ff3838',
  ORANGE = '#ff9f1a',
  YELLOW = '#fff200',
  GREEN = '#32ff7e',
  BLUE = '#18dcff'
}

interface IPropsWithChildren {
  children: ReactNode
}

interface IAppStyledProps extends IPropsWithChildren {
  backgroundColor: EColors
}


export {
  EColors,
  IAppStyledProps
}
