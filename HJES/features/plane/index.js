import { say } from "../../handlers/say"

function getPlaneCoords(x, y, z) {
    return ({
        "x": [x, x - 1, x - 2, x - 3, x - 1, x - 1, x - 1, x - 1, x - 3, x - 3],
        "y": [y, y, y, y, y + 1, y + 2, y - 1, y - 2, y + 1, y - 1],
        "z": [z, z, z, z, z, z, z, z, z, z],
    })
}

register("command", () => {
    planeCoords = getPlaneCoords(Player.getX(), Player.getY(), Player.getZ())

    for (i = 0; i < 10; i++) {
        (function (x, y, z) {
            setTimeout(() => {
                say(`/pc x: ${x}, y: ${y}, z: ${z}`)
            }, 500 * i)
        })(planeCoords.x[i], planeCoords.y[i], planeCoords.z[i])
    }
}).setName("drawPlane")

register("command", () => {
    //Party > [MVP+] jperrm: x: -11, y: 88, z: -144
    animationX = [-21, -16, -11, -6]

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