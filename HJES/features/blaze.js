import Settings from "../config"
import { minToMillisecond, HJESMessage } from "../functions"

var gummiesEaten = 0
var wispSplashed = 0
var gummyTimeEaten = 1676383314645
var wispTimeSplashed = 1676383314645


register("chat", () => {
    gummyTimeEaten = Client.getSystemTime()

    if (Settings.notifyReheated) {
        gummiesEaten += 1
        setTimeout(() => {
            if (gummiesEaten == 1) {
                Client.showTitle("&aGummy Warning!", "&agummy go bye bye", 0, 60, 20)
                World.playSound("random.orb", 1, 1)
            }

            gummiesEaten -= 1
        }, minToMillisecond(60 - Settings.notifyReheatedOffset))
    }
}).setCriteria("&r&aYou ate a &r&aRe-heated Gummy Polar Bear&r&a!&r")

register("chat", () => {
    wispTimeSplashed = Client.getSystemTime()

    if (Settings.notifyWisp) {
        wispSplashed += 1
        setTimeout(() => {
            if (wispSplashed == 1) {
                Client.showTitle("&7Wisp Warning!", "&7wisp pot is die", 0, 60, 20)
                World.playSound("random.orb", 1, 1)
            }

            wispSplashed -= 1
        }, minToMillisecond(30 - Settings.notifyWispOffset))
    }
}).setCriteria("&a&lBUFF! &fYou splashed yourself with &r&bWisp's Ice-Flavored Water I&r&f! Press TAB or type /effects to view your active effects!&r")

register("command", () => {
    gummyTimeLeft = Client.getSystemTime() - gummyTimeEaten
    wispTimeLeft = Client.getSystemTime() - wispTimeSplashed

    if (gummyTimeLeft >= minToMillisecond(60)) {
        gummyTimeFormatted = "&cEffect Inactive!"
    }
    else {
        gummyTimeFormatted = `${parseInt(gummyTimeLeft / 60000)}:${parseInt((gummyTimeLeft % 60000) / 1000)}`
    }

    if (wispTimeLeft >= minToMillisecond(30)) {
        wispTimeFormatted = "&cEffect Inactive!"
    }
    else {
        wispTimeFormatted = `${parseInt(wispTimeLeft / 60000)}:${parseInt((wispTimeLeft % 60000) / 1000)}`
    }

    ChatLib.chat(HJESMessage(`\n&aGummy: &f${gummyTimeFormatted}\n&7Wisp: &f${wispTimeFormatted}`, "Blaze"))
}).setName("blazeEffectTime")