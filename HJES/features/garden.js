import Settings from "../config"

let realVisitors = 0
let visitorCount = 0
let renderedText = ``

register("command", (args1, args2) => {
    Settings.visitorX = parseInt(args1)
    Settings.visitorY = parseInt(args2)
    ChatLib.chat(`Display changed to ${Settings.visitorX}, ${Settings.visitorY}`)
}).setName("changevisitordisplaycoords")

register("renderOverlay", () => {
    if (Settings.displayVisitors) {
        Renderer.drawString(renderedText, Settings.visitorX, Settings.visitorY, true)
    }
})

register("tick", () => {
    if(Settings.visitorAlert) {
        visitorArray = []
        visitors = TabList.getNames().find((name) => name.includes("Visitors:"));
        visitorTimer = TabList.getNames().find((name) => name.includes("Next Visitor:"))
        let inGarden
        if(visitorTimer) {
            inGarden = true
        }
        if(inGarden) {
            if(visitors) {
            visitorCount = parseInt(visitors.split("(")[1])
            }
            if (visitorCount !== realVisitors || inGardenWorldLoad) {
                renderedText = `Visitors: ${visitorCount}`
                let visitorIndex = TabList.getNames().indexOf(visitors)
                for(i = 1; i <= visitorCount; i++) {
                    renderedText += `\n${TabList.getNames()[visitorIndex + i]}`
                }
                inGardenWorldLoad = false
            }
            if (visitorCount > realVisitors) { 
                ChatLib.chat(`Visitors: ${visitorCount}`)
                ChatLib.chat(`New Visitor:${TabList.getNames()[TabList.getNames().indexOf(visitors) + visitorCount]}`)
            }
            realVisitors = visitorCount
            }
    }
})

register("worldLoad", () => {
   setTimeout(() => {
    visitorTimerWorldLoad = TabList.getNames().find((name) => name.includes("Next Visitor:"))
        let inGardenWorldLoad
        if(visitorTimer) {
            inGardenWorldLoad = true
        }
   }, 1000)
})

register("command", () => {
    visitors = TabList.getNames().find((name) => name.includes("Visitors:"));
        if(visitors) {
            visitorCount = parseInt(visitors.split("(")[1])
                let visitorIndex = TabList.getNames().indexOf(visitors)
                for (let i = 0; i <= visitorCount; i++) {
                    ChatLib.chat(`${TabList.getNames()[visitorIndex + i]}`)
                }
            realVisitors = visitorCount
            }
}).setName("visitors")

register("command", () => {
        visitors = TabList.getNames().find((name) => name.includes("Visitors:"));
        if(visitors) {
            visitorCount = parseInt(visitors.split("(")[1])
                let visitorIndex = TabList.getNames().indexOf(visitors)
                for (let i = 0; i <= visitorCount; i++) {
                    renderedText += `\n${TabList.getNames()[visitorIndex + i]}`
            }
            realVisitors = visitorCount
            }
}).setName("updatevisitors")

/*export function getVisitors(visitorCount, realVisitors) {
    visitorArray = []
    visitors = TabList.getNames().find((name) => name.includes("Visitors:"));
        if(visitors) {
            visitorCount = parseInt(visitors.split("(")[1])
            if (visitorCount > realVisitors) {
                ChatLib.chat(`visitors = ${visitorCount}`)
                let visitorIndex = TabList.getNames().indexOf(visitors)
                for (let i = 1; i <= visitorCount; i++) {
                   visitorArray.push(`${TabList.getNames()[visitorIndex + i]}`)
                }
                ChatLib.chat(`${newVisitor}`)
            }
            realVisitors = visitorCount
            }
}*/