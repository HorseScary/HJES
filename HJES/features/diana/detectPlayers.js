import Settings from "../../config"
import { HJESMessage } from "../../functions";

let totalPlayers = 0
let randomDetected = false

register("tick", () => {
    if (Settings.randomNotifier) {
        players = TabList.getNames().find((name) => name.includes("Players"));

        if (players) {
            players = parseInt(players.split("(")[1])
            if (players > Settings.partyPlayers) {
                if (!randomDetected) {
                    ChatLib.chat(HJESMessage("Theres a random in the lobby!", "Diana"))
                    randomDetected = true
                }
            }
            else {
                randomDetected = false
            }
        }
    }
})

register("command", () => {
    ChatLib.chat(`players: ${totalPlayers}`)
}).setName("showTotalPlayers")