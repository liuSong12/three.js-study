import * as THREE from "three"
import { SRGBColorSpace } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const camera = new THREE.PerspectiveCamera(
    45,//视角
    window.innerWidth / window.innerHeight, //宽高比
    0.1, //近平面
    1000//远平面
)
const scene = new THREE.Scene()

let gltfLoader = new GLTFLoader()

// 实例化压缩解压器
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("/draco")
// 添加压缩解压器
gltfLoader.setDRACOLoader(dracoLoader)



gltfLoader.load("/image/T98坦克/scene.gltf",(gltf)=>{
    scene.add(gltf.scene)
})
scene.background = new THREE.Color(0x999999)
const RGBELoaderq = new RGBELoader()
RGBELoaderq.load("/image/skidpan_4k.hdr",(envMap)=>{
    envMap.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = envMap
})

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
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true //设置带阻尼的惯性
//设置阻尼
controls.dampingFactor = 0.01 //越小滑的越自由

renderer.render(scene, camera)

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}

animate()

window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}
