// import {invisibleBalls} from './shoot.js'
// import {mob} from './mob.js'


// export function collision() {
//     var originPoint = invisibleBalls.position.clone();
//     for (var vertexIndex = 0; vertexIndex < invisibleBalls.geometry.vertices.length; vertexIndex++) {   
//         var ray = new THREE.Raycaster( invisibleBalls.position, invisibleBalls.geometry.vertices[vertexIndex] );
//         var collisionResults = ray.intersectObjects( mob );
//         if ( collisionResults.length > 0)  {
//            hit = true;
//         }
//     } 
// }   