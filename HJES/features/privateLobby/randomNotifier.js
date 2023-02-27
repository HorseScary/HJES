import Settings from "../../config"
import { HJESMessage, helpHelper } from "../../functions";

let randomDetected = false
let lobbyChecked = true
let lobbyPlayers = 0
let partyPlayers = 1

register("tick", () => {
    players = TabList.getNames().find((name) => name.includes("Players"));
    if (players) {
        players = parseInt(players.split("(")[1])

        if (Settings.privateFinder && !lobbyChecked) {
            if (players == 1) {
                lobbyChecked = true
                randomDetected = false
                ChatLib.chat(HJESMessage("Private lobby!"))
                World.playSound("random.orb", 1, 1)
            }
        }

        if (Settings.randomNotifier) {
            if (players > partyPlayers) {
                if (!randomDetected) {
                    ChatLib.chat(HJESMessage("Theres a random in the lobby!"))
                    World.playSound("random.orb", 1, 1)
                    randomDetected = true
                }
                else if (players > lobbyPlayers) {
                    ChatLib.chat(HJESMessage(`Another random has joined! There are now ${players - partyPlayers} randoms.`))
                }
                else if (players < lobbyPlayers) {
                    ChatLib.chat(HJESMessage(`A random has left! There are now ${players - partyPlayers} randoms.`))
                }
            }
            else if (randomDetected) {
                ChatLib.chat(HJESMessage("The random is gone!"))
                randomDetected = false
            }

            lobbyPlayers = players
        }

    }

})

register("worldLoad", () => {
    if (Settings.randomNotifier && !partyPlayers) {
        ChatLib.chat(HJESMessage("Run /pl or /partyplayers for random notifier to work!"))
    }

    if (Settings.privateFinder) {
        lobbyChecked = false
    }
})

register("command", (args) => {
    if (args == "get") {
        if (partyPlayers == 1) {
            ChatLib.chat(HJESMessage(`There is ${partyPlayers} player in your party.`))

        }
        else {
            ChatLib.chat(HJESMessage(`There are ${partyPlayers} players in your party.`))
        }
    }
    else if (args == "help" || !args) {
        ChatLib.chat(helpHelper({
            "Random Notifier": "__title__",
            "partyPlayers [num]": "__custom__",
            "get": "displays value of partyPlayers"

        }))
    }
    else {
        players = parseInt(args)
        if (isNaN(players)) {
            ChatLib.chat(HJESMessage(`${args} is not a number!`))
        }
        else {
            partyPlayers = players
            ChatLib.chat(HJESMessage(`partyPlayers has been set to ${partyPlayers}`))
        }
    }
}).setName("partyPlayers", true).setAliases('pp')

register("chat", (chat) => {
    registeredChat = new Message(chat).getUnformattedText()
    partyPlayers = parseInt(registeredChat.split("(")[1])

    setTimeout(() => {
        ChatLib.chat(HJESMessage(`partyPlayers has been set to ${partyPlayers}`))
    }, 10)
}).setCriteria("&6Party Members (${*})&r")

register("chat", () => {
    partyPlayers += 1
}).setCriteria("${*}joined the party.&r")

register("chat", () => {
    partyPlayers -= 1
}).setCriteria("${*}has left the party.&r")

register("chat", () => {
    partyPlayers = 0
}).setCriteria("${*}has disbanded the party!&r")

register("chat", () => {
    partyPlayers = 0
}).setCriteria("&cThe party was disbanded because all invites expired and the party was empty.&r")