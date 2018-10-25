var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
//context can be called anything
var car = new Image();
car.addEventListener("load", loadHandler, false);
car.src = "images/car1.png";
var x = canvas.width / 7;
var y = canvas.height / 2;
var angle = 45;
var mod = 0;
var speed = 1;
var velocityX = 0;
var velocityY = 0;
var drag = 0.99;
var maxVelocity = 10;
var minVelocity = -10;
var mouseW = false;
var mouseS = false;
document.body.style.width = '6000px'


function loadHandler() {
  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);
  requestAnimationFrame(drawCar);
}
function onKeyUp(event) {
  if(event.keyCode == 87 || event.keyCode == 83) {
    mod = 0;
    mouseW = false;
    mouseS = false;
  }
  if(event.keyCode == 32) {
    velocityX = 0;
    velocityY = 0;
    mod = 1;
    speed = 0.0003;
  }
}

function onKeyDown(event) {

  if(event.keyCode == 87) {
    //W
      mod = 1;
      mouseW = true;
  }
  if(event.keyCode == 83) {
    //S
    mod = -1;
    mouseS = true;
  }
  if(event.keyCode == 65) {
    //A
    angle -= 5;
  }
  if(event.keyCode == 68) {
    //D
    angle += 5;
  }
  if(event.keyCode == 32) {
      velocityX = 0;
      velocityY = 0;
      mod = 0;
      speed = 0.0003;
  }
  if(event.keyCode == 16) {
    mod = 2;
  }
}


function drawCar() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  //compute x and y

  if(x < 60) {
    mouseW = false;
    velocityX = 0;
    velocityY = 0;
  }
  if(y < 60) {
    if(angle <= -5 && angle >= -185) {
      mouseW = false;
    } else {
      mouseS = false;
    }
    velocityX = 0;
    velocityY = 0;
  }

  if(x > 5940) {
    mouseW = false;
    velocityX = 0;
    velocityY = 0;
  }

  if(y > 940) {
    mouseW = false;
    velocityX = 0;
    velocityY = 0;
  }

  if((velocityX < maxVelocity && velocityX > minVelocity) && (mouseW == true || mouseS == true)){
    velocityX += speed * mod;
    velocityY += speed * mod;
  } else {
    velocityX *= drag;
    velocityY *= drag;
  }

  if((x / 5) > 100) {
    window.scrollTo(x - 1900, 0);
  } else {
    window.scrollTo(0, 0);
  }

   x += velocityX * Math.cos(Math.PI/180 * angle);
   y += velocityY * Math.sin(Math.PI/180 * angle);

  context.beginPath();
  context.moveTo(0, canvas.height / 2);
  context.lineTo(canvas.width, canvas.height / 2);
  context.moveTo(canvas.width / 2, 0);
  context.lineTo(canvas.width / 2, canvas.height);
  context.stroke();
  //draw car;
  context.save();
  context.translate(x, y);
  context.rotate(Math.PI / 180 * angle);
  context.drawImage(car, -(car.width / 2),  -(car.height / 2));
  if((x >= 0 && x <= 400) && (y >= 0 && y <= 400)) {
    //Top Right
    car.src = "images/car1.png";
  } else if ((x >= 401 && x <= 800) && (y >= 401 && y <= 800)) {
    //Bottom Left
    car.src = "images/car2.png";
  } else if ((x >= 0 && x <= 400) && (y >= 400 && y <= 800)) {
    //Top Right
    car.src = "images/car3.png";
  } else if ((x >= 401 && x <= 800) && (y >= 0 && y <= 400)) {
    //Top Left
    car.src = "images/car4.png";
  }
  context.restore();
  requestAnimationFrame(drawCar);
}
