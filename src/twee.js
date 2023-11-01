import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { Tween } from "three/examples/jsm/libs/tween.module";

const camera = new THREE.PerspectiveCamera(
    45,//视角
    window.innerWidth / window.innerHeight, //宽高比
    0.1, //近平面
    1000//远平面
)
const scene = new THREE.Scene()
 

const geometry = new THREE.SphereGeometry(0.5,0.5,0.5)
const meterial = new THREE.MeshBasicMaterial()

const cube = new THREE.Mesh(geometry, meterial)

scene.add(cube)


camera.position.z = 5
camera.position.x = 5
camera.position.y = 5
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


//添加轨道控制器（鼠标拖动）
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true //设置带阻尼的惯性
//设置阻尼
controls.dampingFactor = 0.01 //越小滑的越自由

renderer.render(scene, camera)

const tween = new Tween(cube.position)
tween.to({x:2},2000)
tween.start()

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
    tween.update()
}

animate()

window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}


const gui = new GUI()
