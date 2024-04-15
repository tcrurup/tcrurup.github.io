const footerLinks = [
    {
        innerHTML: "GitHub", 
        href: "https://github.com/tcrurup"
    },
    {
        innerHTML: "LinkedIn",
        href: "https://www.linkedin.com/in/tony-rurup/"
    },
]

const createFooter = () =>{
    let footerElement = document.createElement("footer")
    
    footerLinks.forEach(link => {
        let linkElement = document.createElement("a")
        linkElement.href = link.href;
        linkElement.innerHTML = link.innerHTML;
        footerElement.append(linkElement)
    })

    return footerElement
}

document.getElementById("container").append(createFooter())