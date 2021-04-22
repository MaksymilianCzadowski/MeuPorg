import {
    processKeyboard
} from './move.js';
import {
    plasmaBalls,
    ammo
} from './shoot.js'
import {
    deplacementMob,
    spawn
} from './mob.js'
import {vie, lostLife} from './life.js'
import {playSound} from './playsound.js'
export var cam = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
export var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
    antialias: false
});
var speedbullet = 1500;
export let controls = new THREE.PointerLockControls(cam, renderer.domElement);
spawn();
let clock = new THREE.Clock();
scene.background = new THREE.Color(0xbfd1e5);
renderer.setSize(innerWidth, innerHeight);
cam.position.set(0, 1.2, 0);
scene.add(cam)
document.body.appendChild(renderer.domElement);

// directionalLigths = []
// for (let index = 0; index < 6; index++) {
//     directionalLigths.push(new THREE.DirectionalLight({
//         color: 0xffffff,
//         intensity: 100,
//         castShadow : false
//     }));
//      scene.add()
// }
var directionalLigths1 = new THREE.DirectionalLight({
    color: 0xffffff,
    intensity: 100
});
var directionalLigths2 = new THREE.DirectionalLight({
    color: 0xffffff,
    intensity: 100
});
var directionalLigths3 = new THREE.DirectionalLight({
    color: 0xffffff,
    intensity: 100
});
var directionalLigths4 = new THREE.DirectionalLight({
    color: 0xffffff,
    intensity: 100
});
var directionalLigths5 = new THREE.DirectionalLight({
    color: 0xffffff,
    intensity: 100
});
var directionalLigths6 = new THREE.DirectionalLight({
    color: 0xffffff,
    intensity: 100
});

// directionalLigths = []
// array.forEach(element => {
//     element.position.set(-2,2,2)
// });
// array.forEach(element => {
//     element.position.set(2,2,2)
// });

directionalLigths1.position.set(-2, 2, 2);
directionalLigths2.position.set(-2, 2, 2);
directionalLigths3.position.set(-2, 2, 2);
directionalLigths4.position.set(2, 2, 2);
directionalLigths5.position.set(2, 2, 2);
directionalLigths6.position.set(2, 2, 2);
directionalLigths1.castShadow = false;
directionalLigths2.castShadow = false;
directionalLigths3.castShadow = false;
directionalLigths4.castShadow = false;
directionalLigths5.castShadow = false;
directionalLigths6.castShadow = false;
scene.add(directionalLigths1);
scene.add(directionalLigths2)
scene.add(directionalLigths3)
scene.add(directionalLigths4);
scene.add(directionalLigths5)
scene.add(directionalLigths6)
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

let grid = new THREE.GridHelper(500, 500, 0x0a0a0a, 0x0a0a0a);
grid.position.set(0, -0.5, 0);

scene.add(grid);

let loader = new THREE.GLTFLoader().load('./model/blasterE.glb', function (result) {
    loader = result.scene;
    loader.position.set(1, -0.5, -2);
    loader.rotation.y += 3.2
    loader.scale.set(2, 2, 2);
    cam.add(loader);
})

let map = new THREE.GLTFLoader().load('./model/maps.glb', function (result) {
    map = result.scene;
    map.position.set(20, -0.5, 15);
    map.scale.set(0.5, 0.5, 0.5)
    map.traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = false;
    });
    scene.add(map)
})

// export let mob = new THREE.GLTFLoader().load('./model/monkey.glb', function (result) {
//     mob = result.scene;
//     mob.position.set(-5, 0, -5);
//     mob.rotation.y += 3.2
//     mob.scale.set(1, 1, 1);
//     scene.add(mob);
// })


export var emitter = new THREE.Object3D();
emitter.position.set(1.75, -0.6, -5.8);
cam.add(emitter);

const material = new THREE.LineBasicMaterial({
    color: "red"
});

const points = [];
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(0.1, 0, 0));
points.push(new THREE.Vector3(-0.1, 0, 0));
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(0, 0.1, 0));
points.push(new THREE.Vector3(0, -0.1, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);
cam.add(line);
line.position.set(0.04, 0, -5);

export var template = document.querySelector("#ammo");
template.innerHTML = ("Mun :" + ammo + "/10")

export var life = document.querySelector("#life");
life.innerHTML = ("Vie :" + vie + "/100")

let btn1 = document.querySelector("#button1");
btn1.addEventListener('click', () => {
    controls.lock();
});

controls.addEventListener('lock', () => {
    btn1.innerHTML = "Locked"
});
controls.addEventListener('unlock', () => {
    btn1.innerHTML = "Unlocked"
});

function drawScene() {
    renderer.render(scene, cam);
    let delta = clock.getDelta();
    processKeyboard(delta);
    requestAnimationFrame(drawScene);
    plasmaBalls.forEach(b => {
        b.translateZ(-speedbullet * delta); // move along the local z-axis
    });
    deplacementMob()
}

drawScene()