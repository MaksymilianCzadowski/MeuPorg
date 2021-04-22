import {
    cam,
    scene
} from './main.js'

let mob;
export function spawn() {
    mob = new THREE.GLTFLoader().load('./model/monkey.glb', function (result) {    
    mob = result.scene;
    mob.position.set(-5, 0, -5);
    mob.rotation.y += 3.2
    mob.scale.set(1, 1, 1);
    scene.add(mob);
        
    })
}

export function deplacementMob() {
    var speedMob = 0.02
    
    if (mob.position.x < cam.position.x && mob.position.z < cam.position.z) {
        mob.position.x += speedMob
        mob.position.z += speedMob
    }
    if (mob.position.x < cam.position.x && mob.position.z > cam.position.z) {
        mob.position.x += speedMob
        mob.position.z -= speedMob
    }
    if (mob.position.x > cam.position.x && mob.position.z < cam.position.z) {
        mob.position.x -= speedMob
        mob.position.z += speedMob
    }
    if (mob.position.x > cam.position.x && mob.position.z > cam.position.z) {
        mob.position.x -= speedMob
        mob.position.z -= speedMob
    }
    if (mob.position.x < cam.position.x && mob.position.z == cam.position.z) {
        mob.position.x += speedMob
        mob.position.z -= speedMob
    }
    if (mob.position.x == cam.position.x && mob.position.z < cam.position.z) {
        mob.position.x += speedMob
        mob.position.z -= speedMob
    }
    if (mob.position.x > cam.position.x && mob.position.z == cam.position.z) {
        mob.position.x += speedMob
        mob.position.z -= speedMob
    }
    if (mob.position.x == cam.position.x && mob.position.z > cam.position.z) {
        mob.position.x += speedMob
        mob.position.z -= speedMob
    }
    if (mob.position.x == cam.position.x && mob.position.z == cam.position.z) {
        console.log("fin de déplacement")
    }
    mob.lookAt(cam.position.x, 0, cam.position.z)
}