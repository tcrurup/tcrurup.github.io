import Utilities from "./Utilities.js";

class Cell{

    constructor(x, y){
        this.x = x;
        this.y = y;
        this._hue = 108;
        this.saturation = 50;
        this.alpha = 1.0;
        this._targetHeight = 0;
        this.maxHeight = 100;
        this.minHeight = -100;
        this.minLightness = 10;
        this.maxLightness = 80;
        this.height = 0;
        this._updated = true;
    }
    
    set height(newHeight){
        this._height = newHeight;
        const lightRange = this.maxLightness - this.minLightness;
        const lightPercent = (newHeight - this.minHeight) / (this.maxHeight - this.minHeight);
        this.lightness = Utilities.clamp(lightRange * lightPercent, this.minLightness, this.maxLightness);
    }

    get height(){ return this._height}
    get hasUpdated(){ return this._updated }
    
    get fillStyle(){return `hsla(${this._hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`}
    set hue(newHue){ 
        this._hue = newHue;
        this._updated = true;
    }

    set updated(bool){ this._updated = bool }

    step(){
        this.height = this.height + this._heightDelta; 

    }

    distanceFromXY(x, y){
        return Utilities.getDistanceBetweenXYPoints(this.x, this.y, x, y)
    }

    setTargetHeight(newHeight, numFrames){
        this._targetHeight = newHeight;
        this._heightDelta = (newHeight - this.height) / numFrames;
    }

    setTargetHeightIfGreater(newTarget, numFrames){
        if(newTarget > this._targetHeight){
            this.setTargetHeight(newTarget, numFrames)
        }
    }


    draw(context, cellSize){
        
        context.fillStyle = this.fillStyle
        context.fillRect(
            this.x*cellSize, 
            this.y*cellSize, 
            cellSize, 
            cellSize
        )
        context.fillStyle = "black"
        context.lineWidth = 1
        context.strokeRect(
            this.x*cellSize, 
            this.y*cellSize, 
            cellSize, 
            cellSize
        )
        if(this.isUpToDate()){
            this._updated = false;
        } else {
        }
        
    }

    isUpToDate(){
        if(Math.abs(this.height - this._targetHeight) < .1){ 
            return true
        } else {
            return false 
        }
    }
}

export default Cell