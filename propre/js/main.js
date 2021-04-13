import { processKeyboard } from './move.js';
import {plasmaBalls, ammo} from './shoot.js'
export var cam = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
export var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
    antialias: false
});
var speedbullet = 1500;
export let controls = new THREE.PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();
scene.background = new THREE.Color(0xfafafa);
renderer.setSize(innerWidth, innerHeight);
cam.position.set(0, 1.2, 0);
scene.add(cam)
document.body.appendChild(renderer.domElement);
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

let grid = new THREE.GridHelper(100, 100, 0x0a0a0a, 0x0a0a0a);
grid.position.set(0, -0.5, 0);
scene.add(grid);

let loader = new THREE.GLTFLoader().load('./model/blasterE.glb', function (result) {
    loader = result.scene;
    loader.position.set(1, -0.5, -2);
    loader.rotation.y += 3.2
    loader.scale.set(2, 2, 2);
    cam.add(loader);
})

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
}

drawScene()