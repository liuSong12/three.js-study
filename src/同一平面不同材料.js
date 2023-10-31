import * as THREE from "three" 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const camera = new THREE.PerspectiveCamera(
    45,//视角
    window.innerWidth / window.innerHeight, //宽高比
    0.1, //近平面
    1000//远平面
)


const meterial = new THREE.MeshBasicMaterial({
    color:0xff0000,
    side:THREE.DoubleSide
})
const meterial2 = new THREE.MeshBasicMaterial({
    color:0x00ff00,
    side:THREE.DoubleSide
})
const meterial3 = new THREE.MeshBasicMaterial({
    color:0x0000ff,
    side:THREE.DoubleSide
})
const meterial4 = new THREE.MeshBasicMaterial({
    color:0xff00ff,
    side:THREE.DoubleSide
})
const meterial5 = new THREE.MeshBasicMaterial({
    color:0xaa00ff,
    side:THREE.DoubleSide,
    // wireframe:true
})
const meterial6 = new THREE.MeshBasicMaterial({
    color:0xffffff,
    side:THREE.DoubleSide
})
const geometry = new THREE.BoxGeometry(0.5,0.5,0.5)

const geometry11 = new THREE.ConeGeometry( 5, 20, 32 ); 
const material33 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh(geometry11, material33 ); 

const cube = new THREE.Mesh(geometry,[meterial,meterial2,meterial3,meterial4,meterial5,meterial6])

cube.position.set(0.5,0.5,0.5)

const scene = new THREE.Scene()
scene.add( cone );


scene.add(cube)
// 设置相机位置
camera.position.z = 3
camera.position.x = 3
camera.position.y = 3
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(15) //5是x，y，z的长度
scene.add(axesHelper)

//添加轨道控制器（鼠标拖动）
const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping = true //设置带阻尼的惯性
//设置阻尼
controls.dampingFactor = 0.01 //越小滑的越自由

renderer.render(scene,camera)

function animate(){
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene,camera)
}

animate()

window.onresize = ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth/ window.innerHeight
    camera.updateProjectionMatrix()
}