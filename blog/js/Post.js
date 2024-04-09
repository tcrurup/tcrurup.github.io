class Post{

    constructor(json){
        this._json = json;
    }

    get content(){ return this._json.content.rendered}
    get element(){ return this.createElement() }

    createElement(){
        let element = document.createElement("div")
        element.className = "blog-post"
        element.innerHTML = this.content
        return element
    }
}

export default Post