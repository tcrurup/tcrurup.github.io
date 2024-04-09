import Cell from "./Cell.js";

class CoordinateCollection{

    constructor(collection = [], width, height){
        this._collection = collection;
        this._width = width;
        this._height = height;
    }

    get height(){return this._height}
    get width(){return this._width}

    static create2DCollection(width, height){
        let cells = []
        for(let y=0; y<height; y++){
            for(let x=0; x<width; x++){
                cells.push(new Cell(x, y))
            }
        }
        return new CoordinateCollection(cells, width, height)
    }

    setCoordinates(coordArray){ this._collection = coordArray }
    addCoordinates(coords){ this.push(coords) }
    get updatedCells(){ return this._collection.filter( cell => cell.hasUpdated )}

    push(newCoords){
        const existing = this._collection.filter(coord => coord[0] == newCoords[0]).find(matchedXCoords => matchedXCoords[1] == newCoords[1])
        if(existing == undefined){
            this._collection.push(newCoords)
        }
    }

    filter(criteria){
        return this._collection.filter(criteria)
    }
    
    get collection(){ return this._collection }
    get mostRecent(){ return this._collection[this._collection.length - 1] }
    get firstEntry(){ return this._collection[0] }
    
    get minX(){ 
        let min = this.firstEntry[0]
        this.collection.forEach(coord => coord[0] < min ? min = coord[0] : null)
        return min
    }
    get maxX(){ 
        let max = this.firstEntry[0]
        this.collection.forEach(coord => coord[0] > max ? max = coord[0]: null)
        return max
    }
    get minY(){
        let min = this.firstEntry[1]
        this.collection.forEach(coord => coord[1] < min ? min = coord[1]: null)
        return min
    }
    get maxY(){ 
        let max = this.firstEntry[1]
        this.collection.forEach(coord => coord[1] > max ? max = coord[1]: null)
        return max
    }

    
}

export default CoordinateCollection