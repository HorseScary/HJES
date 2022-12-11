import Settings from "../config"
import PogObject from "PogData"
import { helpHelper, HJESMessage, webhook, getCurrentTimestamp } from "../functions"

let nextEyedropsTime = Int()
let notifyEyedrops = false
let eyedropsUsed = false
let eyedropsUsedTime = Int()

PogObject = new PogObject("HJES", {
    nextEyedropsTime: Int(),
    notifyEyedrops: false,
    eyedropsUsed: false,
    eyedropsUsed: Int()
})

register("chat", () => {
    if (!eyedropsUsed && Settings.eyedrops) {
        PogObject.nextEyedropsTime = getCurrentTimestamp() + 86400
        PogObject.eyedropsUsed = true
        PogObject.notifyEyedrops = false
    }
}).setChatCriteria("&r&9You applied the eyedrops on the minion. 1 charge left!&r")

register("tick", () => {
    if (Settings.eyedrops) {
        if (PogObject.eyedropsUsed) {
            PogObject.eyedropsUsedTime = getCurrentTimestamp() + 60
        }
        if (getCurrentTimestamp() > eyedropsUsedTime) {
            PogObject.eyedropsUsed = false
        }
    }
})

register("chat", (message) => {
    if (message.removeFormatting() == "You applied the eyedrops on the minion and ran out!" && !eyedropsUsed) {
        webhook(`Eyedrops used. Next eyedrops at <t:${nextEyedropsTime}:T> (<t:${nextEyedropsTime}:R>) (unix time in seconds: ${nextEyedropsTime}\n (put this as time for /changeeyedropstime if you close mc or ct reload))`)
        PogObject.notifyEyedrops = false
    }
}).setCriteria("${message}").setContains()

register("tick", () => {
    if (getCurrentTimestamp() > PogObject.nextEyedropsTime && !PogObject.notifyEyedrops) {
        PogObject.notifyEyedrops = true
        webhook(`<@473335128375033857> eyedrops time!`)
    }
})

register("command", (time) => {
    if (time) {
        ChatLib.chat(HJESMessage(`Time set to ${time}`))
        PogObject.nextEyedropsTime = time
    } else {
        ChatLib.chat(HJESMessage("This command requires a time."))
    }
}).setName("changeeyedropstime")

register("command", () => {
    ChatLib.chat(HJESMessage(`Next eyedrops in ${PogObject.nextEyedropsTime}`))
}).setName("nexteyedropstime")