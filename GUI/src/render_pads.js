function DrawDrillHole(guiContext, x, y, radius)
{
    /* Draw the drill hole */
    guiContext.beginPath();
    guiContext.fillStyle = "#CCCCCC";
    guiContext.strokeStyle = "#CCCCCC";
    guiContext.arc(x,y, radius, 0, 2*Math.PI);
    guiContext.fill()
}


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

    let x0 = -pad.dx/2;
    let y0 = -pad.dy/2;

    let x1 =  pad.dx/2;
    let y1 =  -pad.dy/2;

    let x2 =  pad.dx/2;
    let y2 =  pad.dy/2;

    let x3 =  -pad.dx/2;
    let y3 =  pad.dy/2;

    guiContext.translate(pad.x, pad.y);
    /* 
       Rotate origin based on angle given
       NOTE: compared to oblong pads, no additional modification is required
             of angle to get the angle to rotate correctly.
    */
    guiContext.rotate((pad.angle)*Math.PI/180);

    guiContext.beginPath();
    guiContext.moveTo(x0,y0);
    guiContext.lineTo(x1,y1);
    guiContext.lineTo(x2,y2);
    guiContext.lineTo(x3,y3);
    guiContext.closePath();
    guiContext.fill()


    if(pad.pad_type == "tht")
    {
        DrawDrillHole(guiContext, 0, 0, pad.drill/2)
    }

    guiContext.restore();
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
             This seems to also only be required for oblong pads. This is most likely due to the 
             arc functions used.
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

    /* Only draw drill hole if tht type pad */
    if(pad.pad_type == "tht")
    {
        /* first two arguments are 0 since since the canvas was translated to the center 
           of pad. 
        
            NOTE: Assumes that drill hole is in center of pad.
         */
        DrawDrillHole(guiContext, 0, 0, pad.drill/2)
    }
    
    
    // Restores context to state prior to this rendering function being called. 
    guiContext.restore();
}

function Round(guiContext, color, pad, ctxmethod)
{
    guiContext.save();
    guiContext.fillStyle = color;
    guiContext.strokeStyle = color;
    /*
        The following only really needs to draw two semicircles as internally the semicircles will 
        attach to each other to create the completed object.
     */


    /* Move origin to center of part of pad */
    guiContext.translate(pad.x, pad.y);
    guiContext.rotate(pad.angle*Math.PI/180);
    /* Start new path */
    guiContext.beginPath();
    /* Draw top half circle */
    guiContext.arc(0,0,pad.diameter/2, 0 , 2*Math.PI );
    /* Close the path. */
    guiContext.closePath();
    /* Fill rectangle with specified color */
    guiContext.fill()

    if(pad.pad_type == "tht")
    {
        DrawDrillHole(guiContext, 0, 0, pad.drill/2)
    }
    
    // Restores context to state prior to this rendering function being called. 
    guiContext.restore();
}

// X & y = center of polygon
// r = polygon
function DrawPolygon(guiContext, cx, cy, r, numberSides)
{
    let i = 0;
    let n = numberSides;
    guiContext.lineTo(cx + r * Math.cos(2 * Math.PI * i / n), cy + r * Math.sin(2 * Math.PI * i / n));
    for ( i = 1; i <= n; i++) 
    {
        guiContext.lineTo(cx + r * Math.cos(2 * Math.PI * i / n), cy + r * Math.sin(2 * Math.PI * i / n));
    }
}

function Octagon(guiContext, color, pad, ctxmethod)
{
    guiContext.save();
    guiContext.fillStyle = color;
    guiContext.strokeStyle = color;
    /*
        The following only really needs to draw two semicircles as internally the semicircles will 
        attach to each other to create the completed object.
     */


    /* Move origin to center of part of pad */
    guiContext.translate(pad.x, pad.y);
    /* 
        Rotate by angle and add an additional 45/2 degrees. This is because the
        points on an octagon are based on based with the original point being at x=0. To rotate 
        so that the middle of one side is displayed correctly. 

        See the attached documentation on octagon geometry.


    */
    guiContext.rotate((pad.angle+45/2)*Math.PI/180);
    /* Start new path */
    guiContext.beginPath();

    /* Translated origin to center of rectangle. So x & y here shall be 0 */
    let x = 0;
    let y = 0;
    let r = pad.diameter/2;

    DrawPolygon(guiContext,x, y, r ,8);

    /* Close the path. */
    guiContext.closePath();
    /* Fill rectangle with specified color */
    guiContext.fill()

    /* Only draw drill hole if tht type pad */
    if(pad.pad_type == "tht")
    {
        /* Draw the drill hole */
        guiContext.beginPath();
        guiContext.fillStyle = "#CCCCCC";
        guiContext.strokeStyle = "#CCCCCC";
        guiContext.arc(0,0, pad.drill/2, 0, 2*Math.PI);
        guiContext.fill()
    }
    
    
    // Restores context to state prior to this rendering function being called. 
    guiContext.restore();
}





module.exports = {
  Rectangle, Oblong, Round, Octagon
}
