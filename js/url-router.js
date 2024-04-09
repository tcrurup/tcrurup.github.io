document.addEventListener("click", (e) => {
    const {target} = e;
    if(!target.matches("nav a")) {
        //If it's not inside of our navigation then we just ignore it for now
        return;
    }

    e.preventDefault();
    urlRoute(e);
})

const urlRoutes = {
    404: {
        template: "/templates/404.html",
        title: "",
        description: ""
    },
    "/": {
        template: "/templates/index.html",
        title: "",
        description: ""
    },
    "/game": {
        template: "/templates/game.html",
        title: "",
        description: ""
    }
}

const urlRoute = (event) => {
    //RESEARCH WHAT THIS DOES A BIT MORE
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
}

const urlLocationHandler = async () => {
    const location = window.location.pathname;
    if(location.length = 0){
        location = "/"
    }

    const route = urlRoutes[location] || urlRoutes[404]
    const html = await fetch(route.template).then((response) => response.text())
    document.getElementById("content").innerHTML = html;
}

window.onpopstate = urlLocationHandler;
window.route = urlRoute;

urlLocationHandler();
