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

function Rectangle(guiContext, pad, color, fill)
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

    guiContext.restore();
}

function Round(guiContext, color, x, y, angle, diameter, fill)
{
    guiContext.save();
    guiContext.fillStyle = color;
    guiContext.strokeStyle = color;
    /*
        The following only really needs to draw two semicircles as internally the semicircles will 
        attach to each other to create the completed object.
     */


    /* Move origin to center of part of pad */
    guiContext.translate(x, y);
    guiContext.rotate(angle*Math.PI/180);
    /* Start new path */
    guiContext.beginPath();
    /* Draw top half circle */
    guiContext.arc(0,0,diameter/2, 0 , 2*Math.PI );
    /* Close the path. */
    guiContext.closePath();
    /* Fill rectangle with specified color */
    guiContext.fill()

    // Restores context to state prior to this rendering function being called. 
    guiContext.restore();
}

function Octagon(guiContext, color, x, y, angle, diameter, fill)
{
    guiContext.save();
    guiContext.fillStyle = color;
    guiContext.strokeStyle = color;
    /*
        The following only really needs to draw two semicircles as internally the semicircles will 
        attach to each other to create the completed object.
     */


    /* Move origin to center of part of pad */
    guiContext.translate(x,y);
    /* 
        Rotate by angle and add an additional 45/2 degrees. This is because the
        points on an octagon are based on based with the original point being at x=0. To rotate 
        so that the middle of one side is displayed correctly. 

        See the attached documentation on octagon geometry.


    */
    guiContext.rotate((angle+45/2)*Math.PI/180);
    /* Start new path */
    guiContext.beginPath();

    /* Translated origin to center of rectangle. So x & y here shall be 0 */
    let r = diameter/2;

    DrawPolygon(guiContext,0, 0, r ,8);

    /* Close the path. */
    guiContext.closePath();
    /* Fill rectangle with specified color */
    guiContext.fill()

    // Restores context to state prior to this rendering function being called. 
    guiContext.restore();
}


function Square(guiContext, color, x, y, angle, diameter, fill)
{
    guiContext.save();
    guiContext.fillStyle = color;
    guiContext.strokeStyle = color;
    /*
        The following only really needs to draw two semicircles as internally the semicircles will 
        attach to each other to create the completed object.
     */


    /* Move origin to center of part of pad */
    guiContext.translate(x,y);
    /* 
        Rotate by angle and add an additional 45/2 degrees. This is because the
        points on an octagon are based on based with the original point being at x=0. To rotate 
        so that the middle of one side is displayed correctly. 

        See the attached documentation on octagon geometry.


    */
    guiContext.rotate((22.5+45/2)*Math.PI/180);
    /* Start new path */
    guiContext.beginPath();

    /* Translated origin to center of rectangle. So x & y here shall be 0 */
    let r = diameter/2;

    DrawPolygon(guiContext,0, 0, r ,4);

    /* Close the path. */
    guiContext.closePath();
    /* Fill rectangle with specified color */
    guiContext.fill()

    // Restores context to state prior to this rendering function being called. 
    guiContext.restore();
}




module.exports = {
  Rectangle, Round, Octagon, Square
}
