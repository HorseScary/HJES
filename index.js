let myCheese = false
let inquisExists = false

register("chat", () => {
    if (!myCheese && !inquisExists) {
        ChatLib.say('/l')
    }
}).setChatCriteria("&r&9Party &8>${*}&f: &r[Diana Utils] Cheese!&r")

register("chat", () => {
    myCheese = true
    ChatLib.say('/pc [Diana Utils] Cheese!')
}).setChatCriteria("&r&e&lCHEESE! &r&7You smell Cheese nearby!&r")

register("chat", () => {
    ChatLib.say('/pc [Diana Utils] Cheese obtained!')
}).setChatCriteria("&r&e&lCHEESE!&r&7 You buffed &r${*}&r&7 giving them &r&b+${*}✯ Magic Find&r&7 for &r&a${*}&r&7 seconds!&r")

register("chat", () => {
    World.getAllEntities().forEach(entity => {
        if (entity.getName().toLowerCase().includes("inquis") && !inquisExists) {
            inquisExists = true
            ChatLib.say(`/pc [Diana Utils] Inquis at ${entity.getLastX()} ${entity.getLastY()} ${entity.getLastZ()}}`)
        }
        if (entity.getName().toLowerCase().includes("champ") && !inquisExists) {
            setTimeout(() => {
                ChatLib.say(`/pc [Diana Utils] Inquis `)
            }, 250)
            setTimeout(() => {
                ChatLib.say(`x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
            }, 250)
        }
    })
}).setChatCriteria("${*}&r&eYou dug out &r&2a Minos Champion&r&e!&r")

register("tick", () => {
    World.getAllEntities().forEach(entity => {
        if (entity.getName().toLowerCase().includes("inquis") && (entity.isDead())) {
            ChatLib.say("/pc inquis dead!")
            inquisExists = false
            myCheese = false
        }
    })
})

register("chat", () => {
    ChatLib.say("/pc It was runic i swear!")
}).setChatCriteria("&r&c ☠ ${*} was killed by &r&2Exalted Gaia Construct&r&7&r&7.&r")

register("chat", () => {
    ChatLib.say('/play sb')
}).setChatCriteria("&r&9Party &8>${*}&f: &r[Diana Utils] Cheese obtained!&r")

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