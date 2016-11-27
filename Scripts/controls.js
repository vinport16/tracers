//    38
// 37:40:39
// arrow key codes
document.addEventListener('keydown', function(event) {
  if(event.keyCode == 37) {
    //myCircle.xVelocity-=10;
  } else if(event.keyCode == 39) {
    //myCircle.xVelocity+=10;
  } else if(event.keyCode == 38) {
    //myCircle.yVelocity-=25;
  } else if(event.keyCode == 40) {
    //myCircle.yVelocity+=15;


  } else if(event.keyCode == 32) {
    //balls.push(newBall(myCircle.x, myCircle.y, myCircle.xVelocity*1.5, myCircle.yVelocity*1.5));
  } 
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

var canvas = document.getElementById('myCanvas');

canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  mouseX = mousePos.x;
  mouseY = mousePos.y;
}, false);
