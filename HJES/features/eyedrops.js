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
    eyedropsUsedTime: Number()
})

register("chat", (message) => {
    if(message.removeFormatting().startsWith("You applied the eyedrops on the minion. 1 charge left!")) {
        if (!eyedropsUsed && Settings.eyedrops) {
            PogObject.nextEyedropsTime = getCurrentTimestamp() + 86400
            PogObject.save()
        }
    }
})
register("tick", () => {
    if (Settings.eyedrops) {
        if (getCurrentTimestamp() > PogObject.eyedropsUsedTime && PogObject.eyedropsUsed) {
            PogObject.eyedropsUsed = false
            PogObject.save()
        }
    }
})

register("chat", (message) => {
    if (message.removeFormatting() == "You applied the eyedrops on the minion and ran out!" && !PogObject.eyedropsUsed) {
        webhook(`Eyedrops used. Next eyedrops at <t:${PogObject.nextEyedropsTime}:T> (<t:${PogObject.nextEyedropsTime}:R>) (unix time in seconds: ${PogObject.nextEyedropsTime}\n (put this as time for /changeeyedropstime if you close mc or ct reload))`, Settings.webhook)
        PogObject.notifyEyedrops = false
        PogObject.eyedropsUsed = true
        PogObject.eyedropsUsedTime = getCurrentTimestamp() + 120
        PogObject.save()
    }
}).setCriteria("${message}").setContains()

register("tick", () => {
    if (getCurrentTimestamp() > PogObject.nextEyedropsTime && !PogObject.notifyEyedrops) {
        PogObject.notifyEyedrops = true
        webhook(`<@${Settings.discord}> eyedrops time!`, Settings.webhook)
        PogObject.save()
    }
})

register("command", (time) => {
    if (time) {
        ChatLib.chat(HJESMessage(`Time set to ${time}`))
        PogObject.nextEyedropsTime = time
        PogObject.save()
        webhook(`Eyedrops time changed. Next eyedrops at <t:${PogObject.nextEyedropsTime}:T> (<t:${PogObject.nextEyedropsTime}:R>) (unix time in seconds: ${PogObject.nextEyedropsTime}\n (put this as time for /changeeyedropstime if you close mc or ct reload))`, Settings.webhook)
    } else {
        ChatLib.chat(HJESMessage("This command requires a time. /nexteyedropstime to see next eyedrops time."))
    }
}).setName("changeeyedropstime", true)

register("command", () => {
    ChatLib.chat(HJESMessage(`Next eyedrops in ${PogObject.nextEyedropsTime}`))
}).setName("nexteyedropstime")

register("command", () => {
    ChatLib.chat(HJESMessage(`nextEyedropsTime = ${PogObject.nextEyedropsTime}`))
    ChatLib.chat(HJESMessage(`notifyEyedrops = ${PogObject.notifyEyedrops}`))
    ChatLib.chat(HJESMessage(`eyedropsUsed = ${PogObject.eyedropsUsed}`))
    ChatLib.chat(HJESMessage(`eyedropsUsedTime = ${PogObject.eyedropsUsedTime}`))
    ChatLib.chat(HJESMessage(`currentTime = ${getCurrentTimestamp()}`))
}).setName("hjesdebug")

register("command", () => {
    PogObject.notifyEyedrops = !PogObject.notifyEyedrops
    ChatLib.chat(HJESMessage(`notifyEyedrops = ${PogObject.notifyEyedrops}`))
}).setName("changenotifyeyedrops")

register("command", () => {
    PogObject.eyedropsUsed = !PogObject.eyedropsUsed
    ChatLib.chat(HJESMessage(`eyedropsUsed = ${PogObject.eyedropsUsed}`))
}).setName("changeeyedropsused")

register("command", () => {
    PogObject.save()
}).setName("eyedropssave")