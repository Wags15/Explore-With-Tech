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
    // Change this to for loop
    for(let i=1; i <=20; i++){
        materialArray.push(setBoxImages(i));
    }   
   

    for (let i = 0; i < materialArray.length; i++) {
        for (let j = 0; j < 6; j++) {
            materialArray[i][j].side = THREE.BackSide;
        }
    }


    const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    boxes[0] = new Box(new THREE.Mesh(boxGeometry, materialArray[0]), "Nissi Beach", "Ayia Napa, Cyprus", "https://nissi-beach.com/");

    boxes[1] = new Box(new THREE.Mesh(boxGeometry, materialArray[1]), "Los Christianos Beach", "Los Christianos, Tenerife", "https://www.spain-tenerife.com/en/places/cristianos.html");
    boxes[1].texture.position.x = 50;

    boxes[2] = new Box(new THREE.Mesh(boxGeometry, materialArray[2]), "Larnaca Beach", "Larnaca, Cyprus", "https://chooseyourcyprus.com/discover-cyprus/beaches/larnaka-beaches.html");
    boxes[2].texture.position.x = 100;

    boxes[3] = new Box(new THREE.Mesh(boxGeometry, materialArray[3]), "Perea Beach", "Thessaloniki, Greece", "https://www.greeka.com/macedonia/thessaloniki/beaches/perea-beach/");
    boxes[3].texture.position.x = 150;

    boxes[4] = new Box(new THREE.Mesh(boxGeometry, materialArray[4]), "Playa De Las Americas", "Playa de las Americas, Tenerife", "https://www.tripadvisor.com/Attraction_Review-g562820-d13546304-Reviews-Playa_De_Las_Americas-Playa_de_las_Americas_Arona_Tenerife_Canary_Islands.html");
    boxes[4].texture.position.x = 200;

    boxes[5] = new Box(new THREE.Mesh(boxGeometry, materialArray[5]), "Ryfjället", "Tärnaby, Sweden", "https://boka.hemavantarnaby.com/sv/se-gora/318730/ryjvejegaejsieryfj%C3%A4llet/detaljer");
    boxes[5].texture.position.x = 250;

    boxes[6] = new Box(new THREE.Mesh(boxGeometry, materialArray[6]), "St. Peter's Basilica", "Rome, Italy", "https://www.rome.net/st-peters-basilica");
    boxes[6].texture.position.x = 300;

    boxes[7] = new Box(new THREE.Mesh(boxGeometry, materialArray[7]), "Yokohama Grand Hotel", "Yokohama, Japan", "https://www.tripadvisor.ca/Hotel_Review-g14134875-d299143-Reviews-INTERCONTINENTAL_YOKOHAMA_GRAND-Minatomirai_Nishi_Yokohama_Kanagawa_Prefecture_Kanto.html");
    boxes[7].texture.position.x = 350;

    boxes[8] = new Box(new THREE.Mesh(boxGeometry, materialArray[8]), "Golden Gate Bridge", "San Francisco, California, USA", "https://www.goldengate.org/");
    boxes[8].texture.position.x = 400;

    boxes[9] = new Box(new THREE.Mesh(boxGeometry, materialArray[9]), "Fisherman's Bastion", "Budapest, Hungary", "http://www.fishermansbastion.com/");
    boxes[9].texture.position.x = 450;

    boxes[10] = new Box(new THREE.Mesh(boxGeometry, materialArray[10]), "Tantolunden Park", "Stockholm, Sweden", "https://www.expedia.com/Tantolunden-Park-Stockholm.d6161605.Vacation-Attraction?pwaLob=wizard-package-pwa");
    boxes[10].texture.position.x = 500;

    boxes[11] = new Box(new THREE.Mesh(boxGeometry, materialArray[11]), "Lancellotti Chapel", "Rome, Italy", "https://www.rome.net/");
    boxes[11].texture.position.x = 550;

    boxes[12] = new Box(new THREE.Mesh(boxGeometry, materialArray[12]), "Colosseum", "Rome, Italy", "https://www.rome.net/colosseum");
    boxes[12].texture.position.x = 600;

    boxes[13] = new Box(new THREE.Mesh(boxGeometry, materialArray[13]), "Saint Peter's Square", "Vatican City", "https://www.rome.net/st-peters-square");
    boxes[13].texture.position.x = 650;

    boxes[14] = new Box(new THREE.Mesh(boxGeometry, materialArray[14]), "Niagara Falls", "Niagara Falls, Ontario, Canada", "https://www.niagarafallstourism.com/");
    boxes[14].texture.position.x = 700;

    boxes[15] = new Box(new THREE.Mesh(boxGeometry, materialArray[15]), "Kastellholmen", "Stockholm, Sweden", "https://www.tripadvisor.ca/ShowUserReviews-g189852-d246017-r303962223-Skeppsholmen-Stockholm.html");
    boxes[15].texture.position.x = 750;

    boxes[16] = new Box(new THREE.Mesh(boxGeometry, materialArray[16]), "Bathing Lake", "Sorsele, Sweden", "https://www.swedishlapland.com/sorsele/");
    boxes[16].texture.position.x = 800;

    boxes[17] = new Box(new THREE.Mesh(boxGeometry, materialArray[17]), "Town Hall Square", "Tallinn, Estonia", "https://www.visitestonia.com/en/tallinn-town-hall-square");
    boxes[17].texture.position.x = 850;

    boxes[18] = new Box(new THREE.Mesh(boxGeometry, materialArray[18]), "Forbidden City", "Beijing, China", "https://www.chinahighlights.com/beijing/forbidden-city/");
    boxes[18].texture.position.x = 900;

    boxes[19] = new Box(new THREE.Mesh(boxGeometry, materialArray[19]), "CN Tower", "Toronto, Ontario, Canada", "https://www.cntower.ca/intro.html");
    boxes[19].texture.position.x = 950;


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

    textures.push(new THREE.TextureLoader().load('../public/Images/' + box + '/1.jpg'));
    textures.push(new THREE.TextureLoader().load('../public/Images/' + box + '/2.jpg'));
    textures.push(new THREE.TextureLoader().load('../public/Images/' + box + '/3.jpg'));
    textures.push(new THREE.TextureLoader().load('../public/Images/' + box + '/4.jpg'));
    textures.push(new THREE.TextureLoader().load('../public/Images/' + box + '/5.jpg'));
    textures.push(new THREE.TextureLoader().load('../public/Images/' + box + '/6.jpg'));


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