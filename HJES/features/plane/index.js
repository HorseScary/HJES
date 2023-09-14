import { helpHelper } from "../../functions"
import { say } from "../../handlers/say"
import Settings from "../../config"

function getPlaneCoords(x, y, z) {
    return ({
        "x": [x, x - 1, x - 2, x - 3, x - 1, x - 1, x - 1, x - 1, x - 3, x - 3],
        "y": [y, y, y, y, y + 1, y + 2, y - 1, y - 2, y + 1, y - 1],
        "z": [z, z, z, z, z, z, z, z, z, z],
    })
}

function drawPlane(planeCoords) {
    for (i = 0; i < 10; i++) {
        say(`/pc x: ${planeCoords.x[i]}, y: ${planeCoords.y[i]}, z: ${planeCoords.z[i]}`)
    }
}

register("command", () => {
    planeCoords = getPlaneCoords(Player.getX(), Player.getY(), Player.getZ())

    drawPlane(planeCoords)

}).setName("drawPlane")

//TODO: add explosion
register("command", (arg1, arg2) => {
    //Party > [MVP+] jperrm: x: -11, y: 88, z: -144

    /*
    nothing passed: take defaults
    num passed: animation w/ n number of planes
    /911 true 5
    /911 true
    /911 5
    /911 false
    */
    numPlanes = Settings.numPlanes
    doAnimation = Settings.animate911

    // /911 true

    if (arg1 == "help") {
        helpMessage = helpHelper({
            "911": "__title__",
            "/911 [numPlanes | doAnimation] [numPlanes]": "custom",
            "example usage: /911 4, /911 true 2, /911": "custom"
        })
        ChatLib.chat(helpMessage)
    }
    else {
        continueWithPlane = true;
        if (arg1) {
            if (arg1 = "true") {
                doAnimation = true
                // /911 true 4
                if (!isNaN(parseInt(arg2))) {
                    numPlanes = parseInt(arg2)
                }
            }
            // /911 false
            else if (arg1 == "false") {
                doAnimation = false
            }
            // /911 lkjdflakjdf
            else if (isNaN(parseInt(arg1))) {
                ChatLib.chat(`${arg1} is not a valid input! Do /911 help for help.`)
                continueWithPlane = false;
            }
            else {
                numPlanes = parseInt(arg1)
            }
        }

        if (continueWithPlane) {
            if (doAnimation) {
                for (i = 0; i < numPlanes; i++) {
                    x = -11 - (5 * (numPlanes - 1 - i))
                    setTimeout(() => {
                        setTimeout(() => {
                            drawPlane(getPlaneCoords(x, 88, -144))
                            for (j = 0; j < 10; j++) {
                                say(`/pc x: ${planeCoords.x[j]}, y: ${planeCoords.y[j]}, z: ${planeCoords.z[j]}`)
                            }
                        }, 6000 * i)
                    })(x)
                }
            }
            else {
                drawPlane(getPlaneCoords(-11, 88, -144))
            }
        }
    }
}).setName("911")