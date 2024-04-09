class Utilities{
    static clamp(val, min, max){

        //Do a post about why this works if you can ever wrap your brain aroun this muggle magic
        return Math.max(Math.min(val, max), min);
    }

    static getDistanceBetweenXYPoints(x1, y1, x2, y2){
        const findDeltaAndSquare = (a, b) => Math.pow(Math.abs(a - b), 2)
        return Math.sqrt( findDeltaAndSquare(x1, x2) + findDeltaAndSquare(y1, y2) )
    }
}

export default Utilities