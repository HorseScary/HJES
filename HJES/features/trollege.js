import Settings from "../config"

// penis code made by beedit
register("command", () => {
    var playerX = Player.getX();
    var playerY = Player.getY();
    var playerZ = Player.getZ();
    new Thread(() => {
        ChatLib.say(`/pc x: ${playerX}, y: ${playerY}, z: ${playerZ}`)
        Thread.sleep(550)
        ChatLib.say(`/pc x: ${playerX + 2}, y: ${playerY}, z: ${playerZ}`)
        Thread.sleep(550)
        ChatLib.say(`/pc x: ${playerX + 1}, y: ${playerY + 1}, z: ${playerZ}`)
        Thread.sleep(550)
        ChatLib.say(`/pc x: ${playerX + 1}, y: ${playerY + 2}, z: ${playerZ}`)
        Thread.sleep(550)
    }).start()
}).setName('sendpenis', true)


register("pickupitem", () => {
    ChatLib.chat("thing")
})

register("chat", (chat) => {
    muted = new Message(chat).getUnformattedText()

    if (Settings.autoMute) {
        if (muted.toLowerCase().split(Settings.autoMutePlayer.toLowerCase()).length == 3.0) {
            ChatLib.say(`/g mute ${Settings.autoMutePlayer} 30d`)
        }

    }
}).setChatCriteria("${*}has unmuted${*}")

