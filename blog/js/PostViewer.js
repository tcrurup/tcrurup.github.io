import PostCollection from "./PostCollection.js";

class PostViewer{

    constructor(postCollection){
        this._postCollection = new PostCollection(postCollection);
        this._currentPostIndex = 0;
        this.initialize();
        this.addEventListeners()
        this.update();
    }

    get postCount(){return this._postCollection.length}
    get postNum(){ return this._currentPostIndex + 1}

    initialize(){
        let postViewerElement = document.createElement("div")
        postViewerElement.id = "post-viewer"
        document.getElementById("content").append(postViewerElement)
    }
    
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
        console.log(this._postCollection.getPostAtIndex(this._currentPostIndex))
        document.getElementById("post-viewer").innerHTML = this._postCollection.getPostAtIndex(this._currentPostIndex).content
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