import Utilities from '../Utilities.js'

export default class CodeNotation{
    
    constructor(node){
        this.properties = {
            node: node
        }
        Object.freeze(this.properties)
        this.prependTitleToElement()
        this.codeText = this.sanitizedCode
        this.initializeEventListeners()        
    }
    
    get codeElement(){ return this.node.querySelector('code')}
    get node(){ return this.properties.node }
    get notationElement(){ return this.node.querySelector('ul')}
    get sanitizedCode(){ return CodeNotation.sanitizeCode(this.codeElement.innerHTML)}
    get title(){ return (this.node.getAttribute('name') || "No name provided").split('-').map(n => Utilities.capitalize(n)).join(" ")}

    set codeText(codeText){ this.codeElement.innerHTML = codeText }

    allNotationListItems(){ return this.notationElement.querySelectorAll('li') }
    getCodeElementSpansByIndex(index){ return this.codeElement.querySelectorAll(`span[list-item='${index}']`)}
    
    initializeEventListeners(){  
        if(this.notationElement){
            const notationListItems = this.allNotationListItems() 
            for(let i = 0; i < notationListItems.length; i++){
                const allSpans = this.getCodeElementSpansByIndex(i+1)
                notationListItems[i].addEventListener("mouseover", event => this.setClassNameForNodeList(allSpans, "highlighted"))
                notationListItems[i].addEventListener("mouseout", event => this.setClassNameForNodeList(allSpans, ""))
            }
        }
    }
    
    prependTitleToElement(){
        const titleElement = document.createElement('div')
        titleElement.innerHTML = this.title
        titleElement.className="code-notation-title"
        this.node.prepend(titleElement);
    }

    setClassNameForNodeList(nodeList, className){
        for(let i = 0; i < nodeList.length; i++){
            nodeList[i].className = className
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
            increaseIndent ? indents++ : null
            
            return string;            
        })
        sanitizedStrings.unshift('')
        return sanitizedStrings.join('\n')
    }
}

/*document.addEventListener("DOMContentLoaded", event => {
    let allNodes = document.querySelectorAll("div.code-notation")
    for(let i=0; i < allNodes.length; i++){
        new CodeNotation(allNodes[i]);
    }
})*/

