// import {processKeyboard} from './move.js';
import {
    plasmaBalls,
    ammo,
    invisibleBalls
} from './shoot.js'
import {
    deplacementMob,
    spawn
} from './mob.js'
import {
    vie
} from './life.js'
import {
    moveControls
} from './move.js'



export var cam, scene, renderer, controls, emitter, emitter2, template, life, speedbullet, world
export var sphereBody =[]
let clock
var physicsMaterial, sphereShape, walls = [],
    balls = [],
    ballMeshes = [],
    boxes = [],
    boxMeshes = [],
    walls = [],
    wallMeshes = [];
var geometry, material, mesh, wallColor;
var controls, time = Date.now();;


var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');

var havePointerLock = 'pointerLockElement' in document;

if (havePointerLock) {

    var element = document.body;

    var pointerlockchange = function (event) {

        if (document.pointerLockElement === element) {

            controls.enabled = true;

            blocker.style.display = 'none';

            cam.position.set(0, 1.2, 0);
            

        } else {

            controls.enabled = false;

            blocker.style.display = 'none';

            instructions.style.display = '';
        }
    }
    var pointerlockerror = function (event) {
        instructions.style.display = '';
    }
    document.addEventListener('pointerlockchange', pointerlockchange, false);

    document.addEventListener('pointerlockerror', pointerlockerror, false);

    instructions.addEventListener('click', function (event) {
        instructions.style.display = 'none';

        element.requestPointerLock = element.requestPointerLock
        // element.requestFullscreen();
        element.requestPointerLock();



    }, false);


}



function initCannon() {
    // Setup our world
    world = new CANNON.World();
    world.quatNormalizeSkip = 0;
    world.quatNormalizeFast = false;

    var solver = new CANNON.GSSolver();

    world.defaultContactMaterial.contactEquationStiffness = 1e9;
    world.defaultContactMaterial.contactEquationRelaxation = 4;

    solver.iterations = 7;
    solver.tolerance = 0.1;
    var split = true;
    if (split)
        world.solver = new CANNON.SplitSolver(solver);
    else
        world.solver = solver;

    world.gravity.set(0, -20, 0);
    world.broadphase = new CANNON.NaiveBroadphase();

    // Create a slippery material (friction coefficient = 0.0)
    physicsMaterial = new CANNON.Material("slipperyMaterial");
    var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,
        physicsMaterial,
        0.0, // friction coefficient
        0.3 // restitution
    );
    // We must add the contact materials to the world
    world.addContactMaterial(physicsContactMaterial);

    // Create a sphere (ball)
    var mass = 5,
        radius = 1.3;
    sphereShape = new CANNON.Sphere(radius);
    sphereBody = new CANNON.Body({
        mass: mass
    });
    sphereBody.addShape(sphereShape);
    sphereBody.position.set(0, 1, 0);
    sphereBody.linearDamping = 0.9;
    world.add(sphereBody);

    // Create a plane
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({
        mass: 0
    });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.add(groundBody);
}


function init() {

    cam = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({
        antialias: false
    });
    speedbullet = 1500;
    controls = new THREE.PointerLockControls(cam, renderer.domElement);
    spawn();
    clock = new THREE.Clock();
    scene.background = new THREE.Color(0xbfd1e5);
    renderer.setSize(innerWidth, innerHeight);
    
    scene.add(cam)
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

    // lights
    var directionalLigths = []
    for (let index = 0; index < 6; index++) {
        directionalLigths.push(new THREE.DirectionalLight({
            color: 0xffffff,
            intensity: 100,
            castShadow: false,
        }));
        let directionalLigth = directionalLigths[index]
        if (index < 3) {
            directionalLigth.position.set(-2, 2, 2)
        } else {
            directionalLigth.position.set(2, 2, 2)
        }
        scene.add(directionalLigth);
    }

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);


    
    
    controls = new moveControls(cam, sphereBody);
    scene.add(controls.getObject());


    //map
    // let grid = new THREE.GridHelper(500, 500, 0x0a0a0a, 0x0a0a0a);
    // grid.position.set(0, -0.5, 0);
    // scene.add(grid);
    geometry = new THREE.PlaneGeometry(300, 300, 50, 50);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    material = new THREE.MeshLambertMaterial({
        color: 0xdddddd
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);


    let loader = new THREE.GLTFLoader().load('./model/blasterE.glb', function (result) {
        loader = result.scene;
        loader.position.set(1, -0.5, -2);
        loader.rotation.y += 3.2
        loader.scale.set(2, 2, 2);
        cam.add(loader);
    })

    // let map = new THREE.GLTFLoader().load('./model/maps.glb', function (result) {
    //     map = result.scene;
    //     map.position.set(20, -0.5, 15);
    //     map.scale.set(0.5, 0.5, 0.5)
    //     map.traverse((node) => {
    //         if (!node.isMesh) return;
    //         node.material.wireframe = false;
    //     });
    //     scene.add(map)
    // })

    //crosshair
    emitter = new THREE.Object3D();
    emitter.position.set(1.75, -0.6, -5.8);
    cam.add(emitter);

    emitter2 = new THREE.Object3D();
    emitter2.position.set(0.04, 0, -5);
    cam.add(emitter2);

    const materialLine = new THREE.LineBasicMaterial({
        color: "red"
    });

    const points = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(0.1, 0, 0));
    points.push(new THREE.Vector3(-0.1, 0, 0));
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(0, 0.1, 0));
    points.push(new THREE.Vector3(0, -0.1, 0));

    const geometryLine = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometryLine, materialLine);
    cam.add(line);
    line.position.set(0.04, 0, -5);

    //walls
    var wall = new CANNON.Vec3(50, 5, 2);
    var wallShape = new CANNON.Box(wall);
    var wallGeometry = new THREE.BoxGeometry(wall.x * 2, wall.y * 2, wall.z * 2);
    wallColor = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });

    var posX = [-0.5, -0.5, 52, -53];
    var posZ = [50, -50, 0, 0];
    var posY = 5

    for (var i = 0; i < 4; i++) {

        if (i > 1) {
            var wall = new CANNON.Vec3(2.5, 5, 50);
            var wallShape = new CANNON.Box(wall);
            var wallGeometry = new THREE.BoxGeometry(wall.x * 2, wall.y * 2, wall.z * 2);
        }
        var wallBody = new CANNON.Body({
            mass: 1000
        });
        wallBody.addShape(wallShape);
        var wallMesh = new THREE.Mesh(wallGeometry, wallColor);
        world.add(wallBody);
        scene.add(wallMesh);
        wallBody.position.set(posX[i], posY, posZ[i]);
        wallMesh.position.set(posX[i], posY, posZ[i]);
        wallMesh.castShadow = true;
        wallMesh.receiveShadow = true;
        walls.push(wallBody);
        wallMeshes.push(wallMesh);
    }
    //affichage
    template = document.querySelector("#ammo");
    template.innerHTML = ("Mun :" + ammo + "/10")

    life = document.querySelector("#life");
    life.innerHTML = ("Vie :" + vie + "/100")



    // let btn1 = document.querySelector("#button1");
    // btn1.addEventListener('click', () => {
    //     controls.lock();
    // });

    // controls.addEventListener('lock', () => {
    //     btn1.innerHTML = "Locked"
    // });
    // controls.addEventListener('unlock', () => {
    //     btn1.innerHTML = "Unlocked"
    // });
}

function onWindowResize() {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

var dt = 1 / 60;

function drawScene() {
    renderer.render(scene, cam);
    let delta = clock.getDelta();
    // processKeyboard(delta);
    requestAnimationFrame(drawScene);
    if (controls.enabled) {
        world.step(dt);

        for (var i = 0; i < walls.length; i++) {
            wallMeshes[i].position.copy(walls[i].position);
            wallMeshes[i].quaternion.copy(walls[i].quaternion)
        }
    }
    plasmaBalls.forEach(b => {
        b.translateZ(-speedbullet * delta); // move along the local z-axis
    });
    invisibleBalls.forEach(b => {
        b.translateZ(-speedbullet * delta); // move along the local z-axis
    });
    deplacementMob()


    controls.update(Date.now() - time);
    renderer.render(scene, cam);
    time = Date.now();
    
}

initCannon();
init();
drawScene();