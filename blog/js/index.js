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
    posts.forEach(post => {
        console.log(post.content)
        let postElement = document.createElement("div")
        postElement.className = "blog-post"
        postElement.innerHTML = post.content.rendered
        document.body.append(postElement)
    })
    
}