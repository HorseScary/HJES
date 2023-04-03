import { say } from "../../handlers/say"

function getPlaneCoords(x, y, z) {
    return ({
        "x": [x, x - 1, x - 2, x - 3, x - 1, x - 1, x - 1, x - 1, x - 3, x - 3],
        "y": [y, y, y, y, y + 1, y + 2, y - 1, y - 2, y + 1, y - 1],
        "z": [z, z, z, z, z, z, z, z, z, z],
    })
}

function drawPlane(planeCoords) {
    for (i = 0; i < 10; i++) {
        (function (x, y, z) {
            setTimeout(() => {
                say(`/pc x: ${x}, y: ${y}, z: ${z}`)
            }, 500 * i)
        })(planeCoords.x[i], planeCoords.y[i], planeCoords.z[i])
    }
}

register("command", () => {
    planeCoords = getPlaneCoords(Player.getX(), Player.getY(), Player.getZ())

    drawPlane(planeCoords)

}).setName("drawPlane")

register("command", (arg1, arg2) => {
    //Party > [MVP+] jperrm: x: -11, y: 88, z: -144

    numPlanes = Settings.numPlanes
    doAnimation = Settings.animate911
    /*
    nothing passed: take defaults
    num passed: animation w/ n number of planes
    /911 true 5
    /911 true
    /911 5
    /911 false
    */

    if (arg1 = "true") {
        doAnimation = true
        if (!isNaN(parseInt(arg2))) {
            numPlanes = parseInt(arg2)
        }
    }
    else if (arg1 == "false") {
        doAnimation = false
    }
    else if (isNaN(parseInt(arg1))) {
        ChatLib.chat(`${arg1} is not a valid input!`)
    }

    if (doAnimation) {

    }
    else {
        planeCoords = getPlaneCoords(-11, 88, -144)
        for (i = 0; i < planeCoords.length; i++) {

            setTimeout(() => {
                (function (x, y, z) {
                    say(`/pc x: ${planeCoords.x[j]}, y: ${planeCoords.y[j]}, z: ${planeCoords.z[j]}`)
                }, planeCoords.x[i], planeCoords.y[i], planeCoords.z[i])
            }, 6000 * i)
        }
    }

    for (i = 0; i < animationX.length; i++) {

        (function (x) {

            setTimeout(() => {
                planeCoords = getPlaneCoords(x, 88, -144)
                for (j = 0; j < 10; j++) {
                    say(`/pc x: ${planeCoords.x[j]}, y: ${planeCoords.y[j]}, z: ${planeCoords.z[j]}`)
                }
            }, 6000 * i)

        })(animationX[i])
    }
}).setName("911")