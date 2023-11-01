import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(
    45,//视角
    window.innerWidth / window.innerHeight, //宽高比
    0.1, //近平面
    1000//远平面
)

camera.lookAt(0, 0, 0)
camera.position.z = 25

const scene = new THREE.Scene()

const cube = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00
    })
)
cube.position.x = 4
scene.add(cube)

const cube2 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
)
cube2.position.x = 0
scene.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial({
        color: 0x0000ff
    })
)
cube3.position.x = -4
scene.add(cube3)

renderer.render(scene, camera)

//添加轨道控制器（鼠标拖动）
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true //设置带阻尼的惯性
//设置阻尼
controls.dampingFactor = 0.01 //越小滑的越自由

// 创建射线
const raycaster = new THREE.Raycaster()
// 创建鼠标向量
const mouse = new THREE.Vector2()
window.onclick = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects([cube, cube2, cube3])
    console.log(intersects)
    if (intersects.length > 0) {
        intersects[0].object.material.color.set(0xff00ff)
    }
}



function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}

animate()