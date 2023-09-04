import Settings from "../../config"
import { HJESMessage, } from "../../functions"

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

let cexp = 0
let cexpUp = false
let hypixelSucks = false
let delay = 25
let hypeBreakCount = 0
let hypeBreakAlert = false
let blazeAlert = true

register("chat", () => {
    let playerX = Player.getX();
    let playerY = Player.getY();
    let playerZ = Player.getZ();
    if (Settings.announceVanqs) {
        ChatLib.say(`/pc x: ${playerX}, y: ${playerY}, z: ${playerZ} vanquisher!!!`)
    }
}).setChatCriteria("&r&aA &r&cVanquisher &r&ais spawning nearby!&r")

register("command", () => {
    Settings.isFlaring = !Settings.isFlaring
    ChatLib.chat(`You are ${Settings.isFlaring ? "grinding flares." : "no longer grinding flares."}`)
}).setName("isflaring")

function isHoldingHype() {
    if (Player?.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id") == "HYPERION" || Player?.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id") == "ASTRAEA" || Player?.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id") == "VALKYRIE" || Player?.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id") == "SCYLLA" || Player?.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id") == "NECRON_BLADE_UNREFINED") {
        return true
    } else {
        return false
    }
}

register("tick", () => {
    nowCexp = Player?.getHeldItem()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getDouble("champion_combat_xp")
    if (cexp !== nowCexp && cexp !== 0 && nowCexp !== 0) {
        cexpUp = true
    }
    cexp = nowCexp
    if (hypixelSucks) {
        setTimeout(() => {
            hypixelSucks = false
        }, delay)
    }
    if (hypeBreakCount >= 6 && hypeBreakAlert == true) {
        hypeBreakAlert = false
        World.playSound("random.orb", 100, 1);
        Client.showTitle("Hype Broken", "", 10, 100, 10);
    }
    if (!blazeAlert && !noFlaring) {
        setTimeout(() => {
            blazeAlert = true
        }, 3600000)
    }
})

register("entityDeath", (entity) => {
    if (entity.getClassName() == "EntityBlaze" && Player.asPlayerMP().distanceTo(entity) < 6) {
        if (cexpUp) {
            cexpUp = false
            hypixelSucks = true
            hypeBreakCount = 0
            if (!Settings.isFlaring && blazeAlert) {
                ChatLib.chat("You just killed a blaze. Do you want to turn on flaring? /isflaring if so, /notflaring if not.")
            }
        } else if (!hypixelSucks) {
            hypeBreakCount++
            if (isHoldingHype() == true) {
                hypeBreakAlert = true
            }
        }
    }
})

register("command", () => {
    blazeAlert = false
    ChatLib.chat("You just turned off kill blaze alerts.")
}).setName("notflaring")

register("chat", (message) => {
    if (message.removeFormatting().includes("Warping...") && Settings.isFlaring == true) {
        Settings.isFlaring = false
        ChatLib.chat("You are no longer grinding flares.")
    }
}).setCriteria("${message}").setContains()