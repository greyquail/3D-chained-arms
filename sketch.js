// 3D chained arms from (e^{θi}, e^{√2 θ i}, e^{π θ i})
// Tip draws a non‑repeating knot in 3D.

let theta = 0;
let speed = 0.01;
let pts = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0);
  orbitControl();

  rotateY(frameCount * 0.002);
  rotateX(frameCount * 0.001);

  for (let k = 0; k < 40; k++) {
    let x1 = Math.cos(theta);
    let y1 = Math.sin(theta);

    let x2 = Math.cos(Math.sqrt(2) * theta);
    let y2 = Math.sin(Math.sqrt(2) * theta);

    let x3 = Math.cos(Math.PI * theta);
    let y3 = Math.sin(Math.PI * theta);

    let p0 = createVector(0, 0, 0);
    let p1 = createVector(x1, y1, 0);
    let p2 = p1.copy().add(x2, 0, y2);
    let tip = p2.copy().add(0, x3, y3);

    let hue = (theta * 40) % 360;
    pts.push({ v: tip, h: hue });

    theta += speed;
  }

  scale(min(width, height) * 0.25);

  noFill();
  beginShape();
  for (let i = 0; i < pts.length; i++) {
    let p = pts[i];
    stroke(p.h, 80, 100);
    vertex(p.v.x, p.v.y, p.v.z);
  }
  endShape();

  let t = theta;
  let x1 = Math.cos(t);
  let y1 = Math.sin(t);
  let x2 = Math.cos(Math.sqrt(2) * t);
  let y2 = Math.sin(Math.sqrt(2) * t);
  let x3 = Math.cos(Math.PI * t);
  let y3 = Math.sin(Math.PI * t);

  let p0 = createVector(0, 0, 0);
  let p1 = createVector(x1, y1, 0);
  let p2 = p1.copy().add(x2, 0, y2);
  let tip = p2.copy().add(0, x3, y3);

  stroke(200);
  strokeWeight(0.03);
  line(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
  line(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
  line(p2.x, p2.y, p2.z, tip.x, tip.y, tip.z);

  push();
  translate(tip.x, tip.y, tip.z);
  noStroke();
  fill((t * 40) % 360, 80, 100);
  sphere(0.08);
  pop();
}
