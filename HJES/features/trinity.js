import Settings from "../config"
var fivePuzzle = false

register("worldLoad", () => {
    fivePuzzle = false
})

register("tick", () => {
    if (Settings.puzzleAlert) {
        puzzle = TabList.getNames().find((name) => name.includes("Puzzles"));
        if (puzzle) {
            if (puzzle.includes("5") && !fivePuzzle) {
                Client.showTitle("&45 Puzzle!!!", "", 0, 60, 20)
                World.playSound("random.orb", 1, 1)
                fivePuzzle = true
            }
        }
    }
})

// &eThe party was transferred to &r&b[MVP&r&5+&r&b] HorseScary &r&eby &r&b[MVP&r&0+&r&b] jperrm&r
register("chat", (chat) => {
    if (Settings.transferAlert) {
        registeredChat = new Message(chat).getUnformattedText()

        if (registeredChat.split("by")[0].includes(Player.getName())) {
            World.playSound("random.orb", 1, 1)
        }
    }
}).setCriteria("&eThe party was transferred to ${*}")
