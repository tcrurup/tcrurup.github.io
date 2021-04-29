import Page from './Page.js'
import CodeNotation from './CodeNotation.js'

class BlogPage extends Page{
    
    constructor(){
        super()
        this.templateURL = '/templates/BlogPage.html'
        this.loadTemplate();
    }


    loadTemplate(){        
        const onSuccess = html => {
            let baseNodes = [...document.querySelector('body').children]
            document.write(html);
            const contentNode = document.querySelector('div#content')
            const insertNode = contentNode.parentElement
            contentNode.remove()
            for(let i = 0; i< baseNodes.length; i++){
                insertNode.appendChild(baseNodes[i])
            }
            this.loadPartials();
            let allNodes = document.querySelectorAll("div.code-notation")
            for(let i=0; i < allNodes.length; i++){
                new CodeNotation(allNodes[i]);
            }
        }
        this.fetchPartial(this.templateURL, onSuccess)
    }
}

document.addEventListener("DOMContentLoaded", event => {
    new BlogPage();
})
