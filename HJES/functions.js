function spaceAdder(text) {
    if (!text) {
        return ('')
    }
    return (text.padStart(text.length + 1, " "))
}

/*
Generates help messages from an object
use __title__ for the main title of the help message and __subtitle__ for subtitles (wow no way crazy)
*/
export function helpHelper(commandInfo) {
    helpMessage = ``
    lastItem = (function () {
        entries = Object.entries(commandInfo)
        return (entries[entries.length][0])
    })()

    for (i in commandInfo) {
        if (i == "__title__") {
            helpMessage += `&l&d[&aH&3J&dES&f${padStart(commandInfo[i])}&d]`
        }
        else if (i == "__subtitle__") {
            helpMessage += `&l&d[&f${commandInfo[i]}&d]`
        }
        else if (i == "__warning__") {
            helpMessage += `&d[&aH&3J&dES]&f ${commandInfo}`
        }
        else if (i == "__custom__") {
            helpMessage += `${commandInfo[i]}`
        }
        else {
            helpMessage += `&b${i}:&f ${commandInfo[i]}`
        }

        if (i != lastItem) {
            helpMessage += `\n`
        }
    }
}

export function HJESMessage(message, category) {
    return (`&d[&aH&3J&dES&f${spaceAdder(category)}&d]&f ${message}`)
}