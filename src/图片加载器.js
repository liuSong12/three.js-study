import * as THREE from "three"
import { SRGBColorSpace } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";


const camera = new THREE.PerspectiveCamera(
    45,//视角
    window.innerWidth / window.innerHeight, //宽高比
    0.1, //近平面
    1000//远平面
)
const scene = new THREE.Scene()
 

// 创建纹理加载器
let textureLoader = new THREE.TextureLoader();
// 加载纹理
let texture = textureLoader.load("/image/2.jpg")

// 色差有问题就调成这个
texture.colorSpace = SRGBColorSpace
// texture.colorSpace = THREE.LinearSRGBColorSpace //这个是默认



const meterial = new THREE.MeshBasicMaterial({
    // color:0xff0000,
    side: THREE.DoubleSide,
    wireframe: false,
    map: texture,//贴图,
    // aoMap: texture,  //夹缝分明
    // alphaMap: texture,  //白为不透明，黑为透明
    // lightMap: texture, //光照贴图，使物体好像反光
    specularMap:texture, //高光贴图，使白色反射更强，黑色反射更弱
    reflectivity:1 //设置反射强度
})

// RGBELoader 加载hdr贴图 作为场景的背景图，需要hdr后缀的图
const rgbeLoader = new RGBELoader()
rgbeLoader.load("/image/skidpan_4k.hdr", (envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = envMap
    // 给场景设置贴图
    scene.environment = envMap
    // 给材料设置贴图
    meterial.envMap = envMap
})

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)


const cube = new THREE.Mesh(geometry, meterial)

cube.position.set(0.5, 0.5, 0.5)

// 设置雾
let fog = new THREE.Fog(0xff0000,0.1,10)
// new THREE.FogExp2(0xff0000,0.1)
scene.background = new THREE.Color(0xff0000)
scene.fog = fog
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

const gui = new GUI()

gui.add(meterial, "aoMapIntensity").min(0).max(1).name("ao贴图的强度")