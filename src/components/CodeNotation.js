document.addEventListener("DOMContentLoaded", event => {
    let allNodes = document.querySelectorAll("div.code-notation")
    for(let i=0; i < allNodes.length; i++){
        const node = allNodes[i];
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

            decreaseIndent ? indents-- : null
            for(let i=0; i< indents; i++){ string = "    " + string }
            increaseIndent ? indents++ : null
            return string;            
        })
        return sanitizedStrings.join('\n')
    }
})
