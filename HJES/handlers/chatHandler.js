import { getChatQueue } from "./say"

let messageCooldown = 0

// TODO: register when player (or other another mod) sends a message and reset messageCooldown

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

/*
HANDLING ANIMATIONS
- throw x number of nulls into the queue, ignore nulls
    - if HJES needs to send a message (like for inquis) it will have to wait x number of ticks
- special designator to put thing n ticks after another thing
- special queue
    - has time to wait for things in special queue
    - thing gets added after the time is up
*/