window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

function roundUpToZero( number ){
  if(number >= 0){
    return number;
  } else {
    return 0;
  }
}

function midpoint(xy1,xy2){
  return[(xy1[0]+xy2[0])/2, (xy1[1]+xy2[1])/2];
}
function animate(tracers, canvas, context) {

  //tracers animation
  for(var i = 0; i < tracers.length; i++){
    
    // find target

    targets = [];
    while(targets.length < 3){
      var num = Math.floor(Math.random() * tracers.length);
      if(num != i && !targets.includes(num)){
        targets.push(num);
      }
    }
    var tg = midpoint(midpoint([tracers[targets[0]].x,tracers[targets[0]].y],[tracers[targets[1]].x,tracers[targets[1]].y]),midpoint([tracers[targets[1]].x,tracers[targets[1]].y],[tracers[targets[2]].x,tracers[targets[2]].y]));
    var target = {
      x:tg[0],
      y:tg[1]
    }

    tracers[i].xVelocity = tracers[i].xVelocity + tracers[i].xAcceleration;
    tracers[i].yVelocity = tracers[i].yVelocity + tracers[i].yAcceleration;
    var newX = tracers[i].x + tracers[i].xVelocity;
    var newY = tracers[i].y + tracers[i].yVelocity;

    if(newX + tracers[i].radius < canvas.width && newX - tracers[i].radius > 0) {
      tracers[i].x = newX;
    }else{
      tracers[i].xVelocity = -1*(tracers[i].xVelocity/(Math.abs(tracers[i].xVelocity))*(Math.abs(tracers[i].xVelocity)*0.9));
      var newX = tracers[i].x + tracers[i].xVelocity;
      tracers[i].x = newX;
    }

    if(newY + tracers[i].radius < canvas.height && newY - tracers[i].radius > 0){
      tracers[i].y = newY;
    }else{
      tracers[i].yVelocity = -1*(tracers[i].yVelocity/(Math.abs(tracers[i].yVelocity))*(Math.abs(tracers[i].yVelocity)*0.9));
      var newY = tracers[i].y + tracers[i].yVelocity;
      tracers[i].y = newY;
    }

    //tracer following
    var accel = 0.5;
    var distance = Math.sqrt((target.y - tracers[i].y)*(target.y - tracers[i].y)+(target.x - tracers[i].x)*(target.x - tracers[i].x));
    //                          rise over run
    var slope = (target.y - tracers[i].y)/(target.x - tracers[i].x);
    var x = tracers[i].x - target.x;
    var y = tracers[i].y - target.y;
    if(target.x == tracers[i].x){
      tracers[i].xAcceleration = 0;
    } else {

      tracers[i].yAcceleration = (-y/(Math.abs(x)+Math.abs(y)))*accel;
      tracers[i].xAcceleration = (-x/(Math.abs(x)+Math.abs(y)))*accel;  
    }
  }

  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < tracers.length; i++){
    drawTracer(tracers[i], context);
  }

  // request new frame
  requestAnimFrame(function() {
    animate(tracers, canvas, context);
  });
}

function onChange(){
  document.getElementById("myCanvas").height = document.getElementById("range").value;
  var num = document.getElementById("num").value;
  if(num < 5){
    document.getElementById("num").value = 5;
    num = 5;
  }
  if(num > tracers.length){
    for(var i = 0; i < num-tracers.length; i++){
      tracers.push(newTracer((Math.random() * (canvas.width-30))+15,(Math.random() * (canvas.height-30))+15,0,0));
    }
  } else if (num < tracers.length){
    tracers.splice(num, tracers.length);
  }
  
}