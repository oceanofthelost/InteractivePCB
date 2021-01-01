var render_lowlevel     = require('./render_lowlevel.js')
var Point               = require('./point.js').Point

// Line width is not included as part of the trace as it will depend on the current gui scale factor.
function Rectangle(guiContext, boundingBox, color)
{
    let centerPoint = new Point(0, 0);
    /*
            The following derive the corner points for the
            rectangular pad. These are calculated using the center 
            point of the rectangle along with the width and height 
            of the rectangle. 
    */
    // Top left point
    let point0 = new Point(boundingBox.x0, boundingBox.y0)
    // Top right point
    let point1 = new Point(boundingBox.x1, boundingBox.y0)
    // Bottom right point
    let point2 = new Point(boundingBox.x1, boundingBox.y1)
    // Bottom left point
    let point3 = new Point(boundingBox.x0, boundingBox.y1)


    // First fill the box. 
    let renderOptions = {color: color,
                         fill: true,
                         globalAlpha: 0.2
                         }

    render_lowlevel.Polygon( guiContext,
                             centerPoint, 
                             [point0, point1, point2, point3],
                             0,
                             renderOptions
                           );

    // Now stoke the box
    renderOptions = {color: color,
                         fill: false,
                         globalAlpha: 1
                         }

    render_lowlevel.Polygon( guiContext,
                             centerPoint, 
                             [point0, point1, point2, point3],
                             0,
                             renderOptions
                           );

}

module.exports = {
  Rectangle
}
