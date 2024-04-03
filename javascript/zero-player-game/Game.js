import GameMap from "./GameMap.js";
import GameEngine from "./GameEngine.js";

class Game{

    constructor(parentElement, width = 10, height = 10){
        this._paused = false;
        this._gameMap = new GameMap(parentElement, width, height) 
        this._gameEngine = new GameEngine();
        this.initialize()
        window.addEventListener("click", this.onClick.bind(this))
    }

    initialize(){
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(){
        if(this._gameMap.updated){
            this._gameMap.draw();
            window.requestAnimationFrame(this.gameLoop.bind(this))
        }
    }

    onClick(){
        //MAINLY FOR TESTING RIGHT NOW
        console.log("clicked")
        this._gameMap.generateCellTerrain();
        this.gameLoop()
    }
}

export default Game