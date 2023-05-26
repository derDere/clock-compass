var slider;
var checkbox;
var sun;
var contentEle = document.getElementById('content');
var mainEle = document.getElementById('main');
var dseEle = document.getElementById('dse-content');

function toggleDseVisibility() {
  if (dseEle.style.display === 'none') {
    dseEle.style.display = 'block';
  } else {
    dseEle.style.display = 'none';
  }
}

function preload() {
  sun = loadImage('gfx/sun.png');
}

function setup() {
  let can = createCanvas(900, 900);
  can.parent(mainEle);

  let now = new Date();
  let t1 = new Date();
  let t2 = new Date();

  t1.setHours(0);
  t1.setMinutes(0);
  t1.setSeconds(0);

  t2.setHours(24);
  t2.setMinutes(0);
  t2.setSeconds(0);

  slider = createSlider(t1.getTime(), t2.getTime(), now.getTime());
  slider.size(800, 30);
  slider.parent(contentEle);

  checkbox = createCheckbox("Use current time");
  checkbox.checked(true);
  checkbox.parent(contentEle);
}

function draw() {
  background(0);

  // Calculate time values
  let t;
  if (checkbox.checked()) {
    t = new Date();
    slider.value(t.getTime());
  } else {
    t = new Date(slider.value());
  }

  let h = t.getHours();
  let h2 = t.getHours();
  let m = t.getMinutes();
  let s = t.getSeconds();
  let HHs = ((h < 10) ? '0' : '') + h;
  let MMs = ((m < 10) ? '0' : '') + m;
  let SSs = ((s < 10) ? '0' : '') + s;
  let TTs = HHs + ':' + MMs + ':' + SSs;

  h %= 12;

  let hh = h + (m / 60) + (s / 60 / 60);
  let hh2 = h2 + (m / 60) + (s / 60 / 60);
  let mm = m + (s / 60);
  let ss = s;

  let delta = 12 - hh2;
  let so = hh2 + (delta / 2);

  // Translate to center
  translate(width / 2, height / 2);

  // Draw Background
  push();
  fill(255);
  stroke(200);
  strokeWeight(4);
  circle(0, 0, 836);
  pop();

  // Draw Clock Background
  push();
  fill(230);
  noStroke();
  circle(0, 0, 600);
  pop();

  // Draw Minute Lines
  for(let i = 1; i <= 60; i++) {
    if (i % 5 != 0) {
      push();
      fill(130);
      noStroke();
      let x = cos((i - 15) * ((2 * PI) / 60)) * 270;
      let y = sin((i - 15) * ((2 * PI) / 60)) * 270;
      circle(x, y, 3);
      pop();
    }
  }

  // Draw Numbers
  for(let i = 1; i <= 12; i++) {
    push();
    fill(0);
    noStroke();
    let x = cos((i - 3) * ((2 * PI) / 12)) * 270;
    let y = sin((i - 3) * ((2 * PI) / 12)) * 270;
    textSize(i == 12 ? 30 : 20);
    textAlign(CENTER, CENTER);
    text(i, x, y);
    pop();
  }

  // Draw NESW Lines
  push();
  strokeWeight(1);
  noFill();
  strokeWeight(3);
  line(
    cos((so - 0) * ((2 * PI) / 12)) * 220,
    sin((so - 0) * ((2 * PI) / 12)) * 220,
    cos((so - 0) * ((2 * PI) / 12)) * 250,
    sin((so - 0) * ((2 * PI) / 12)) * 250
  );
  line(
    cos((so - 3) * ((2 * PI) / 12)) * 220,
    sin((so - 3) * ((2 * PI) / 12)) * 220,
    cos((so - 3) * ((2 * PI) / 12)) * 250,
    sin((so - 3) * ((2 * PI) / 12)) * 250
  );
  line(
    cos((so - 6) * ((2 * PI) / 12)) * 220,
    sin((so - 6) * ((2 * PI) / 12)) * 220,
    cos((so - 6) * ((2 * PI) / 12)) * 250,
    sin((so - 6) * ((2 * PI) / 12)) * 250
  );
  stroke(255, 0, 0);
  strokeWeight(5);
  line(
    cos((so - 9) * ((2 * PI) / 12)) * 220,
    sin((so - 9) * ((2 * PI) / 12)) * 220,
    cos((so - 9) * ((2 * PI) / 12)) * 250,
    sin((so - 9) * ((2 * PI) / 12)) * 250
  );
  pop();

  // Draw Digital Clock
  push();
  textFont('Courier New');
  textSize(25);
  textAlign(CENTER);
  text(TTs, 0, 60);
  pop();

  // Draw Hour arm
  push();
  strokeWeight(20);
  noFill();
  stroke(0, 64, 128);
  line(
    0,
    0,
    cos((hh - 3) * ((2 * PI) / 12)) * 160,
    sin((hh - 3) * ((2 * PI) / 12)) * 160
  );
  pop();

  // Draw Minute arm
  push();
  strokeWeight(10);
  noFill();
  stroke(0, 128, 255);
  line(
    0,
    0,
    cos((mm - 15) * ((2 * PI) / 60)) * 210,
    sin((mm - 15) * ((2 * PI) / 60)) * 210
  );
  pop();

  // Draw Second arm
  push();
  strokeWeight(2);
  noFill();
  stroke(0);
  line(
    0,
    0,
    cos((s - 15) * ((2 * PI) / 60)) * 250,
    sin((s - 15) * ((2 * PI) / 60)) * 250
  );
  pop();

  // Draw center dot
  push();
  fill(130);
  noStroke();
  circle(0, 0, 30);
  pop();

  // Draw Sun
  push();
  translate(
    cos((hh - 3) * ((2 * PI) / 12)) * 335,
    sin((hh - 3) * ((2 * PI) / 12)) * 335
  );
  imageMode(CENTER);
  image(sun, 0, 0);
  pop();

  // Draw West
  push();
  rotate((so - 0) * ((2 * PI) / 12));
  translate(380, 0);
  rotate(PI / 2);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("W",0,0);
  pop();

  // Draw South
  push();
  rotate((so - 3) * ((2 * PI) / 12));
  translate(380, 0);
  rotate(PI / 2);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("S",0,0);
  pop();

  // Draw East
  push();
  rotate((so - 6) * ((2 * PI) / 12));
  translate(380, 0);
  rotate(PI / 2);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("E",0,0);
  pop();

  // Draw South
  push();
  rotate((so - 9) * ((2 * PI) / 12));
  translate(380, 0);
  rotate(PI / 2);
  textSize(30);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0);
  text("N",0,0);
  pop();
}






















//--
