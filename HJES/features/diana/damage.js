import Settings from "../../config"
let renderedText = ""

register("renderOverlay", () => {
    x = (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth(renderedText) / 2)
    y = (Renderer.screen.getHeight() / 2) - 10
    Renderer.drawString(renderedText, x, y, true)
})

register("tick", () => {
    damage = World.getAllEntities().find(element => element.getName().includes("damage"))
    if (damage) {
        renderedText = damage.getName()
    }
    else {
        renderedText = ''
    }
})