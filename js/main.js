//INIT TRHEEJS
var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
let keyboard = [];
var speed = 2000;
var delta = 0;
var SCALE = 3;
scene.background = new THREE.Color(0xfafafa);
renderer.setSize(innerWidth, innerHeight);
cam.position.set(0, 1, 0);
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
//INIT THREEJS


let grid = new THREE.GridHelper(100, 20, 0x0a0a0a, 0x0a0a0a);
grid.position.set(0, -0.5, 0);
scene.add(grid);


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
line.position.set(0, 0, -5)


/////////////////// SHOOTER OP, MTN GO METTRE NOTRE FLINGUE ///////////////////////////////////
let loader = new THREE.GLTFLoader().load('models/blasterE.glb', function (result) {
    mesh = result.scene;
    mesh.position.set(1, -0.5, -2);
    mesh.rotation.y += 3.2
    mesh.scale.set(2, 2, 2);
    cam.add(mesh);

})

var emitter = new THREE.Object3D();
emitter.position.set(1.75, -0.6, -5.8);
cam.add(emitter);

var plasmaBalls = [];
window.addEventListener("click", onClick);

function onClick() {
    let plasmaBall = new THREE.Mesh(new THREE.SphereGeometry(0.2, 0.01, 0.2), new THREE.MeshBasicMaterial({
        color: "black"
    }));
    plasmaBall.position.copy(emitter.getWorldPosition()); // start position - the tip of the weapon
    plasmaBall.quaternion.copy(cam.quaternion); // apply camera's quaternion
    scene.add(plasmaBall);
    plasmaBalls.push(plasmaBall);


    playSound('sniper')

}
function playSound(name){
    
    const listener = new THREE.AudioListener();
    cam.add(listener);

    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(('audio/'+name+'.ogg'), function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.2);
        sound.play();
    });
}


/////////////////// SHOOTER OP, MTN GO METTRE NOTRE FLINGUE ///////////////////////////////////


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


addEventListener('keydown', (e) => {
    keyboard[e.key] = true
});
addEventListener('keyup', (e) => {
    keyboard[e.key] = false
});


function processKeyboard(delta) {
    let speed = 5;
    let actualSpeed = speed * delta

    if (keyboard['z'] || keyboard['Z']) {
        controls.moveForward(actualSpeed);
    }
    if (keyboard['s'] || keyboard['S']) {
        controls.moveForward(-actualSpeed);
    }
    if (keyboard[' ']) {
        controls.getObject().position.y += actualSpeed;
    }
    if (keyboard['c'] || keyboard['C']) {
        controls.getObject().position.y -= actualSpeed;
    }

    if (keyboard['q'] || keyboard['Q']) {
        controls.moveRight(-actualSpeed);
    }
    if (keyboard['d'] || keyboard['D']) {
        controls.moveRight(actualSpeed);
    }

}

function drawScene() {
    renderer.render(scene, cam);
    let delta = clock.getDelta();
    processKeyboard(delta);
    requestAnimationFrame(drawScene);
    plasmaBalls.forEach(b => {
        b.translateZ(-speed * delta); // move along the local z-axis
    });
}

drawScene();