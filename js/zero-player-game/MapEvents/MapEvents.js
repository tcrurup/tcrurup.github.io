import CellSelector from "../CellSelector.js"

class MapEvents{

    constructor(cellCollection){
        this._cellCollection = cellCollection
    }

    createAsteroidImpact(x, y, radius, magnitude){
        CellSelector.circle(this._cellCollection.collection, x, y, radius).forEach(cell => cell.changeHeight(magnitude))
    }
    
}

export default MapEvents