import {IGame} from "../Game";

export interface ICommand {
    do: () => void,
    undo: () => void
}

export class MoveUpCommand implements ICommand {
    game: IGame

    constructor(game: IGame) {
        this.game = game;
    }

    do() {
        this.game.moveSelectedTile(-1, 0)
    }

    undo() {
        this.game.moveSelectedTile(1, 0)
    }
}

export class MoveDownCommand implements ICommand {
    game: IGame

    constructor(game: IGame) {
        this.game = game;
    }

    do() {
        this.game.moveSelectedTile(1, 0)
    }

    undo() {
        this.game.moveSelectedTile(-1, 0)
    }
}

export class MoveRightCommand implements ICommand {
    game: IGame

    constructor(game: IGame) {
        this.game = game;
    }

    do() {
        this.game.moveSelectedTile(0, 1)
    }

    undo() {
        this.game.moveSelectedTile(0, -1)
    }
}

export class MoveLeftCommand implements ICommand {
    game: IGame

    constructor(game: IGame) {
        this.game = game;
    }

    do() {
        this.game.moveSelectedTile(0, -1)
    }

    undo() {
        this.game.moveSelectedTile(0, 1)
    }
}
