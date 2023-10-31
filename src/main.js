import * as THREE from 'three'

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
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// 创建网格
const cube = new THREE.Mesh(geometry, material)

// 将网格添加到场景
scene.add(cube)

// 设置相机位置
camera.position.z = 5
camera.lookAt(0, 0, 0)

//渲染
renderer.render(scene, camera)



function animate() {
    requestAnimationFrame(animate)
    //旋转
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    // 渲染
    renderer.render(scene, camera)
}
animate()




