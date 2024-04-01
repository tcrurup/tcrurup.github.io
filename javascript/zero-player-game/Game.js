import Cell from "./Cell.js";

class Game{

    constructor(parentElement, width = 10, height = 10){
        this.height = height;
        this.width = width;
        this.cells = this.#createCells(width, height)
        this.canvas = this.#createCanvas(parentElement);
        this.#draw();
    }

    #draw(){
        const CELL_SIZE_PIXELS = 10;
        this.canvas.height = this.height * CELL_SIZE_PIXELS;
        this.canvas.width = this.width * CELL_SIZE_PIXELS;
        let context = this.canvas.getContext("2d")
        console.log(this.cells)
        this.cells.forEach(row => row.forEach( cell => 
            cell.draw(context, CELL_SIZE_PIXELS) 
        ))
    }

    #createCanvas(parentElement){
        let canvas = document.createElement('canvas')
        parentElement.appendChild(canvas)
        return canvas
    }

    #createCells(width, height){
        let cells = []
        for(let y=0; y<height; y++){
            let row = []
            for(let x=0; x<width; x++){
                row.push(new Cell(x, y))
            }
            cells.push(row)
        }
        return cells
    }
}

export default Game