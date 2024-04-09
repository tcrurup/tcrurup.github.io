import Post from "./Post.js";

class PostCollection{

    constructor(postCollection){
        this._posts = postCollection.map(post => new Post(post));
    }

    get allPosts(){ return this._posts }

    getPostAtIndex(index){
        return this._posts[index].content
    }


}

export default PostCollection