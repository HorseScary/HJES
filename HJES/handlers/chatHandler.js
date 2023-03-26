import { getChatQueue } from "./say"

let messageCooldown = 0

register("tick", () => {
    chatQueue = getChatQueue()
    if (chatQueue.length != 0 && messageCooldown == 0) {
        messageCooldown += 1
    }

    if (messageCooldown == 10) {
        ChatLib.say(chatQueue.pop())
        messageCooldown = 0
    }
    else if (messageCooldown != 0) {
        messageCooldown++
    }
})