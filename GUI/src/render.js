/* PCB rendering code */

var globalData = require('./global.js')
var render_pads = require('./render_pads.js')
var render_shapes = require('./render_shapes.js')
var pcb    = require('./pcb.js')

//REMOVE: Using to test alternate placed coloring
var isPlaced = false;




var traceColorMap = [
  "#C83232B4",
  "#CC6600C8",
  "#CC9900C8",
  "#336600C8",
  "#666633C8",
  "#FFCC33C8",
  "#669900C8",
  "#999966C8",
  "#99CC99C8",
  "#669999C8",
  "#33CC99C8",
  "#669966C8",
  "#336666C8",
  "#009966C8",
  "#006699C8",
  "#3232C8B4",
];




function deg2rad(deg) {
  return deg * Math.PI / 180;
}

function calcFontPoint(linepoint, text, offsetx, offsety, tilt) {
  var point = [
    linepoint[0] * text.width + offsetx,
    linepoint[1] * text.height + offsety
  ];
  // Adding half a line height here is technically a bug
  // but pcbnew currently does the same, text is slightly shifted.
  point[0] -= (point[1] + text.height * 0.5) * tilt;
  return point;
}

function drawtext(ctx, text, color, flip) {
  ctx.save();
  ctx.translate(...text.pos);
  var angle = -text.angle;
  if (text.attr.includes("mirrored")) {
    ctx.scale(-1, 1);
    angle = -angle;
  }
  var tilt = 0;
  if (text.attr.includes("italic")) {
    tilt = 0.125;
  }
  var interline = (text.height * 1.5 + text.thickness) / 2;
  var txt = text.text.split("\n");
  ctx.rotate(deg2rad(angle));
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineWidth = text.thickness;
  for (var i in txt) {
    var offsety = (-(txt.length - 1) + i * 2) * interline + text.height / 2;
    var lineWidth = 0;
    for (var c of txt[i]) {
      lineWidth += pcbFont.font_data[c].w * text.width;
    }
    var offsetx = 0;
    switch (text.horiz_justify) {
      case -1:
        // Justify left, do nothing
        break;
      case 0:
        // Justify center
        offsetx -= lineWidth / 2;
        break;
      case 1:
        // Justify right
        offsetx -= lineWidth;
        break;
    }
    for (var c of txt[i]) {
      for (var line of pcbFont.font_data[c].l) {
        // Drawing each segment separately instead of
        // polyline because round line caps don't work in joints
        for (var i = 0; i < line.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(...calcFontPoint(line[i], text, offsetx, offsety, tilt));
          ctx.lineTo(...calcFontPoint(line[i + 1], text, offsetx, offsety, tilt));
          ctx.stroke();
        }
      }
      offsetx += pcbFont.font_data[c].w * text.width;
    }
  }
  ctx.restore();
}

function drawedge(ctx, scalefactor, edge, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1 / scalefactor, edge.width);
  ctx.lineCap = "round";

  if (edge.pathtype == "line") 
  {
    // https://www.w3schools.com/tags/canvas_moveto.asp
    ctx.beginPath();
    ctx.moveTo(edge.x0, edge.y0);
    ctx.lineTo(edge.x1, edge.y1);
    ctx.stroke();
  }
  if (edge.pathtype == "arc") 
  {
    // https://www.w3schools.com/tags/canvas_arc.asp
    ctx.beginPath();
    ctx.arc( edge.cx0, edge.cy0, edge.radius, deg2rad(edge.angle0), deg2rad(edge.angle1));
    ctx.stroke();
  }
}

function drawPolygons(ctx, color, polygon, color) 
{
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.beginPath();
    var first = 1;
    for (var vertex of polygon) 
    {
        if(first)
        {
            if(vertex.pathtype == "line")
            {
                ctx.moveTo(vertex.x0, vertex.y0);
                ctx.lineTo(vertex.x1, vertex.y1);
            }
            else
            {
              
            }
            first = 0;
        }
        else
        {
          if(vertex.pathtype == "line")
            {
                ctx.lineTo(vertex.x1, vertex.y1);
            }
            else
            {
             console.log("Poly Arch")
            }
        }
        ctx.stroke();
    }
    //ctx.closePath();
    ctx.fill()

}

function drawPolygonShape(ctx, shape, color) {
  ctx.save();
  ctx.translate(...shape.pos);
  ctx.rotate(deg2rad(-shape.angle));
  drawPolygons(ctx, color, shape.polygons, ctx.fill.bind(ctx));
  ctx.restore();
}

function drawDrawing(ctx, layer, scalefactor, drawing, color) {
  if (["segment", "arc", "circle"].includes(drawing.type)) {
    drawedge(ctx, scalefactor, drawing, color);
  } else if (drawing.type == "polygon") {
    drawPolygonShape(ctx, drawing, color);
  } else {
    drawtext(ctx, drawing, color, layer == "B");
  }
}


function drawPad(ctx, pad, color, outline) 
{
    ctx.save();

    if (pad.shape == "rect") 
    {
        render_pads.Rectangle(ctx, pad, color, outline);
    } 
    else if (pad.shape == "oblong") 
    {
        render_pads.Oblong(ctx, color, pad, outline);
    } 
    else if (pad.shape == "round") 
    {
         render_pads.Round(ctx, color, pad, outline);
    } 
    else if (pad.shape == "octagon") 
    {
      render_pads.Octagon(ctx, color, pad, outline);
    } 
    else if (pad.shape == "custom") 
    {
        //drawPolygons(ctx, color, pad.polygons, ctxmethod);
    }

    ctx.restore();
}

function drawModule(ctx, layer, scalefactor, part, padcolor, outlinecolor, highlight) 
{
    if (highlight || globalData.getDebugMode()) 
    {
        // draw bounding box
        if (part.location == layer) 
        {
            ctx.save();
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = padcolor;
            ctx.beginPath();
            ctx.moveTo(part.package.bounding_box.x0,part.package.bounding_box.y0);
            ctx.lineTo(part.package.bounding_box.x1,part.package.bounding_box.y0);
            ctx.lineTo(part.package.bounding_box.x1,part.package.bounding_box.y1);
            ctx.lineTo(part.package.bounding_box.x0,part.package.bounding_box.y1);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.strokeStyle = padcolor;
            ctx.moveTo(part.package.bounding_box.x0,part.package.bounding_box.y0);
            ctx.lineTo(part.package.bounding_box.x1,part.package.bounding_box.y0);
            ctx.lineTo(part.package.bounding_box.x1,part.package.bounding_box.y1);
            ctx.lineTo(part.package.bounding_box.x0,part.package.bounding_box.y1);
            ctx.stroke();
            ctx.restore();

        }
    }

/*
    // draw drawings
    for (var drawing of module.drawings) 
    {
        if (drawing.layer == layer) 
        {
          drawDrawing(ctx, layer, scalefactor, drawing.drawing, padcolor);
        }
    }
*/
    // draw pads
    for (var pad of part.package.pads) 
    {
        /* 
            Check that part on layer should be drawn. Will draw when requested layer 
            matches the parts layer.
        
          If the part is through hole it needs to be drawn on each layer
          otherwise the part is an smd and should only be drawn on a the layer it belongs to.
        */
        if (    (pad.pad_type == "tht")
             || ((pad.pad_type == "smd") && (part.location == layer))
           )
        {
            if ((pad.pin1 == "yes") && globalData.getHighlightPin1()) 
            {
                drawPad(ctx, pad, outlinecolor, true);
            }
            else
            {
                drawPad(ctx, pad, padcolor, false);
            }
        }
    }
}

function drawEdges(canvas, scalefactor) 
{
    var ctx = canvas.getContext("2d");
    var edgecolor = getComputedStyle(topmostdiv).getPropertyValue('--pcb-edge-color');
    for (var edge of pcbdata.board.pcb_shape.edges) 
    {
        drawedge(ctx, scalefactor, edge, edgecolor);
    }
}

function drawModules(canvas, layer, scalefactor, highlightedRefs) {

    var ctx = canvas.getContext("2d");
    ctx.lineWidth = 3 / scalefactor;
    var style = getComputedStyle(topmostdiv);

    var padcolor = style.getPropertyValue('--pad-color');
    var outlinecolor = style.getPropertyValue('--pin1-outline-color');
    if(globalData.getDebugMode())
    {
        padcolor     = style.getPropertyValue('--pad-color-highlight-debug');
        outlinecolor = style.getPropertyValue('--pin1-outline-color-highlight');
    }



    if (highlightedRefs.length > 0) 
    {
        if(isPlaced)
        {
            padcolor     = style.getPropertyValue('--pad-color-highlight-selected');
            outlinecolor = style.getPropertyValue('--pin1-outline-color-highlight-selected');
        }
        else
        {
            padcolor     = style.getPropertyValue('--pad-color-highlight');
            outlinecolor = style.getPropertyValue('--pin1-outline-color-highlight');
        }
    }

    for (var part of pcbdata.parts) 
    {

        var highlight = highlightedRefs.includes(part.name);
        if (highlightedRefs.length == 0 || highlight) 
        {
            drawModule(ctx, layer, scalefactor, part, padcolor, outlinecolor, highlight);
        }
    }
}


function drawTraces(canvas, layer, scalefactor)
{
    var ctx = canvas.getContext("2d");
    // Iterate over all traces in the design
    for (var trace of pcbdata.board.traces)
    {
        // iterate over all segments in a trace 
        for (var segment of trace.segments)
        {
            if(pcb.IsLayerVisible(segment.layer))
            {
                // lookup the color code that is assigned to the trace layer.
                // Store this for use later. 
                color = traceColorMap[segment.layer-1]
                if (["line", "arc"].includes(segment.pathtype))
                {
                  drawedge(ctx, scalefactor, segment,color);
                }
                else if (segment.pathtype == "polygon")
                {
                    // Currently not supported. The polygons don't render correctly yet.
                    //drawPolygons(ctx, scalefactor, segment.segments,color);
                }
                else if( segment.pathtype == "via_round")
                {
                    // Render the outer diameter
                    render_shapes.Round(ctx, "#000000", segment.x, segment.y, 0, segment.diameter, 0);
                    // Renders the drill hole (inner circle)
                    render_shapes.Round(ctx, "#CCCCCC", segment.x, segment.y, 0, segment.drill, 0);

                }
                else if( segment.pathtype == "via_octagon")
                {

                  render_shapes.Octagon(ctx, "#000000", segment.x, segment.y, 0, segment.diameter, 0);
                  render_shapes.Round(ctx, "#CCCCCC", segment.x, segment.y, 0, segment.drill, 0);
                }
                else if( segment.pathtype == "via_square")
                {
                  render_shapes.Square(ctx, "#000000", segment.x, segment.y, 0, segment.diameter, 0);
                  render_shapes.Round(ctx, "#CCCCCC", segment.x, segment.y, 0, segment.drill, 0);
                }
                else
                {
                  //drawtext(ctx, segment, "#4aa", layer == "B");
                }
            }
            else
            {
                // Nothing to render
            }
        }
    }
}



function drawSilkscreen(canvas, frontOrBack, scalefactor)
{
    var ctx = canvas.getContext("2d");
    for (var layer of pcbdata.board.layers)
    {
        if(pcb.IsLayerVisible(layer.name))
        {
            if(frontOrBack == layer.location)
            {
                for (var path of layer.paths)
                {
                    if (["line", "arc", "circle"].includes(path.pathtype))
                    {
                        drawedge(ctx, scalefactor, path, "#aa4");
                    }
                    else if (path.pathtype == "polygon")
                    {
                        //drawPolygonShape(ctx, d, "#4aa");
                    }
                    else
                    {
                      //drawtext(ctx, d, "#4aa", layer == "B");
                    }
                }
            }
        }
    }
}

function clearCanvas(canvas) {
  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawHighlightsOnLayer(canvasdict) {
  clearCanvas(canvasdict.highlight);
  drawModules(canvasdict.highlight, canvasdict.layer,
    canvasdict.transform.s, globalData.getHighlightedRefs());
}

function drawHighlights(passed) 
{
  isPlaced=passed;
  drawHighlightsOnLayer(allcanvas.front);
  drawHighlightsOnLayer(allcanvas.back);
}

function drawBackground(canvasdict) {
  clearCanvas(canvasdict.bg);
  clearCanvas(canvasdict.silk);
  drawEdges(canvasdict.bg, canvasdict.transform.s);
  drawModules(canvasdict.bg, canvasdict.layer, canvasdict.transform.s, []);
  drawSilkscreen(canvasdict.silk, canvasdict.layer, canvasdict.transform.s);
  drawTraces(canvasdict.silk, canvasdict.layer, canvasdict.transform.s)
}

function prepareCanvas(canvas, flip, transform) {
  var ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  var fontsize = 1.55;
  ctx.scale(transform.zoom, transform.zoom);
  ctx.translate(transform.panx, transform.pany);
  if (flip) {
    ctx.scale(-1, 1);
  }
  ctx.translate(transform.x, transform.y);
  ctx.rotate(deg2rad(boardRotation));
  ctx.scale(transform.s, transform.s);
}

function prepareLayer(canvasdict) {
  var flip = (canvasdict.layer != "B");
  for (var c of ["bg", "silk", "highlight"]) {
    prepareCanvas(canvasdict[c], flip, canvasdict.transform);
  }
}

function rotateVector(v, angle) {
  angle = deg2rad(angle);
  return [
    v[0] * Math.cos(angle) - v[1] * Math.sin(angle),
    v[0] * Math.sin(angle) + v[1] * Math.cos(angle)
  ];
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
  for (var c of ["bg", "silk", "highlight"]) {
    canvas = canvasdict[c];
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = (width / 2) + "px";
    canvas.style.height = (height / 2) + "px";
  }
}

function redrawCanvas(layerdict) {
  prepareLayer(layerdict);
  drawBackground(layerdict);
  drawHighlightsOnLayer(layerdict);
}

function resizeCanvas(layerdict) {
  recalcLayerScale(layerdict);
  redrawCanvas(layerdict);
}

function resizeAll() {
  resizeCanvas(allcanvas.front);
  resizeCanvas(allcanvas.back);
}

function bboxScan(layer, x, y, transform) {
  var result = [];
  for (var i in pcbdata.modules) {
    var module = pcbdata.modules[i];
    if (module.layer == layer) {
      var b = module.bbox;
      if (b.pos[0] <= x && b.pos[0] + b.size[0] >= x &&
          b.pos[1] <= y && b.pos[1] + b.size[1] >= y) {
        result.push(module.ref);
      }
    }
  }
  return result;
}

function handleMouseDown(e, layerdict) {
  if (e.which != 1) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  layerdict.transform.mousestartx = e.offsetX;
  layerdict.transform.mousestarty = e.offsetY;
  layerdict.transform.mousedownx = e.offsetX;
  layerdict.transform.mousedowny = e.offsetY;
  layerdict.transform.mousedown = true;
}

function smoothScrollToRow(rowid) {
  document.getElementById(rowid).scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest"
  });
}

function modulesClicked(references) {
  var lastClickedIndex = references.indexOf(globalData.getLastClickedRef());
  var ref = references[(lastClickedIndex + 1) % references.length];
  for (var handler of globalData.getHighlightHandlers()) {
    if (handler.refs.indexOf(ref) >= 0) {
      globalData.setLastClickedRef(ref);
      handler.handler();
      smoothScrollToRow(globalData.getCurrentHighlightedRowId());
      break;
    }
  }
}


function handleMouseClick(e, layerdict) {
  var x = e.offsetX;
  var y = e.offsetY;
  var t = layerdict.transform;
  if (layerdict.layer != "B") {
    x = (2 * x / t.zoom - t.panx + t.x) / -t.s;
  } else {
    x = (2 * x / t.zoom - t.panx - t.x) / t.s;
  }
  y = (2 * y / t.zoom - t.y - t.pany) / t.s;
  var v = rotateVector([x, y], -boardRotation);
  var reflist = bboxScan(layerdict.layer, v[0], v[1], t);
  if (reflist.length > 0) {
    modulesClicked(reflist);
    drawHighlights();
  }
}

function handleMouseUp(e, layerdict) {
  e.preventDefault();
  e.stopPropagation();
  if (e.which == 1 &&
    layerdict.transform.mousedown &&
    layerdict.transform.mousedownx == e.offsetX &&
    layerdict.transform.mousedowny == e.offsetY) {
    // This is just a click
    handleMouseClick(e, layerdict);
    layerdict.transform.mousedown = false;
    return;
  }
  if (e.which == 3) {
    // Reset pan and zoom on right click.
    layerdict.transform.panx = 0;
    layerdict.transform.pany = 0;
    layerdict.transform.zoom = 1;
    redrawCanvas(layerdict);
  } else if (!globalData.getRedrawOnDrag()) {
    redrawCanvas(layerdict);
  }
  layerdict.transform.mousedown = false;
}

function handleMouseMove(e, layerdict) {
  if (!layerdict.transform.mousedown) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  var dx = e.offsetX - layerdict.transform.mousestartx;
  var dy = e.offsetY - layerdict.transform.mousestarty;
  layerdict.transform.panx += 2 * dx / layerdict.transform.zoom;
  layerdict.transform.pany += 2 * dy / layerdict.transform.zoom;
  layerdict.transform.mousestartx = e.offsetX;
  layerdict.transform.mousestarty = e.offsetY;
  if (globalData.getRedrawOnDrag()) {
    redrawCanvas(layerdict);
  }
}

function handleMouseWheel(e, layerdict) {
  e.preventDefault();
  e.stopPropagation();
  var t = layerdict.transform;
  var wheeldelta = e.deltaY;
  if (e.deltaMode == 1) {
    // FF only, scroll by lines
    wheeldelta *= 30;
  } else if (e.deltaMode == 2) {
    wheeldelta *= 300;
  }
  var m = Math.pow(1.1, -wheeldelta / 40);
  // Limit amount of zoom per tick.
  if (m > 2) {
    m = 2;
  } else if (m < 0.5) {
    m = 0.5;
  }
  t.zoom *= m;
  var zoomd = (1 - m) / t.zoom;
  t.panx += 2 * e.offsetX * zoomd;
  t.pany += 2 * e.offsetY * zoomd;
  redrawCanvas(layerdict);
}

function addMouseHandlers(div, layerdict) {
  div.onmouseclick = function(e){
    handleMouseClick(e, layerdict);
  }

  div.onmousedown = function(e) {
    handleMouseDown(e, layerdict);
  };
  div.onmousemove = function(e) {
    handleMouseMove(e, layerdict);
  };
  div.onmouseup = function(e) {
    handleMouseUp(e, layerdict);
  };
  div.onmouseout = function(e) {
    handleMouseUp(e, layerdict);
  }
  div.onwheel = function(e) {
    handleMouseWheel(e, layerdict);
  }
  for (var element of [div, layerdict.bg, layerdict.silk, layerdict.highlight]) {
    element.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    }, false);
  }
}

function setBoardRotation(value) {
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

function initRender() {
  allcanvas = {
    front: {
      transform: {
        x: 0,
        y: 0,
        s: 1,
        panx: 0,
        pany: 0,
        zoom: 1,
        mousestartx: 0,
        mousestarty: 0,
        mousedown: false,
      },
      bg: document.getElementById("F_bg"),
      silk: document.getElementById("F_slk"),
      highlight: document.getElementById("F_hl"),
      layer: "F",
    },
    back: {
      transform: {
        x: 0,
        y: 0,
        s: 1,
        panx: 0,
        pany: 0,
        zoom: 1,
        mousestartx: 0,
        mousestarty: 0,
        mousedown: false,
      },
      bg: document.getElementById("B_bg"),
      silk: document.getElementById("B_slk"),
      highlight: document.getElementById("B_hl"),
      layer: "B",
    }
  };
  addMouseHandlers(document.getElementById("frontcanvas"), allcanvas.front);
  addMouseHandlers(document.getElementById("backcanvas"), allcanvas.back);
}

module.exports = {
  resizeAll,
  initRender,
  redrawCanvas,
  drawHighlights,
  setBoardRotation,
  smoothScrollToRow
};