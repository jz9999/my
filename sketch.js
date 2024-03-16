let txt = []; // 用于存储文本中的字符
let charIndex = 0; // 当前使用的字符索引
let particles = []; // 粒子数组
let img;

function preload() {
  // 加载文本文件，并在加载完成后处理文本
  loadStrings('11-22.txt', function(data) {
    txt = join(data, "").split(""); // 合并文本行并分割成字符数组
  });
  img = loadImage('a1.png'); // 确保替换为你的图片路径
}

function setup() {
  //createCanvas(800, 600);
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
  
  // 获取屏幕和图片的宽高比
  let screenRatio = width / height;
  let imgRatio = img.width / img.height;

  // 计算图片缩放后的尺寸
  let drawWidth, drawHeight;
  if (imgRatio > screenRatio) {
    // 图片相对于屏幕更宽，以屏幕的高度为基准缩放图片
    drawHeight = height;
    drawWidth = img.width * (height / img.height);
  } else {
    // 图片相对于屏幕更高，以屏幕的宽度为基准缩放图片
    drawWidth = width;
    drawHeight = img.height * (width / img.width);
  }

  // 绘制图片，使其居中显示
  image(img, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);

}

function mouseMoved() {
  // 添加一个新的粒子到数组中
  let char = txt[charIndex % txt.length]; // 循环使用文本中的字符
  particles.push(new Particle(mouseX, mouseY, char));
  charIndex++;
  }




class Particle {
  constructor(x, y, char) {
    this.position = createVector(x, y);
    // 初始化时赋予较大的随机速度
    this.velocity = p5.Vector.random2D().mult(random(2, 5));
    this.lifespan = 255; // 初始透明度
    this.char = char;
  }

  update() {
    // 随着生命周期的减少，逐渐减少速度，但不让它完全停止
    this.velocity.mult(0.95);
    this.position.add(this.velocity);
    this.lifespan -= 0.8; // 每帧减少透明度
    
    // 确保粒子在生命周期接近结束时仍然缓慢移动
    if (this.lifespan < 50 && this.velocity.mag() > 0.1) {
      this.velocity.mult(0.7);
}
      }

  display() {
    fill(0, this.lifespan); // 根据剩余生命周期设置透明度
    text(this.char, this.position.x, this.position.y);
  }

  isDead() {
    return this.lifespan <= 0;
  }

}
