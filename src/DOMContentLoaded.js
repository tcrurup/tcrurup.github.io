import $ from "jquery";

const baseUrl = "http://tcrurup.github.io/index"
document.addEventListener("DOMContentLoaded", event => {
    OnDOMLoad();
})

function OnDOMLoad(){
    if(window.location.hostname != ""){
        document.getElementById("base-url").href = baseUrl;
        $.get("partials/navbar.html", function(response){
            $( "#header" ).html(response)
        });        
    };
}
