import Settings from "./config";
import "./features/diana"
import "./features/trollege"

register("command", () => {
    Settings.openGUI()
}).setName("HJES", true);

// Test command for settings things
register("command", () => {
    ChatLib.chat(JSON.stringify(Settings))
    ChatLib.chat(Settings.lOnCheese)
}).setName("hjessettingstest", true)