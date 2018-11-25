import React, {ReactNode} from 'react'
import deepCopy from 'deep-copy'
import {shuffle, chunk} from '../utils'
import deepEqual from 'deep-equal'

// Receiver
interface IGameProps {
    children: (
        rows: number[][],
        selectedTile: number[],
        isWinning: boolean,
        game: IGame
    ) => ReactNode
}

export interface IGame {
    selectTile: (tile: number[]) => void
    moveSelectedTile: (y: number, x: number) => void
}

export class Game extends React.Component<IGameProps> implements IGame {
    static ALL_TILES = [1, 2, 3, 4, 5, 6, 7, 8, 0]
    static WINNING_COMBINATION = chunk(Game.ALL_TILES, 3)

    state = {
        rows: chunk(shuffle(Game.ALL_TILES), 3),
        selectedTile: [0, 0],
        isWinning: false
    }

    moveSelectedTile = (y: number, x: number): void => {
        const {selectedTile, rows} = this.state
        const [selectedTileY, selectedTileX] = selectedTile

        const [newSelectedTileY, newSelectedTileX] = [selectedTileY + y, selectedTileX + x]

        const isYWithinBoundaries = newSelectedTileY >= 0 && newSelectedTileY < rows.length
        const isXWithinBoundaries = newSelectedTileX >= 0 && newSelectedTileX < rows[0].length
        const isNextPositionReplaceable = rows[newSelectedTileY] && rows[newSelectedTileY][newSelectedTileX] === 0

        if (isYWithinBoundaries && isXWithinBoundaries && isNextPositionReplaceable) {
            const newRows: number[][] = deepCopy(rows)

            const aux = rows[newSelectedTileY][newSelectedTileX]
            newRows[newSelectedTileY][newSelectedTileX] = rows[selectedTileY][selectedTileX]
            newRows[selectedTileY][selectedTileX] = aux

            const isWinning = deepEqual(newRows, Game.WINNING_COMBINATION)

            this.setState({rows: newRows, selectedTile: [newSelectedTileY, newSelectedTileX], isWinning})
        }
    }

    selectTile = (tile: number[]): void => {
        const [tileY, tileX] = tile

        // Don't select tile 0
        if (this.state.rows[tileY][tileX] !== 0)
            this.setState({selectedTile: tile})
    }

    render() {
        const {rows, selectedTile, isWinning} = this.state
        const {selectTile, moveSelectedTile} = this
        const game: IGame = {selectTile, moveSelectedTile}

        return this.props.children(rows, selectedTile, isWinning, game)
    }
}
