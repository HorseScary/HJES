import Settings from "../config"

register("command", () => {
    World.getAllEntities().forEach(entity => {
        ChatLib.chat(entity.getName())
    })
}).setName("listEntities", true)