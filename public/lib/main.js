var scene, camera, renderer, mesh;
var meshFloor , ambientLight,light;

var crate , crateTexture , crateNormalMap, crateBumpMap;

var keyboard = {};
var player = {
    height: 1.8,
    speed: 0.2,
    turnSpeed: Math.PI * 0.02
};

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 1000);

    mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshPhongMaterial({
            color: 0xff9999,
            wireframe: false
        })
    );
    mesh.position.y += 1;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20, 10, 10),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            wireframe: false
        })
    )
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    ambientLight = new THREE.AmbientLight(0xffffff , 0.2);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff,0.8,18);
    light.position.set(-3,6,-3);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);


    var textureLoader  = new THREE.TextureLoader();
    crateTexture = textureLoader.load("lib/textures/crate/crate0_diffuse.png");
    crateBumpMap = textureLoader.load("lib/textures/crate/crate0_bump.png");
	crateNormalMap = textureLoader.load("lib/textures/crate/crate0_normal.png");

    crate = new THREE.Mesh(
        new THREE.BoxGeometry(3,3,3),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: crateTexture,
            bumpMap:crateBumpMap,
			normalMap:crateNormalMap
        })
    );
    scene.add(crate);
    crate.position.set(2.5,3/2,2.5);
    crate.receiveShadow = true;
    crate.castShadow = true;

    camera.position.set(0, player.height, -5);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(renderer.domElement);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    crate.rotation.y += 0.01;
    
    // Keyboard movement inputs
    if (keyboard[87]) { // W key
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[83]) { // S key
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[65]) { // A key
        // Redirect motion by 90 degrees
        camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
    }
    if (keyboard[68]) { // D key
        camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
    }
    if (keyboard[37]) { //left arrow key
        camera.rotation.y -= player.turnSpeed;
    }
    if (keyboard[39]) { //right arrow key
        camera.rotation.y += player.turnSpeed;;
    }

    renderer.render(scene, camera);
}

function keydown(event) {
    keyboard[event.keyCode] = true;
}

function keyup(event) {
    keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

window.onload = init;