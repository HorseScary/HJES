import Settings from "./config";
import "./features/diana"
import "./features/trollege"
import { helpHelper, HJESMessage } from "./functions";


register("command", (arg) => {
    helpMessage = helpHelper({
        '__title__': '',
        '__subtitle__': 'Diana',
        'inquis': 'Diana inquisitor functions',
        '__subtitle__': 'Trollege',
        'sendPenis': 'sends coordinates of a penis. works best with soopy player coordinates thing'
    })
    if (arg == "help") {
        ChatLib.chat(helpMessage)
    }

    else if (!arg) {
        Settings.openGUI()
    }

    else {
        ChatLib.chat(HJESMessage(`${arg} is not a valid option. Type /HJES help for help.`))
    }
}).setName("HJES", true);

// Test command for settings things
register("command", () => {
    ChatLib.chat(JSON.stringify(Settings))
    ChatLib.chat(Settings.lOnCheese)
}).setName("hjessettingstest", true)