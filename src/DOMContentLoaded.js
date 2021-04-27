
const baseUrl = "http://tcrurup.github.io/index"
document.addEventListener("DOMContentLoaded", event => {
    OnDOMLoad();
})

function OnDOMLoad(){
    if(window.location.hostname != ""){
        document.getElementById("base-url").href = baseUrl;      
    };

    console.log("getting header")
    $(document).ready(
        $('#navbar').html('partials/navbar.html')
    );
}
