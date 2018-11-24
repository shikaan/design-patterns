import React from 'react'
import classnames from 'classnames'

import './style.css'

export const Heading: React.FunctionComponent<{ children: string, level: number, className?: string }> =
    ({children, level, className}) => {
        const classes = classnames('Heading', {
            'Heading--h1': level === 1,
            'Heading--h2': level === 2,
            'Heading--h3': level === 3,
        }, className)

        return React.createElement(`h${level}`, {className: classes, children})
    }
