class ConvergentBoundary{

    constructor(x, y, majorAxisPull = .4, minorAxisPull = .6){
        this._x = x;
        this._y = y;
        this._path = [];
        this.majorAxis;
        this.mainAxis=[0, 0]
        this._majorAxisPull = majorAxisPull
        this._minorAxisPull = minorAxisPull
        this._directionInfluence = this.getPathDirectionInfluence(x, y)
        this.previousPathAxis;
        this.previousPathDelta;
        this.previousMinorPathDelta;
        this.minorPathBuffer = 0;
        this._calculating = false;
        console.log("Convergent Boundary Created")
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
    get recentPathEntry(){ return this._path[this._path.length-1] }
    get recentPathX(){ return this.recentPathEntry[0] }
    get recentPathY(){ return this.recentPathEntry[1] }
    
    
    
    advancePath(){
        let ran = Math.random();
        let x = this.recentPathX;
        let y = this.recentPathY;

        //check if there is a movement buffer action to be taken, if so then just execute that
        if(this.minorPathBuffer > 0){
            console.log("Buffering path")
            x += this.mainAxis[0]
            y += this.mainAxis[1]
            this.minorPathBuffer--
        } else {
            //Find where the program wants to randomly move the piece
            if(Math.random() < this._directionInfluence[0] + this._directionInfluence[1] ){
                console.log(this.mainAxis)
                //Indicates a change in the x axis
                let delta = 0;
                if(this.mainAxis[0] != 0){
                    console.log("Increaseing boundary along Major X axis")
                    //This is a change on the x and it's the main axis so automatically advance
                    delta += this.mainAxis[0]
                    console.log(this.previousPathDelta)
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
                console.log("Increaseing boundary along Y axis")
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
            this._path.push([x, y])
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
        this._path.push([this._x,this._y])
        this.advancePath()
        this._calculating = true;
        while(this._calculating){
            this.advancePath();
        }
        this._map.highlightCoordArray(this._path);
    }

    step(){

    }
}

export default ConvergentBoundary