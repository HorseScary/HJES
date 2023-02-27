import Settings from "./config";
import "./features/diana/diana"
import "./features/trollege"
import "./features/afk"
import "./features/trinity"
import "./features/blaze"
import "./features/privateLobby/index"

import { helpHelper, HJESMessage } from "./functions";


register("command", (arg) => {
    helpMessage = helpHelper({
        '': '__title__',
        'Diana': '__subtitle__',
        'inquis': 'Diana inquisitor functions',
        'Trollege': '__subtitle__',
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