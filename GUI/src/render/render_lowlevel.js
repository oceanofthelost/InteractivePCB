var Point               = require('./point.js').Point

function Polygon(guiContext, centerPoint, vertices, angle, renderOptions )
{

    guiContext.save();
    if( renderOptions.color)
    {
        guiContext.fillStyle  =  renderOptions.color;
        guiContext.strokeStyle =  renderOptions.color;        
    }
    // If overwriting line width, then update that here
    if(renderOptions.lineWidth)
    {
        guiContext.lineWidth = renderOptions.lineWidth;
    }

    guiContext.translate(centerPoint.x, centerPoint.y);
    /* 
       Rotate origin based on angle given
       NOTE: compared to oblong pads, no additional modification is required
             of angle to get the angle to rotate correctly.
    */
    guiContext.rotate(angle*Math.PI/180);

    /* 
       Rotate origin based on angle given
       NOTE: compared to oblong pads, no additional modification is required
             of angle to get the angle to rotate correctly.
    */
    //guiContext.rotate((angle)*Math.PI/180);

    guiContext.beginPath();
    guiContext.moveTo(vertices[0].x,vertices[0].y);

    for(var i = 1; i < vertices.length; i++)
    {
        guiContext.lineTo(vertices[i].x,vertices[i].y);
    }
    guiContext.closePath();
    
    // If fill is true, fill the box, otherwise just make an outline
    if(renderOptions.fill)
    {
        guiContext.fill()
    }
    else
    {
        guiContext.stroke();
    }

    guiContext.restore();

}


function Circle(guiContext, centerPoint, radius, renderOptions)
{
    guiContext.save();
    
    if( renderOptions.color)
    {
        guiContext.fillStyle  =  renderOptions.color;
        guiContext.strokeStyle =  renderOptions.color;        
    }

    if(renderOptions.lineWidth)
    {
        guiContext.lineWidth = renderOptions.lineWidth;
    }

    /* Draw the drill hole */
    guiContext.beginPath();
    guiContext.arc(centerPoint.x,centerPoint.y, radius, 0, 2*Math.PI);

    if(renderOptions.fill)
    {
        guiContext.fill()
    }
    else
    {
        guiContext.stroke();
    }

    guiContext.restore();
}


/*
    To render an oval some javascript trickery is used. To half circles are rendered, 
    and since by default when drawing shapes they will by default be connected by at 
    least one point if close path is not called. So by just calling the top and bottom 
    half circles, the rectangular center of the half circle will be filled.
*/
function Oval(guiContext, centerPoint, height, width, angle, renderOptions)
{

    // Center point of both circles.
    let centerPoint1 = new Point(0, -height/2)
    let centerPoint2 = new Point(0, height/2)
    let radius = width/2;

    guiContext.save();
    if( renderOptions.color)
    {
        guiContext.fillStyle  =  renderOptions.color;
        guiContext.strokeStyle =  renderOptions.color;        
    }

    /*
        The following only really needs to draw two semicircles as internally the semicircles will 
        attach to each other to create the completed object.
     */

    guiContext.translate(centerPoint.x, centerPoint.y);
    /* 
       Rotate origin based on angle given
       NOTE: For some reason EagleCAD items are rotated by 90 degrees by default. 
             This corrects for that so items are displayed correctly.
             This seems to also only be required for oblong pads. This is most likely due to the 
             arc functions used.
    */
    guiContext.rotate((angle-90)*Math.PI/180);

    guiContext.beginPath();
    guiContext.arc(centerPoint1.x, centerPoint1.y, radius, Math.PI,0);
    guiContext.arc(centerPoint2.x, centerPoint2.y, radius, 0, Math.PI );
    guiContext.closePath();
    
    if(renderOptions.fill)
    {
        guiContext.fill()
    }
    else
    {
        guiContext.stroke();
    }

    // Restores context to state prior to this rendering function being called. 
    guiContext.restore();
}


module.exports = {
  Polygon, Circle, Oval
}
