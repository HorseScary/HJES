import Settings from "../config"
import { getLocation } from "../functions"

register("worldLoad", () => {
    if (getLocation().contains("Garden") && Settings.visitorAlert) {
        ChatLib.chat("hi")
    }
})