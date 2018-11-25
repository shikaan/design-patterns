import React, {ReactElement} from "react";
import {Tile} from "./Tile";

import './style.css'

interface IGrid {
    rows: number[][],
    selectedTile: number[],
    selectTile: (tile: number[]) => void
}

export class Grid extends React.Component<IGrid> {
    renderTile = (label: string, key: string, selectTile: () => void, isSelected: boolean): ReactElement<any> => {
        return (
            <Tile label={label} key={key} selectTile={selectTile} isSelected={isSelected}/>
        )
    }

    renderRow = (row: number[], rowIndex: number): ReactElement<any> => {
        const [selectedTileRow, selectedTileColumn] = this.props.selectedTile

        return (
            <div className="Row" key={rowIndex}>
                {
                    row.map((number, columnIndex) => {
                        const isSelected = selectedTileRow === rowIndex && selectedTileColumn === columnIndex
                        const key = `${rowIndex}-${columnIndex}`
                        const selectTile = () => this.props.selectTile([rowIndex, columnIndex])

                        return this.renderTile(String(number), key, selectTile, isSelected)
                    })
                }
            </div>
        )
    }

    render() {
        return (
            <div className="Grid">
                {this.props.rows.map(this.renderRow)}
            </div>
        )
    }
}
