import Settings from "../config"
import { minToMillisecond, HJESMessage, timeFormat } from "../functions"

var gummiesEaten = 0
var wispSplashed = 0
var gummyTimeEaten = 0
var wispTimeSplashed = 0


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
    effectTimes()
}).setName("blazeEffectTime")

register("chat", () => {
    effectTimes()
}).setCriteria("&r   &r&eBlaze Slayer LVL${*}")

function effectTimes() {
    gummyTimeLeft = minToMillisecond(60) - (Client.getSystemTime() - gummyTimeEaten)
    wispTimeLeft = minToMillisecond(30) - (Client.getSystemTime() - wispTimeSplashed)

    if (gummyTimeLeft <= 0) {
        gummyTimeFormatted = "&cEffect Inactive!"
    }
    else {
        gummyTimeFormatted = timeFormat(gummyTimeLeft)
    }

    if (wispTimeLeft <= 0) {
        wispTimeFormatted = "&cEffect Inactive!"
    }
    else {
        wispTimeFormatted = timeFormat(wispTimeLeft)
    }

    ChatLib.chat(HJESMessage(`\n&aGummy: &f${gummyTimeFormatted}\n&7Wisp: &f${wispTimeFormatted}`, "Blaze"))
}