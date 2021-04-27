class Component{
    
    constructor(targetObj){
        targetObj.html(this.render());
    }

    static initialize(){
        const constructor = this.prototype.constructor
        let nb = $(constructor.name)
        if(nb.length > 0){
            new constructor(nb)
        }
    }
}