import PostCollection from "./PostCollection.js";

class PostViewer{

    constructor(postCollection){
        this._postCollection = new PostCollection(postCollection);
        this._currentPostIndex = 0;
        this.addEventListeners()
        this.update();
    }

    get postCount(){return this._postCollection.length}
    get postNum(){ return this._currentPostIndex + 1}

    goToPostIndex(index){
        this._currentPostIndex = index;
        this.update()
    }

    nextPost(){
        if(this.postNum < this.postCount){this._currentPostIndex++}
        this.update();
    }

    previousPost(){
        if(this.postNum > 1){this._currentPostIndex--}
        this.update();
    }

    update(){
        console.log(`updating ${this.postNum}`)
        document.getElementById("content").innerHTML = this._postCollection.getPostAtIndex(this._currentPostIndex)
    }

    addEventListeners(){
        document.onkeydown = (e) =>{
            console.log("event fired")
            switch(e.key){
                case "ArrowLeft":
                    console.log("Previous Post")
                    this.previousPost()
                    break;
                case "ArrowRight":
                    console.log("Nextpost")
                    this.nextPost()
                    break;
                default:
                    break;
            }
        }
    }
}

export default PostViewer