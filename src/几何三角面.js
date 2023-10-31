import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
    45,//视角
    window.innerWidth / window.innerHeight, //宽高比
    0.1, //近平面
    1000//远平面
)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


//创建立方体
// const geometry = new THREE.BoxGeometry(1, 1, 1)

// 创建可以透视的几何体
const geometry = new THREE.BufferGeometry()
// 创建顶点数据
// 顶点逆时针为正面
const vetices = new Float32Array([
    0, 0, 0,
    1, 0, 0,
    0, 0, 1,
    1, 0, 1,
    1, 0, 0,
    0, 0, 1
])
geometry.setAttribute("position", new THREE.BufferAttribute(vetices, 3))
// 创建材质
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    wireframe: true//线框
})
// 创建网格
const cube = new THREE.Mesh(geometry, material)

// 将网格添加到场景
scene.add(cube)

// 设置相机位置
camera.position.z = 5
camera.position.y = 2
camera.position.x = 2
camera.lookAt(0, 0, 0)

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(15) //5是x，y，z的长度
scene.add(axesHelper)

//添加轨道控制器（鼠标拖动）
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true //设置带阻尼的惯性
//设置阻尼
controls.dampingFactor = 0.01 //越小滑的越自由

//渲染
renderer.render(scene, camera)



function animate() {
    // 控制轨道
    controls.update()
    requestAnimationFrame(animate)
    //旋转
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    // 渲染
    renderer.render(scene, camera)
}
animate()


window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}


