import {emitter,emitter2,cam,scene,template, sphereBody, material, world, balls, ballMeshes, sphereShape} from './main.js'
import {playSound} from './playsound.js'
export var plasmaBalls = [];
export var ammo = 10
var invisibleammo = 10
let color;

export function Shoot() {
    if (ammo > 0) {
        var ballShape = new CANNON.Sphere(0.2);
            var ballGeometry = new THREE.SphereGeometry(ballShape.radius, 32, 32);
            var shootDirection = new THREE.Vector3();
            var shootVelo = 200;
            function getShootDir(targetVec){
                var vector = targetVec;
                targetVec.set(0,0,1);
                vector.unproject(cam);
                var ray = new THREE.Ray(sphereBody.position, vector.sub(sphereBody.position).normalize() );
                targetVec.copy(ray.direction);
            }

                    var x = sphereBody.position.x + 0.2;
                    var y = sphereBody.position.y + 1.3;
                    var z = sphereBody.position.z;
                    var ballBody = new CANNON.Body({ mass: 1 });
                    ballBody.addShape(ballShape);
                    var ballMesh = new THREE.Mesh( ballGeometry, material );
                    world.add(ballBody);
                    scene.add(ballMesh);
                    ballMesh.castShadow = true;
                    ballMesh.receiveShadow = true;
                    balls.push(ballBody);
                    ballMeshes.push(ballMesh);
                    getShootDir(shootDirection);
                    ballBody.velocity.set(  shootDirection.x * shootVelo,
                                            shootDirection.y * shootVelo,
                                            shootDirection.z * shootVelo);

                    // Move the ball outside the player sphere
                    x += shootDirection.x * (sphereShape.radius*1.02 + ballShape.radius);
                    y += shootDirection.y * (sphereShape.radius*1.02 + ballShape.radius);
                    z += shootDirection.z * (sphereShape.radius*1.02 + ballShape.radius);
                    ballBody.position.set(x,y,z);
                    ballMesh.position.set(x,y,z);
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