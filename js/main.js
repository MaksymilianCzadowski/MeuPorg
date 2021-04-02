var scene, camera, renderer, mesh;
var meshFloor;
var keyboard = {};
var player = { heigth:1.8, speed:0.2 };

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000)

    mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({wireframe:true})
    );

    scene.add(mesh);

    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(25,50,25,50),
        new THREE.MeshBasicMaterial({wireframe: true})
    );
    meshFloor.rotation.x -= Math.PI / 2; 
    scene.add(meshFloor);

    camera.position.set(0, player.heigth, -5)
    camera.lookAt(new THREE.Vector3(0, player.heigth, 0));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280,720);
    document.body.appendChild(renderer.domElement);

    animate();


}
function animate() {
    requestAnimationFrame(animate)

    if(keyboard[90]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[81]){ // A key
		// Redirect motion by 90 degrees
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}

    

    renderer.render(scene, camera)
    
}

function KeyDown(event) {
    
    keyboard[event.keyCode] = true;


}

function KeyUp(event) {
    
    keyboard[event.keyCode] = false ;

}


window.addEventListener('keydown', KeyDown);
window.addEventListener('keyup', KeyUp);

window.onload = init;