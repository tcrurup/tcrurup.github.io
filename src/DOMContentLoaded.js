
const baseUrl = "http://tcrurup.github.io/index"
document.addEventListener("DOMContentLoaded", event => {
    OnDOMLoad();
})

function OnDOMLoad(){
    loadPartials();
}

function loadPartials(){
    
    let allIncludes = document.querySelectorAll("div[include-html]");

    for(let i = 0; i< allIncludes.length; i++){
        
        let node = allIncludes[i]
        let filePath = node.getAttribute("include-html")
        const onSuccess = response => {
            node.innerHTML = response
        }
        
        fetchPartial(filePath, onSuccess)
    }
}

function fetchPartial(filePath, onSuccess){
    fetch(filePath)
    .then(response => response.text())
    .then(html => onSuccess(html)) 
}