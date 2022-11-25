window.onload = function () { footer() }

function footer() {
    foot = document.getElementsByTagName("footer").item(0)

    for (let i = 0; i < foot.children.length; i++) {
        let child = foot.children.item(i)
        if (child.tagName == "A") {
            if (child.innerHTML.includes("HTML")) {
                child.setAttribute("href", `http://validator.w3.org/check?uri=${window.location.href}`)
            }
            else if (child.innerHTML.includes("CSS")) {
                child.setAttribute("href", `http://jigsaw.w3.org/css-validator/validator?uri=${window.location.href}?profile=css3`)
            }
        }
    }
}

function dropdown(element) {
    dropdownElement = document.getElementById(element)
    dropdownStatus = dropdownElement.getAttribute("dropdownStatus")

    dropdownChildren = dropdownElement.childNodes
    dropdownDiv = undefined
    dropdownTitle = undefined

    for (i = 0; i < dropdownChildren.length; i++) {
        if (dropdownChildren[i].nodeName == "DIV" && !dropdownDiv) {
            dropdownDiv = dropdownChildren[i]
        }
        else if (dropdownChildren[i].nodeName == "H2" && !dropdownTitle) {
            dropdownTitleArrow = dropdownChildren[i].firstChild
        }
    }

    if (dropdownStatus == "up") {
        dropdownDiv.setAttribute("style", "display: block;")
        dropdownElement.setAttribute("dropdownStatus", "down")
        dropdownTitleArrow.setAttribute("class", "")

    }
    else if (dropdownStatus == "down") {
        dropdownDiv.setAttribute("style", "display: none;")
        dropdownElement.setAttribute("dropdownStatus", "up")
        dropdownTitleArrow.setAttribute("class", "dropdownArrowDown")
    }
}