function Rectangle(guiContext, pad, color, outline)
{
    guiContext.save();
    guiContext.fillStyle = color;
    guiContext.strokeStyle = color;


    /* 
        Draw the rectangle using low level primitives. 
        There will be 4 points, one for each corner. 

        NOTE: Using points instead of rect method for 2 reasons. 
            1) Will replace function with generic polygon function. 
            2) rect requires that points be given not based on center, but based on upper right
               position.
    */

    var x0 = pad.x-pad.dx/2;
    var y0 = pad.y-pad.dy/2;

    var x1 =  pad.x+pad.dx/2;
    var y1 =  pad.y-pad.dy/2;

    var x2 =  pad.x+pad.dx/2;
    var y2 =  pad.y+pad.dy/2;

    var x3 =  pad.x-pad.dx/2;
    var y3 =  pad.y+pad.dy/2;

    guiContext.beginPath();
    guiContext.moveTo(x0,y0);
    guiContext.lineTo(x1,y1);
    guiContext.lineTo(x2,y2);
    guiContext.lineTo(x3,y3);
    guiContext.closePath();
    guiContext.fill()

    guiContext.restore();
}

/*
    An oblong pad can be thought of as having a rectangular middle with two semicicle ends. 

    EagleCAD provides provides three pieces of information for generating these pads. 
        1) Center point = Center of part
        2) Diameter = distance from center point to edge of semicircle
        3) Elongation =% ratio relating diameter to width

    The design also has 4 points of  interest, each representing the 
    corner of the rectangle. 

    To render the length and width are derived. This is divided in half to get the 
    values used to translate the central point to one of the verticies. 

*/
function Oblong(guiContext, color, pad, ctxmethod)
{
    guiContext.save();
    guiContext.fillStyle = color;
    guiContext.strokeStyle = color;
    
    // Diameter is the disnce from center of pad to tip of circle
    // elongation is a factor that related the diameter to the width
    // This is the total width
    let width   = pad.diameter*pad.elongation/100;
    
    // THe width of the rectangle is the diameter -half the radius.
    // See documentation on how these are calculated.
    let height  = (pad.diameter-width/2)*2;

    /* Center point of top half circle */
    let cx0 = 0
    let cy0 = -height/2;

    /* Center point of lower half circle */
    let cx1 = 0;
    let cy1 = height/2;

    let radius = width/2;

    /*
        The following only really needs to draw two semicircles as internally the semicircles will 
        attach to each other to create the completed object.
     */

    /* Move origin to center of part of pad */
    guiContext.translate(pad.x, pad.y);
    /* 
       Rotate origin based on angle given
       NOTE: For some reason EagleCAD items are rotated by 90 degrees by default. 
             This corrects for that so items are displayed correctly.
    */
    guiContext.rotate((pad.angle-90)*Math.PI/180);
    /* Start new path */
    guiContext.beginPath();
    /* Draw top half circle */
    guiContext.arc(cx0,cy0,radius, Math.PI,0 , );
    /* Draw the lower half circle */
    guiContext.arc(cx1,cy1,radius, 0, Math.PI );
    /* Close the path. */
    guiContext.closePath();
    /* Fill rectangle with specified color */
    guiContext.fill()


    /* Draw the drill hole */
    guiContext.beginPath();
    guiContext.fillStyle = "#CCCCCC";
    guiContext.strokeStyle = "#CCCCCC";
    guiContext.arc(0,0, pad.drill/2, 0, 2*Math.PI);
    guiContext.fill()
    
    // Restores context to state prior to this rendering function being called. 
    guiContext.restore();
}


module.exports = {
  Rectangle, Oblong
}
