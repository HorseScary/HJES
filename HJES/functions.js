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


export function getClosestWarp(x, y, z, usePlayerCoords) {
    let warpData = {
        "castle": [-250, 130, 45],
        "da": [91, 75, 176],
        "museum": [-75, 76, 80],
        "hub": [-2, 70, -69]
    }

    castleDist = Math.hypot(Math.abs(x - warpData.castle[0]), Math.abs(y - warpData.castle[1]), Math.abs(z - warpData.castle[2]))
    daDist = Math.hypot(Math.abs(x - warpData.da[0]), Math.abs(y - warpData.da[1]), Math.abs(z - warpData.da[2]))
    museumDist = Math.hypot(Math.abs(x - warpData.museum[0]), Math.abs(y - warpData.museum[1]), Math.abs(z - warpData.museum[2]))
    hubDist = Math.hypot(Math.abs(x - warpData.hub[0]), Math.abs(y - warpData.hub[1]), Math.abs(z - warpData.hub[2]))
    if (usePlayerCoords) {
        playerDist = Math.hypot(Math.abs(x - Player.getX()), Math.abs(y - Player.getY()), Math.abs(z - Player.getZ()))
    }


    dist = {}
    dist[castleDist] = "castle"
    dist[daDist] = "da"
    dist[museumDist] = "da"
    dist[hubDist] = "hub"

    if (usePlayerCoords) {
        dist[playerDist] = null
        closest = Math.min(castleDist, daDist, museumDist, hubDist, playerDist)
    }
    else {
        closest = Math.min(castleDist, daDist, museumDist, hubDist)
    }

    return dist[closest]
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