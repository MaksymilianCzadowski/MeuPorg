import {sphereBody,controls,scene, emitter, emitter2} from './main.js'
import {lostLife} from './life.js'
import { playSound } from './playsound.js';


let mob;
export function spawn() {
    new THREE.GLTFLoader().load('./model/singe.glb', function (result) {    
        mob = result.scene;
        mob.position.set(-5, 0, -5);
        mob.rotation.y += 3.2
        mob.scale.set(5, 5, 5);
        scene.add(mob);
    })
}

export function deplacementMob() {
    var speedMob = 0
    if (mob) {
        if (mob.position.x < sphereBody.position.x && mob.position.z < sphereBody.position.z) {
            mob.position.x += speedMob
            mob.position.z += speedMob
        }
        if (mob.position.x < sphereBody.position.x && mob.position.z > sphereBody.position.z) {
            mob.position.x += speedMob
            mob.position.z -= speedMob
        }
        if (mob.position.x > sphereBody.position.x && mob.position.z < sphereBody.position.z) {
            mob.position.x -= speedMob
            mob.position.z += speedMob
        }
        if (mob.position.x > sphereBody.position.x && mob.position.z > sphereBody.position.z) {
            mob.position.x -= speedMob
            mob.position.z -= speedMob
        }
        if (mob.position.x < sphereBody.position.x && mob.position.z == sphereBody.position.z) {
            mob.position.x += speedMob
            mob.position.z -= speedMob
        }
        if (mob.position.x == sphereBody.position.x && mob.position.z < sphereBody.position.z) {
            mob.position.x += speedMob
            mob.position.z -= speedMob
        }
        if (mob.position.x > sphereBody.position.x && mob.position.z == sphereBody.position.z) {
            mob.position.x += speedMob
            mob.position.z -= speedMob
        }
        if (mob.position.x == sphereBody.position.x && mob.position.z > sphereBody.position.z) {
            mob.position.x += speedMob
            mob.position.z -= speedMob
        }

        mob.lookAt(sphereBody.position.x, 0, sphereBody.position.z)
    }
    

    
//     if (mob.position.x == sphereBody.position.x && mob.position.z == sphereBody.position.z) {
      
// }

}