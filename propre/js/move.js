import {
    controls,
    mob,
    cam
} from './main.js';


let keyboard = [];
addEventListener('keydown', (e) => {
    keyboard[e.key] = true
});
addEventListener('keyup', (e) => {
    keyboard[e.key] = false
});

export function processKeyboard(delta) {
    let speed = 10;
    let actualSpeed = speed * delta

    if (keyboard['z'] || keyboard['Z']) {
        controls.moveForward(actualSpeed);
    }
    if (keyboard['s'] || keyboard['S']) {
        controls.moveForward(-actualSpeed);
    }
    if (controls.getObject().position.y == 3 || controls.getObject().position.y <= 4) {
        if (keyboard[' ']) {
            if (controls.getObject().position.y <= 3) {
                setTimeout(function () {
                    controls.getObject().position.y += 0.5;
                }, 100);

            } else {
                return
            }
        }
    }
    if (controls.getObject().position.y >= 4) {
        setTimeout(function () {
            controls.getObject().position.y -= 0.2
        }, 100);
    }
    if (keyboard['q'] || keyboard['Q']) {
        controls.moveRight(-actualSpeed);
    }
    if (keyboard['d'] || keyboard['D']) {
        controls.moveRight(actualSpeed);
    }

}

export function deplacementMob() {
    if (mob.position.x < cam.position.x && mob.position.z < cam.position.z) {
        mob.position.x += 0.01
        mob.position.z += 0.01
    }
    if (mob.position.x < cam.position.x && mob.position.z > cam.position.z) {
        mob.position.x += 0.01
        mob.position.z -= 0.01
    }
    if (mob.position.x > cam.position.x && mob.position.z < cam.position.z) {
        mob.position.x -= 0.01
        mob.position.z += 0.01
    }
    if (mob.position.x > cam.position.x && mob.position.z > cam.position.z) {
        mob.position.x -= 0.01
        mob.position.z -= 0.01
    }
    if (mob.position.x < cam.position.x && mob.position.z == cam.position.z) {
        mob.position.x += 0.01
        mob.position.z -= 0.01
    }
    if (mob.position.x == cam.position.x && mob.position.z < cam.position.z) {
        mob.position.x += 0.01
        mob.position.z -= 0.01
    }
    if (mob.position.x > cam.position.x && mob.position.z == cam.position.z) {
        mob.position.x += 0.01
        mob.position.z -= 0.01
    }
    if (mob.position.x == cam.position.x && mob.position.z > cam.position.z) {
        mob.position.x += 0.01
        mob.position.z -= 0.01
    }
    if (mob.position.x == cam.position.x && mob.position.z == cam.position.z) {
        console.log("fin de déplacement")
    }
    mob.lookAt(cam.position.x, 0, cam.position.z)
}