import Settings from "../config"
import { say } from "../handlers/say"


let warpback = false
let warpbacklimbo = false

register("chat", () => {
    if (Settings.afk2) {
        setTimeout(() => {
            say("/play sb")
            setTimeout(() => {
                say("/is")
            }, 4000)
        }, 2000)
    }
}).setChatCriteria("&r  &r&f&l➤ &r&6You have reached your Hype limit! Add Hype to Prototype Lobby minigames by right-clicking with the Hype Diamond!&r")

register("chat", () => {
    warpback = true
}).setChatCriteria("&r&7Evacuating to Hub...&r")

register("worldLoad", () => {
    if (warpback && Settings.afk) {
        setTimeout(() => {
            say('/is')
            warpback = false
        }, 4000) // 1s
    }
})

register("chat", () => {
    warpbacklimbo = true
}).setChatCriteria("&cYou were spawned in Limbo.&r")

register("chat", () => {
    warpbacklimbo = true
}).setChatCriteria("&cYou are AFK. Move around to return from AFK.&r")

register("tick", () => {
    if (warpbacklimbo && Settings.afk) {
        warpbacklimbo = false
        setTimeout(() => {
            say("/l")
            setTimeout(() => {
                say("/play sb")
                setTimeout(() => {
                    say("/is")
                }, 4000)
            }, 2000)
        }, 1000)
    }
})