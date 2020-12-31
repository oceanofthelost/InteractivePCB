/* PCB rendering code */

var globalData        = require('./global.js')
var render_pads       = require('./render/render_pad.js')
var render_via        = require('./render/render_via.js')
var render_trace      = require('./render/render_trace.js')
var render_boardedge  = require('./render/render_boardedge.js')
var render_silkscreen = require('./render/render_silkscreen.js')
var render_canvas     = require('./render/render_canvas.js')
var Point             = require('./render/point.js').Point
var pcb               = require('./pcb.js')
var colorMap          = require('./colormap.js')


//REMOVE: Using to test alternate placed coloring
var isPlaced = false;






function DrawPad(ctx, pad, color, outline) 
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

function DrawModule(ctx, layer, scalefactor, part, padcolor, outlinecolor, highlight) 
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
                DrawPad(ctx, pad, outlinecolor, true);
            }
            else
            {
                DrawPad(ctx, pad, padcolor, false);
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

function DrawModules(canvas, layer, scalefactor, highlightedRefs) {

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
            DrawModule(ctx, layer, scalefactor, part, padcolor, outlinecolor, highlight);
        }
    }
}

function DrawTraces(canvas, layer, scalefactor)
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
            color = colorMap.GetTraceColor(segment.layer-1)

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

function DrawSilkscreen(canvas, frontOrBack, scalefactor)
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

function drawCanvas(canvasdict)
{
    //render_canvas.ClearCanvas(canvasdict);
    render_canvas.ClearCanvas(canvasdict.bg);
    render_canvas.ClearCanvas(canvasdict.silk);
    DrawPCBEdges(canvasdict.bg, canvasdict.transform.s)
    DrawModules(canvasdict.bg, canvasdict.layer, canvasdict.transform.s, []);
    DrawSilkscreen(canvasdict.silk, canvasdict.layer, canvasdict.transform.s);
    DrawTraces(canvasdict.silk, canvasdict.layer, canvasdict.transform.s)
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

function drawHighlightsOnLayer(canvasdict) 
{
  render_canvas.ClearCanvas(canvasdict.highlight);
  DrawModules(canvasdict.highlight, canvasdict.layer,canvasdict.transform.s, globalData.getHighlightedRefs());
}

function drawHighlights(passed) 
{
  isPlaced=passed;
  drawHighlightsOnLayer(allcanvas.front);
  drawHighlightsOnLayer(allcanvas.back);
}

function resizeAll() 
{
  render_canvas.ResizeCanvas(allcanvas.front);
  render_canvas.ResizeCanvas(allcanvas.back);
  drawCanvas(allcanvas.front)
  drawCanvas(allcanvas.back)
}

module.exports = {
  initRender, resizeAll, drawCanvas, drawHighlights
};