
const baseUrl = "http://tcrurup.github.io/index"
document.addEventListener("DOMContentLoaded", event => {
    OnDOMLoad();
})

function OnDOMLoad(){
    loadPartials();
}

function loadPartials(){
    
    let allIncludes = $( "div[include-html]");

    for(let i = 0; i< allIncludes.length; i++){
        
        let node = allIncludes[i]
        let filePath = node.getAttribute("include-html")
        console.log(`Loading partial from ${filePath}`)
        const onSuccess = response => {
            console.log(`Found partial ${filePath}`)
            console.log(response)
            node.innerHTML = response
        }
        
        fetchPartial(filePath, onSuccess)
    }
}

function fetchPartial(filePath, onSuccess){
    $.ajax({
        url:'/partials/navbar.html',
        success: response => onSuccess(response),
        error: error => console.log(error)
    })
}