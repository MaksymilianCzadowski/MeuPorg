import { processKeyboard } from 'move.js';

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({
    antialias: false
});
let keyboard = [];
var speedbullet = 1500;
var delta = 0;
var ammo = 10;
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
// var template = document.querySelector("#ammo");
// template.innerHTML = ("Mun :" + ammo + "/10")
//INIT THREEJS


let grid = new THREE.GridHelper(100, 100, 0x0a0a0a, 0x0a0a0a);
grid.position.set(0, -0.5, 0);
scene.add(grid);

let loader = new THREE.GLTFLoader().load('./models/blasterE.glb', function (result) {
    mesh = result.scene;
    mesh.position.set(1, -0.5, -2);
    mesh.rotation.y += 3.2
    mesh.scale.set(2, 2, 2);
    cam.add(mesh);

})

let controls = new THREE.PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();


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