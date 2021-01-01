var render_lowlevel     = require('./render_lowlevel.js')
var Point               = require('./point.js').Point


function GetPolygonVerticies(radius, numberSized)
{
    // Will store the verticies of the polygon.
    let polygonVerticies = [];
    // Assumes a polygon centered at (0,0)
    // Assumes that a circumscribed polygon. The formulas used belo are for a inscribed polygon. 
    // To convert between a circumscribed to an inscribed polygon, the radius for the outer polygon needs to be calculated.
    // Some of the theory for below comes from 
    // https://www.maa.org/external_archive/joma/Volume7/Aktumen/Polygon.html
    // // Its is some basic trig and geometry
    let alpha = (2*Math.PI / (2*numberSized));
    let inscribed_radius = radius /Math.cos(alpha)
    for (let i = 1; i <= numberSized; i++) 
    {

        polygonVerticies.push(new Point(inscribed_radius * Math.cos(2 * Math.PI * i / numberSized), inscribed_radius * Math.sin(2 * Math.PI * i / numberSized)));
    }

    return polygonVerticies;
}

function Square(guiContext, centerPoint, diameter, drillDiameter, colorVia, colorDrill)
{
    let polygonVerticies = GetPolygonVerticies(diameter/2, 4);

    // This is needed in order so that the shape is rendered with correct orientation, ie top of 
    // shape is parallel to top and bottom of the display.
    let angle = 45

    let renderOptions = {color: colorVia,
                         fill: true,
                         }

    render_lowlevel.Polygon( guiContext,
                             centerPoint, 
                             polygonVerticies,
                             angle,
                             renderOptions
                           );

    // Draw drill hole
    renderOptions = {color: colorDrill,
                     fill: true,
                    }

    render_lowlevel.Circle( guiContext,
                            centerPoint,
                            drillDiameter/2, 
                            renderOptions
                          ); 
}

function Octagon(guiContext, centerPoint, diameter, drillDiameter, colorVia, colorDrill)
{
    // Will store the verticies of the polygon.
    let polygonVerticies = GetPolygonVerticies(diameter/2, 8);
    let angle = (45/2);

    let renderOptions = { color: colorVia,
                          fill: true,
                        }

    render_lowlevel.Polygon( guiContext,
                             centerPoint, 
                             polygonVerticies,
                             angle,
                             renderOptions
                           );

    // Draw drill hole
    renderOptions = {color: colorDrill,
                     fill: true,
                    }

    render_lowlevel.Circle( guiContext,
                            centerPoint,
                            drillDiameter/2, 
                            renderOptions
                          ); 
}

function Round(guiContext, centerPoint, diameter, drillDiameter, colorVia, colorDrill)
{

    let renderOptions = {color: colorVia,
                         fill: true,
                         }

    render_lowlevel.Circle( guiContext,
                            centerPoint,
                            diameter/2, 
                            renderOptions
                          ); 
    
    // Draw drill hole
    renderOptions = {color: colorDrill,
                     fill: true,
                    }

    render_lowlevel.Circle( guiContext,
                            centerPoint,
                            drillDiameter/2, 
                            renderOptions
                          ); 

    // Restores context to state prior to this rendering function being called. 
    guiContext.restore();
}

module.exports = {
  Square, Octagon, Round,
}
