import {cam,scene, emitter, emitter2} from './main.js'
import {lostLife} from './life.js'
import { playSound } from './playsound.js';
import {invisibleBalls} from './shoot.js'

let mob;
export function spawn() {
    new THREE.GLTFLoader().load('./model/singe.glb', function (result) {    
        mob = result.scene;
        mob.position.set(-5, 0, -5);
        mob.rotation.y += 3.2
        mob.scale.set(1, 1, 1);
        scene.add(mob);
    })
}

export function deplacementMob() {
    var speedMob = 0.01
    if (mob) {
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

        mob.lookAt(cam.position.x, 0, cam.position.z)
    }
    

    
//     if (mob.position.x == cam.position.x && mob.position.z == cam.position.z) {
      
// }

}