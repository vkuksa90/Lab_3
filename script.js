import * as THREE from './Lib/three.module.min.js';
import { ARButton } from './Lib/webxr/ARButton.js';

//import * as THREE from 'three';
//import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

let camera, scene, renderer;
init();
animate();

function init() {
    // Створення сцени
    scene = new THREE.Scene();

    // Камера
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 700);

    // Рендерер
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    // ARButton
    document.body.appendChild(ARButton.createButton(renderer));

    // Створення моделей пірамід
    createPyramids();

    // Вікно зміни розміру
    window.addEventListener('resize', onWindowResize, false);
}

function createPyramids() {
    // Текстура цегли
    const brickTexture = new THREE.TextureLoader().load('assets/brick_diffuse.jpg');
    const goldMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });

    // Геометрія пірамід
    const pyramidGeometry1 = new THREE.ConeGeometry(115, 145, 4); // Хеопс
    const pyramidGeometry2 = new THREE.ConeGeometry(105, 135, 4); // Хефрен
    const pyramidGeometry3 = new THREE.ConeGeometry(50, 65, 4);   // Мікерін

    // Створення пірамід
    const pyramid1 = new THREE.Mesh(pyramidGeometry1, new THREE.MeshBasicMaterial({ map: brickTexture }));
    const pyramid2 = new THREE.Mesh(pyramidGeometry2, new THREE.MeshBasicMaterial({ map: brickTexture }));
    const pyramid3 = new THREE.Mesh(pyramidGeometry3, new THREE.MeshBasicMaterial({ map: brickTexture }));

    // Верхівки пірамід
    const cap1 = new THREE.Mesh(new THREE.ConeGeometry(5, 10, 4), goldMaterial);
    const cap2 = new THREE.Mesh(new THREE.ConeGeometry(5, 10, 4), goldMaterial);
    const cap3 = new THREE.Mesh(new THREE.ConeGeometry(5, 10, 4), goldMaterial);

    cap1.position.y = 145 / 2;
    cap2.position.y = 135 / 2;
    cap3.position.y = 65 / 2;

    pyramid1.add(cap1);
    pyramid2.add(cap2);
    pyramid3.add(cap3);

    // Позиціонування пірамід
    pyramid1.position.set(-210, -50, -500);
	pyramid2.position.set(50, -50, -250);
    pyramid3.position.set(210, -50, -190);

    // Додавання пірамід на сцену
    scene.add(pyramid1, pyramid2, pyramid3);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}
