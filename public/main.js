const container = document.getElementById('container');
const tooltip = document.getElementById('tooltip');

// ===================== 场景和相机 =====================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 35;

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// 控制器
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ===================== 背景贴图 =====================
const loader = new THREE.TextureLoader();
loader.load('assets/nebula.png', texture => {
    scene.background = texture;
});

// ===================== 模块节点 =====================
const modules = [
    { id: 'core', name:'Core System', size: 6, color:'#ff2266', isCore:true },
    { id: 'intent', name:'Intent Layer', size:4, color:'#00eeff' },
    { id: 'ai', name:'AI Engine', size:4, color:'#44ffaa' },
    { id: 'robot', name:'Robot Cluster', size:3.5, color:'#ffcc22' },
    { id: 'chain', name:'Chain Client', size:4, color:'#7744ff' },
    { id: 'queue', name:'Queue Engine', size:3.5, color:'#ff6622' },
    { id: 'solver', name:'Sovereign Solver', size:3.5, color:'#cc44ff' },
    { id: 'security', name:'Security', size:3, color:'#ff2244' },
];

const links = [];
const coreId = 'core';
modules.forEach(m => { if(m.id!==coreId) links.push({ from:coreId, to:m.id }); });

const sphereRadius = 15;
const nodeObjMap = {};
const lineObjMap = {};

// 创建节点球体
modules.forEach(mod => {
    const g = new THREE.SphereGeometry(mod.size, 32,16);
    const mat = new THREE.MeshBasicMaterial({ color:mod.color, transparent:true, opacity:0.9 });
    const mesh = new THREE.Mesh(g, mat);
    mesh.userData = mod;

    if(mod.isCore){
        mesh.position.set(0,0,0);
    } else {
        const phi = Math.random()*Math.PI*2;
        const costheta = Math.random()*2-1;
        const theta = Math.acos(costheta);
        mesh.position.set(
            sphereRadius*Math.sin(theta)*Math.cos(phi),
            sphereRadius*Math.sin(theta)*Math.sin(phi),
            sphereRadius*Math.cos(theta)
        );
    }
    scene.add(mesh);
    nodeObjMap[mod.id] = mesh;
});

// 创建节点连线
links.forEach(link=>{
    const n1 = nodeObjMap[link.from];
    const n2 = nodeObjMap[link.to];
    const points = [n1.position, n2.position];
    const g = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color:'#0ff', transparent:true, opacity:0.4 });
    const line = new THREE.Line(g, mat);
    scene.add(line);
    lineObjMap[`${link.from}-${link.to}`] = line;
});

// 流光动画
function pulseLinks(){
    links.forEach(link=>{
        const line = lineObjMap[`${link.from}-${link.to}`];
        if(!line) return;
        const t0 = performance.now();
        function anim(){
            const t = Math.sin((performance.now()-t0)/500)*0.4 + 0.6;
            line.material.opacity = t;
            requestAnimationFrame(anim);
        }
        anim();
    });
}
pulseLinks();

// ===================== 恒星粒子 =====================
loader.load('assets/star.png', starTex=>{
    const geometry = new THREE.BufferGeometry();
    const vertices=[];
    for(let i=0;i<2000;i++){
        vertices.push((Math.random()-0.5)*100);
        vertices.push((Math.random()-0.5)*100);
        vertices.push((Math.random()-0.5)*100);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
    const material = new THREE.PointsMaterial({ size:0.5, map:starTex, transparent:true });
    scene.add(new THREE.Points(geometry, material));
});

// ===================== 点击 & 悬浮 =====================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('pointermove', e=>{
    mouse.x = (e.clientX/window.innerWidth)*2-1;
    mouse.y = -(e.clientY/window.innerHeight)*2+1;
    raycaster.setFromCamera(mouse,camera);
    const intersects = raycaster.intersectObjects(Object.values(nodeObjMap));
    if(intersects.length){
        const d = intersects[0].object.userData;
        tooltip.style.display='block';
        tooltip.style.left = e.clientX+10+'px';
        tooltip.style.top = e.clientY+10+'px';
        tooltip.innerText=d.name;
    } else { tooltip.style.display='none'; }
});

window.addEventListener('pointerdown', e=>{
    raycaster.setFromCamera(mouse,camera);
    const intersects = raycaster.intersectObjects(Object.values(nodeObjMap));
    if(intersects.length){
        const d = intersects[0].object.userData;
        alert('Module: '+d.name);
    }
});

// ===================== 动画循环 =====================
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}
animate();

// ===================== 自适应 =====================
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===================== 开发者按钮 =====================
function goDev(idx){
    alert(['Quick Connect','API Docs','Node Join','DApp Connect','Contract Info','Earn ASTRO','Console'][idx-1]);
}
document.getElementById('backBtn').onclick=()=>window.location.href='index.html';
