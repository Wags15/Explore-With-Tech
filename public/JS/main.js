import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer, controls, move, boxes, beachInfo, next, previous, currentBox;

function init() {
    currentBox = 0;
    move = '';
    boxes = [];
    beachInfo = new BeachInfo();

    scene = new THREE.Scene();

    let background = new THREE.TextureLoader().load('../public/Images/backgrounds/background.jpg');

    // GET RID OF PUBLIC DIRECTORY DOESNT USE WHEN DEPLOYED
    if (screen.width <= 800 || window.width <= 800) {
        background = new THREE.TextureLoader().load('../public/Images/backgrounds/phoneBackground.jpg');
    }


    scene.background = background;

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        5000
    );

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // The initial z position of the camera 
    camera.position.z = 20;

    controls = new OrbitControls(camera, renderer.domElement);

    // The min and max distance the camera can zoom out to
    controls.minDistance = 2;
    controls.maxDistance = 50;

    // Adds inertia to make the boxes feel like they have weight
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // This will change how far the user can rotate up or down
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.minPolarAngle = Math.PI / 5;

    controls.zoomSpeed = 2;

    // Change this to get rid of angle lock on the horizontal
    // controls.maxAzimuthAngle = Math.PI/1.5;
    // controls.minAzimuthAngle = Math.PI/10;
    

    controls.saveState();

    makeBoxes();

    for (let i = 0; i < boxes.length; i++) {
        scene.add(boxes[i].texture);
        boxes[i].texture.visible = false;
    }
    boxes[0].texture.visible = true;



    next = document.getElementById('right')
    next.addEventListener('click', () => {
        if (currentBox != boxes.length - 1) {
            controls.reset();
            move = 'right';
            boxes[currentBox].texture.visible = false;
            currentBox++;
            boxes[currentBox].texture.visible = true;
            if (currentBox == boxes.length - 1) {
                next.style.display = 'none';
            }
            beachInfo.setText(boxes[currentBox]);
        }

    });

    previous = document.getElementById('left')
    previous.addEventListener('click', () => {
        if (currentBox != 0) {
            controls.reset();
            move = 'left';
            boxes[currentBox].texture.visible = false;
            currentBox--;
            boxes[currentBox].texture.visible = true;
            if (currentBox == 0) {
                previous.style.display = 'none';
            }
            beachInfo.setText(boxes[currentBox]);
        }
    });

    beachInfo.setText(boxes[currentBox]);


}

function makeBoxes() {
    let materialArray = [];
    materialArray.push(setBoxImages(1));
    materialArray.push(setBoxImages(2));
    materialArray.push(setBoxImages(3));

    for (let i = 0; i < materialArray.length; i++) {
        for (let j = 0; j < 6; j++) {
            materialArray[i][j].side = THREE.BackSide;
        }
    }


    const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    boxes[0] = new Box(new THREE.Mesh(boxGeometry, materialArray[0]), "Beach One", "Location One, Ontario, Canada", "https://www.wasagabeach.com/en/index.aspx");

    boxes[1] = new Box(new THREE.Mesh(boxGeometry, materialArray[1]), "Beach Two", "Location Two, Ontario, Canada", "#");
    boxes[1].texture.position.x = 100;

    boxes[2] = new Box(new THREE.Mesh(boxGeometry, materialArray[2]), "Beach Three", "Location Three, Ontario, Canada", "#");
    boxes[2].texture.position.x = 200;

    boxes[3] = new Box(new THREE.Mesh(boxGeometry, materialArray[1]), "Beach Four", "Location Four, Ontario, Canada", "#");
    boxes[3].texture.position.x = 300;
}

function animate() {


    if (camera.position.distanceTo(controls.target) < 10) {
        beachInfo.clearText();
    } else if (beachInfo.name.style.display == 'none') {
        beachInfo.setText(boxes[currentBox]);
    }

    if (move == 'right') {
        previous.style.display = 'block';
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].texture.position.x -= 10;
            boxes[i].texture.rotation.y += 36;
            if (boxes[currentBox].texture.position.x == 0) {
                move = '';
            }
        }
    }

    if (move == 'left') {
        next.style.display = 'block';
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].texture.position.x += 10;
            boxes[i].texture.rotation.y -= 36;
            if (boxes[currentBox].texture.position.x == 0) {
                move = '';
            }
        }
    }
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}


function setBoxImages(boxNum) {
    let box = 'box' + boxNum;
    let materialArray = [];
    let textures = [];
    // GET RID OF PUBLIC DIRECTORY DOESNT USE WHEN DEPLOYED

    textures.push(new THREE.TextureLoader().load('../public/Images/' + box + '/1.png'));
    textures.push(new THREE.TextureLoader().load('../public/Images/' + box + '/2.png'));
    textures.push(new THREE.TextureLoader().load('../public/Images/' + box + '/3.png'));
    textures.push(new THREE.TextureLoader().load('../public/Images/' + box + '/4.png'));
    textures.push(new THREE.TextureLoader().load('../public/Images/' + box + '/5.png'));
    textures.push(new THREE.TextureLoader().load('../public/Images/' + box + '/6.png'));


    materialArray.push(new THREE.MeshBasicMaterial({ map: textures[0] }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: textures[1] }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: textures[2] }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: textures[3] }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: textures[4] }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: textures[5] }));

    return materialArray;
}




function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

class Box {
    constructor(texture, name, info, href) {
        this.texture = texture;
        this.name = name;
        this.info = info;
        this.href = href;
    }
}

class BeachInfo {
    constructor() {
        this.name = document.getElementById('name');
        this.info = document.getElementById('info');
        this.name.href = "#";
    }

    clearText() {
        this.name.style.display = 'none';
        this.info.style.display = 'none';
    }

    setText(box) {
        this.name.style.display = 'block';
        this.info.style.display = 'block';
        this.name.innerHTML = box.name;
        this.info.innerHTML = box.info;
        this.name.href = box.href;
    }
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();