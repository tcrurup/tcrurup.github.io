import ConvergentBoundary from "./MapEvents/ConvergentBoundary.js";

class GameEngine{

    constructor(gameMap){
        this._gameMap = gameMap;
        this._gameMap.addCurrentEvent(new ConvergentBoundary(0, 90))
    }
    
    step(){
        console.log("stepping through engine")
        this._gameMap.stepThroughEvents()
        this._gameMap.stepThroughCells()
    }
}

export default GameEngine