import PogObject from "PogData"

let hudGUI = new Gui;
let selectedItem = null

let hudItems = {}
let hudPositions = new PogObject("HJES", {
}, ".HUDPos.json")

export function addToHUD(text, id) {
    hudItems[id] = text

    hudPositions[id] = [0, 0]
    hudPositions.save()
}

register("renderOverlay", () => {
    keys = Object.keys(hudItems)
    for (i = 0; i < keys.length; i++) {
        Renderer.drawStringWithShadow(hudItems[keys[i]], hudPositions[keys[i]][0], hudPositions[keys[i]][1])
    }
})

register("command", () => {

}).setName("hjesEditHUD")