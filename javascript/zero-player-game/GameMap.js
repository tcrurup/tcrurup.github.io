import Cell from "./Cell.js";
import CellSelector from "./CellSelector.js";
import MapEvents from "./MapEvents/MapEvents.js";

class GameMap{

    constructor(parentElement, width, height){
        this._parentElement = parentElement;
        this._width = width;
        this._height = height;
        this._cells = this.createCells(width, height)
        this._canvas = this.createCanvas(parentElement);
        this._mapEvents = new MapEvents(this._cells); //Maybe get rid of this later on
        this._currentEvents = [];
        this.updated = false;
        this._canvas.height = this._height * this.pixelSize;
        this._canvas.width = this._width * this.pixelSize;
        this.generateCellTerrain();
    }

    get mapEvents(){ return this._mapEvents }
    get cellCollection(){ return [...this._cells] }
    get mapWidth(){ return this._width }
    get mapHeight(){ return this._height }
    get pixelSize(){ return 4 } 

    addCurrentEvent(event){
        event.map = this
        this._currentEvents.push(event)
    }

    stepThroughEvents(){
        this._currentEvents.forEach(event => event.step())
    }

    highlightCoordArray(array){
        array.forEach( coordSet => this.getCellAt(coordSet[0], coordSet[1]).hue = 10 )
    }

    draw(){
        let context = this._canvas.getContext("2d")
        this._cells.filter(cell => cell.hasUpdated ).forEach( cell => cell.draw(context, this.pixelSize) )
        this.updated = false
    }

    generateCellTerrain(){
        for(let i=0; i< 10; i++){
            let y = Math.floor( Math.random() * (this._height - 1) )
            let x = Math.floor( Math.random() * (this._width - 1) )
            this._mapEvents.createAsteroidImpact(x, y, 10, -2)
        }
        this.updated = true;
    }

    createCanvas(parentElement){
        let canvas = document.createElement('canvas')
        parentElement.appendChild(canvas)
        return canvas
    }

    createCells(width, height){
        let cells = []
        for(let y=0; y<height; y++){
            for(let x=0; x<width; x++){
                cells.push(new Cell(x, y))
            }
        }
        return cells
    }

    getCellAt(x, y){
        return this._cells.find( cell => cell.x == x && cell.y ==y)
    }
}
export default GameMap