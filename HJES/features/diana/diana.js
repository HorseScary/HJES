import Settings from "../config"
import { getRandomInt, helpHelper, HJESMessage, getClosestWarp } from "../functions"
import "./randomNotifier"

let myCheese = false
let inquisExists = 0
let inventoryItems = Array()
let lastMob = String()
let lastBurrowType = String()
let lastTreasure = String()
let coinValues = [10, 15, 25, 40, 50, 75, 100, 250, 500, 750]

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
        myCheese = false;
        ChatLib.say('/pc [HJES Diana] Cheese obtained!')
    }
}).setChatCriteria("&r&e&lCHEESE!&r&7 You buffed &r${*}&r&7 giving them &r&b+${*}✯ Magic Find&r&7 for &r&a${*}&r&7 seconds!&r")

// rejoins lobby when cheese obtained message is registered
register("chat", () => {
    if (Settings.rejoinOnCheese) {
        ChatLib.say('/play sb')
    }
}).setChatCriteria("&r&9Party &8>${*}&f: &r[HJES Diana] Cheese obtained!&r")

register("chat", () => {
    if (Settings.announceInquis) {
        // Looks for entity who's name includes "inquis"
        World.getAllEntities().forEach(entity => {
            if (entity.getName().toLowerCase().includes("inquis")) {
                inquisExists += 1

                inquisX = parseInt(entity.getX())
                inquisY = parseInt(entity.getY())
                inquisZ = parseInt(entity.getZ())

                inquisClosestWarp = getClosestWarp(inquisX, inquisY, inquisZ)

                ChatLib.say(`/pc [HJES Diana] Inquis`)
                setTimeout(() => {
                    ChatLib.say(`/pc x: ${inquisX}, y: ${inquisY}, z: ${inquisZ} [HJES Diana]`)
                }, 500)

                /*
                setTimeout(() => {
                    if (Settings.nearestInquisWarp) {
                        ChatLib.say(`/pc Closest location to inquis is ${inquisClosestWarp}`)
                    }
                }, 1000)
                */

                setTimeout(() => {
                    if (inquisExists > 0) {
                        inquisExists -= 1
                    }
                    if (inquisExists == 0) {
                        ChatLib.chat(HJESMessage("Inquis timeout reached. Inquis registered as dead!", "Diana"))
                    }
                }, parseInt(Settings.inquisTimeout))
            }

            // same thing as inquis code, but doesn't change the inquisExists variable
            else if (entity.getName().toLowerCase().includes("minos champion") && Settings.announceChamp) {
                ChatLib.say(`/pc [HJES Diana] Champ`)

                champX = parseInt(Player.getLastX())
                champY = parseInt(Player.getLastY())
                champZ = parseInt(Player.getLastZ())

                ChatLib.chat(`x:${champX}\ny:${champY}\nz:${champZ}\n${entity.getName()}`)

                champClosestWarp = getClosestWarp(champX, champY, champZ)

                setTimeout(() => {
                    ChatLib.say(`/pc x: ${champX}, y: ${champY}, z: ${champZ} [HJES Diana]`)
                    ChatLib.chat(HJESMessage(champClosestWarp, "Diana"))
                }, 1000)


                setTimeout(() => {
                    ChatLib.chat("&d[HJES Diana]&f Champ timeout reached. Champ registered as dead!")
                }, parseInt(Settings.champTimeout))
            }
        })
    }
}).setChatCriteria("${*}&r&eYou dug out &r&2a Minos Champion&r&e!&r")

register("chat", (chat) => {
    if (Settings.getClosestWarp) {
        registeredChat = new Message(chat).getUnformattedText()
        splitChat = registeredChat.split(":")
        x = parseInt(splitChat[2])
        y = parseInt(splitChat[3])
        z = parseInt(splitChat[4])

        closestWarp = getClosestWarp(x, y, z, true)

        if (closestWarp) {
            ChatLib.chat(HJESMessage(`The closest warp is ${closestWarp}.`, "Diana"))
        }
        else {
            ChatLib.chat(HJESMessage(`You are closer than any warp!`, "Diana"))
        }
    }

    //    &r&9Party &8> &b[MVP&5+&b] HorseScary&f: &rx: -88, y: 87, z: 58 [HJES Diana]&r
}).setCriteria("&r&9Party &8>${*}[HJES Diana]&r")

// 😼
register("chat", () => {
    if (Settings.runic) {
        ChatLib.say("/pc It was runic, I swear!")
    }
}).setChatCriteria("&r&c ☠ ${*} killed by &r&2Exalted ${*}")


// puts the items in your inventory in chat. for debugging
register("command", () => {
    items = Player.getInventory().getItems()
    for (i = 0; i < items.length; i++) {
        ChatLib.chat(items[i])
    }

}).setName("hjesgetitems")

// returns chat command based on the announceDropsChat setting
function announceDropsChat() {
    chat = Settings.announceDropsChat
    if (chat == 0) { return ('/gc') }
    else if (chat == 1) { return ('/pc') }
    else if (chat == 2) { return ('/ac') }
}

register("chat", (chat) => {
    registeredChat = new Message(chat).getUnformattedText()

    // returns the mob/treasure type if it exists within a string, returns null if it doesn't
    minosRegEx = /(?:Minos Champion)|(?:Siamese Lynxes)|(?:Minos Hunter)|(?:Minotaur)|(?:Gaia Construct)/
    treasureRegEx = /(?:Crown of Greed)|(?:Washed-up Souvenir)|(?:Griffin Feather)/

    lastTreasure = treasureRegEx.exec(registeredChat)
    lastMob = minosRegEx.exec(registeredChat)

    if (registeredChat.includes("coins")) {
        // takes out the coin part out of the coin drop message
        lastTreasure = registeredChat.split("out")[1]
        lastTreasure = lastTreasure.slice(1, lastTreasure.length - 1)
        lastBurrowType = "Treasure"

        if (Settings.announceCoins) {
            coins = parseInt(lastTreasure.split('coins')[0])
            coinsToAnnounce = 0
            if (coins >= coinValues[Settings.announceCoinsAtValue]) {
                ChatLib.say(`${announceDropsChat()} Wow! You dug out ${coins},000 coins!`)
            }
        }
    }

    else if (lastTreasure) {
        lastTreasure = lastTreasure[0]
        lastBurrowType = "Treasure"

        if (Settings.announceDrops) {
            level = Settings.announceDropsLevel
            if (level >= 1 && lastTreasure.includes("Crown of Greed")) {
                ChatLib.say(`${announceDropsChat()} RARE DROP! You dug out a ${lastTreasure}!`)
            }
            else if (level >= 2 && lastTreasure.includes("Washed-up")) {
                ChatLib.say(`${announceDropsChat()} RARE DROP! You dug out a ${lastTreasure}!`)
            }
            else if (level >= 3 && lastTreasure.includes("Griffin Feather")) {
                ChatLib.say(`${announceDropsChat()} RARE DROP! You dug out a ${lastTreasure}!`)
            }
        }
    }
    else if (lastMob) {
        lastBurrowType = "Mob"
    }

    inventoryItems = Player.getInventory().getItems()
}).setChatCriteria("${*}&r&eYou dug out${*}")

register("chat", (chat) => {
    if (Settings.announceDrops || Settings.burrowOverview) {
        registeredChat = new Message(chat).getUnformattedText()
        updatedInventoryItems = Player.getInventory().getItems()
        newItems = Array()
        goldTotal = 0
        ironTotal = 0
        clawTotal = 0
        enchClawTotal = 0

        if (registeredChat.includes('(1/4)')) { lastBurrowType = "Start" }

        for (i = 0; i < inventoryItems.length; i++) {
            // Item.getName wont work on null (since null isn't an item) and empty slots return null
            if (inventoryItems[i] != null) {
                oldItemName = inventoryItems[i].getName()
                oldItemStackSize = inventoryItems[i].getStackSize()
            }
            if (updatedInventoryItems[i] != null) {
                newItemName = updatedInventoryItems[i].getName()
                newItemStackSize = updatedInventoryItems[i].getStackSize()
            }

            // if theres nothing in the updated inventory slots, theres no reason to do anything else with them
            if (updatedInventoryItems[i] == null) {
                continue
            }

            // since last statement continues if updated slots are empty, we can assume that every updated slot has something
            else if (inventoryItems[i] == null) {
                // if the new item is one of the stackable things, it adds to the variable for the stackable things
                if (newItemName.includes("Claw")) {
                    if (newItemName.includes("Enchanted")) {
                        enchClawTotal += newItemStackSize
                        continue
                    }
                    clawTotal += newItemStackSize
                    continue
                }
                else if (newItemName.includes("Gold")) { goldTotal += newItemStackSize; continue }
                else if (newItemName.includes("Iron")) { ironTotal += newItemStackSize; continue }

                newItems.push(newItemName)
            }

            // checks for differences in stack sizes for stackable items
            // adds the difference between new stack size and old stack size
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

            overviewMessage = String()
            overviewMessage += HJESMessage("", "Burrow Overview")

            if (lastBurrowType == "Mob") {
                overviewMessage += `\n&bMob:&2 ${lastMob}\n&bDrops:`

                for (i = 0; i < newItems.length; i++) {
                    overviewMessage += `\n${newItems[i]}`
                }
                // if these are not zero it will add them to the message
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
            // TODO: fix "crochet" drop level not including remedies
            function sbeifyDrop(drop) { return (`[SBE] RARE DROP! ${drop}`) }
            dropsList = ["Minos Relic", "Dwarf Turtle Shelmet", "Crochet Tiger Plushie"].slice(0, Settings.announceDropsLevel + 1)
            if (dropsList.length == 3) {
                dropsList.push("Antique Remedies")
            }
            dropsList = ['Enchanted Book', 'Daedalus Stick'].concat(dropsList)
            dropAnnounced = false
            rarestDrop = String()
            dropMessage = String()

            if (lastBurrowType == "Mob") {
                for (i = 0; i <= dropsList.length; i++) {
                    newItems.forEach(element => {
                        if (element.includes(dropsList[i]) && !dropAnnounced) {
                            rarestDrop = dropsList[i]
                            dropAnnounced = true
                        }
                    })
                }

                if (!dropAnnounced && Settings.announceDropsLevel == 4) {
                    if (enchClawTotal) { rarestDrop = `Enchanted Ancient Claw` }
                    else if (clawTotal) { rarestDrop = `${clawTotal}x Ancient Claw` }
                }

                if (rarestDrop.includes('Enchanted Book') || rarestDrop.includes('Daedalus Stick')) {
                    dropMessage = `${announceDropsChat()} RARE DROP! ${rarestDrop} (+${getRandomInt(100, 350)}% ✯ Magic Find)`
                }
                else {
                    dropMessage = `${announceDropsChat()} ${sbeifyDrop(rarestDrop)}`
                }

                if (rarestDrop) {
                    ChatLib.say(dropMessage)
                }
            }
        }
    }
    // Chat criteria is weird cause it needs to account for 2 types of burrows and they are capitalized differently
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
                ChatLib.chat("&d[HJES Diana]&f Inquis timeout reached. Inquis registered as dead!")
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
