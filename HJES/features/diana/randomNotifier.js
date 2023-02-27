import Settings from "../../config"
import { HJESMessage } from "../../functions";

let randomDetected = false
let partyPlayers = 0

register("tick", () => {
    if (Settings.randomNotifier && partyPlayers) {
        players = TabList.getNames().find((name) => name.includes("Players"));

        if (players) {
            players = parseInt(players.split("(")[1])
            if (players > partyPlayers) {
                if (!randomDetected) {
                    ChatLib.chat(HJESMessage("Theres a random in the lobby!", "Diana"))
                    randomDetected = true
                }
            }
            else if (players <= partyPlayers && randomDetected) {
                ChatLib.chat(HJESMessage("The random is gone!", "Diana"))
                randomDetected = false
            }
            else {
                randomDetected = false
            }
        }
    }
})

register("worldLoad", () => {
    if (Settings.randomNotifier && !partyPlayers) {
        ChatLib.chat(HJESMessage("Run /pl or /setpartyplayers for random notifier to work!", "Diana"))
    }
})

register("command", (players) => {
    partyPlayers = parseInt(players)
}).setName("setPartyPlayers")

register("command", () => {
    ChatLib.chat(HJESMessage(`There are ${partyPlayers} in your party.`, "Diana"))
}).setName("getPartyPlayers")

register("chat", (chat) => {
    registeredChat = new Message(chat).getUnformattedText()
    partyPlayers = parseInt(registeredChat.split("(")[1])

    ChatLib.chat(HJESMessage(`partyPlayers has been set to ${partyPlayers}`, "Diana"))
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