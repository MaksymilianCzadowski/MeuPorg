var scene, camera, renderer, mesh;
var meshFloor;
var keyboard = {};
var player = { heigth:1.8, speed:0.1 };

function init() {
   
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(50,50,50,50),
        new THREE.MeshBasicMaterial({wireframe: true})
    );


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe: false} );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add( line );

    meshFloor.rotation.x -= Math.PI / 2; 
    scene.add(meshFloor);

    camera.position.set(0, player.heigth, -5)
    camera.lookAt(new THREE.Vector3(0, player.heigth, 0));

    renderer = new THREE.WebGLRenderer( {alpha : false} );
    renderer.setSize( window.innerWidth, window.innerHeight );
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