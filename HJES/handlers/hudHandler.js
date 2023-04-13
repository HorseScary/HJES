import PogObject from "PogData"
import Settings from "../config"

/*TODO: make gui editing display all the things that could be rendered
- each thing that could get rendered gets a id
- get a list of all the ids
- check settings to see if the thing is enabled
- if it is, add it to the gui object
*/

let hudGUI = new Gui;
let selectedItem = null

let hudItems = {}
let hudPositions = new PogObject("HJES", {
}, ".HUDPos.json")

export function openHudGui() {
    hudGUI.open()
}

/**
 * @param {String} id 
 * should be the same as the variable in settings
 * @param {String} text 
 * 
 */
export function addToHUD(id, text) {
    hudItems[id] = text

    if (!hudPositions[id]) {

        hudPositions[id] = [0, 0]
        hudPositions.save()
    }
}

export function updateHUD(id, text) {
    if (hudItems[id]) {
        hudItems[id] = text;
    }
}

register("dragged", (dx, dy, x, y) => {
    if (!hudGUI.isOpen()) return;

    if (selectedItem) {
        hudPositions[selectedItem][0] = x
        hudPositions[selectedItem][1] = y
        hudPositions.save();
    }
})

register("clicked", (x, y, button) => {
    itemSelected = false;
    keys = Object.keys(hudItems)
    for (i = 0; i < keys.length; i++) {
        itemX = hudPositions[keys[i]][0]
        itemY = hudPositions[keys[i]][1]
        textWidth = Renderer.getStringWidth(hudItems[keys[i]])
        textHeight = 9
        if (x >= itemX && x <= itemX + textWidth && y >= itemY && y <= itemY + textHeight) {
            selectedItem = keys[i]
            itemSelected = true;
        }
    }

    if (!itemSelected) {
        selectedItem = null;
    }
})

register("renderOverlay", () => {
    if (hudGUI.isOpen()) {
        middle = Renderer.screen.getWidth() / 2
        Renderer.drawStringWithShadow("[Move the things]", middle, 4)
    }

    else {
        keys = Object.keys(hudItems)
        for (i = 0; i < keys.length; i++) {
            Renderer.drawStringWithShadow(hudItems[keys[i]], hudPositions[keys[i]][0], hudPositions[keys[i]][1])
        }
    }
})

register("command", () => {
    hudGUI.open()
}).setName("hjesEditHUD")