const navBar = [
    {
        innerHTML: "Home", 
        href: "/"
    },
    {
        innerHTML: "Blog",
        href: "/blog/"
    },
    {
        innerHTML: "Zero Player Game", 
        href: "/zeroPlayerGame/"
    }
]

const createNavBar = () =>{
    let navBarElement = document.createElement("nav")
    
    navBar.forEach(nav => {
        let link = document.createElement("a")
        link.href = nav.href;
        link.innerHTML = nav.innerHTML;
        navBarElement.append(link)
    })

    return navBarElement
}



document.getElementById("container").prepend(createNavBar())