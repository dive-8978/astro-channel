// 返回主页
document.getElementById('backBtn').onclick=()=>window.location.href='index.html';

// 开发按钮跳转
function goDev(index){
  const txt=[
    'Quick Connect Intent Network',
    'API Docs: Execute / Query',
    'Apply Global Node',
    'DApp / Robot / AI Connect',
    'ASTRO Token & Burn Contract',
    'Developer Reward: Earn ASTRO',
    'Online Console: Status & Burn'
  ];
  alert(txt[index-1]);
}

// THREE.js 场景
const container=document.getElementById('container');
const tooltip=document.getElementById('tooltip');
const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,50);

const renderer=new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping=THREE.ReinhardToneMapping;
container.appendChild(renderer.domElement);

// 控制器
const controls=new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping=true;
controls.minDistance=15;
controls.maxDistance=120;

// Bloom
const composer=new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene,camera));
const bloomPass=new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth,window.innerHeight),1.7,0.4,0.06);
composer.addPass(bloomPass);

// 背景银河
const loader=new THREE.TextureLoader();
loader.load('assets/nebula.png', tex=>{
  scene.background=tex;
});

// 恒星粒子
const starGeom=new THREE.BufferGeometry();
const starCount=2000;
const starPos=new Float32Array(starCount*3);
for(let i=0;i<starCount*3;i++) starPos[i]=(Math.random()-0.5)*300;
starGeom.setAttribute('position', new THREE.BufferAttribute(starPos,3));
const starMat=new THREE.PointsMaterial({
  color:0xffffff,size:0.5, map:loader.load('assets/star.png'), transparent:true, blending:THREE.AdditiveBlending
});
const stars=new THREE.Points(starGeom,starMat);
scene.add(stars);

// 节点模块
const modules=[
  {id:'core', name:'Core System', size:2.5, color:'#ff2266', isCore:true},
  {id:'intent', name:'Intent Layer', size:1.5, color:'#00eeff'},
  {id:'ai', name:'AI Engine', size:1.5, color:'#44ffaa'},
  {id:'robot', name:'Robot Cluster', size:1.2, color:'#ffcc22'},
  {id:'chain', name:'Chain Client', size:1.5, color:'#7744ff'},
  {id:'queue', name:'Queue Engine', size:1.2, color:'#ff6622'}
];
const nodeObjMap={};
modules.forEach((m,i)=>{
  const geo=new THREE.SphereGeometry(m.size,24,16);
  const mat=new THREE.MeshBasicMaterial({color:m.color, transparent:true, opacity:0.9});
  const mesh=new THREE.Mesh(geo, mat);
  mesh.userData=m;
  if(m.isCore){
    mesh.position.set(0,0,0);
  } else {
    const angle=i*1.3;
    const radius=12+Math.random()*5;
    mesh.position.set(radius*Math.cos(angle), radius*Math.sin(angle), Math.sin(angle*2)*5);
    mesh.userData.orbitAngle=angle;
    mesh.userData.orbitRadius=radius;
  }
  scene.add(mesh);
  nodeObjMap[m.id]=mesh;
});

// 连接线 + 流光粒子
const links=[
  {from:'core',to:'intent'},
  {from:'core',to:'ai'},
  {from:'core',to:'robot'},
  {from:'core',to:'chain'},
  {from:'core',to:'queue'}
];
const lineObjMap={};
links.forEach(l=>{
  const n1=nodeObjMap[l.from];
  const n2=nodeObjMap[l.to];
  const geom=new THREE.BufferGeometry().setFromPoints([n1.position,n2.position]);
  const mat=new THREE.LineBasicMaterial({color:'#00ffff',transparent:true,opacity:0.4});
  const line=new THREE.Line(geom,mat);
  scene.add(line);
  lineObjMap[`${l.from}-${l.to}`]=line;
  // 流光粒子
  const particleGeom=new THREE.BufferGeometry();
  particleGeom.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0],3));
  const particleMat=new THREE.PointsMaterial({color:'#0ff',size:0.3});
  const particle=new THREE.Points(particleGeom, particleMat);
  line.particle=particle;
  scene.add(particle);
});

// 节点高亮 + 流光脉冲
function pulseLinks(){
  links.forEach(l=>{
    const line=lineObjMap[`${l.from}-${l.to}`];
    if(!line) return;
    const t=(Math.sin(performance.now()*0.002)+1)/2;
    line.material.opacity=0.2+0.8*t;
    // 粒子沿线移动
    const pos=line.geometry.attributes.position.array;
    const start=new THREE.Vector3(pos[0],pos[1],pos[2]);
    const end=new THREE.Vector3(pos[3],pos[4],pos[5]);
    const alpha=(Math.sin(performance.now()*0.003)+1)/2;
    line.particle.position.lerpVectors(start,end,alpha);
  });
}
setInterval(pulseLinks,16);

// 鼠标悬浮提示 + 点击高亮
const raycaster=new THREE.Raycaster();
const mouse=new THREE.Vector2();
window.addEventListener('pointermove',e=>{
  mouse.x=(e.clientX/window.innerWidth)*2-1;
  mouse.y=-(e.clientY/window.innerHeight)*2+1;
  raycaster.setFromCamera(mouse,camera);
  const intersects=raycaster.intersectObjects(Object.values(nodeObjMap));
  if(intersects.length){
    const d=intersects[0].object.userData;
    tooltip.style.display='block';
    tooltip.style.left=e.clientX+10+'px';
    tooltip.style.top=e.clientY+10+'px';
    tooltip.innerText=d.name;
  } else tooltip.style.display='none';
});
window.addEventListener('pointerdown',e=>{
  raycaster.setFromCamera(mouse,camera);
  const intersects=raycaster.intersectObjects(Object.values(nodeObjMap));
  if(intersects.length){
    const d=intersects[0].object.userData;
    const mesh=intersects[0].object;
    mesh.material.color.set('#ffffff'); // 高亮
    setTimeout(()=>mesh.material.color.set(d.color),500);
    alert(`Module: ${d.name}\nSize: ${d.size}\nID: ${d.id}`);
  }
});

// 动画循环
function animate(){
  requestAnimationFrame(animate);
  const t=performance.now()*0.0005;
  Object.values(nodeObjMap).forEach(n=>{
    if(!n.userData.isCore){
      n.userData.orbitAngle+=0.001;
      n.position.set(
        n.userData.orbitRadius*Math.cos(n.userData.orbitAngle),
        n.userData.orbitRadius*Math.sin(n.userData.orbitAngle),
        n.position.z
      );
    }
  });
  composer.render();
  controls.update();
}
animate();

// 自适应
window.addEventListener('resize',()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  composer.setSize(window.innerWidth,window.innerHeight);
});
