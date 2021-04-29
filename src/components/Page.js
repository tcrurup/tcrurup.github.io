export default class Page{
    
    constructor(){
    }

    loadPartials(){
    
        let allIncludes = document.querySelectorAll("div[include-html]");
    
        for(let i = 0; i< allIncludes.length; i++){
            
            let node = allIncludes[i]
            let filePath = node.getAttribute("include-html")
            const onSuccess = response => {
                node.innerHTML = response
            }
            
            this.fetchPartial(filePath, onSuccess)
        }
    }
    
    fetchPartial(filePath, onSuccess){
        fetch(filePath)
        .then(response => response.text())
        .then(html => onSuccess(html)) 
    }
}