import Settings from "../config"

let realVisitors = 0
let visitorCount = 0


register("tick", () => {
    if(Settings.visitorAlert) {
        visitors = TabList.getNames().find((name) => name.includes("Visitors:"));
        if(visitors) {
            visitorCount = parseInt(visitors.split("(")[1])
            if (visitorCount > realVisitors) {
                ChatLib.chat(`Visitors: ${visitorCount}`)
                let visitorIndex = TabList.getNames().indexOf(visitors)
                let newVisitor = TabList.getNames()[visitorIndex + visitorCount]
                ChatLib.chat(`New Visitor:${newVisitor})`)
            }
            realVisitors = visitorCount
            }
    }
})

register("worldLoad", () => {
   setTimeout(() => {
    visitors = TabList.getNames().find((name) => name.includes("Visitors:"));
        if(visitors && Settings.visitorAlert) {
            visitorCount = parseInt(visitors.split("(")[1])
                let visitorIndex = TabList.getNames().indexOf(visitors)
                for (let i = 0; i <= visitorCount; i++) {
                    ChatLib.chat(`${TabList.getNames()[visitorIndex + i]}`)
                }
            realVisitors = visitorCount
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