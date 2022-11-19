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
    ChatLib.say('[Diana Utils] Cheese obtained!')
    myCheese = false
}).setChatCriteria("&r&e&lCHEESE!&r&7 You buffed &r${*}&r&7 giving them &r&b+${*}✯ Magic Find&r&7 for &r&a${*}&r&7 seconds!&r")

register("chat", () => {
    World.getAllEntities().forEach(entity => {
        if (entity.getName().toLowerCase().includes("inquis") && !inquisExists) {
            inquisExists = true
            ChatLib.say("/pc inquis!")
        }
    })
}).setChatCriteria("${*}&r&eYou dug out &r&2a Minos Champion&r&e!&r")

register("tick", () => {
    World.getAllEntities().forEach(entity => {
        if (entity.getName().toLowerCase().includes("inquis") && (entity.isDead()) && inquisExists) {
            ChatLib.say("/pc inquis dead!")
            inquisExists = false
        }
    })
})

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
*/