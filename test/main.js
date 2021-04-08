 //variable declaration section
 let physicsWorld, scene, camera, renderer, rigidBodies = []

 //Ammojs Initialization
 Ammo().then(start)

 function start (){

     tmpTrans = new Ammo.btTransform();

     setupPhysicsWorld();

     setupGraphics();
     createBlock();
     createBall();

     renderFrame();

 }

 function setupPhysicsWorld(){

     let collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration(),
         dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration),
         overlappingPairCache    = new Ammo.btDbvtBroadphase(),
         solver                  = new Ammo.btSequentialImpulseConstraintSolver();

     physicsWorld           = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
     physicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));

 }


 function setupGraphics(){

     //create clock for timing
     clock = new THREE.Clock();

     //create the scene
     scene = new THREE.Scene();
     scene.background = new THREE.Color( 0xbfd1e5 );

     //create camera
     camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.2, 5000 );
     camera.position.set( 0, 30, 70 );
     camera.lookAt(new THREE.Vector3(0, 0, 0));

     //Add hemisphere light
     let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.1 );
     hemiLight.color.setHSL( 0.6, 0.6, 0.6 );
     hemiLight.groundColor.setHSL( 0.1, 1, 0.4 );
     hemiLight.position.set( 0, 50, 0 );
     scene.add( hemiLight );

     //Add directional light
     let dirLight = new THREE.DirectionalLight( 0xffffff , 1);
     dirLight.color.setHSL( 0.1, 1, 0.95 );
     dirLight.position.set( -1, 1.75, 1 );
     dirLight.position.multiplyScalar( 100 );
     scene.add( dirLight );

     dirLight.castShadow = true;

     dirLight.shadow.mapSize.width = 2048;
     dirLight.shadow.mapSize.height = 2048;

     let d = 50;

     dirLight.shadow.camera.left = -d;
     dirLight.shadow.camera.right = d;
     dirLight.shadow.camera.top = d;
     dirLight.shadow.camera.bottom = -d;

     dirLight.shadow.camera.far = 13500;

     //Setup the renderer
     renderer = new THREE.WebGLRenderer( { antialias: true } );
     renderer.setClearColor( 0xbfd1e5 );
     renderer.setPixelRatio( window.devicePixelRatio );
     renderer.setSize( window.innerWidth, window.innerHeight );
     document.body.appendChild( renderer.domElement );

     renderer.gammaInput = true;
     renderer.gammaOutput = true;

     renderer.shadowMap.enabled = true;

 }


 function renderFrame(){

     let deltaTime = clock.getDelta();

     updatePhysics( deltaTime );

     renderer.render( scene, camera );

     requestAnimationFrame( renderFrame );

 }


 

 function createBlock(){
     
     let pos = {x: 0, y: 0, z: 0};
     let scale = {x: 50, y: 2, z: 50};
     let quat = {x: 0, y: 0, z: 0, w: 1};
     let mass = 0;

     //threeJS Section
     let blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({color: 0xa0afa4}));

     blockPlane.position.set(pos.x, pos.y, pos.z);
     blockPlane.scale.set(scale.x, scale.y, scale.z);

     blockPlane.castShadow = true;
     blockPlane.receiveShadow = true;

     scene.add(blockPlane);


     //Ammojs Section
     let transform = new Ammo.btTransform();
     transform.setIdentity();
     transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
     transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
     let motionState = new Ammo.btDefaultMotionState( transform );

     let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) );
     colShape.setMargin( 0.05 );

     let localInertia = new Ammo.btVector3( 0, 0, 0 );
     colShape.calculateLocalInertia( mass, localInertia );

     let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
     let body = new Ammo.btRigidBody( rbInfo );


     physicsWorld.addRigidBody( body );
 }


 function createBall(){
     
     let pos = {x: 0, y: 20, z: 0};
     let radius = 2;
     let quat = {x: 0, y: 0, z: 0, w: 1};
     let mass = 1;

     //threeJS Section
     let ball = new THREE.Mesh(new THREE.SphereBufferGeometry(radius), new THREE.MeshPhongMaterial({color: 0xff0505}));

     ball.position.set(pos.x, pos.y, pos.z);
     
     ball.castShadow = true;
     ball.receiveShadow = true;

     scene.add(ball);


     //Ammojs Section
     let transform = new Ammo.btTransform();
     transform.setIdentity();
     transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
     transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
     let motionState = new Ammo.btDefaultMotionState( transform );

     let colShape = new Ammo.btSphereShape( radius );
     colShape.setMargin( 0.05 );

     let localInertia = new Ammo.btVector3( 0, 0, 0 );
     colShape.calculateLocalInertia( mass, localInertia );

     let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
     let body = new Ammo.btRigidBody( rbInfo );


     physicsWorld.addRigidBody( body );
     
     ball.userData.physicsBody = body;
     rigidBodies.push(ball);
 }


 function updatePhysics( deltaTime ){

     // Step world
     physicsWorld.stepSimulation( deltaTime, 10 );

     // Update rigid bodies
     for ( let i = 0; i < rigidBodies.length; i++ ) {
         let objThree = rigidBodies[ i ];
         let objAmmo = objThree.userData.physicsBody;
         let ms = objAmmo.getMotionState();
         if ( ms ) {

             ms.getWorldTransform( tmpTrans );
             let p = tmpTrans.getOrigin();
             let q = tmpTrans.getRotation();
             objThree.position.set( p.x(), p.y(), p.z() );
             objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

         }
     }

 }