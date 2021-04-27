
const baseUrl = "http://tcrurup.github.io/index"
document.addEventListener("DOMContentLoaded", event => {
    OnDOMLoad();
})

function OnDOMLoad(){
    if(window.location.hostname != ""){
        document.getElementById("base-url").href = baseUrl;      
    };
    generateComponents();
}

function generateComponents(){
    Navbar.initialize();
}