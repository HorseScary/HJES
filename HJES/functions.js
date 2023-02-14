function spaceAdder(text) {
    if (!text) {
        return ('')
    }
    return (text.padStart(text.length + 1, " "))
}

/*
Generates help messages from an object
Example usage:
helpHelper({
    '':'__title__',
    'subtitle':'__subtitle__',
    'someCommandName':'this command does something',
    'custom text! free of helpHelpers formatting!!':'__custom__'
})
*/
export function helpHelper(commandInfo) {
    lastItem = (function () {
        entries = Object.entries(commandInfo)
        return (entries[entries.length - 1][0])
    })()

    helpMessage = String()
    for (i in commandInfo) {
        if (commandInfo[i] == "__title__") {
            helpMessage += `&l&d[&aH&3J&dES&5${spaceAdder(i)}&d]`
        }
        else if (commandInfo[i] == "__subtitle__") {
            helpMessage += `&l&d[&5${i}&d]`
        }
        else if (commandInfo[i] == "__custom__") {
            helpMessage += `${i}`
        }
        else {
            helpMessage += `&b${i}:&f ${commandInfo[i]}`
        }

        if (i != lastItem) {
            helpMessage += `\n`
        }
    }

    return (helpMessage)
}

export function HJESMessage(message, category) {
    return (`&d[&aH&3J&dES&5${spaceAdder(category)}&d]&f ${message}`)
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function convertToMillisecond(mins) {
    return (mins * 60000)
}