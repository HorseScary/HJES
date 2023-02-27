import Settings from "../../config"
import { HJESMessage, getClosestWarp } from "../../functions"

register("chat", (chat) => {
    if (Settings.getClosestWarp) {
        registeredChat = new Message(chat).getUnformattedText()
        splitChat = registeredChat.split(":")
        x = parseInt(splitChat[2])
        y = parseInt(splitChat[3])
        z = parseInt(splitChat[4])

        closestWarp = getClosestWarp(x, y, z, true)

        if (closestWarp) {
            ChatLib.chat(HJESMessage(`The closest warp is ${closestWarp}.`, "Diana"))
        }
        else {
            ChatLib.chat(HJESMessage(`You are closer than any warp!`, "Diana"))
        }
    }
}).setCriteria("&r&9Party &8>${*}[HJES Diana]&r")

register("chat", () => {
    World.playSound("random.orb", 1, 1)
}).setCriteria("&r&9Party &8>${*}[HJES Diana] Inquis&r")