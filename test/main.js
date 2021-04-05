//INIT TRHEEJS
var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});
scene.background = new THREE.Color(0xfafafa);
renderer.setSize(innerWidth, innerHeight);
cam.position.z = 5;
cam.position.y = 0;
document.body.appendChild(renderer.domElement);
var directionalLigths = new THREE.DirectionalLight({color : 0xffffff, intensity : 100});
directionalLigths.position.set(0,1,0);
directionalLigths.castShadow = true;
scene.add(directionalLigths);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
//INIT THREEJS

let grid = new THREE.GridHelper(100,20, 0x0a0a0a, 0x0a0a0a);
grid.position.set(0, -0.5, 0);
scene.add(grid);

let bGeo = new THREE.BoxGeometry(1, 1, 1);
let bMat = new THREE.MeshStandardMaterial({color: 0x00ff00, wireframe: false});
let cube = new THREE.Mesh(bGeo,bMat);
scene.add(cube);

let controls = new THREE.PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();

let btn1 = document.querySelector("#button1");
btn1.addEventListener('click', ()=>{
    controls.lock();
});

controls.addEventListener('lock',()=>{
    btn1.innerHTML = "Locked"
});
controls.addEventListener('unlock',()=>{
    btn1.innerHTML = "Unlocked"
});

let keyboard = [];
addEventListener('keydown',(e)=>{
 keyboard[e.key] = true
});
addEventListener('keyup',(e)=>{
 keyboard[e.key] = false
});

function processKeyboard(delta){
    let speed = 5;
    let actualSpeed = speed * delta
    if (keyboard['z']){
        controls.moveForward(actualSpeed);
    }
    if(keyboard['s']){
        controls.moveForward(-actualSpeed);
    }
    if(keyboard['a']){
        controls.getObject().position.y += actualSpeed;
    }
    if(keyboard['e']){
        controls.getObject().position.y -= actualSpeed;
    }

    if (keyboard['q']){
        controls.moveRight(-actualSpeed);
    }
    if(keyboard['d']){
        controls.moveRight(actualSpeed);
    }
}


function drawScene(){
    renderer.render(scene,cam);
    let delta = clock.getDelta();
    processKeyboard(delta);
    requestAnimationFrame(drawScene);
}

drawScene();