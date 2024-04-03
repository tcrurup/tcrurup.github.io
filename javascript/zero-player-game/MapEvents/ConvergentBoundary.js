class ConvergentBoundary{

    constructor(x, y){
        this._x = x;
        this._y = y;
        this._path = [];
        this._directionInfluence = this.getPathDirectionInfluence(x, y)
        this._calculating = false;
        console.log("Convergent Boundary Created")
    }

    set map(newMap){ 
        this._map = newMap 
        this.calculatePath();
    }

    get xDelta(){ return this._directionInfluence[0] > this._directionInfluence[1] ? 1 : -1}
    get yDelta(){ return this._directionInfluence[2] > this._directionInfluence[3] ? 1 : -1}
    get recentPathEntry(){ return this._path[this._path.length-1] }
    get recentPathX(){ return this.recentPathEntry[0] }
    get recentPathY(){ return this.recentPathEntry[1] }

    advancePath(){
        let ran = Math.random();
        //needs to decide if moving in x or y direction
        let x = this.recentPathX;
        let y = this.recentPathY;
        if(ran < this._directionInfluence[0] + this._directionInfluence[1] ){
            x = x + this.xDelta
        } else {
            //if not true then it's advancing in y direction
            y = y + this.yDelta
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
        console.log(this._map.mapWidth)
        return (xValid && yValid)
    }

    getPathDirectionInfluence(x, y){
        if(x == 0){
            return [.9,0,.05,.05]
        } else if (y == 0){
            return [.05,.05,.9,0]
        } else if (x == this._map.mapWidth){
            return [0,.9,.05,.05]
        }else if (y == this._mapHeight){
            return [.05,.05,0,.9]
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