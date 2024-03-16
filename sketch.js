let txt = []; // 用于存储文本中的字符
let charIndex = 0; // 当前使用的字符索引
let particles = []; // 粒子数组
let img;

function preload() {
  loadStrings('11-22.txt', function(data) {
    txt = join(data, "").split(""); // 合并文本行并分割成字符数组
  });
  img = loadImage('a1.png'); // 确保替换为你的图片路径
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 设置画布为全屏
  textSize(28); // 设置文本大小
  fill(0); // 设置文本颜色
}

function draw() {
  background(200);

  // 更新和显示所有粒子
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1); // 移除死亡的粒子
    }
  }
  
  // 计算并绘制图片
  displayImage();
}

function mouseMoved() {
  addParticle(); // 添加粒子
  return false; // 阻止默认事件（例如，滚动）
}

function touchMoved() {
  addParticle(); // 添加粒子
  return false; // 阻止默认事件
}

function addParticle() {
  let char = txt[charIndex % txt.length]; // 循环使用文本中的字符
  particles.push(new Particle(mouseX, mouseY, char));
  charIndex++;
}

function displayImage() {
  let screenRatio = width / height;
  let imgRatio = img.width / img.height;
  let drawWidth, drawHeight;
  if (imgRatio > screenRatio) {
    drawHeight = height;
    drawWidth = img.width * (height / img.height);
  } else {
    drawWidth = width;
    drawHeight = img.height * (width / img.width);
  }
  image(img, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

// Particle 类不变


class Particle {
  constructor(x, y, char) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(2, 5));
    this.lifespan = 255; // 初始透明度
    this.char = char;

    // 根据屏幕宽度动态设置粒子大小
    this.size = windowWidth < 500 ? 16 : 28; // 如果屏幕宽度小于500px，则使用较小的粒子大小
  }

  update() {
    this.velocity.mult(0.95);
    this.position.add(this.velocity);
    this.lifespan -= 1.2;
    if (this.lifespan < 50 && this.velocity.mag() > 0.1) {
      this.velocity.mult(0.7);
    }
  }

  display() {
    fill(0, this.lifespan);
    textSize(this.size); // 正确设置文本大小
    text(this.char, this.position.x, this.position.y);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}
