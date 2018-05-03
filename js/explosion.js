var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;

var renderer = new THREE.WebGLRenderer({antialias:true});
//renderer.setClearColor("#000000");
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement );

var onRenderFcts= [];

var dragonMesh = null;
var loader = new THREE.JSONLoader();
loader.load('/data/dragon.json', function(geometry, materials){
    dragonMesh = new THREE.Mesh(geometry, materials);
    dragonMesh.scale.x = dragonMesh.scale.y = dragonMesh.scale.z = 0.55;
    dragonMesh.translation = THREE.GeometryUtils.center(geometry);
    scene.add(dragonMesh);
});

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// var loader = new THREE.ObjectLoader();
// loader.load("/data/dragon.json",function ( obj ) {
//     scene.add( obj );
// });

var speed = 0.01;
onRenderFcts.push(function(){
   dragonMesh.rotation.x -= speed * 2;
   dragonMesh.rotation.y -= speed;
   dragonMesh.rotation.z -= speed * 3;
});

onRenderFcts.push(function(){
    renderer.render( scene, camera );		
});

var lastTimeMsec= null;
var render = function (nowMsec) {
    requestAnimationFrame( render );

    lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
    var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec);
    lastTimeMsec	= nowMsec;

    // call each update function
    onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec/1000, nowMsec/1000);
    });
  };

  render();
