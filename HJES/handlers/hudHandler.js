import PogObject from "PogData"

let hudItems = {}
let hudPositions = new PogObject("HJES", {
}, ".HUDPos.json")

export function addToHUD(item, id) {
    hudItems[id] = item

    hudPositions[id] = [0, 0]
    hudPositions.save()
}

register("renderOverlay", () => {
    keys = Object.keys(hudItems)
    for (i = 0; i < keys.length; i++) {
        Renderer.drawStringWithShadow(hudItems[keys[i]], hudPositions[keys[i]][0], hudPositions[keys[i]][1])
    }
})