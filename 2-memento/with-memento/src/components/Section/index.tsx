import React, {ReactNode} from 'react'
import './style.css'

export const Section: React.FunctionComponent<{ children: ReactNode }> =
    ({children}) => <section className="Section">{children}</section>
