import {sphereBody,scene, monkeyBox} from './main.js'
import {lostLife} from './life.js'
import { playSound } from './playsound.js';
  var x = getRndInteger(-40,40);
  var z = getRndInteger(-40,40)
export let mob;
export function spawn() {
    new THREE.GLTFLoader().load('./model/singe.glb', function (result) {    
        mob = result.scene;
        mob.position.set(x, 0, z);
        mob.rotation.y += 3.2
        mob.scale.set(5, 5, 5);
        scene.add(mob);
    })
}

export function deplacementMob() {
    var speedMob = 0.03
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
        monkeyBox.position.set(mob.position.x, mob.position.y +2.2, mob.position.z);
    }
}

export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
