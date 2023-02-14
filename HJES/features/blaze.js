import Settings from "../config"
import { convertToMillisecond } from "../functions"

var gummiesEaten = 0
var wispSplashed = 0

register("chat", () => {
    if (Settings.notifyReheated) {
        gummiesEaten += 1
        setTimeout(() => {
            if (gummiesEaten == 1) {
                Client.showTitle("&aGummy Warning!", "&agummy go bye bye", 0, 60, 20)
                World.playSound("random.orb", 1, 1)
            }

            gummiesEaten -= 1
        }, convertToMillisecond(60 - Settings.notifyReheatedOffset))
    }
}).setCriteria("&r&aYou ate a &r&aRe-heated Gummy Polar Bear&r&a!&r")

register("chat", () => {
    if (Settings.notifyWisp) {
        wispSplashed += 1
        setTimeout(() => {
            if (wispSplashed == 1) {
                Client.showTitle("&7Wisp Warning!", "&7wisp pot is die", 0, 60, 20)
                World.playSound("random.orb", 1, 1)
            }

            wispSplashed -= 1
        }, convertToMillisecond(30 - Settings.notifyWispOffset))
    }
}).setCriteria("&a&lBUFF! &fYou splashed yourself with &r&bWisp's Ice-Flavored Water I&r&f! Press TAB or type /effects to view your active effects!&r")