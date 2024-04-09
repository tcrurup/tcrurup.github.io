import Cell from "./Cell.js";
import CellSelector from "./CellSelector.js";
import CoordinateCollection from "./CoordinateCollection.js";
import MapEvents from "./MapEvents/MapEvents.js";

class GameMap{

    constructor(parentElement, coordinateCollection){
        this._parentElement = parentElement;
        this._coordinateCollection = coordinateCollection;
        this._canvas = this.createCanvas(parentElement);
        this._mapEvents = new MapEvents(this._coordinateCollection); //Maybe get rid of this later on
        this._cellsToUpdate = [];
        this._currentEvents = [];
        this.updated = false;
        this._canvas.height = this.mapHeight * this.pixelSize;
        this._canvas.width = this.mapWidth * this.pixelSize;
        //this.generateCellTerrain();
    }

    get mapEvents(){ return this._mapEvents }
    get cellCollection(){ return [...this._cells] }
    get mapWidth(){ return this._coordinateCollection.width }
    get mapHeight(){ return this._coordinateCollection.height }
    get pixelSize(){ return 4 } 

    addCurrentEvent(event){
        event.map = this
        this._currentEvents.push(event)
    }

    stepThroughEvents(){
        this._currentEvents.forEach(event => event.step())
    }

    highlightCoordArray(array, hue){
        array.forEach( coordSet => {
            try {
                this.getCellAt(coordSet[0], coordSet[1]).hue = hue
            } catch(error){
                console.log(`Can't find cell to highlight at ${coordSet[0]}, ${coordSet[1]}`)
            }
        })
    }

    draw(cell){
        let context = this._canvas.getContext("2d")
        cell.draw(context, this.pixelSize)
    }

    generateCellTerrain(){
        for(let i=0; i< 10; i++){
            let y = Math.floor( Math.random() * (this._height - 1) )
            let x = Math.floor( Math.random() * (this._width - 1) )
            this._mapEvents.createAsteroidImpact(x, y, 10, -2)
        }
        this.updated = true;
    }

    cellsInRectangle(minX, maxX, minY, maxY){
        return this._cells.filter(cell => { return cell.x >= minX && cell.x <= maxX && cell.y >= minY && cell.y <= maxY })
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
        return new CoordinateCollection(cells)
    }

    stepThroughCells(){
        this._coordinateCollection.filter(cell => cell.hasUpdated == true).forEach(cell => cell.step())
    }

    getCellsWithinRadius(x, y, radius){
        return CellSelector.circle(this._coordinateCollection, x, y, radius)
    }

    getCellAt(x, y){
        return this._cells._collection.find( cell => cell.x == x && cell.y ==y)
    }
}
export default GameMap