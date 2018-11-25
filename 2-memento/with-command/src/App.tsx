import React from 'react';
import {Button, Grid, Header, Heading, Section, YouWon} from "./components";
import {Game, IGame} from "./containers/Game";
import {KeyboardEventHandler} from "./containers/KeyboardEventHandler";
import {CommandManager, ICommandManager} from "./containers/CommandManager";

const renderGameChildren = (
    rows: number[][],
    selectedTile: number[],
    isWinning: boolean,
    game: IGame
) => {
    if (isWinning) {
        return <YouWon/>
    }

    return (
        <CommandManager>
            {renderCommandManagerChildren(rows, selectedTile, isWinning, game)}
        </CommandManager>
    )
}

const renderCommandManagerChildren = (
    rows: number[][],
    selectedTile: number[],
    isWinning: boolean,
    game: IGame
) => (commandManager: ICommandManager, disableUndo: boolean) => (
    <React.Fragment>
        <Grid rows={rows} selectedTile={selectedTile} selectTile={game.selectTile}/>
        <Button primary onClick={commandManager.undo} disabled={disableUndo}>Undo</Button>

        <KeyboardEventHandler commandManager={commandManager} game={game}/>
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
