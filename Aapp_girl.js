// learn from https://www.misterma.com/archives/918/

const openImgFile = document.querySelector('#open-img-file');  // 打开图片按钮
const fileInput = document.querySelector('#file-input');  // 文件选择表单
const colorSelect = document.querySelector('#color-select');  // 颜色选择器
const thickness = document.querySelector('#thickness');  // 笔画粗细的输入表单
const exportBtn = document.querySelector('#export-btn');  // 导出图片按钮
const canvas = document.querySelector('#canvas');  // canvas 元素
const ctx = canvas.getContext('2d');
let press = false;  // 用来记录鼠标按下状态

// const background = new Image();
// background.src = './image/girl.png';
// background.onload = function () {
//     ctx.drawImage(background, 0, 0);
// };

// 打开图片按钮点击
openImgFile.addEventListener('click', () => {
  // 点击文件表单
  fileInput.click();
});

// 文件表单改变
fileInput.addEventListener('change', ev => {
  // 如果没有选择文件就直接返回
  if (ev.target.value === '') return false;
  // 检测是否是 jpg 或 png 的图片，如果不是就返回
  if (ev.target.files[0].type !== 'image/jpeg' && ev.target.files[0].type !== 'image/png') {
    alert('目前只支持 jpg 和 png 格式的图片！');
    return false;
  }
  // 创建一个 img 元素
  const img = new Image();
  // 创建一个对象 URL，把对象 URL 传给 img
  img.src = URL.createObjectURL(ev.target.files[0]);
  // img 图片加载完成
  img.onload = () => {
    // 把 canvas 的宽高设置为图片的真实宽高
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    // 在 canvas 中绘制图片
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.naturalWidth, img.naturalHeight);
  }
});

// 鼠标按下
canvas.addEventListener('mousedown', ev => {
  // 把鼠标按下状态设置为 true
  press = true;
  // 开始一个新的路径
  ctx.beginPath();
  // 标记起点
  ctx.moveTo(ev.offsetX, ev.offsetY);
  // 设置线的宽度
  ctx.lineWidth = Number(thickness.value);
  // 设置颜色，颜色从颜色选择器表单获取
  ctx.strokeStyle = colorSelect.value;
});

// 鼠标移动
canvas.addEventListener('mousemove', ev => {
  // 如果鼠标没有按下就直接返回
  if (!press) return false;
  // 直线连接位置
  ctx.lineTo(ev.offsetX, ev.offsetY);
  ctx.stroke();
});

// 鼠标松开
canvas.addEventListener('mouseup', () => {
  // 把鼠标按下的状态设置为 false
  press = false;
  // 停止当前路劲
  ctx.closePath();
});

// 导出图片按钮点击
exportBtn.addEventListener('click', () => {
  // 把 canvas 内容转换为 DataURL 数据
  const imgData = canvas.toDataURL('image/png');
  const linkEl = document.createElement('a');
  linkEl.href = imgData;
  linkEl.download = 'image.png';
  document.body.appendChild(linkEl);
  linkEl.click();
  linkEl.remove();
});