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

export function closestWarp(entity) {
    let warpData={
        "castle":[-250,130,45],
        "da":[91,75,176],
        "museum":[-75,76,80],
        "hub":[-2,70,-69]};
    let castleDist = parseInt(Math.hypot(entity.getLastX()-warpData.castle[0], entity.getLastZ()-warpData.castle[2]))
    let daDist = parseInt(Math.hypot(entity.getLastX()-warpData.da[0], entity.getLastZ()-warpData.da[2]))
    let museumDist = parseInt(Math.hypot(entity.getLastX()-warpData.museum[0], entity.getLastZ()-warpData.museum[2]))
    let hubDist = parseInt(Math.hypot(entity.getLastX()-warpData.hub[0], entity.getLastZ()-warpData.hub[2]))
    let lowestDist = parseInt(Math.min(castleDist, daDist, museumDist, hubDist))
    let locationInquis
                switch(lowestDist) {
                    case daDist:
                        locationInquis = "da";
                        break;
                    case museumDist:
                        locationInquis = "museum";
                        break;
                    case hubDist:
                        locationInquis = "hub";
                        break;
                    case castleDist:
                        locationInquis = "castle";
                        break;
                    default: 
                        locationInquis = "it broke skull reaction";
                }
}