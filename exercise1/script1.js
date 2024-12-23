
    // Setup scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808082); // Gray background

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4;
    camera.position.x = 0;
    camera.position.y = 1;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
	
	
    // Lights
    const blueLight = new THREE.DirectionalLight(0x87c8e8, 1);
    blueLight.position.set(-1, 322, 1);
    scene.add(blueLight);
	


    // Create a black sphere in the center
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Black
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Create three colored cubes at different Z-levels
    const createCube = (color, x, y, z) => {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      scene.add(cube);
    };

    createCube(0x0000ff, -2, 0, -1); // Blue cube
    createCube(0xff000f, 2, 0, 0);  // Red cube
    createCube(0xffa500, 0, 2, 1); // Orange cube
    createCube(0xf4a5f0, 2, 2, 1); // Orange cube





    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Add some rotation to make the scene dynamic
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    // Adjust canvas on window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

