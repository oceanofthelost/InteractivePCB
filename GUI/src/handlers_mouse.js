var globalData        = require('./global.js')
var render     = require('./render.js')

function handleMouseDown(e, layerdict) 
{
    if (e.which != 1) 
    {
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

function smoothScrollToRow(rowid) 
{
    document.getElementById(rowid).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
    });
}

function modulesClicked(references) 
{
    let lastClickedIndex = references.indexOf(globalData.getLastClickedRef());
    let ref = references[(lastClickedIndex + 1) % references.length];
    for (let handler of globalData.getHighlightHandlers()) 
    {
        if (handler.refs.indexOf(ref) >= 0) 
        {
            globalData.setLastClickedRef(ref);
            handler.handler();
            smoothScrollToRow(globalData.getCurrentHighlightedRowId());
            break;
        }
    }
}
function bboxScan(layer, x, y, transform) 
{
        let result = [];
        for (let part of pcbdata.parts) 
        {
                if( part.location == layer)
                {
                        let b = part.package.bounding_box;
                        if (    (x > b.x0 )
                                 && (x < b.x1 )
                                 && (y > b.y0 )
                                 && (y < b.y1 )
                                )
                        {
                                result.push(part.name);
                        }
                }
        }
        return result;
}


function handleMouseClick(e, layerdict) 
{
    let x = e.offsetX;
    let y = e.offsetY;
    let t = layerdict.transform;
    if (layerdict.layer != "B") 
    {
        x = (2 * x / t.zoom - t.panx + t.x) / -t.s;
    } 
    else 
    {
        x = (2 * x / t.zoom - t.panx - t.x) / t.s;
    }
    y = (2 * y / t.zoom - t.y - t.pany) / t.s;
    let v = render.rotateVector([x, y], -boardRotation);
    let reflist = bboxScan(layerdict.layer, v[0], v[1], t);
    if (reflist.length > 0) 
    {
        modulesClicked(reflist);
        render.drawHighlights();
    }
}

function handleMouseUp(e, layerdict) 
{
    e.preventDefault();
    e.stopPropagation();
    if (    e.which == 1
         && layerdict.transform.mousedown
         && layerdict.transform.mousedownx == e.offsetX
         && layerdict.transform.mousedowny == e.offsetY
        ) 
    {
        // This is just a click
        handleMouseClick(e, layerdict);
        layerdict.transform.mousedown = false;
        return;
    }
    if (e.which == 3) 
    {
        // Reset pan and zoom on right click.
        layerdict.transform.panx = 0;
        layerdict.transform.pany = 0;
        layerdict.transform.zoom = 1;
        render.redrawCanvas(layerdict);
    } 
    else if (!globalData.getRedrawOnDrag()) 
    {
        render.redrawCanvas(layerdict);
    }
    layerdict.transform.mousedown = false;
}

function handleMouseMove(e, layerdict) 
{
    if (!layerdict.transform.mousedown) 
    {
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    let dx = e.offsetX - layerdict.transform.mousestartx;
    let dy = e.offsetY - layerdict.transform.mousestarty;
    layerdict.transform.panx += 2 * dx / layerdict.transform.zoom;
    layerdict.transform.pany += 2 * dy / layerdict.transform.zoom;
    layerdict.transform.mousestartx = e.offsetX;
    layerdict.transform.mousestarty = e.offsetY;
    
    if (globalData.getRedrawOnDrag()) 
    {
        render.redrawCanvas(layerdict);
    }
}

function handleMouseWheel(e, layerdict) 
{
    e.preventDefault();
    e.stopPropagation();
    var t = layerdict.transform;
    var wheeldelta = e.deltaY;
    if (e.deltaMode == 1) 
    {
        // FF only, scroll by lines
        wheeldelta *= 30;
    } 
    else if (e.deltaMode == 2) 
    {
        wheeldelta *= 300;
    }
    
    var m = Math.pow(1.1, -wheeldelta / 40);
    // Limit amount of zoom per tick.
    if (m > 2) 
    {
        m = 2;
    } 
    else if (m < 0.5) 
    {
        m = 0.5;
    }
    
    t.zoom *= m;
    var zoomd = (1 - m) / t.zoom;
    t.panx += 2 * e.offsetX * zoomd;
    t.pany += 2 * e.offsetY * zoomd;
    render.redrawCanvas(layerdict);
}

function addMouseHandlers(div, layerdict) 
{
    div.onmouseclick = function(e)
    {
        handleMouseClick(e, layerdict);
    }

    div.onmousedown = function(e) 
    {
        handleMouseDown(e, layerdict);
    };
    div.onmousemove = function(e) 
    {
        handleMouseMove(e, layerdict);
    };
    div.onmouseup = function(e) 
    {
        handleMouseUp(e, layerdict);
    };
    div.onmouseout = function(e) 
    {
        handleMouseUp(e, layerdict);
    }
    div.onwheel = function(e) 
    {
        handleMouseWheel(e, layerdict);
    }
    for (var element of [div, layerdict.bg, layerdict.silk, layerdict.highlight]) 
    {
        element.addEventListener("contextmenu", function(e) 
        {
            e.preventDefault();
        }, false);
    }
}

module.exports = {
    addMouseHandlers
}
