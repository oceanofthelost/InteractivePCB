var render_lowlevel     = require('./render_lowlevel.js')
var Point               = require('./point.js').Point

function DrawDrillHole(guiContext, x, y, radius)
{

    let centerPoint = new Point(x, y);


    let renderOptions = {color: "#CCCCCC",
                         fill: true,
                         }

    render_lowlevel.Circle( guiContext,
                            centerPoint,                         
                            radius, 
                            renderOptions
                          );                     
}

function Rectangle(guiContext, pad, color)
{

    let centerPoint = new Point(pad.x, pad.y);

    /*
            The following derive the corner points for the
            rectangular pad. These are calculated using the center 
            point of the rectangle along with the width and height 
            of the rectangle. 
    */
    // Top left point
    let point0 = new Point(-pad.dx/2, pad.dy/2);
    // Top right point
    let point1 = new Point(pad.dx/2, pad.dy/2);
    // Bottom right point
    let point2 = new Point(pad.dx/2, -pad.dy/2);
    // Bottom left point
    let point3 = new Point(-pad.dx/2, -pad.dy/2);


    let renderOptions = {color: color,
                         fill: true,
                         }

    render_lowlevel.Polygon( guiContext,
                             centerPoint, 
                             [point0, point1, point2, point3],
                             pad.angle,
                             renderOptions
                           );


    if(pad.pad_type == "tht")
    {
        DrawDrillHole(guiContext, pad.x, pad.y, pad.drill/2);
    }
}

/*
    An oblong pad can be thought of as having a rectangular middle with two semicircle ends. 

    EagleCAD provides provides three pieces of information for generating these pads. 
        1) Center point = Center of part
        2) Diameter = distance from center point to edge of semicircle
        3) Elongation =% ratio relating diameter to width

    The design also has 4 points of  interest, each representing the 
    corner of the rectangle. 

    To render the length and width are derived. This is divided in half to get the 
    values used to translate the central point to one of the verticies. 
*/
function Oblong(guiContext, pad, color)
{

    
    // Diameter is the disnce from center of pad to tip of circle
    // elongation is a factor that related the diameter to the width
    // This is the total width
    let width   = pad.diameter*pad.elongation/100;
    
    // THe width of the rectangle is the diameter -half the radius.
    // See documentation on how these are calculated.
    let height  = (pad.diameter-width/2)*2;

    // assumes oval is centered at (0,0)
    let centerPoint = new Point(pad.x, pad.y)

    let renderOptions = { color: color,
                          fill: true,
                        }

    render_lowlevel.Oval( guiContext,
                          centerPoint,
                          height,
                          width,
                          pad.angle,
                          renderOptions
                        )

    /* Only draw drill hole if tht type pad */
    if(pad.pad_type == "tht")
    {
        DrawDrillHole(guiContext, pad.x, pad.y, pad.drill/2)
    }
}

function Round(guiContext, pad, color)
{



    let centerPoint = new Point(pad.x, pad.y);


    let renderOptions = {color: color,
                         fill: true,
                         }

    render_lowlevel.Circle( guiContext,
                            centerPoint,                         
                            pad.drill, 
                            renderOptions
                          ); 


    if(pad.pad_type == "tht")
    {
        DrawDrillHole(guiContext, pad.x, pad.y, pad.drill/2)
    }
}

function Octagon(guiContext, pad, color)
{
    // Will store the verticies of the polygon.
    polygonVerticies = [];

    
    let n = 8;
    let r = pad.diameter/2;
    // Assumes a polygon centered at (0,0)
    for (let i = 1; i <= n; i++) 
    {
        polygonVerticies.push(new Point(r * Math.cos(2 * Math.PI * i / n), r * Math.sin(2 * Math.PI * i / n)));
    }

    let angle = (pad.angle+45/2);


    let centerPoint = new Point(pad.x, pad.y)

    let renderOptions = { color: color,
                          fill: true,
                        }

    render_lowlevel.Polygon( guiContext,
                             centerPoint, 
                             polygonVerticies,
                             angle,
                             renderOptions
                           );

    /* Only draw drill hole if tht type pad */
    if(pad.pad_type == "tht")
    {
        DrawDrillHole(guiContext, pad.x, pad.y, pad.drill/2);
    }
}

module.exports = {
  Rectangle, Oblong, Round, Octagon
}
