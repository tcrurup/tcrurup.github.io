import Cell from "./Cell.js";
import CellSelector from "./CellSelector.js";

class GameMap{

    constructor(parentElement, width, height){
        this._parentElement = parentElement;
        this._width = width;
        this._height = height;
        this._cells = this.createCells(width, height)
        this._canvas = this.#createCanvas(parentElement);
        this.generateCellTerrain();
    }

    draw(){
        const CELL_SIZE_PIXELS = 10;
        this._canvas.height = this._height * CELL_SIZE_PIXELS;
        this._canvas.width = this._width * CELL_SIZE_PIXELS;
        let context = this._canvas.getContext("2d")
        this._cells.forEach( cell => cell.draw(context, CELL_SIZE_PIXELS) )
    }

    generateCellTerrain(){
        for(let i=0; i< 100; i++){
            let y = Math.floor( Math.random() * (this._height - 1) )
            let x = Math.floor( Math.random() * (this._width - 1) )
            this.createMeteorImpact(x, y, 10, -5)
        }
    }

    createMeteorImpact(x, y, radius, magnitude){
        CellSelector.circle(this._cells, x, y, radius).forEach(cell => cell.changeHeight(magnitude))
    }

    #createCanvas(parentElement){
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
}
export default GameMap