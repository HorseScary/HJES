import Settings from "../../config"
import { HJESMessage } from "../../functions"

let worldLoadCooldown = true

register("chat", () => {
    if (Settings.eggReady) {
        setTimeout(() => {
            if (!worldLoadCooldown) {
                ChatLib.chat(HJESMessage("Chicken Head ready!"))
            }
        }, 20000)
    }
}).setCriteria("&r&aYou laid an egg!&r")

register("worldLoad", () => {
    worldLoadCooldown = true
    if (Settings.eggReady) {
        setTimeout(() => {
            ChatLib.chat(HJESMessage("Chicken Head ready!"))
            worldLoadCooldown = false
        }, 20000)
    }
})