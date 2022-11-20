import Settings from "./config";

register("command", () => {
    Settings.openGUI()
}).setName("du", true);

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
        setTimeout(() => {
            ChatLib.say(`/pc [Diana Utils] Inquis `)
        }, 250)
        setTimeout(() => {
            ChatLib.say(`x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
        }, 250)
    }

    setTimeout(() => {
        if (inquisExists) {
            ChatLib.chat("&d[Diana Utils]&f Inquis timeout reached. Inquis registerd as dead!")
            inquisExists -= 1
        }
    }, parseInt(Settings.inquisTimeout))
}
register("chat", () => {
    World.getAllEntities().forEach(entity => {
        if (entity.getName().toLowerCase().includes("inquis") && !inquisExists) {
            inquisSpawned()
        }

        if (entity.getName().toLowerCase().includes("champ") && !inquisExists) {
            if (Settings.announceChamp) {
                ChatLib.chat(`&d[Diana Utils]&f Champ!? `)
                setTimeout(() => {
                    ChatLib.chat(`x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
                }, 250)
            }

            setTimeout(() => {
                if (inquisExists) {
                    ChatLib.chat("&d[Diana Utils] &fMax inquis time reached. Inquis registerd as dead!")
                }
            }, parseInt(Settings.champTimeout))
        }
    })
}).setChatCriteria("${*}&r&eYou dug out &r&2a Minos Champion&r&e!&r")

/*
register("tick", () => {
    World.getAllEntities().forEach(entity => {
        if (entity.getName().toLowerCase().includes("inquis") && (entity.isDead())) {
            ChatLib.say("/pc inquis dead!")
            inquisExists = false
            myCheese = false
        }
    })
})
*/

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
    }
    else if (args == "help") {
        ChatLib.chat(helpMessage)
    }
    else {
        ChatLib.chat(`&d[Diana Utils]&f ${args} is not a valid option.`)
    }
}).setName("dianaUtilsInquis", true).setAliases("duinquis", "duinq")

// penis code made by beedit
register("command", () => {
    var playerX = Player.getX();
    var playerY = Player.getY();
    var playerZ = Player.getZ();
    new Thread(() => {
        ChatLib.say(`/pc x: ${playerX}, y: ${playerY}, z: ${playerZ}`)
        Thread.sleep(550)
        ChatLib.say(`/pc x: ${playerX + 2}, y: ${playerY}, z: ${playerZ}`)
        Thread.sleep(550)
        ChatLib.say(`/pc x: ${playerX + 1}, y: ${playerY + 1}, z: ${playerZ}`)
        Thread.sleep(550)
        ChatLib.say(`/pc x: ${playerX + 1}, y: ${playerY + 2}, z: ${playerZ}`)
        Thread.sleep(550)
    }).start()
}).setName('sendpenis', true)


register("pickupitem", () => {
    ChatLib.chat("thing")
})

/*
&r&9Party &8> &b[MVP&0+&b] jperrm&f: &rIt was runic, I swear!&r

&r&9Party &8> &b[MVP&0+&b] jperrm&f: &rUwU&r
&r&e&lCHEESE! &r&7You smell Cheese nearby!&r

CHEESE! You buffed Brendidy giving them +7✯ Magic Find for 
&r&e&lCHEESE!&r&7 You buffed &r&bBrendidy&r&7 giving them &r&b+7✯ Magic Find&r&7 for &r&a60&r&7 seconds!&r
&r&c&lYikes! &r&eYou dug out &r&2a Minos Champion&r&e!&r

&r&c ☠ &r&7You were killed by &r&2Exalted Gaia Construct&r&7&r&7.&r
&r&c ☠ &r&7&r&bjperrm&r&7 was killed by &r&2Exalted Gaia Construct&r&7&r&7.&r
*/