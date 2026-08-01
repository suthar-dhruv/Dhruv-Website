const canvas = document.getElementById('three-bg');

if (canvas && window.THREE) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x03050d, 18, 46);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.5, 20);

  const root = new THREE.Group();
  scene.add(root);

  const ambient = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambient);

  const pinkLight = new THREE.PointLight(0xff8fe8, 25, 30, 2);
  pinkLight.position.set(-8, 5, 9);
  scene.add(pinkLight);

  const cyanLight = new THREE.PointLight(0x66e9ff, 24, 30, 2);
  cyanLight.position.set(9, 4, 8);
  scene.add(cyanLight);

  const blueLight = new THREE.PointLight(0x5ea9ff, 20, 34, 2);
  blueLight.position.set(0, -2, 10);
  scene.add(blueLight);

  const pointer = { x: 0, y: 0 };
  window.addEventListener('pointermove', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  function createParticles(count = 1600) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 32;
      positions[i3 + 1] = (Math.random() - 0.5) * 22;
      positions[i3 + 2] = (Math.random() - 0.5) * 26;

      const hue = 0.48 + Math.random() * 0.28;
      const color = new THREE.Color().setHSL(hue, 0.9, 0.72);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    particles.rotation.x = 0.4;
    return particles;
  }

  function createGlassPanel(width, height, x, y, z, rx, ry, rz, color, opacity = 0.36) {
    const group = new THREE.Group();

    const geo = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const panel = new THREE.Mesh(geo, material);
    group.add(panel);

    const stroke = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.PlaneGeometry(width, height)),
      new THREE.LineBasicMaterial({ color: 0xe2ecff, transparent: true, opacity: 0.18 })
    );
    stroke.position.z = 0.02;
    group.add(stroke);

    group.position.set(x, y, z);
    group.rotation.set(rx, ry, rz);
    return group;
  }

  const particles = createParticles();
  root.add(particles);

  const panels = [
    createGlassPanel(8.5, 4.5, -12, 7, -5, 0.7, -0.9, -0.15, 0xd9c4ff, 0.22),
    createGlassPanel(8.8, 4.5, 12.5, 7, -6.5, 0.75, 0.8, 0.25, 0xe8d8ff, 0.18),
    createGlassPanel(9.5, 4.6, -1, 2.7, -3.5, 0.2, 0.1, 0.0, 0xbfe7ff, 0.2),
    createGlassPanel(6.6, 3.2, 10, -4.5, -8, -0.1, 0.9, -0.2, 0x8dbcff, 0.18),
    createGlassPanel(6.2, 3.1, -8.5, -4.8, -7, -0.15, -1.1, 0.18, 0x8fe8ff, 0.18),
    createGlassPanel(7.2, 3.0, 3.5, -9.2, -9.4, -0.35, 0.3, -0.08, 0xf5b8ff, 0.16),
    createGlassPanel(4.8, 2.2, -5.2, -10.5, -11, -0.3, -0.6, 0.12, 0x9ce9ff, 0.14)
  ];
  panels.forEach((panel) => root.add(panel));

  const lines = [
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-16, 7, -4),
        new THREE.Vector3(10, 0, -6)
      ]),
      new THREE.LineBasicMaterial({ color: 0x7fd6ff, transparent: true, opacity: 0.8 })
    ),
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-10, -4, -5),
        new THREE.Vector3(12, 2, -10)
      ]),
      new THREE.LineBasicMaterial({ color: 0xff94e5, transparent: true, opacity: 0.7 })
    ),
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-8, 10, -11),
        new THREE.Vector3(6, -8, -8)
      ]),
      new THREE.LineBasicMaterial({ color: 0xa9b8ff, transparent: true, opacity: 0.55 })
    )
  ];
  lines.forEach((line) => root.add(line));

  const glowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 10),
    new THREE.MeshBasicMaterial({
      color: 0xf2b6ff,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide
    })
  );
  glowPlane.position.set(0, 2.2, -7);
  glowPlane.rotation.x = -0.7;
  root.add(glowPlane);

  const glowPlane2 = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 8),
    new THREE.MeshBasicMaterial({
      color: 0x7eddfd,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide
    })
  );
  glowPlane2.position.set(0, -1.5, -8);
  glowPlane2.rotation.x = -0.65;
  root.add(glowPlane2);

  const clock = new THREE.Clock();

  function animate() {
    const elapsed = clock.getElapsedTime();

    particles.rotation.y = elapsed * 0.09;
    particles.rotation.x = 0.3 + Math.sin(elapsed * 0.5) * 0.15;

    panels.forEach((panel, index) => {
      const t = elapsed * (0.4 + index * 0.07);
      panel.rotation.z += 0.0012 * Math.sin(t * 2);
      panel.rotation.y += 0.0015 + index * 0.0004;
      panel.position.y += Math.sin(t + index) * 0.002;
    });

    lines.forEach((line, index) => {
      line.material.opacity = 0.5 + Math.sin(elapsed * 1.5 + index) * 0.2;
    });

    glowPlane.material.opacity = 0.1 + Math.sin(elapsed * 1.8) * 0.04;
    glowPlane2.material.opacity = 0.08 + Math.sin(elapsed * 1.5 + 1.5) * 0.03;

    root.rotation.y = elapsed * 0.1;
    root.rotation.x = Math.sin(elapsed * 0.7) * 0.12;

    camera.position.x += (pointer.x * 1.8 - camera.position.x) * 0.04;
    camera.position.y += (1.4 + pointer.y * 1.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0.5, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}
