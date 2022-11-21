import Settings from "./config";
import "./features/diana"
import "./features/trollege"

register("command", () => {
    Settings.openGUI()
}).setName("HJES", true);
