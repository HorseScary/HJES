import Settings from "../config"

register("command", () => {
    ghostList = []
    playerLocation = Scoreboard.getLines(false)
    ChatLib.chat(playerLocation[4])

    World.getAllEntities().forEach(entity => {
        if (entity.getName().includes("Creeper")) {
            ghostList.push([entity.getLastX(), entity.getLastY(), entity.getLastZ()])
        }
    })
}).setName("listEntities", true)