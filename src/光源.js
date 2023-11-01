import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";



const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
// 1.反射需要
renderer.shadowMap.enabled = true

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

//添加轨道控制器（鼠标拖动）
const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping = true //设置带阻尼的惯性
//设置阻尼
controls.dampingFactor = 0.01 //越小滑的越自由



camera.position.set(0, 20, 20)
camera.lookAt(0, 0, 0)

const scene = new THREE.Scene()

// 球
const sphereGeometry = new THREE.SphereGeometry()
// basic材质是不能打光的
const material = new THREE.MeshStandardMaterial({
    side:THREE.DoubleSide
})
const cube = new THREE.Mesh(sphereGeometry, material)
//3.反射需要
cube.castShadow = true

// 平面
const planeGeometry = new THREE.PlaneGeometry(20,20)
const plan = new THREE.Mesh(planeGeometry,material)
// 4.反射需要
plan.receiveShadow = true
plan.position.y = -1
plan.rotateX(Math.PI/2)

scene.add(plan)
scene.add(cube)

// 环境光
const light = new THREE.AmbientLight(0xffffff,0.4)
scene.add(light)
// 直射光
const directionalLight = new THREE.DirectionalLight(0xffffff,2)
directionalLight.position.set(10,10,10)
// 设置阴影模糊度
directionalLight.shadow.radius = 50
// 设置清晰度，避免模糊度太模糊
directionalLight.shadow.mapSize.set(4096,4096)
// 设置平行光投射相机属性
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 500
directionalLight.shadow.camera.top = 5
directionalLight.shadow.camera.bottom = -5
directionalLight.shadow.camera.left = -5
directionalLight.shadow.camera.right = 5


//2.反射需要
directionalLight.castShadow = true
scene.add(directionalLight)




function render() {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
    controls.update()
}

render()


window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth/ window.innerHeight
    camera.updateProjectionMatrix()
}

const gui = new GUI()

gui.add(directionalLight.shadow.camera,"near").min(0).max(20).step(0.1).onChange((e)=>{
    console.log(e)
    directionalLight.shadow.camera.updateProjectionMatrix()
})