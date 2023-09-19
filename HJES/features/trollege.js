import Settings from "../config"
import { say } from "../handlers/say";

// penis code made by beedit
register("command", () => {
    var playerX = Player.getX();
    var playerY = Player.getY();
    var playerZ = Player.getZ();
    say(`/pc x: ${playerX}, y: ${playerY}, z: ${playerZ}`)
    say(`/pc x: ${playerX + 2}, y: ${playerY}, z: ${playerZ}`)
    say(`/pc x: ${playerX + 1}, y: ${playerY + 1}, z: ${playerZ}`)
    say(`/pc x: ${playerX + 1}, y: ${playerY + 2}, z: ${playerZ}`)
}).setName('sendRocket', true)


register("pickupitem", () => {
    ChatLib.chat("thing")
})

register("chat", (chat) => {
    muted = new Message(chat).getUnformattedText()

    if (Settings.autoMute) {
        if (muted.toLowerCase().split(Settings.autoMutePlayer.toLowerCase()).length == 3.0) {
            say(`/g mute ${Settings.autoMutePlayer} 30d`)
        }

    }
}).setChatCriteria("${*}has unmuted${*}")

