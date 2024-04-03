import GameMap from "./GameMap.js";

class Game{

    constructor(parentElement, width = 10, height = 10){
        this._gameMap = new GameMap(parentElement, width, height) 
        this._gameMap.draw();
    }
}

export default Game