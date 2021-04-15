import {
    emitter,
    cam,
    scene,
    template
} from './main.js'
import {
    playSound
} from './playsound.js'
export var plasmaBalls = [];

// var realBalls = [];
export var ammo = 10

export function Shoot() {
    if (ammo > 0) {
        let plasmaBall = new THREE.Mesh(new THREE.SphereGeometry(0.2, 0.01, 0.2), new THREE.MeshBasicMaterial({
            color: "black"
        }));
        plasmaBall.position.copy(emitter.getWorldPosition()); // start position - the tip of the weapon
        plasmaBall.quaternion.copy(cam.quaternion); // apply camera's quaternion
        scene.add(plasmaBall);
        plasmaBalls.push(plasmaBall);
        playSound('sniper', cam)
        ammo -= 1;

        template.innerHTML = ("Mun :" + ammo + "/10")

    }
    if (ammo == 0) {
        playSound('NoAmmo', cam)
    }
}

export function Reload() {

    if (ammo < 10) {
        playSound('reload', cam)
        ammo = 10;
        template.innerHTML = ("Mun : " + ammo + "/10")
    }
}

window.addEventListener('keyup', (event) => {
    if (event.key == 'r') {
        Reload()
    }
});

window.addEventListener('mousedown', (event) => {
    if (event.button == 0) {
        Shoot();
    }
});