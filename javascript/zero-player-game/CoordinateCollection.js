class CoordinateCollection{

    constructor(collection = []){
        this._collection = collection;
    }

    setCoordinates(coordArray){
        this._collection = coordArray
    }

    addCoordinates(coords){
        this._collection.push(coords)
    }

    get collection(){ return this._collection }
    get mostRecent(){ return this._collection[this._collection.length - 1] }
}

export default CoordinateCollection