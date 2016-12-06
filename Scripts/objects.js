function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)]; 
    }
    return color;
}

function drawTracer(tracer, context) {
    var width = 10;
    var length = 30;
    context.save()
    context.translate( tracer.x, tracer.y);
    context.rotate(Math.atan(tracer.yVelocity/tracer.xVelocity));
    if(tracer.xVelocity < 0 ){ context.rotate(Math.PI); }
    context.fillStyle = "black";
    context.fillRect(-(length/2),-(width/2),length,width);
    context.fillStyle = tracer.color;
    context.fillRect(length/4, -width/2, length/4, width);
    context.restore();
}

function newTracer(xx, yy, xv, yv){
    return {
    x: xx,
    y: yy,
    radius: 14,
    borderWidth: 2,
    xVelocity:xv,
    yVelocity:yv,
    xAcceleration:0,
    yAcceleration:0,
    color: getRandomColor()
    };
}