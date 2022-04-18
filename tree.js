let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let angleIncrement = (30 * Math.PI) / 180;
let startX = canvas.width / 2;
let startY = canvas.height - 120;
let height = (canvas.height * 7) / 24;

let thickness = 2;
let maxDepth = 8;
let count = 0;
let branchPropagation = 5;
let createRect = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

let drawLine = (x1, y1, x2, y2, thickness, color) => {
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
};
let drawBranch = (x, y, height, thickness, angle, depth) => {
  if (depth > maxDepth) return;
  let endX = x - height * Math.sin(angle);
  let endY = y - height * Math.cos(angle);

  drawLine(x, y, endX, endY, thickness, "orange");

  let newHeight = (height * 8) / 12;
  let newThickness = (thickness * 2) / 3;
  let angleStart;
  if (branchPropagation % 2 == 0) {
    angleStart =
      angle -
      angleIncrement / 2 -
      (Math.trunc(branchPropagation / 2) - 1) * angleIncrement;
  } else {
    angleStart = angle - Math.trunc(branchPropagation / 2) * angleIncrement;
  }
  for (let i = 0; i < branchPropagation; i++) {
    drawBranch(
      endX,
      endY,
      newHeight,
      newThickness,
      angleStart + i * angleIncrement,
      depth + 1
    );
  }
};

let drawTree = () => {
  createRect(0, 0, canvas.width, canvas.height, "#000000");
  angleIncrement -= 0.02;
  drawBranch(startX, startY, height, thickness, 0, Math.PI / 2);
  requestAnimationFrame(drawTree);
};

drawTree();
