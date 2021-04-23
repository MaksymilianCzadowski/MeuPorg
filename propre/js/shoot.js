import {emitter,emitter2,cam,scene,template} from './main.js'
import {playSound} from './playsound.js'
export var plasmaBalls = [];
export var invisibleBalls = [];
export var invisibleBall;
export var ammo = 10
var invisibleammo = 10
var color;

export function Shoot() {
    if (ammo > 0 && invisibleammo > 0) {
        let plasmaBall = new THREE.Mesh(new THREE.SphereGeometry(0.5, 5, 5, 0, Math.PI * 1, 0, Math.PI * 1), new THREE.MeshBasicMaterial({
            color: "black"
        }));
        plasmaBall.position.copy(emitter.getWorldPosition()); // start position - the tip of the weapon
        plasmaBall.quaternion.copy(cam.quaternion); // apply camera's quaternion
        scene.add(plasmaBall);
        plasmaBalls.push(plasmaBall);
        playSound('sniper', cam)
        ammo -= 1;

        template.innerHTML = ("Mun :" + ammo + "/10")
       let invisibleBall = new THREE.Mesh(new THREE.SphereGeometry(0.2, 0.01, 0.2), new THREE.MeshBasicMaterial({
            opacity: 0.5,
            transparent: true,
            
        }));
        invisibleBall.position.copy(emitter2.getWorldPosition()); // start position - the tip of the weapon
        invisibleBall.quaternion.copy(cam.quaternion)
        scene.add(invisibleBall);
        invisibleBalls.push(invisibleBall);
        invisibleammo -= 1;
        

    }
    if (ammo == 0) {
        playSound('NoAmmo', cam)
    }
}

export function Reload() {

    if (ammo < 10) {
        playSound('reload', cam)
        ammo = 10;
        invisibleammo = 10
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