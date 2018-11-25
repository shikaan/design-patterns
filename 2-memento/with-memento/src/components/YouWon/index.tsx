import React from 'react'
import './style.css'
import {Heading} from "../Heading";

export const YouWon: React.FunctionComponent =
    () => (
        <div className="YouWon">
            <Heading level={3}>You won!</Heading>
            <img className="YouWon-Gif"
                 alt="Winning gif"
                 src="https://media.giphy.com/media/l3q2BXqLMnzhVF720/giphy.gif"/>
        </div>
    )
