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
    Oblong pads are unique in that there shape is a "stadium", which just means that they are 
    kind of like a oval but but two sides are straight. Another way o look at it is that 
    the shape is a rectangle with half a circle at each end. 

    EagleCAD defines these with the following properies
    x,y  <- the center of the pad
    diameter <- length from center to edge of half circle. 
    elongation <-
*/
function Oblong(guiContext, color, pad, ctxmethod)
{
    guiContext.save();
    guiContext.fillStyle = color;
    guiContext.strokeStyle = color;
    
    // Diameter is the disnce from center of pad to tip of circle
    // elongation is a factor that related the diameter to the width
    // This is the total width
    var width   = pad.diameter*pad.elongation/100;
    
    // THe width of the rectangle is the diameter -half the radius.
    // See documentation on how these are calculated.
    var height  = (pad.diameter-width/2)*2;
    // Elongation is in percent, convert to number

    var x0 = pad.x-width/2;
    var y0 = pad.y-height/2;

    var x1 =  pad.x+width/2;
    var y1 =  pad.y-height/2;

    var x2 =  pad.x+width/2;
    var y2 =  pad.y+height/2;

    var x3 =  pad.x-width/2;
    var y3 =  pad.y+height/2;

    /* Draw the pad */
    guiContext.beginPath();
    guiContext.moveTo(pad.x,pad.y-height/2);
    guiContext.arc(pad.x,pad.y-height/2,width/2, Math.PI,0 , );
    guiContext.lineTo(x2,y2);
    guiContext.arc(pad.x,pad.y+height/2,width/2, 0,Math.PI );
    guiContext.lineTo(x0,y0);
    guiContext.closePath();
    guiContext.fill()
   


    /* Draw the drill hole */
    guiContext.beginPath();
    guiContext.fillStyle = "#CCCCCC";
    guiContext.strokeStyle = "#CCCCCC";
    guiContext.moveTo(pad.x,pad.y);
    guiContext.arc(pad.x, pad.y, pad.drill/2, 0, 2*Math.PI);
    guiContext.fill()
    
    guiContext.restore();
}


module.exports = {
  Rectangle, Oblong
}
