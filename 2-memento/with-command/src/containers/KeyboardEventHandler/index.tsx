import React from 'react';
import {IGame} from "../Game";
import {ICommandManager} from '../CommandManager';
import {ICommand, MoveUpCommand, MoveDownCommand, MoveRightCommand, MoveLeftCommand} from './Command';

// Client
interface IKeyboardEventHandlerProps {
    game: IGame,
    commandManager: ICommandManager,
}

export class KeyboardEventHandler extends React.Component<IKeyboardEventHandlerProps> {
    static ARROW_EVENT_KEY = {
        UP: 'ArrowUp',
        DOWN: 'ArrowDown',
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight'
    }

    createCommand = (event: KeyboardEvent): ICommand => {
        const {game} = this.props

        switch (event.key) {
            case KeyboardEventHandler.ARROW_EVENT_KEY.UP:
                return new MoveUpCommand(game)
            case KeyboardEventHandler.ARROW_EVENT_KEY.DOWN:
                return new MoveDownCommand(game)
            case KeyboardEventHandler.ARROW_EVENT_KEY.RIGHT:
                return new MoveRightCommand(game)
            case KeyboardEventHandler.ARROW_EVENT_KEY.LEFT:
            default:
                return new MoveLeftCommand(game)
        }
    }

    handleKeyDown = (event: KeyboardEvent): void => {
        const command = this.createCommand(event)
        this.props.commandManager.executeCommand(command)
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown)
    }

    render() {
        return null
    }
}
