import Settings from "../../config"
import { addHudItem, updateHUD } from "../../handlers/hudHandler"
let renderedText = ""

addHudItem("showPercentage", "&c0% damage")

register("renderOverlay", () => {
    if (Settings.showPercentage) {
        x = (Renderer.screen.getWidth() / 2) - (Renderer.getStringWidth(renderedText) / 2)
        y = (Renderer.screen.getHeight() / 2) + 6
        Renderer.drawString(renderedText, x, y, true)
    }
})

register("tick", () => {
    if (Settings.showPercentage) {
        damage = World.getAllEntities().find(element => element.getName().includes("damage"))
        if (damage) {
            updateHUD("showPercentage", damage)
        }
        else {
            updateHUD("showPercentage", "")
        }
    }
})