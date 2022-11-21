import Settings from "../config"
import { helpHelper, HJESMessage } from "../functions"


let myCheese = false
let inquisExists = 0
let inventoryItems = null


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
            if (entity.getName().toLowerCase().includes("inquis")) {
                inquisExists += 1

                ChatLib.say(`/pc [HJES Diana] Inquis `)
                setTimeout(() => {
                    ChatLib.say(`/pc x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
                }, 500)

                setTimeout(() => {
                    if (inquisExists) {
                        ChatLib.chat("&d[HJES Diana]&f Inquis timeout reached. Inquis registerd as dead!")
                    }
                    inquisExists -= 1
                }, parseInt(Settings.inquisTmeout))
            }

            else if (entity.getName().toLowerCase().includes("champ") && Settings.announceChamp) {
                ChatLib.say(`/pc [HJES Diana] Champ`)
                setTimeout(() => {
                    ChatLib.say(`/pc x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
                }, 500)

                setTimeout(() => {
                    ChatLib.chat("&d[HJES Diana]&f Champ timeout reached. Champ registerd as dead!")
                }, parseInt(Settings.champTimeout))
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

register("command", () => {
    items = Player.getInventory().getItems()
    for (i = 0; i < items.length; i++) {
        ChatLib.chat(items[i])
    }

}).setName("hjesgetitems")

register("chat", () => {
    inventoryItems = Player.getInventory().getItems()
    ChatLib.chat("inventory logged")
}).setChatCriteria("${*}You dug out${*}")

register("chat", () => {
    ChatLib.chat("burrow dug")
    updatedInventoryItems = Player.getInventory().getItems()
    newItems = Array()

    for (i = 0; i < inventoryItems.length; i++) {
        if (inventoryItems[i] == null && updatedInventoryItems[i] != null) {
            newItems.push(updatedInventoryItems[i].getName())
        }
        else if (inventoryItems[i].getName() != updatedInventoryItems[i].getName()) {
            newItems.push(updatedInventoryItems[i].getName())
        }
    }

    for (i = 0; i < newItems.length; i++) {
        ChatLib.chat(newItems[i])
    }
}).setChatCriteria("&r&eYou dug out a Griffin Burrow${*}")
/*
org.mozilla.javascript.EcmaError: TypeError: Cannot call method "getName" of null (file:/home/horse/.local/share/multimc/instances/1.8.9/.minecraft/config/ChatTriggers/modules/HJES/features/diana.js#115)
    at org.mozilla.javascript.ScriptRuntime.constructError(ScriptRuntime.java:4642)
    at org.mozilla.javascript.ScriptRuntime.constructError(ScriptRuntime.java:4622)
    at org.mozilla.javascript.ScriptRuntime.typeError(ScriptRuntime.java:4651)
    at org.mozilla.javascript.ScriptRuntime.typeError2(ScriptRuntime.java:4666)
    at org.mozilla.javascript.ScriptRuntime.undefCallError(ScriptRuntime.java:4684)
    at org.mozilla.javascript.ScriptRuntime.getPropFunctionAndThis(ScriptRuntime.java:2864)
    at org.mozilla.javascript.optimizer.OptRuntime.callProp0(OptRuntime.java:90)
    at HJES_features_diana_js_1800._c_anonymous_17(HJES/features/diana.js:115)
    at HJES_features_diana_js_1800.call(HJES/features/diana.js)
    at org.mozilla.javascript.ContextFactory.doTopCall(ContextFactory.java:342)
    at org.mozilla.javascript.ScriptRuntime.doTopCall(ScriptRuntime.java:3951)
    at HJES_features_diana_js_1800.call(HJES/features/diana.js)
    at org.mozilla.javascript.ArrowFunction.call(ArrowFunction.java:40)
    at com.chattriggers.ctjs.engine.langs.js.JSLoader.trigger(JSLoader.kt:299)
*/

register("command", (args) => {
    helpMessage = helpHelper({
        'Diana': '__title__',
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
        inquisExists += 1

        ChatLib.say(`/pc [HJES Diana] Inquis `)
        setTimeout(() => {
            ChatLib.say(`/pc x: ${parseInt(entity.getLastX())}, y: ${parseInt(entity.getLastY())}, z: ${parseInt(entity.getLastZ())}`)
        }, 500)

        setTimeout(() => {
            if (inquisExists) {
                ChatLib.chat("&d[HJES Diana]&f Inquis timeout reached. Inquis registerd as dead!")
            }
            inquisExists -= 1
        }, parseInt(Settings.inquisTmeout))

    }
    else if (args == "help") {
        ChatLib.chat(helpMessage)
    }
    else {
        ChatLib.chat(`&d[HJES Diana]&f ${args} is not a valid option. Type '/inquis help' for help.`)
    }
}).setName("inquisitor", true).setAliases("inquis", "inq", "iq")

