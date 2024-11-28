


    // JavaScript code here
	// Initialize Scene, Camera, and Renderer
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x808080); // Gray background

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// Add Light Source
	const light = new THREE.DirectionalLight(0xf2f2f2, 0.6);
	light.position.set(-1, 21, 2); // Light from the left
	scene.add(light);
	const light2 = new THREE.DirectionalLight(0xf4f6f3, 0.8);
	light2.position.set(1, -5, 11); // Light from the left
	scene.add(light2);
	const light3 = new THREE.DirectionalLight(0xf4f6f3, 0.9);
	light3.position.set(-81, -35, -30); // Light from the left
	scene.add(light3);

	// Create a Black Sphere in the Center
	const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
	const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0F0203 });
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.position.z = 10; // Blue cube at back
	scene.add(sphere);
	

	// Create Colored Cubes in the Z-axis
	const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

	const blueCube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x0000ff }));
	blueCube.position.z = -2; // Blue cube at back
	scene.add(blueCube);

	const redCube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0xff0000 }));
	redCube.position.z = 0; // Red cube at center
	scene.add(redCube);

	const orangeCube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0xffa500 }));
	orangeCube.position.z = 2; // Orange cube at front
	scene.add(orangeCube);

	// Add Orbit Controls for Camera Rotation
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true; // Smooth rotation
	controls.dampingFactor = 0.05;

	// Animate the Scene
	function animate() {
 	 requestAnimationFrame(animate);
 	 controls.update();
 	 renderer.render(scene, camera);
	}

	animate();

	// Handle Window Resize
	window.addEventListener('resize', () => {
  	camera.aspect = window.innerWidth / window.innerHeight;
  	camera.updateProjectionMatrix();
  	renderer.setSize(window.innerWidth, window.innerHeight);
});



