import PostCollection from "./PostCollection.js";

addEventListener("DOMContentLoaded", (event) => {
    getBlogPosts();
});

const getBlogPosts = () => {
    console.log("getting blog posts")
    const baseUrl = "https://public-api.wordpress.com/wp/v2/sites/tcrurup.wordpress.com";

    fetch(baseUrl + "/posts")
    .then( response => response.json() )
    .then( json => createPostElements(json) )
}

const createPostElements = (posts) => {
    let postCollection= new PostCollection(posts)
    postCollection.allPosts.forEach(post => document.body.append(post.element))
    
}