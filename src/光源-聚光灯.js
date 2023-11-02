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
const controls = new OrbitControls(camera, renderer.domElement)
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
    side: THREE.DoubleSide
})
const cube = new THREE.Mesh(sphereGeometry, material)
//3.反射需要
cube.castShadow = true

// cube.position.set(10,10,10)


// 平面
const planeGeometry = new THREE.PlaneGeometry(20, 20)
const plan = new THREE.Mesh(planeGeometry, material)
// 4.反射需要
plan.receiveShadow = true
plan.position.y = -1
plan.rotateX(Math.PI / 2)

scene.add(plan)
scene.add(cube)

// 环境光 
const light = new THREE.AmbientLight(0xffffff, 0.4)
// const light = new THREE.AmbientLight()
scene.add(light)
// 聚光灯
const spotLight = new THREE.SpotLight(0xffffff,55)
spotLight.position.set(5, 5, 5)
// 设置阴影模糊度
spotLight.shadow.radius = 1
// 设置清晰度，避免模糊度太模糊
spotLight.shadow.mapSize.set(1024, 1024)
// 设置聚光投射相机属性
// spotLight.shadow.camera.near = 500;
// spotLight.shadow.camera.far = 4000;
// spotLight.shadow.camera.fov = 30;
spotLight.target = cube



//2.反射需要
spotLight.castShadow = true
scene.add(spotLight)




function render() {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
    controls.update()
}

render()


window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}

const gui = new GUI()

gui.add(spotLight.shadow.camera, "near").min(0).max(1000).step(0.1).onChange((e) => {
    spotLight.shadow.camera.updateProjectionMatrix()
})

gui.add(spotLight.shadow.camera, "far").min(0).max(1000).step(0.1).onChange((e) => {
    spotLight.shadow.camera.updateProjectionMatrix()
})

gui.add(spotLight.shadow.camera, "fov").min(0).max(50).step(0.1).onChange((e) => {
    spotLight.shadow.camera.updateProjectionMatrix()
})

gui.add(spotLight.position, 'x').max(50).min(0).step(1).name("x")
gui.add(cube.position, 'x').max(50).min(0).step(1).name("cube.position")