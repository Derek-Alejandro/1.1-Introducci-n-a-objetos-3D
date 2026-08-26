import * as THREE from 'three';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x07111f);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// Geometría del cubo
const geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);

// Material verde sólido
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});

// Crear el cubo
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

// Crear las aristas del cubo
const edgesGeometry = new THREE.EdgesGeometry(geometry);

// Material negro para las aristas
const edgesMaterial = new THREE.LineBasicMaterial({
  color: 0x000000
});

// Crear las líneas de las aristas
const edges = new THREE.LineSegments(
  edgesGeometry,
  edgesMaterial
);

// Añadir las aristas al cubo
cube.add(edges);

function animate(time) {
  cube.rotation.x = time / 1000;
  cube.rotation.y = time / 2500;
  cube.rotation.z = time / 250;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});