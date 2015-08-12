function mouseMove(ev) {
    ev = ev || window.event;
    var mousePos = mouseCoords(ev);
    camera.pos.x = mouse.start.x - (mouse.downAt.x - mousePos.x);
    camera.pos.y = mouse.start.y - (mouse.downAt.y - mousePos.y);
    draw();
}

function getZoom(value) {
    if (camera.zoom + value <= 0) {
        return getZoom(value / 2);
    } else {
        return value;
    }
}

function mouseCoords(ev){
    if(ev.pageX || ev.pageY){
        return {
            x : ev.pageX,
            y : ev.pageY};
    }
    return {
        x : ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y : ev.clientY + document.body.scrollTop  - document.body.clientTop
    };
}

function draw(){
    ctx.setTransform(1,0,0,1,0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCCS(camera.zoom);
    drawFunction(funct, camera.zoom);
}

function drawFunction(points) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.setTransform(1,0,0,1,camera.pos.x, camera.pos.y);
    var lastPoint = points[0];
    ctx.moveTo(lastPoint.x * camera.zoom, lastPoint.y * camera.zoom);
    for (i in funct) {
        var newPoint = points[i];
        ctx.lineTo(newPoint.x * camera.zoom, newPoint.y * camera.zoom);
        lastPoint = newPoint;
    }
    ctx.stroke();
    ctx.closePath();
}

function drawGrid() {
    ctx.beginPath();
    ctx.strokeStyle = "lightgrey";
    // horizontal unten
    for (i = camera.zoom; i <= canvas.height - camera.pos.y; i += camera.zoom) {
        ctx.setTransform(1,0,0,1,0, i + camera.pos.y);
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, 0);
    }
    // horizontal oben
    for (i = - camera.zoom; i >= - camera.pos.y; i -= camera.zoom) {
        ctx.setTransform(1,0,0,1,0, i + camera.pos.y);
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, 0);
    }
    // vertikal unten
    for (i = camera.zoom; i <= canvas.width - camera.pos.x; i += camera.zoom) {
        ctx.setTransform(1,0,0,1,i + camera.pos.x, 0);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvas.height);
    }
    // vertikal oben
    for (i = -camera.zoom; i >= - camera.pos.x; i -= camera.zoom) {
        ctx.setTransform(1,0,0,1,i + camera.pos.x, 0);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvas.height);
    }
    ctx.stroke();
    ctx.closePath();
}

function drawCrosse() {
    ctx.beginPath();
    ctx.strokeStyle = "blue";

    ctx.setTransform(1,0,0,1,camera.pos.x, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);

    ctx.setTransform(1,0,0,1,0, camera.pos.y);
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);

    ctx.stroke();
    ctx.closePath();
}

function drawCCS() {
    drawGrid();
    drawCrosse();
}

function getValues(bottom, top, step, fkt) {
    var result = [];
    for (i = bottom; i <= top; i+=step) {
        result.push({
            x : i,
            y : -fkt(i)
        });
    }
    return result;
}

function functX3 (x) {
    return Math.pow(x,3) + 1;
}
function functSinX(x) {
    return Math.sin(x);
}