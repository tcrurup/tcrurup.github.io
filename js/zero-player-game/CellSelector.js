class CellSelector{

    static getDistanceBetweenXYPoints(x1, y1, x2, y2){
        const findDeltaAndSquare = (a, b) => Math.pow(Math.abs(a - b), 2)
        return Math.sqrt( findDeltaAndSquare(x1, x2) + findDeltaAndSquare(y1, y2) )
    }

    static circle(cellCollection, x, y, radius){
        return cellCollection.filter(cell => CellSelector.getDistanceBetweenXYPoints(x, y, cell.x, cell.y) < radius)
    }
}

export default CellSelector