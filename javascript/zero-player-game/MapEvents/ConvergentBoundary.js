import CoordinateCollection from "../CoordinateCollection.js";
import Utilities from "../Utilities.js";

class ConvergentBoundary{

    constructor(x, y, majorAxisPull = .3, minorAxisPull = .7){
        this._x = x;
        this._y = y;
        this._path = new CoordinateCollection()
        this.mainAxis=[0, 0]
        this._majorAxisPull = majorAxisPull
        this._minorAxisPull = minorAxisPull
        this._directionInfluence = this.getPathDirectionInfluence(x, y)
        this.previousPathDelta;
        this.minorPathBuffer = 0;
        this._calculating = false;
    }

    set map(newMap){ 
        this._map = newMap 
        this.calculatePath();
    }

    get xPosInfluence(){ return this._directionInfluence[0] }
    get xNegInfluence(){ return this._directionInfluence[1] }
    get yPosInfluence(){ return this._directionInfluence[2] }
    get yNegInfluence(){ return this._directionInfluence[3] }
    get xPosChance(){ return this.xPosInfluence / (this.xPosInfluence + this.xNegInfluence) }
    get yPosChance(){ return this.yPosInfluence / (this.yPosInfluence + this.yNegInfluence) }
    get xDelta(){ return Math.random() < this.xPosChance ? 1 : -1 }
    get yDelta(){ return Math.random() < this.yPosChance ? 1 : -1 }
    get recentPathEntry(){ return this._path.mostRecent }
    get recentPathX(){ return this.recentPathEntry[0] }
    get recentPathY(){ return this.recentPathEntry[1] }
    get majorAxis(){ return this.mainAxis[0] != 0 ? 'x' : this.mainAxis[1] !=0 ? "y" : "none"}
    get path(){ return this._path.collection }
    get mapHeight(){ return this._map.mapHeight }
    get mapWidth(){ return this._map.mapWidth }

    coordsInRange(range){
        let normalizedRange = this.normalizeCoordsAlongX(range)
        let outArray = new CoordinateCollection()
        
        normalizedRange.forEach(coordRange =>{
            const bottomCoord = [coordRange[0], coordRange[2]]
            const topCoord = [coordRange[0], coordRange[1]]

            if(bottomCoord[0] == topCoord[0] && bottomCoord[1] == topCoord[1]){
                //just the values left and right of the coord withing the range
                for(let i=1; i<=range; i++){
                    const newY1 = Utilities.clamp(topCoord[1] + i, 0, this.mapHeight-1)
                    const newY2 = Utilities.clamp(topCoord[1] - i, 0, this.mapHeight-1)
                    console.log(coordRange[1])
                    outArray.push([coordRange[0], newY1])
                    outArray.push([coordRange[0], newY2])
                }
                
            } else {
                for(let i=1; i<range; i++){
                    let xRange = Math.sqrt(Math.pow(range,2) - Math.pow(i, 2))

                    //This next part gets the top and the bottom domes from the main axis
                    for(let r=0; r<xRange; r++){
                        const newTopX1 = Utilities.clamp(topCoord[0] - r, 0, this.mapWidth-1)
                        const newTopX2 = Utilities.clamp(topCoord[0] + r, 0, this.mapWidth-1)
                        const newTopY = Utilities.clamp(topCoord[1] - i, 0, this.mapHeight)

                        const newBottomX1 = Utilities.clamp(bottomCoord[0] - r, 0, this.mapWidth-1)
                        const newBottomX2 = Utilities.clamp(bottomCoord[0] + r, 0, this.mapWidth-1)
                        const newBottomY = Utilities.clamp(bottomCoord[1] + i, 0, this.mapHeight)
                        outArray.push([newTopX1, newTopY])
                        outArray.push([newTopX2, newTopY])
                        outArray.push([newBottomX1, newBottomY])
                        outArray.push([newBottomX2, newBottomY])
                    }
                }
            }
        })

        this._map.highlightCoordArray(outArray.collection, 300)
        
    }

    normalizeCoordsAlongX(range){
        let outArray = []
        this.path.forEach(coord => {
            let index = -1
            for(let i=0; i<outArray.length; i++){
                if(outArray[i][0] == coord[0]){
                    index = i;
                    break;
                }
            }

            if(index == -1){
                outArray.push([coord[0], coord[1], coord[1]])
            } else {
                let existing = outArray[index]
                if(coord[1] < existing[1]){existing [1] = coord[1]}
                if(coord[1] > existing[2]){existing[2] = coord[1]}
            }
        })
        return outArray
    }
    
    
    
    advancePath(){
        let ran = Math.random();
        let x = this.recentPathX;
        let y = this.recentPathY;

        //check if there is a movement buffer action to be taken, if so then just execute that
        if(this.minorPathBuffer > 0){
            x += this.mainAxis[0]
            y += this.mainAxis[1]
            this.minorPathBuffer--
        } else {
            //Find where the program wants to randomly move the piece
            if(Math.random() < this._directionInfluence[0] + this._directionInfluence[1] ){
                //Indicates a change in the x axis
                let delta = 0;
                if(this.mainAxis[0] != 0){
                    //This is a change on the x and it's the main axis so automatically advance
                    delta += this.mainAxis[0]
                    if(this.previousPathDelta[1] != 0){
                        this.minorPathBuffer+=1;
                    }
                } else {
                    //If it's not on the main axis 
                    //and the previous delta was also on the minor acess then repeat
                    if(this.previousPathDelta[0] != 0){
                        delta = this.previousPathDelta[0]
                    } else {
                        delta = this.xDelta
                    }
                }
                this.previousPathDelta = [delta, 0]
                x += delta
            } else {
                //Indicates a change in the y axis
                let delta = 0;
                if(this.mainAxis[1] != 0){
                    //This is a change on the y and it's the main axis so automatically advance
                    delta += this.mainAxis[1]
                    //If it's coming off the minor axis add a buffer
                    if(this.previousPathDelta[0] != 0){
                        this.minorPathBuffer+=1;
                    }
                } else {
                    //If it's not on the main axis 
                    //and the previous delta was also on the minor acess then repeat
                    if(this.previousPathDelta[1] != 0){
                        delta = this.previousPathDelta[1]
                    } else {
                        delta = this.yDelta
                    }
                }
                this.previousPathDelta = [0, delta]
                y += delta
            }
        }

        if(this.coordsAreInBounds(x, y)){
            this._path.addCoordinates([x, y])
        } else {
            this._calculating = false
        }
    }
    
    coordsAreInBounds(x, y){
        const xValid = (x >= 0 && x < this._map.mapWidth)
        const yValid = (y >= 0 && y < this._map.mapHeight)
        return (xValid && yValid)
    }

    getPathDirectionInfluence(x, y){
        if(x == 0){
            this.mainAxis = [1, 0];
            this.previousPathDelta = [1, 0];
            return [this._majorAxisPull, 0, this._minorAxisPull/2, this._minorAxisPull/2]
        } else if (y == 0){
            this.mainAxis = [0, 1]
            this.previousPathDelta = [0, 1];
            return [this._minorAxisPull/2, this._minorAxisPull/2, this._majorAxisPull,0]
        } else if (x == this._map.mapWidth){
            this.mainAxis = [-1, 0]
            this.previousPathDelta = [-1, 0];
            return [0, this._majorAxisPull, this._minorAxisPull/2, this._minorAxisPull/2]
        }else if (y == this._mapHeight){
            this.mainAxis = [0, -1]
            this.previousPathDelta = [0, -1];
            return [this._minorAxisPull/2, this._minorAxisPull/2, 0, this._majorAxisPull]
        }
    }

    calculatePath(){
        this._path.addCoordinates([this._x,this._y])
        this.advancePath()
        this._calculating = true;
        while(this._calculating){
            this.advancePath();
        }
        //this._map.cellsInRectangle(this._path.minX, this._path.maxX, this._path.minY, this._path.maxY).forEach(cell => cell.hue = 40)
        this.coordsInRange(4);
        this._map.highlightCoordArray(this._path.collection, 50);
    }

    step(){

    }
}

export default ConvergentBoundary