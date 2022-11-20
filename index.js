let myCheese = false
let inquisExists = false

function sendcoords() {
    let playerX = Player.getX();
    let playerY = Player.getY();
    let playerZ = Player.getZ();
    setTimeout(() => {
        ChatLib.say(`/pc x: ${playerX}, y: ${playerY}, z: ${playerZ}`)
    }, 500)
}

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
    myCheese = false
}).setChatCriteria("&r&e&lCHEESE!&r&7 You buffed &r${*}&r&7 giving them &r&b+${*}✯ Magic Find&r&7 for &r&a${*}&r&7 seconds!&r")

register("chat", () => {
    World.getAllEntities().forEach(entity => {
        if (entity.getName().toLowerCase().includes("inquis") && !inquisExists) {
            inquisExists = true
            ChatLib.say("/pc inquis!")
            sendcoords()
        }
    })
}).setChatCriteria("${*}&r&eYou dug out &r&2a Minos Champion&r&e!&r")

register("tick", () => {
    if(inquisExists) {
        setTimeout(() => {
            inquisExists = false
        }, 100000)
    }
})

register("chat", () => {
    ChatLib.say('/play sb')
}).setChatCriteria("&r&9Party &8>${*}&f: &r[Diana Utils] Cheese obtained!&r")


register("command", () => {
    inquisExists = true
    ChatLib.say("/pc inquis! (manual input)")
    sendcoords()
}).setName('myinq')

register("command", () => {
    inquisExists = false
    ChatLib.say("/pc inquis dead (manual input)")
}).setName('deadinq')

register("command", () => {
    sendcoords()
}).setName('sc')

register("chat", () => {
    ChatLib.say("/pc It was runic, I swear!")
}).setChatCriteria("&r&c ☠ &r&7${*} killed by &r&2Exalted${*}&r&7&r&7.&r")

register("chat", () => {
    ChatLib.say("/gc [SBE] RARE DROP! Antique Remedies")
}).setChatCriteria("&3[SBE] &a&6&lRARE DROP! &5Antique Remedies&r")

register("chat", () => {
    ChatLib.say("/gc [SBE] RARE DROP! Crochet Tiger Plushie")
}).setChatCriteria("&3[SBE] &a&6&lRARE DROP! &5Crochet Tiger Plushie&r")

register("chat", () => {
    ChatLib.say("/gc [SBE] RARE DROP! Dwarf Turtle Shelmet")
}).setChatCriteria("&3[SBE] &a&6&lRARE DROP! &9Dwarf Turtle Shelmet&r")
