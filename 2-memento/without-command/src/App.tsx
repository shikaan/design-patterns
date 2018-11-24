import React from 'react';
import {Button, Grid, Header, Heading, Section, YouWon} from "./components";
import {Game, ISnapshot} from "./containers/Game";
import {KeyboardEventHandler} from "./containers/KeyboardEventHandler";

const renderGameChildren = (
    rows: number[][],
    selectedTile: number[],
    isWinning: boolean,
    selectTile: (tile: number[]) => void,
    moveSelectedTile: (y: number, x: number) => void,
    takeSnapshot: () => ISnapshot,
    restoreSnapshot: (snapshot: ISnapshot) => void
) => {
    if (isWinning) {
        return <YouWon/>
    }

    return (
        <KeyboardEventHandler
            takeSnapshot={takeSnapshot}
            restoreSnapshot={restoreSnapshot}
            moveSelectedTile={moveSelectedTile}>
            {renderKeyboardEventHandlerChildren(rows, selectedTile, isWinning, selectTile)}
        </KeyboardEventHandler>
    )
}

const renderKeyboardEventHandlerChildren = (
    rows: number[][],
    selectedTile: number[],
    isWinning: boolean,
    selectTile: (tile: number[]) => void
) => (undo: () => void, disableUndo: boolean) => (
    <React.Fragment>
        <Grid rows={rows} selectedTile={selectedTile} selectTile={selectTile}/>
        <Button primary onClick={undo} disabled={disableUndo}>Undo</Button>
    </React.Fragment>
)

const App = () => {
    return (
        <Section>
            <Header>
                <Heading level={1}>Sort the tiles</Heading>
                <Heading level={2}>Click on a cell and use keyboard arrows to move the tiles</Heading>
            </Header>
            <Game>{renderGameChildren}</Game>
        </Section>
    )
}


export default App;
