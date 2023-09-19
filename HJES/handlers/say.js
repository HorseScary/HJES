let chatQueue = []

export function say(message) {
    chatQueue.unshift(message)
}

export function getChatQueue() {
    return (chatQueue);
}