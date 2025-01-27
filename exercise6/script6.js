
	// Scene, Camera
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	//renderer
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);

// Create the Room (a large blue cube)
	const roomSize = 30;
	const roomGeometry = new THREE.BoxGeometry(roomSize, roomSize, roomSize);
	const roomMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, side: THREE.BackSide });
	const room = new THREE.Mesh(roomGeometry, roomMaterial);
	scene.add(room);

// Add small cubes inside the room
	const cubeSize = 2;
	const spacing = 6; // Spacing between cubes
	for (let z = -1; z <= 1; z++) {
  		for (let y = -1; y <= 1; y++) {
   			 for (let x = -1; x <= 1; x++) {
      			const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      			const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      			const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      			cube.castShadow = true;
      			cube.position.set(x * spacing, y * spacing, z * spacing);
      			scene.add(cube);
    	}
  }
}

// Lighting
const redLight = new THREE.DirectionalLight(0xff0000, 0.9);
redLight.position.set(-10, -5, 0);
redLight.castShadow = true;
scene.add(redLight);

const redLight2 = new THREE.DirectionalLight(0x2f23f2, 0.6);
redLight2.position.set(-30, 30, -2);
redLight2.castShadow = true;
scene.add(redLight2);

const redLight3 = new THREE.DirectionalLight(0x2f0302, 0.5);
redLight3.position.set(-60, 0, 2);

redLight3.castShadow = true;
scene.add(redLight3);

const redLight4 = new THREE.DirectionalLight(0x2f0302, 0.5);
redLight4.position.set(-60, 40, 22);
redLight4.castShadow = true;
scene.add(redLight4);

const whiteLight = new THREE.DirectionalLight(0xffffff, 0.7);
whiteLight.position.set(10, -10, -2);
whiteLight.castShadow = true;
scene.add(whiteLight);

// Floor to show shadows
const floorGeometry = new THREE.PlaneGeometry(roomSize, roomSize);
const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Camera Position
camera.position.set(0, 2, 10);

// Controls (Pointer Lock for Movement)
const controls = new THREE.PointerLockControls(camera, document.body);
document.addEventListener('click', () => {
  controls.lock();
});

// Keyboard Movement
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const keys = { forward: false, backward: false, left: false, right: false };

document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      keys.forward = true;
      break;
    case 'ArrowDown':
    case 'KeyS':
      keys.backward = true;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      keys.left = true;
      break;
    case 'ArrowRight':
    case 'KeyD':
      keys.right = true;
      break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      keys.forward = false;
      break;
    case 'ArrowDown':
    case 'KeyS':
      keys.backward = false;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      keys.left = false;
      break;
    case 'ArrowRight':
    case 'KeyD':
      keys.right = false;
      break;
  }
});

const clock = new THREE.Clock();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  velocity.set(0, 0, 0);

  if (keys.forward) velocity.z -= 10 * delta;
  if (keys.backward) velocity.z += 10 * delta;
  if (keys.left) velocity.x -= 10 * delta;
  if (keys.right) velocity.x += 10 * delta;

  controls.moveRight(-velocity.x);
  controls.moveForward(-velocity.z);

  renderer.render(scene, camera);
}

animate();

// Resize Listener
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

