<template>
  <div ref="threeContainer" class="three-container"></div>
  <div ref="canvasContainer" class="canvas-container"></div>

</template>

<script lang="ts" setup>
import * as THREE from 'three';
import {onMounted, onBeforeUnmount, ref} from 'vue';
import {FontLoader} from 'three/addons/loaders/FontLoader.js';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import {storeToRefs} from "pinia";
import {useCounterStore} from "@/stores/counter.ts";
// 绑定 Three.js 容器
const threeContainer = ref<HTMLDivElement | null>(null);
const canvasContainer = ref<HTMLDivElement | null>(null);
const rotating = ref(false);
const counter = useCounterStore()
const {words} = storeToRefs(counter)
const lotteryResult = ref()
const fireworks = ref<any>([])
const speedX = ref(0.02)
const speedY = ref(0.02)
const canvas = ref<any>()
function triggerAction() {
  rotating.value = !rotating.value;
  if (!rotating.value) {
    triggerFireworks();
    cleanupThree();
    initThree()
  }
}

defineExpose({triggerAction});
// 渲染器、场景和相机的变量
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let animationId: number;

onMounted(() => {
  initThree();
  canvas.value = createFireworksCanvas();
});

onBeforeUnmount(() => {
  cleanupThree();
});

function initThree() {
  if (!threeContainer.value) return;

  const width = threeContainer.value.clientWidth;
  const height = threeContainer.value.clientHeight;

  // 渲染器
  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(width, height);
  threeContainer.value.appendChild(renderer.domElement);
  // 创建场景
  scene = new THREE.Scene();

  // 创建相机
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
  camera.position.z = 1000;


  // 加载字体并创建 3D 文字球
  createTextSphere();

  // 动画循环
  animate();
}

function createTextSphere() {
  const fontLoader = new FontLoader();
  fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const radius = 300;

    words.value.forEach((word, i) => {
      const geometry = new TextGeometry(word.username, {
        font: font,
        size: 20,
        depth: 2,
      });

      const material = new THREE.MeshBasicMaterial({color: 0x42b983});
      const textMesh = new THREE.Mesh(geometry, material);

      // 将文字均匀分布在球面上
      const phi = Math.acos(-1 + (2 * i) / words.value.length); // 极角 (0 - π)
      const theta = Math.sqrt(words.value.length * Math.PI) * phi; // 方位角 (0 - 2π)

      textMesh.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
      );

      // 使文字朝向球体中心
      textMesh.lookAt(0, 0, 0);

      scene.add(textMesh);
    });
  });
}


function animate() {
  animationId = requestAnimationFrame(animate);
  if (!rotating.value) {
    scene.rotation.y += 0.01; // 旋转效果
    scene.rotation.x += 0.01; // 增加一个垂直方向的旋转
  } else {
    scene.rotation.y += 0.5; // 旋转效果
    scene.rotation.x += 0.3; // 增加一个垂直方向的旋转
  }
  renderer.render(scene, camera);
}

function cleanupThree() {
  cancelAnimationFrame(animationId);
  renderer.dispose();
  threeContainer.value?.removeChild(renderer.domElement);
}

// 触发烟花爆炸
function triggerFireworks() {
  animateFireworks(canvas.value);
}

function animateFireworks(canvas: any) {
  const ctx = canvas.getContext('2d');
  const colors = ['#ff007f', '#ffbf00', '#00ff00', '#00bfff', '#8a2be2', '#ff4500'];

  // 启动烟花爆炸
  for (let i = 0; i < 50; i++) {
    const x = threeContainer.value?.clientWidth;
    const y = threeContainer.value?.clientHeight/2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    fireworks.value.push(createParticle(x, y, color));
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.value.forEach((particle: any, index: number) => {
      particle?.update();
      particle?.draw(ctx);

      // 移除超出屏幕的粒子
      if (particle.life < 0) {
        fireworks.value.splice(index, 1);
      }
    });

    // 如果有烟花粒子继续存在，继续动画
    if (fireworks.value.length > 0) {
      requestAnimationFrame(animate);
    }
  };

  animate();
}


function createFireworksCanvas() {
  const canvas = document.createElement('canvas');
  canvasContainer.value?.appendChild(canvas);
  let fireworksCanvas = canvas;
  let fireworksCtx = canvas.getContext('2d');
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;

  return canvas;
}

function createParticle(x: number, y: number, color: string) {
  return {
    x,
    y,
    color,
    radius: Math.random() * 10 + 1,
    speed: Math.random() * 10 + 1,
    angle: Math.random() * Math.PI * 200,
    life: 100, // 粒子的生命周期

    update() {
      this.life--;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
    },

    draw(ctx: any) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    },
  }
}
</script>

<style scoped>
.three-container {
  margin: 0; /* 去掉外边距 */
  padding: 5px; /* 去掉内边距 */
  overflow: hidden; /* 防止出现滚动条 */
  display: block; /* 确保 div 是块级元素 */
  width: 100%;
  height: 100%;
}

.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 使烟花画布不干扰其他元素的操作 */
}

</style>
