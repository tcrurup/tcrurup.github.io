class CoordinateCollection{

    constructor(collection = []){
        this._collection = collection;
    }

    setCoordinates(coordArray){ this._collection = coordArray }
    addCoordinates(coords){ this.push(coords) }

    push(newCoords){
        const existing = this._collection.filter(coord => coord[0] == newCoords[0]).find(matchedXCoords => matchedXCoords[1] == newCoords[1])
        if(existing == undefined){
            this._collection.push(newCoords)
        }
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