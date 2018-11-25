import React, {ReactElement} from "react";
import classnames from "classnames";

import {Heading} from '../Heading'

import './Tile.css'

export const Tile: React.FunctionComponent<{ label: string, selectTile: () => void, isSelected: boolean }> = ({label, selectTile, isSelected}): ReactElement<any> => {
    const className = classnames("Tile", {
        "Tile--transparent": !label || label === "0",
        "Tile--selected": isSelected
    })

    return (
        <div className={className} onClick={selectTile}>
            <Heading className="Tile-Label" level={3}>{label}</Heading>
        </div>
    )
}
