import Settings from "../../config"
import { HJESMessage, helpHelper } from "../../functions";

let randomDetected = false
let lobbyChecked = false
let lobbyPlayers = 0
let partyPlayers = 1

register("tick", () => {
    players = TabList.getNames().find((name) => name.includes("Players"));
    if (players) {
        players = parseInt(players.split("(")[1])

        // private finder
        if (Settings.privateFinder && !lobbyChecked) {
            if (players == 1) {
                randomDetected = false
                ChatLib.chat(HJESMessage("Private lobby!"))
                World.playSound("random.orb", 1, 1)
            }
        }

        // random notifier
        if (Settings.randomNotifier) {
            if (players > partyPlayers) {
                randoms = players - partyPlayers
                if (!lobbyChecked) {
                    if (randoms != 1) {
                        ChatLib.chat(HJESMessage(`There is ${randoms} random in this lobby.`))
                    }
                    else {
                        ChatLib.chat(HJESMessage(`There are ${randoms} randoms in this lobby.`))
                    }
                    randomDetected = true
                }
                else {
                    if (!randomDetected) {
                        ChatLib.chat(HJESMessage("Theres a random in the lobby!"))
                        World.playSound("random.orb", 1, 1)
                        randomDetected = true
                    }
                    // compares current player count to player count on last tick
                    else if (players > lobbyPlayers) {
                        ChatLib.chat(HJESMessage(`Another random has joined! There are now ${players - partyPlayers} randoms.`))
                    }
                    else if (players < lobbyPlayers) {
                        if (randoms == 1) {

                            ChatLib.chat(HJESMessage(`A random has left! There is now ${randoms} random.`))
                        }
                        else {
                            ChatLib.chat(HJESMessage(`A random has left! There are now ${randoms} randoms.`))
                        }
                    }
                    // if player count <= partyPlayers and a random has been detected...
                }
            }
            else if (randomDetected) {
                ChatLib.chat(HJESMessage("The random is gone!"))
                randomDetected = false
            }

            lobbyPlayers = players
        }
        lobbyChecked = true
    }
})

register("worldLoad", () => {
    lobbyChecked = false
})

register("command", (args) => {
    if (args == "help") {
        ChatLib.chat(helpHelper({
            "Random Notifier": "__title__",
            "partyPlayers [num]": "__custom__",
            "get": "displays value of partyPlayers"

        }))
    }
    else if (!args || args == "get") {
        if (partyPlayers == 1) {
            ChatLib.chat(HJESMessage(`There is ${partyPlayers} player in your party.`))

        }
        else {
            ChatLib.chat(HJESMessage(`There are ${partyPlayers} players in your party.`))
        }
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
    partyPlayers = 1
}).setCriteria("${*}has disbanded the party!&r")

register("chat", () => {
    partyPlayers = 1
}).setCriteria("&cThe party was disbanded because all invites expired and the party was empty.&r")