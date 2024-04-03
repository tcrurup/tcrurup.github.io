import Utilities from "./Utilities.js";

class Cell{

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.hue = 108;
        this.saturation = 50;
        this.alpha = 1.0;
        this.maxHeight = 100;
        this.minHeight = -100;
        this.minLightness = 10;
        this.maxLightness = 80;
        this.height = 0;
    }
    
    set height(newHeight){
        this._height = newHeight;
        const lightRange = this.maxLightness - this.minLightness;
        const lightPercent = (newHeight - this.minHeight) / (this.maxHeight - this.minHeight);
        this.lightness = Utilities.clamp(lightRange * lightPercent, this.minLightness, this.maxLightness);
    }

    get height(){ return this._height}
    
    get fillStyle(){return `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`}

    changeHeight(amount){ 
        this.height = this.height + amount; 
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
        context.strokeRect(
            this.x*cellSize, 
            this.y*cellSize, 
            cellSize, 
            cellSize
        )
    }
}

export default Cell