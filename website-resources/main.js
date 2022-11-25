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