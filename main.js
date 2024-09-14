let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.style.background = "#b2dff3";

let angle = 0;
let targetAngle = Math.PI / 4;
let angleIncrement = 0.01;
let branchSize = 5;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  let treeHeight = Math.min(canvas.width, canvas.height) * 0.3;
  drawTree(treeHeight, treeHeight / 10);
}

function line(len, width) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineWidth = width;
  ctx.lineTo(0, -len);
  ctx.stroke();
}

function branch(len, width, angle) {
  ctx.strokeStyle = "#264653";
  line(len, width);
  ctx.translate(0, -len);

  if (len > branchSize) {
    ctx.save();

    ctx.rotate(angle);
    branch(len * 0.67, width * 0.67, angle);

    ctx.restore();
    ctx.save();

    ctx.rotate(-angle);
    branch(len * 0.67, width * 0.67, angle);

    ctx.restore();
  }
}

function drawTree(len, width) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();

  let treeBaseY;
  if (window.innerWidth < 768) {
    treeBaseY = canvas.height * 0.7;
  } else {
    treeBaseY = canvas.height * 0.9;
  }

  ctx.translate(canvas.width / 2, treeBaseY);
  branch(len, width, angle);

  ctx.restore();
  drawFloor(treeBaseY);
}

function drawFloor(yPosition) {
  ctx.strokeStyle = "#562B00";

  let floorY = yPosition;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 3, floorY);
  ctx.lineTo(canvas.width / 1.5, floorY);
  ctx.lineWidth = 3;
  ctx.stroke();
}

function animate() {
  angle = Math.min(angle + angleIncrement, targetAngle);

  let treeHeight = Math.min(canvas.width, canvas.height) * 0.28;
  drawTree(treeHeight, treeHeight / 10);

  if (angle < targetAngle) {
    requestAnimationFrame(animate);
  }
}

document.getElementById("branchSize").addEventListener("input", (event) => {
  branchSize = parseInt(event.target.value);
  document.getElementById("branchSizeValue").textContent = branchSize;
  angle = 0;
  animate();
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animate();
