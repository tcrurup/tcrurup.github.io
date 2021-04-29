document.addEventListener("DOMContentLoaded", event => {
    let allNodes = document.querySelectorAll("div.code-notation")
    for(let i=0; i < allNodes.length; i++){
        const node = allNodes[i];

        const title = (node.getAttribute('name') || "No name given").split('-').map(n => Utilities.capitalize(n)).join(" ");
        const titleElement = document.createElement('div')
        titleElement.innerHTML = title
        titleElement.className="code-notation-title"
        node.prepend(titleElement);
        const code = node.querySelector("code")
        const notationUL = node.querySelector("ul")
        
        const sanitizedCode = sanitizeCode(code.innerHTML)
        
        
        code.innerHTML = sanitizedCode
        
        //Add event on mouse over to change span class in code
        
        if(notationUL){
            console.log('adding events')
            const listItems = notationUL.querySelectorAll('li')
            console.log(listItems[0])
            
            for(let i = 0; i < listItems.length; i++){
                
                const allSpans = code.querySelectorAll(`span[list-item='${i+1}']`)
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

    function sanitizeCode(innerHTML){
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
})
