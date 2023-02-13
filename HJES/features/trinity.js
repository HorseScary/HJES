import Settings from "../config"
var fivePuzzle = false

register("worldLoad", () => {
    fivePuzzle = false
})

register("tick", () => {
    puzzle = TabList.getNames().find((name) => name.includes("Puzzles"));
    if (puzzle) {
        if (puzzle.includes("5") && !fivePuzzle) {
            Client.showTitle("&45 Puzzle!!!", "", 0, 60, 20)
            World.playSound("random.orb", 1, 1)
            fivePuzzle = true
        }
    }

})
