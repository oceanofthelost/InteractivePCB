var render_lowlevel     = require('./render_lowlevel.js')
var Point               = require('./point.js').Point




function setBoardRotation(value) 
{
  /*
      The board when drawn by default is show rotated -180 degrees. 
      The following will add 180 degrees to what the user calculates so that the PCB
      will be drawn in the correct orientation, i.e. displayed as shown in ECAD program. 
      Internally the range of degrees is stored as 0 -> 360
  */
  boardRotation = (value * 5)+180;
  globalData.writeStorage("boardRotation", boardRotation);
  /*
      Display the correct range of degrees which is -180 -> 180. 
      The following just remaps 360 degrees to be in the range -180 -> 180.
  */
  document.getElementById("rotationDegree").textContent = (boardRotation-180);
  resizeAll();
}


function clearCanvas(canvas) 
{
  let ctx = canvas.getContext("2d");
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}




function prepareCanvas(canvas, flip, transform) 
{
  let ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  let fontsize = 1.55;
  ctx.scale(transform.zoom, transform.zoom);
  ctx.translate(transform.panx, transform.pany);
  if (flip) 
  {
    ctx.scale(-1, 1);
  }
  ctx.translate(transform.x, transform.y);
  ctx.rotate(boardRotation*Math.PI/180);
  ctx.scale(transform.s, transform.s);
}
function rotateVector(v, angle) 
{
  angle = angle*Math.PI/180;
  return [
    v[0] * Math.cos(angle) - v[1] * Math.sin(angle),
    v[0] * Math.sin(angle) + v[1] * Math.cos(angle)
  ];
}

function recalcLayerScale(canvasdict) {
  var canvasdivid = {
    "F": "frontcanvas",
    "B": "backcanvas"
  } [canvasdict.layer];
  var width = document.getElementById(canvasdivid).clientWidth * 2;
  var height = document.getElementById(canvasdivid).clientHeight * 2;
  var bbox = applyRotation(pcbdata.board.pcb_shape.bounding_box);
  var scalefactor = 0.98 * Math.min(
    width / (bbox.maxx - bbox.minx),
    height / (bbox.maxy - bbox.miny)
  );
  if (scalefactor < 0.1) {
    scalefactor = 1;
  }
  canvasdict.transform.s = scalefactor;
  var flip = (canvasdict.layer != "B");
  if (flip) {
    canvasdict.transform.x = -((bbox.maxx + bbox.minx) * scalefactor + width) * 0.5;
  } else {
    canvasdict.transform.x = -((bbox.maxx + bbox.minx) * scalefactor - width) * 0.5;
  }
  canvasdict.transform.y = -((bbox.maxy + bbox.miny) * scalefactor - height) * 0.5;
  for (var c of ["bg", "highlight"]) {
    canvas = canvasdict[c];
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = (width / 2) + "px";
    canvas.style.height = (height / 2) + "px";
  }
}

function applyRotation(bbox) {
  var corners = [
    [bbox.minx, bbox.miny],
    [bbox.minx, bbox.maxy],
    [bbox.maxx, bbox.miny],
    [bbox.maxx, bbox.maxy],
  ];
  corners = corners.map((v) => rotateVector(v, boardRotation));
  return {
    minx: corners.reduce((a, v) => Math.min(a, v[0]), Infinity),
    miny: corners.reduce((a, v) => Math.min(a, v[1]), Infinity),
    maxx: corners.reduce((a, v) => Math.max(a, v[0]), -Infinity),
    maxy: corners.reduce((a, v) => Math.max(a, v[1]), -Infinity),
  }
}



function ClearCanvas(canvas) {
  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function prepareLayer(canvasdict) {
  var flip = (canvasdict.layer != "B");
  for (var c of ["bg", "highlight"]) {
    prepareCanvas(canvasdict[c], flip, canvasdict.transform);
  }
}

function RedrawCanvas(layerdict) {
  prepareLayer(layerdict);
  ClearCanvas(layerdict.bg);
  //drawHighlightsOnLayer(layerdict);
}

function ResizeCanvas(layerdict) {
  recalcLayerScale(layerdict);
  RedrawCanvas(layerdict);
}


module.exports = {
ResizeCanvas, RedrawCanvas, ClearCanvas, rotateVector
}


