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

export function minToMillisecond(mins) {
    return (mins * 60000)
}

export function timeFormat(milliseconds) {
    time = []
    time[0] = parseInt(milliseconds / 1000)
    for (i = 0; i < 2; i++) {
        time[i + 1] = parseInt(time[i] / 60)
        time[i] -= time[i + 1] * 60
    }

    for (i = 0; i < 3; i++) {
        if (time[i] == 0) {
            time[i] = ''
        }
        time[i] = time[i].toString()

        if (i != 2) {
            time[i] = time[i].padStart(2, 0)
        }
        if (i != 0 && time[i]) {
            time[i] = time[i].concat(':')
        }
    }

    return (`${time[2]}${time[1]}${time[0]}`)
}