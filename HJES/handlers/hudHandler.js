import PogObject from "PogData"
import Settings from "../config"

let hudGUI = new Gui;
let selectedItem = null
let offsets = [0, 0]

let hudItems = {}
let hudPositions = new PogObject("HJES", {
}, ".HUDPos.json")

export function openHudGui() {
    hudGUI.open()
}

/**
 * creates a "HudItem" object in the hudItems object
 * @param {String} id - the id should be the same as the variable used in settings 
 * 
 * @param {String} exampleText - the text that displays when configuring the GUI
 * 
 */
export function addHudItem(id, exampleText) {
    if (!hudItems[id]) {
        hudItems[id] = {
            "exampleText": exampleText,
            "text": ""
        }
        if (!hudPositions[id]) {
            hudPositions[id] = [0, 0]
            hudPositions.save()
        }
    }
}

/**
 * 
 * @param {String} id - id of the hudItem you want to update
 * @param {String} text - the new text for the hudItem
 */
export function updateHUD(id, text) {
    if (hudItems[id]) {
        hudItems[id].text = text;
    }
}

register("dragged", (dx, dy, x, y) => {
    if (!hudGUI.isOpen()) return;

    if (selectedItem) {
        hudPositions[selectedItem][0] = x + offsets[0]
        hudPositions[selectedItem][1] = y + offsets[1]
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

            offsets[0] = hudPositions[keys[i]][0] - x
            offsets[1] = hudPositions[keys[i]][1] - y
        }
    }

    if (!itemSelected) {
        selectedItem = null;
    }
})

register("renderOverlay", () => {
    keys = Object.keys(hudItems)
    if (hudGUI.isOpen()) {
        middle = Renderer.screen.getWidth() / 2
        Renderer.drawStringWithShadow("[Move the things]", middle, 4)

        for (i = 0; i < keys.length; i++) {
            if (Settings[keys[i]]) {
                Renderer.drawStringWithShadow(hudItems[keys[i]].exampleText, hudPositions[keys[i]][0], hudPositions[keys[i]][1])
            }
        }
    }
    else {
        for (i = 0; i < keys.length; i++) {
            if (Settings[keys[i]]) {
                Renderer.drawStringWithShadow(hudItems[keys[i]].text, hudPositions[keys[i]][0], hudPositions[keys[i]][1])
            }
        }
    }
})

register("command", () => {
    hudGUI.open()
}).setName("hjesEditHUD")