import CoordinateCollection from "../CoordinateCollection.js";
import Utilities from "../Utilities.js";
import MapEvent from "./MapEvent.js";

class ConvergentBoundary extends MapEvent{

    constructor(x, y, majorAxisPull = .3, minorAxisPull = .7){
        super()
        this._x = x;
        this._y = y;
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

    get eastInfluence(){ return this._directionInfluence[0] }
    get westInfluence(){ return this._directionInfluence[1] }
    get southInfluence(){ return this._directionInfluence[2] }
    get northInfluence(){ return this._directionInfluence[3] }
    get eastChance(){ return this.eastInfluence / (this.eastInfluence + this.westInfluence) }
    get southChance(){ return this.southInfluence / (this.northInfluence + this.southInfluence) }
    get xDelta(){ return Math.random() < this.eastChance ? 1 : -1 }
    get yDelta(){ return Math.random() < this.southChance ? 1 : -1 }
    get recentPathX(){ return this.mostRecent[0] }
    get recentPathY(){ return this.mostRecent[1] }
    get majorAxis(){ return this.mainAxis[0] != 0 ? 'x' : this.mainAxis[1] !=0 ? "y" : "none"}
    get path(){ return this.collection }
    get mapHeight(){ return this._map.mapHeight }
    get mapWidth(){ return this._map.mapWidth }

    coordsInRange(range){
        this.collection.forEach(xyPair => {    
            this._map.getCellsWithinRadius(xyPair[0], xyPair[1], range).forEach(cell => cell.changeHeight(50, 1))
        })   
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
    
    advancePathAlongMainAxis(){
        this.addCoordinates([this.recentPathX + this.mainAxis[0], this.recentPathY + this.mainAxis[1]])
    }
    
    advancePath(){
        let ran = Math.random();
        let x = this.recentPathX;
        let y = this.recentPathY;

        //check if there is a movement buffer action to be taken, if so then just execute that
        if(this.minorPathBuffer > 0){
            this.advancePathAlongMainAxis(x, y)
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
            this.addCoordinates([x, y])
            //Get the cells and set a new target height

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
        this.addCoordinates([this._x,this._y])
        this.advancePath()
        this._calculating = true;
        while(this._calculating){
            this.advancePath();
        }
        this.coordsInRange(4);
        this._map.updated = true;
    }

    step(){
        
    }
}

export default ConvergentBoundary