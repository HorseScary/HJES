import Settings from "../config"
import { helpHelper, HJESMessage } from "../functions"


let myCheese = false
let inquisExists = 0
let inventoryItems = Array()
let lastMob = String()
let lastBurrowType = String()
let lastTreasure = String()


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

function announceDropsChat() {
    chat = Settings.announceDropsChat
    if (chat == 0) { return ('/gc') }
    else if (chat == 1) { return ('/pc') }
    else if (chat == 2) { return ('/ac') }
}

register("chat", (chat) => {
    registeredChat = new Message(chat).getUnformattedText()

    minosRegEx = /(?:Minos Champion)|(?:Siamese Lynxes)|(?:Minos Hunter)|(?:Minotaur)|(?:Gaia Construct)/
    treasureRegEx = /(?:Crown of Greed)|(?:Washed-up Souvenir)|(?:Griffin Feather)/

    lastTreasure = treasureRegEx.exec(registeredChat)
    lastMob = minosRegEx.exec(registeredChat)

    if (Settings.announceDrops && lastTreasure) {
        ChatLib.say(`${announceDropsChat()} RARE DROP! You dug out a ${lastTreasure}!`)
    }

    if (registeredChat.includes("coins")) {
        ChatLib.chat(registeredChat)
        lastTreasure = registeredChat.split("out")[1]
        lastTreasure.slice(1, lastTreasure.length - 2)
        lastBurrowType = "Treasure"
    }
    else if (lastTreasure) {
        lastBurrowType = "Treasure"
    }
    else if (lastMob) {
        lastBurrowType = "Mob"
    }


    inventoryItems = Player.getInventory().getItems()
}).setChatCriteria("${*}&r&eYou dug out${*}")

// hell
register("chat", (chat) => {
    if (Settings.announceDrops || Settings.burrowOverview) {
        registeredChat = new Message(chat).getUnformattedText()

        updatedInventoryItems = Player.getInventory().getItems()
        newItems = Array()
        goldTotal = 0
        ironTotal = 0
        clawTotal = 0
        enchClawTotal = 0

        for (i = 0; i < inventoryItems.length; i++) {
            if (inventoryItems[i] != null) {
                oldItemName = inventoryItems[i].getName()
                oldItemStackSize = inventoryItems[i].getStackSize()
            }
            if (updatedInventoryItems[i] != null) {
                newItemName = updatedInventoryItems[i].getName()
                newItemStackSize = updatedInventoryItems[i].getStackSize()
            }

            if (updatedInventoryItems[i] == null) {
                continue
            }
            else if (inventoryItems[i] == null) {
                if (newItemName.includes("Claw")) {
                    if (newItemName.includes("Enchanted")) {
                        enchClawTotal += newItemStackSize
                    }
                    clawTotal += newItemStackSize
                    continue
                }
                else if (newItemName.includes("Gold")) { goldTotal += newItemStackSize; continue }
                else if (newItemName.includes("Iron")) { ironTotal += newItemStackSize; continue }

                newItems.push(newItemName)
            }

            else if (oldItemStackSize != newItemStackSize) {
                if (newItemName.includes("Claw")) {
                    if (newItemName.includes("Enchanted")) {
                        enchClawTotal += newItemStackSize - oldItemStackSize
                        continue
                    }
                    clawTotal += newItemStackSize - oldItemStackSize
                }
                else if (newItemName.includes("Gold")) {
                    goldTotal += newItemStackSize - oldItemStackSize
                }
                else if (updatedInventoryItems[i].getName().includes("Iron")) {
                    ironTotal += newItemStackSize - oldItemStackSize
                }
            }
        }

        if (Settings.burrowOverview) {
            if (registeredChat.includes('(1/4)')) { lastBurrowType = "Start" }

            overviewMessage = String()
            overviewMessage += HJESMessage("", "Burrow Overview")

            if (lastBurrowType == "Mob") {
                overviewMessage += `\n&bMob:&2 ${lastMob}\n&bDrops:`

                for (i = 0; i < newItems.length; i++) {
                    overviewMessage += `\n${newItems[i]}`
                }
                if (clawTotal) { overviewMessage += `\n&9${clawTotal}x Ancient Claw` }
                if (enchClawTotal) { overviewMessage += `\n&5${enchClawTotal}x Enchanted Ancient Claw` }
                if (goldTotal) { overviewMessage += `\n&a${goldTotal}x Enchanted Gold` }
                if (ironTotal) { overviewMessage += `\n&a${ironTotal}x Enchanted Gold` }
            }
            else if (lastBurrowType == "Treasure") {
                if (lastTreasure.includes("Griffin")) {
                    overviewMessage += `\n&bTreasure:&9 ${lastTreasure}`
                }
                else {
                    overviewMessage += `\n&bTreasure:&6 ${lastTreasure}`
                }
            }
            else if (lastBurrowType == "Start") {
                overviewMessage += `\n&bStart Burrow`
            }

            ChatLib.chat(overviewMessage)
        }

        if (Settings.announceDrops) {
            function sbeifyDrop(drop) { return (`[SBE] RARE DROP! ${drop}`) }
            dropsList = ["Minos Relic", "Dwarf Turtle Shelmet", "Crochet Tiger Plushie", "Antique Remedies"].slice(0, Settings.announceDropsLevel)
            dropAnnounced = false

            if (lastBurrowType == "Mob") {
                for (i = 0; i <= dropsList.length; i++) {
                    newItems.forEach(element => {
                        if (element.includes(dropsList[i])) {
                            ChatLib.say(`${announceDropsChat()} ${sbeifyDrop(dropsList[i])}`)
                            dropAnnounced = true
                        }
                    })
                }
                if (!dropAnnounced && Settings.announceDropsLevel >= 6) {
                    if (enchClawTotal) { ChatLib.say(`${announceDropsChat()} ` + sbeifyDrop(`Enchanted Ancient Claw`)) }
                    else if (clawTotal) { ChatLib.say(`${announceDropsChat()} ` + sbeifyDrop(`${clawTotal}x Ancient Claw`)) }
                }
            }
        }
    }
}).setChatCriteria("&r&eYou ${*} Griffin ${*}urrow${*}&r&7(${*}")

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

