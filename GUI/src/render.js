/* PCB rendering code */

var globalData        = require('./global.js')
var render_pads       = require('./render/render_pad.js')
var render_via        = require('./render/render_via.js')
var render_trace      = require('./render/render_trace.js')
var render_boardedge  = require('./render/render_boardedge.js')
var render_silkscreen = require('./render/render_silkscreen.js')
var Point             = require('./render/point.js').Point
var pcb               = require('./pcb.js')



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

function drawPad(ctx, pad, color, outline) 
{
    ctx.save();

    if (pad.shape == "rect") 
    {
        render_pads.Rectangle(ctx, pad, color);
    } 
    else if (pad.shape == "oblong") 
    {
        render_pads.Oblong(ctx, color, pad);
    } 
    else if (pad.shape == "round") 
    {
         render_pads.Round(ctx, color, pad);
    } 
    else if (pad.shape == "octagon") 
    {
      render_pads.Octagon(ctx, color, pad);
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

function DrawPCBEdges(canvas, scalefactor) 
{
    var ctx = canvas.getContext("2d");
    var color = getComputedStyle(topmostdiv).getPropertyValue('--pcb-edge-color');
    for (var edge of pcbdata.board.pcb_shape.edges) 
    {
        if(edge.pathtype == "line")
        {
            let lineWidth = Math.max(1 / scalefactor, edge.width);
            render_boardedge.Line(ctx, edge, lineWidth, color);
        }
        else if(edge.pathtype == "arc")
        {
            let lineWidth = Math.max(1 / scalefactor, edge.width);
            render_boardedge.Arc(ctx, edge, lineWidth, color);
        }
        else
        {
            console.log("unsupported board edge segment type");
        }
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
    var isFront = (layer === "F");
    // Iterate over all traces in the design
    for (var trace of pcbdata.board.traces)
    {
        // iterate over all segments in a trace 
        for (var segment of trace.segments)
        {
            // lookup the color code that is assigned to the trace layer.
            // Store this for use later. 
            color = traceColorMap[segment.layer-1]

            if(segment.pathtype == "line")
            {
                let lineWidth = Math.max(1 / scalefactor, segment.width);
                render_trace.Line(ctx, segment, lineWidth, color);
            }
            else if(segment.pathtype == "arc")
            {
                let lineWidth = Math.max(1 / scalefactor, segment.width);
                render_trace.Arc(ctx, segment, lineWidth, color);
            }
            else if (segment.pathtype == "polygon")
            {
                // Currently not supported. The polygons don't render correctly yet.
                //drawPolygons(ctx, scalefactor, segment.segments,color);
            }
            else if( segment.pathtype == "via_round")
            {
                let centerPoint = new Point(segment.x, segment.y);
                render_via.Round(ctx, centerPoint, segment.diameter, segment.drill, "#000000","#CCCCCC");
            }
            else if( segment.pathtype == "via_octagon")
            {
              let centerPoint = new Point(segment.x, segment.y);
              render_via.Octagon(ctx, centerPoint, segment.diameter, segment.drill, "#000000","#CCCCCC");
            }
            else if( segment.pathtype == "via_square")
            {
              let centerPoint = new Point(segment.x, segment.y);
              render_via.Square(ctx, centerPoint, segment.diameter, segment.drill, "#000000","#CCCCCC");
            }
            else
            {
                console.log("unsupported trace segment type");
            }
        }
    }
}

function drawSilkscreen(canvas, frontOrBack, scalefactor)
{
    let ctx = canvas.getContext("2d");
    let isFront = (frontOrBack === "F");
    let color = "#aa4";
    
    for (let layer of pcbdata.board.layers)
    {
        if(pcb.IsLayerVisible(layer.name, isFront))
        {
            for (let path of layer.paths)
            {
                if(path.pathtype == "line")
                {
                    let lineWidth = Math.max(1 / scalefactor, path.width);
                    render_silkscreen.Line(ctx, path, lineWidth, color);
                }
                else if(path.pathtype == "arc")
                {
                    let lineWidth = Math.max(1 / scalefactor, path.width);
                    render_silkscreen.Arc(ctx, path, lineWidth, color);
                }
                else if(path.pathtype == "circle")
                {
                    let lineWidth = Math.max(1 / scalefactor, path.width);
                    render_silkscreen.Circle(ctx, path, lineWidth, color);
                }
                else
                {
                    console.log("unsupported silkscreen path segment type");
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
  DrawPCBEdges(canvasdict.bg, canvasdict.transform.s)
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
}

module.exports = {
  resizeAll,
  initRender,
  redrawCanvas,
  drawHighlights,
  setBoardRotation,
  rotateVector,
  drawHighlights
};