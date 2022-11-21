import Settings from "../config"
import { helpHelper, HJESMessage } from "../functions"


let myCheese = false
let inquisExists = 0


// Leaves to hub when someone gets cheese
register("chat", () => {
    if (!myCheese && !inquisExists && Settings.leaveOnCheese) {
        ChatLib.say('/l')
    }
}).setChatCriteria("&r&9Party &8>${*}&f: &r[HJES Diana] Cheese!&r")

// tells party when you get cheese
register("chat", () => {
    if (Settings.announceCheese) {
        myCheese = true
        ChatLib.say('/pc [HJES Diana] Cheese!')
    }
}).setChatCriteria("&r&e&lCHEESE! &r&7You smell Cheese nearby!&r")

// tells party when you pick up cheese
register("chat", () => {
    if (Settings.announceCheese) {
        ChatLib.say('/pc [HJES Diana] Cheese obtained!')
    }
}).setChatCriteria("&r&e&lCHEESE!&r&7 You buffed &r${*}&r&7 giving them &r&b+${*}✯ Magic Find&r&7 for &r&a${*}&r&7 seconds!&r")

// tells party when you spawn an inquis
function inquisSpawned() {
    inquisExists += 1
    ChatLib.say(`/pc [HJES Diana] Inquis `)

    setTimeout(() => {
        if (inquisExists) {
            ChatLib.chat("&d[HJES Diana]&f Inquis timeout reached. Inquis registerd as dead!")
            inquisExists -= 1
        }
    }, parseInt(Settings.inquisTmeout))
}

// function for testing inquis stuff using champions. Requires announceInquis to be enabled
function champSpawned() {
    if (Settings.announceInquis) {
        ChatLib.say(`/pc [HJES Diana] Champ`)
        setTimeout(() => {
            ChatLib.say(`/pc x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
        }, 500)
    }

    setTimeout(() => {
        if (inquisExists) {
            ChatLib.chat("&d[HJES Diana]&f Champ timeout reached. Champ registerd as dead!")
            inquisExists -= 1
        }
    }, parseInt(Settings.inquisTmeout))
}
register("chat", () => {
    if (Settings.announceInquis) {
        World.getAllEntities().forEach(entity => {
            if (entity.getName().toLowerCase().includes("inquis") && !inquisExists) {
                inquisSpawned()
                setTimeout(() => {
                    ChatLib.say(`/pc x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
                }, 500)
            }


            if (Settings.announceChamp) {
                if (entity.getName().toLowerCase().includes("champ") && !inquisExists) {
                    champSpawned()
                    setTimeout(() => {
                        ChatLib.say(`/pc x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
                    }, 500)
                }
            }
        })
    }
}).setChatCriteria("${*}&r&eYou dug out &r&2a Minos Champion&r&e!&r")

register("chat", () => {
    if (Settings.runic) {
        ChatLib.say("/pc It was runic i swear!")
    }
}).setChatCriteria("&r&c ☠ ${*} killed by &r&2Exalted ${*}")

register("chat", () => {
    if (Settings.rejoinOnCheese) {
        ChatLib.say('/play sb')
    }
}).setChatCriteria("&r&9Party &8>${*}&f: &r[HJES Diana] Cheese obtained!&r")

register("command", (args) => {
    helpMessage = helpHelper({
        '__title__': 'Diana',
        'clear': 'Sets inquis count to 0',
        'status': 'Returns number of inquisitors currently registered',
        'add': 'Manually registers an inquisitor'
    })

    if (!args) {
        ChatLib.chat(helpMessage)
    }
    else if (args == "clear") {
        ChatLib.chat(HJESMessage('Inquisitors cleared!', 'Diana'))
        inquisExists = 0
    }
    else if (args == "status") {
        ChatLib.chat(HJESMessage(`${inquisExists} inquis registered.`, 'Diana'))
    }
    else if (args == "add") {
        ChatLib.chat(HJESMessage('Inquis manually registered.', 'Diana'))
        inquisSpawned()
        setTimeout(() => {
            ChatLib.say(`/pc x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
        }, 500)
    }
    else if (args == "help") {
        ChatLib.chat(helpMessage)
    }
    else {
        ChatLib.chat(`&d[HJES Diana]&f ${args} is not a valid option. Type '/inquis help' for help.`)
    }
}).setName("inquisitor", true).setAliases("inquis", "iq")

