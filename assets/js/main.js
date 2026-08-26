import * as THREE from 'three';

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07111f);

// Cámara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Cámara en una esquina superior derecha
camera.position.set(6, 3, 4);
camera.lookAt(0, 0, 0);

// Renderizador
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


// ==================================================
// CUBO
// ==================================================

// Geometría y material
const cubeGeometry = new THREE.BoxGeometry(2.6, 1.6, 2.6);

const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xd9252b,
  wireframe: false
});

// Crear cubo
const cube = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
);

// Posición del cubo
cube.position.set(0, 0, 0);

scene.add(cube);


// Aristas del cubo
const mostrarWireframe = true;

const cubeEdgesGeometry = new THREE.EdgesGeometry(cubeGeometry);

const cubeEdgesMaterial = new THREE.LineBasicMaterial({
  color: 0x000000
});

const cubeEdges = new THREE.LineSegments(
  cubeEdgesGeometry,
  cubeEdgesMaterial
);

cubeEdges.visible = mostrarWireframe;

cube.add(cubeEdges);


// ==================================================
// ESFERA
// ==================================================

// Geometría de la esfera
const sphereGeometry = new THREE.SphereGeometry(
  1,    // Radio
  32,   // Segmentos horizontales
  16    // Segmentos verticales
);

// Material azul
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0066ff,
  wireframe: false
});

// Crear esfera
const sphere = new THREE.Mesh(
  sphereGeometry,
  sphereMaterial
);

// Posición diferente a la del cubo
sphere.position.set(-3, 1, 0);

scene.add(sphere);


// Aristas de la esfera
const sphereEdgesGeometry = new THREE.EdgesGeometry(
  sphereGeometry
);

const sphereEdgesMaterial = new THREE.LineBasicMaterial({
  color: 0x000000
});

const sphereEdges = new THREE.LineSegments(
  sphereEdgesGeometry,
  sphereEdgesMaterial
);

sphereEdges.visible = mostrarWireframe;

sphere.add(sphereEdges);


// ==================================================
// ANIMACIÓN
// ==================================================

function animate(time) {

  // Rotación del cubo
  cube.rotation.x = time / 1000;
  cube.rotation.y = time / 2500;
  cube.rotation.z = time / 250;

  // Rotación de la esfera
  sphere.rotation.x = time / 1500;
  sphere.rotation.y = time / 2000;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


// Ajustar al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {

  camera.aspect =
    window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
});