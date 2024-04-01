class Cell{

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    draw(context, cellSize){
        context.strokeRect(
            this.x*cellSize, 
            this.y*cellSize, 
            cellSize, 
            cellSize
        )
    }
}

export default Cell