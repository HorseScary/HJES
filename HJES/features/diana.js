import Settings from "../config"


let myCheese = false
let inquisExists = 0

// Test command for settings things
register("command", () => {
    ChatLib.chat(JSON.stringify(Settings))
    ChatLib.chat(Settings.lOnCheese)
}).setName("dusettingstest", true)

// Leaves to hub when someone gets cheese
register("chat", () => {
    if (!myCheese && !inquisExists && Settings.leaveOnCheese) {
        ChatLib.say('/l')
    }
}).setChatCriteria("&r&9Party &8>${*}&f: &r[Diana Utils] Cheese!&r")

// tells party when you get cheese
register("chat", () => {
    if (Settings.announceCheese) {
        myCheese = true
        ChatLib.say('/pc [Diana Utils] Cheese!')
    }
}).setChatCriteria("&r&e&lCHEESE! &r&7You smell Cheese nearby!&r")

// tells party when you pick up cheese
register("chat", () => {
    if (Settings.announceCheese) {
        ChatLib.say('/pc [Diana Utils] Cheese obtained!')
    }
}).setChatCriteria("&r&e&lCHEESE!&r&7 You buffed &r${*}&r&7 giving them &r&b+${*}✯ Magic Find&r&7 for &r&a${*}&r&7 seconds!&r")

// tells party when you spawn an inquis
function inquisSpawned() {
    inquisExists += 1
    if (Settings.announceInquis) {
        ChatLib.say(`/pc [Diana Utils] Inquis `)
    }

    setTimeout(() => {
        if (inquisExists) {
            ChatLib.chat("&d[Diana Utils]&f Inquis timeout reached. Inquis registerd as dead!")
            inquisExists -= 1
        }
    }, parseInt(Settings.inquisTmeout))
}
function champSpawned() {
    if (Settings.announceInquis) {
        ChatLib.say(`/pc [Diana Utils] Champ`)
        setTimeout(() => {
            ChatLib.say(`/pc x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
        }, 500)
    }

    setTimeout(() => {
        if (inquisExists) {
            ChatLib.chat("&d[Diana Utils]&f Champ timeout reached. Champ registerd as dead!")
            inquisExists -= 1
        }
    }, parseInt(Settings.inquisTmeout))
}
register("chat", () => {
    World.getAllEntities().forEach(entity => {
        if (entity.getName().toLowerCase().includes("inquis") && !inquisExists) {
            inquisSpawned()
            setTimeout(() => {
                ChatLib.say(`/pc x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
            }, 500)
        }

        if (entity.getName().toLowerCase().includes("champ") && !inquisExists) {
            if (Settings.announceChamp) {
                champSpawned()
                setTimeout(() => {
                    ChatLib.say(`/pc x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
                }, 500)
            }
        }
    })
}).setChatCriteria("${*}&r&eYou dug out &r&2a Minos Champion&r&e!&r")

register("chat", () => {
    if (Settings.runic) {
        ChatLib.say("/pc It was runic i swear!")
    }
}).setChatCriteria("&r&c ☠ ${*} killed by &r&2Exalted ${}")

register("chat", () => {
    if (Settings.rejoinOnCheese) {
        ChatLib.say('/play sb')
    }
}).setChatCriteria("&r&9Party &8>${*}&f: &r[Diana Utils] Cheese obtained!&r")

register("command", (args) => {
    helpMessage = (`&d[Diana Utils Inquis]\n&fAliases:&7 duinquis, duinq\n&d[Arguments]\n&fclear:&7 sets "inquisExists" value to 0\n&fstatus:&7 returns number of registerd inquisitors\n&fadd:&7 manually registers inquis`)
    if (!args) {
        ChatLib.chat(helpMessage)
    }
    else if (args == "clear") {
        ChatLib.chat("&[Diana Utils]&f Inquisitors cleared!")
        inquisExists = 0
    }
    else if (args == "status") {
        ChatLib.chat(`&d[Diana Utils]&f ${inquisExists} inquis registered.`)
    }
    else if (args == "add") {
        ChatLib.chat(`&d[Diana Utils]&f Inquis manually registered.`)
        inquisSpawned()
        setTimeout(() => {
            ChatLib.say(`/pc x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
        }, 500)
    }
    else if (args == "help") {
        ChatLib.chat(helpMessage)
    }
    else {
        ChatLib.chat(`&d[Diana Utils]&f ${args} is not a valid option.`)
    }
}).setName("dianaUtilsInquis", true).setAliases("duinquis", "duinq")

