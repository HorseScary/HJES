import Settings from "../config"
import { helpHelper, HJESMessage, webhook, getCurrentTimestamp } from "../functions"

let nextEyedropsTime = Int()
let notifyEyedrops = false
let eyedropsUsed = false
let eyedropsUsedTime = Int()

register("chat", () => {
    if (!eyedropsUsed && Settings.eyedrops) {
        nextEyedropsTime = getCurrentTimestamp() + 86400
        eyedropsUsed = true
    }
}).setChatCriteria("&r&9You applied the eyedrops on the minion. 1 charge left!&r")

register("tick", () => {
    if (Settings.eyedrops) {
        if (eyedropsUsed) {
            eyedropsUsedTime = getCurrentTimestamp() + 60
        }
        if (getCurrentTimestamp() > eyedropsUsedTime) {
            eyedropsUsed = false
        }
    }
})

register("chat", (message) => {
    if (message.removeFormatting() == "You applied the eyedrops on the minion and ran out!" && !eyedropsUsed) {
        webhook(`Eyedrops used. Next eyedrops at <t:${nextEyedropsTime}:T> (<t:${nextEyedropsTime}:R>) (unix time in seconds: ${nextEyedropsTime} (put this as time for /changeeyedropstime if you close mc or ct reload))`)
    }
}).setCriteria("${message}").setContains()

register("tick", () => {
    if (getCurrentTimestamp() > nextEyedropsTime && !notifyEyedrops) {
        notifyEyedrops = true
        webhook(`<@473335128375033857> eyedrops time!`)
    }
})

register("command", (time) => {
    if (time) {
        ChatLib.chat(HJESMessage(`Time set to ${time}`))
        nextEyedropsTime = time
    } else {
        ChatLib.chat(HJESMessage("This command requires a time."))
    }
}).setName("changeeyedropstime")