import React, {ReactNode} from 'react'

export const Header: React.FunctionComponent<{ children: ReactNode }> =
    ({children}) => <header className="Header">{children}</header>
