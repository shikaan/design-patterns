import React, {ReactNode} from 'react';
import deepEqual from 'deep-equal';

import {ISnapshot} from "./Game";

// Caretaker
interface IKeyboardEventHandler<T> {
    takeSnapshot: () => T,
    restoreSnapshot: (snapshot: T) => void,
    moveSelectedTile: (y: number, x: number) => void,
    children: (undo: () => void, disableUndo: boolean) => ReactNode
}

export class KeyboardEventHandler extends React.Component<IKeyboardEventHandler<ISnapshot>> {
    static ARROW_EVENT_KEY = {
        UP: 'ArrowUp',
        DOWN: 'ArrowDown',
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight'
    }

    state = {
        history: []
    }

    handleKeyDown = (event: KeyboardEvent): void => {
        this.save()

        switch (event.key) {
            case KeyboardEventHandler.ARROW_EVENT_KEY.UP:
                return this.props.moveSelectedTile(-1, 0)
            case KeyboardEventHandler.ARROW_EVENT_KEY.DOWN:
                return this.props.moveSelectedTile(1, 0)
            case KeyboardEventHandler.ARROW_EVENT_KEY.RIGHT:
                return this.props.moveSelectedTile(0, 1)
            case KeyboardEventHandler.ARROW_EVENT_KEY.LEFT:
                return this.props.moveSelectedTile(0, -1)
            default:
                return
        }
    }

    save = (): void => {
        console.log('save')

        const {history} = this.state
        const entry = this.props.takeSnapshot()

        const lastHistoryEntry: ISnapshot = history[history.length - 1]

        // TODO: prevent dummy history entry in case of no-action movement as first event
        if (lastHistoryEntry) {
            const lastHistoryEntryState = lastHistoryEntry.getState()
            const currentEntryState = entry.getState()

            if (!deepEqual(lastHistoryEntryState.rows, currentEntryState.rows)) {
                this.setState({history: [...history, entry]})
            }
        } else {
            this.setState({history: [...history, entry]})
        }
    }

    undo = (): void => {
        const {history} = this.state
        const lastHistoryEntry = history.pop()

        if (lastHistoryEntry) {
            this.props.restoreSnapshot(lastHistoryEntry)
            this.setState({history})
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown)
    }

    render() {
        return this.props.children(this.undo, !this.state.history.length)
    }
}
