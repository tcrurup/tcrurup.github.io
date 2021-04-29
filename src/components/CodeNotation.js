class CodeNotation{
    
    constructor(node){
        this.properties = {
            node: node
        }
        Object.freeze(this.properties)
        this.prependTitleToElement()
        this.codeElement.innerHTML = CodeNotation.sanitizeCode(this.codeElement.innerHTML)
        if(this.notationElement){
            const listItems = this.notationElement.querySelectorAll('li')
            
            for(let i = 0; i < listItems.length; i++){
                const allSpans = this.codeElement.querySelectorAll(`span[list-item='${i+1}']`)
                listItems[i].addEventListener("mouseover", event => {
                    
                    for(let i = 0; i < allSpans.length; i++){
                        allSpans[i].className = "highlighted"
                    }
                })
                listItems[i].addEventListener("mouseout", () => {
                    for(let i = 0; i < allSpans.length; i++){
                        allSpans[i].className = ""
                    }
                })
            }

        }
    }

    static sanitizeCode(innerHTML){
        const splitString = innerHTML.split(/\n/g);
        const cleanedStrings = splitString.map(line => line.trim()).filter(line=> line != "");
        const indentPlusCharacters = ['{']
        const indentMinusCharacters = ['}']
        let indents = 0;
        let increaseIndent, decreaseIndent

        let sanitizedStrings = cleanedStrings.map(string => {
            
            const finalChar = string.slice(-1);
            const firstChar = string.slice(0, 1);

            increaseIndent = indentPlusCharacters.includes(finalChar);
            decreaseIndent = indentMinusCharacters.includes(firstChar) || indentMinusCharacters.includes(finalChar);

            //If both are true then it should cancel eachother out.  It's important to do this here because of the order of operations when it comes
            //to adding the indent
            if(increaseIndent && decreaseIndent){ decreaseIndent = false; increaseIndent = false}
            
            decreaseIndent ? indents-- : null
            for(let i=0; i< indents; i++){ string = "    " + string }
            console.log(indents)
            increaseIndent ? indents++ : null
            
            return string;            
        })
        sanitizedStrings.unshift('')
        return sanitizedStrings.join('\n')
    }
    
    prependTitleToElement(){
        const titleElement = document.createElement('div')
        titleElement.innerHTML = this.title
        titleElement.className="code-notation-title"
        this.node.prepend(titleElement);
    }

    get codeElement(){ return this.node.querySelector('code')}
    get notationElement(){ return this.node.querySelector('ul')}
    get node(){ return this.properties.node }
    get title(){
        const title = this.node.getAttribute('name') || "No name provided"
        return title.split('-').map(n => Utilities.capitalize(n)).join(" ");
    }
}

document.addEventListener("DOMContentLoaded", event => {
    let allNodes = document.querySelectorAll("div.code-notation")
    for(let i=0; i < allNodes.length; i++){
        new CodeNotation(allNodes[i]);
    }
})

