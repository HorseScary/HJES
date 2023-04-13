import Settings from "./config";
import "./features/diana/diana"
import "./features/trollege"
import "./features/afk"
import "./features/trinity"
import "./features/blaze"
import "./features/privateLobby/index"
import "./features/misc/index"
import "./features/plane/index"

import "./handlers/chatHandler"
import "./handlers/hudHandler"

import { addToHUD, updateHUD, openHudGui } from "./handlers/hudHandler";
import { helpHelper, HJESMessage } from "./functions";


register("command", (arg) => {
    helpMessage = helpHelper({
        '': '__title__',
        'Diana': '__subtitle__',
        '/inquis': 'Diana inquisitor functions',
        'Blaze': '__subtitle__',
        '/blazeEffectTimes': 'gives the time left on re-heated gummy and wisp pots',
        'Random Notifier': '__subtitle__',
        '/partyPlayers': 'set or view the number of players in your party',
        'Trollege': '__subtitle__',
        '/sendRocket': 'sends coordinates in the shape of a rocketship. works best with soopy player coordinates thing',
        '/911': 'soopy coordinate art of a historical event',
        '/drawPlane': 'draws a plane with soopy coordinates'
    })
    if (arg == "help") {
        ChatLib.chat(helpMessage)
    }
    else if (arg == "gui") {
        openHudGui()
    }

    else if (!arg) {
        Settings.openGUI()
    }

    else {
        ChatLib.chat(HJESMessage(`${arg} is not a valid option. Type /HJES help for help.`))
    }
}).setName("HJES", true).setAliases("hjes");