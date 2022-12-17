import Settings from "../config"
import PogObject from "PogData"
import { helpHelper, HJESMessage, webhook, getCurrentTimestamp } from "../functions"

/*
let nextEyedropsTime = Int()
let notifyEyedrops = false
let eyedropsUsed = false
let eyedropsUsedTime = Int()
*/

PogObject = new PogObject("HJES", {
    nextEyedropsTime: Number(),
    notifyEyedrops: false,
    eyedropsUsed: false,
    eyedropsUsedTime: Number(),
    notifyNoEyedrops: false
})

PogObject.autosave()

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
            PogObject.eyedropsUsedTime = getCurrentTimestamp() + 120
        }
        if (getCurrentTimestamp() > PogObject.eyedropsUsedTime) {
            PogObject.eyedropsUsed = false
        }
    }
})

register("chat", (message) => {
    if (message.removeFormatting() == "You applied the eyedrops on the minion and ran out!" && !PogObject.eyedropsUsed) {
        webhook(`Eyedrops used. Next eyedrops at <t:${PogObject.nextEyedropsTime}:T> (<t:${PogObject.nextEyedropsTime}:R>) (unix time in seconds: ${PogObject.nextEyedropsTime}\n (put this as time for /changeeyedropstime if you close mc or ct reload))`, Settings.webhook)
        PogObject.notifyEyedrops = false
        PogObject.notifyNoEyedrops = false
    }
}).setCriteria("${message}").setContains()

register("tick", () => {
    if (getCurrentTimestamp() > PogObject.nextEyedropsTime && !PogObject.notifyEyedrops) {
        PogObject.notifyEyedrops = true
        webhook(`<@${Settings.discord}> eyedrops time!`, Settings.webhook)
    }
})

register("tick", () => {
    if(Settings.eyedrops) {
        if(PogObject.nextEyedropsTime == 0 && !PogObject.notifyNoEyedrops) {
            PogObject.notifyNoEyedrops = true
            webhook(`<@${Settings.discord}> eyedrops time = 0, you should probably fix`, Settings.webhook)
        }
    }
})

register("command", (time) => {
    if (time) {
        ChatLib.chat(HJESMessage(`Time set to ${time}`))
        PogObject.nextEyedropsTime = time
        webhook(`Eyedrops time changed. Next eyedrops at <t:${PogObject.nextEyedropsTime}:T> (<t:${PogObject.nextEyedropsTime}:R>) (unix time in seconds: ${PogObject.nextEyedropsTime}\n (put this as time for /changeeyedropstime if you close mc or ct reload))`, Settings.webhook)
        PogObject.notifyNoEyedrops = false
    } else {
        ChatLib.chat(HJESMessage("This command requires a time. /nexteyedropstime to see next eyedrops time."))
    }
}).setName("changeeyedropstime", true)

register("command", () => {
    ChatLib.chat(HJESMessage(`Next eyedrops in ${PogObject.nextEyedropsTime}`))
}).setName("nexteyedropstime")

