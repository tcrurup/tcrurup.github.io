import GameMap from "./GameMap.js";
import ConvergentBoundary from "./MapEvents/ConvergentBoundary.js";
import CoordinateCollection from "./CoordinateCollection.js";
import Cell from "./Cell.js";

class Game{

    constructor(parentElement, width = 10, height = 10){
        this._paused = false;
        this._gameCellCollection = CoordinateCollection.create2DCollection(width, height)
        this._gameMap = new GameMap(parentElement, this._gameCellCollection) 
        this._gameEvents = []  
        this._updated = false;     
        this._framesPassed = 0; 
        this.initialize()
    }

    initialize(){
        this.addGameEvent(new ConvergentBoundary(0, 90, 10))
        this.drawMap()
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    addGameEvent(newEvent){
        newEvent.map = this._gameMap
        this._gameMap.updated = true;
        this._gameEvents.push(newEvent)
        this._updated = true
    }

    stepThroughEvents(){ this._gameEvents.forEach(event => event.step() ) }
    stepThroughCells(){ this._gameCellCollection.filter(cell => cell.hasUpdated == true).forEach(cell => cell.step()) }

    gameLoop(){
        if(this._updated){
            this.stepThroughEvents()
            this.stepThroughCells()
            this.drawMap()
        }
        this._framesPassed++;
        window.requestAnimationFrame(this.gameLoop.bind(this))
    }

    drawMap(){
        const updatedCells = this._gameCellCollection.updatedCells;
        if(updatedCells.length == 0){
            this._updated = false
        } else {
            updatedCells.forEach( cell => this._gameMap.draw(cell) )
        }
    }
}

export default Game