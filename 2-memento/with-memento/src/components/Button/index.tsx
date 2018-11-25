import React from 'react'
import classnames from 'classnames'
import './style.css'

export const Button: React.FunctionComponent<{ children: string, className?: string, disabled?: boolean, onClick: () => void, primary?: boolean }> =
    ({children, className, disabled, onClick, primary}) => {
        const classes = classnames('Button', {
            'Button--primary': primary
        })

        return (
            <button
                className={classes}
                onClick={onClick}
                disabled={disabled}>
                {children}
            </button>
        );
    }
