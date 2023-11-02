import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { Tween } from "three/examples/jsm/libs/tween.module";



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

// 设置一个小球与光绑定，看见光
const smallBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.3),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
)
smallBall.position.set(2, 2, 2)

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
// 点光源
const pointLight = new THREE.PointLight(0xffffff, 55)
pointLight.position.set(5, 5, 5)
// 设置阴影模糊度
pointLight.shadow.radius = 20
// 设置清晰度，避免模糊度太模糊
pointLight.shadow.mapSize.set(1024, 1024)
// 设置聚光投射相机属性
// spotLight.shadow.camera.near = 500;
// spotLight.shadow.camera.far = 4000;
// spotLight.shadow.camera.fov = 30;
// pointLight.target = cube

// 小球与光绑定
smallBall.add(pointLight)

//2.反射需要
pointLight.castShadow = true
scene.add(smallBall)


// 设置小球围绕大球运动
// const tween = new Tween(smallBall.position)
// tween.to({x:-2,z:-2},2000)
// tween.repeat(Infinity)
// tween.yoyo(true)
// tween.start()

const clock = new THREE.Clock()

function render() {
    let time = clock.getElapsedTime()
    smallBall.position.x = Math.sin(time) * 3
    smallBall.position.z = Math.cos(time) * 3

    renderer.render(scene, camera)
    controls.update()
    // tween.update()
    requestAnimationFrame(render)

}

render()


window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}

const gui = new GUI()
gui.add(pointLight.position, 'x').max(50).min(0).step(1).name("pointLightx")
gui.add(pointLight, 'distance').max(0.03).min(0).step(0.001).name("distance")
gui.add(pointLight, 'decay').max(5).min(0).step(0.1).name("decay")

gui.add(cube.position, 'x').max(50).min(0).step(1).name("cube.position")