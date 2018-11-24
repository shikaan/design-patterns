import React, {ReactNode} from "react";
import {ICommand} from "./KeyboardEventHandler/Command";

export interface ICommandManager {
    executeCommand: (command: ICommand) => void;
    save: (command: ICommand) => void,
    undo: () => void
}

interface ICommandManagerProps {
    children: (commandManager: ICommandManager, disableUndo: boolean) => ReactNode
}

interface ICommandManagerState {
    history: ICommand[]
}

// Invoker
export class CommandManager extends React.Component<ICommandManagerProps, ICommandManagerState> {
    state = {
        history: []
    }

    executeCommand = (command: ICommand) => {
        this.save(command)
        command.do()
    }

    save = (command: ICommand): void => {
        const {history} = this.state
        this.setState({history: [...history, command]})
    }

    undo = (): void => {
        const {history} = this.state
        const command = history.pop()

        if (command) {
            // @ts-ignore
            command.undo()
        }

        this.setState(({history}))
    }

    render() {
        const {save, undo, executeCommand} = this
        const commandManager: ICommandManager = {save, undo, executeCommand}

        return this.props.children(commandManager, !this.state.history.length)
    }
}
