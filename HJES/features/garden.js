import Settings from "../config"
import { HJESMessage } from "../functions"

let realVisitors = 0
let visitorNames = []

register("command", (args1, args2) => {
    Settings.visitorX = args1
    Settings.visitorY = args2
    ChatLib.chat(`Display changed to ${Settings.visitorX}, ${Settings.visitorY}`)
}).setName("changevisitordisplaycoords")

register("renderOverlay", () => {

    if (Settings.displayVisitors) {
        renderedText = `Visitors: ${realVisitors}`
        for (i = 0; i < visitorNames.length; i++) {
            renderedText += `\n${visitorNames[i]}`
        }
        Renderer.drawString(renderedText, parseInt(Settings.visitorX), parseInt(Settings.visitorY), true)
    }
})

register("tick", () => {
    if (Settings.visitorAlert) {
        visitorArray = []
        visitors = TabList.getNames().find((name) => name.includes("Visitors:"));
        visitorTimer = TabList.getNames().find((name) => name.includes("Next Visitor:"))

        if (visitorTimer) {
            if (!visitors) {
                visitorCount = 0
                visitorNames = []
            }
            else {
                visitorCount = parseInt(visitors.split("(")[1])
                visitorNames = TabList.getNames().slice(TabList.getNames().indexOf(visitors) + 1, TabList.getNames().indexOf(visitors) + visitorCount + 1)

                if (visitorCount > realVisitors) {
                    ChatLib.chat(HJESMessage(`\nVisitors: ${visitors}\nNew Visitor: ${visitorNames[visitorNames.length - 1]}`, "Garden"))
                }
            }

            realVisitors = visitorCount
        }

    }
})

register("worldLoad", () => {
    setTimeout(() => {
        visitorTimerWorldLoad = TabList.getNames().find((name) => name.includes("Next Visitor:"))
        if (visitorTimer) {
            inGardenWorldLoad = true
        }
    }, 1000)
})

register("command", () => {
    visitors = TabList.getNames().find((name) => name.includes("Visitors:"));
    if (visitors) {
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
    if (visitors) {
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