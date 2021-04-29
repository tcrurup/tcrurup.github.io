import Page from './Page.js'

class BlogPage extends Page{
    
    constructor(){
        super()
        this.templateURL = '/templates/BlogPage.html'
        this.loadPartials();
    }
}

document.addEventListener("DOMContentLoaded", event => {
    new BlogPage();
})
