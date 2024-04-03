import ConvergentBoundary from "./MapEvents/ConvergentBoundary.js";

class GameEngine{

    constructor(gameMap){
        this._gameMap = gameMap;
        this._gameMap.addCurrentEvent(new ConvergentBoundary(0, 90))
    }
    
    step(){
        this._gameMap.stepThroughEvents()
    }
}

export default GameEngine