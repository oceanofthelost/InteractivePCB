

function RenderPad_Rectangle()
{
    if (outline) 
    {
        ctx.strokeRect( ScalePadDimension(pad.x), 
                        ScalePadDimension(pad.y), 
                        ScalePadDimension(pad.dx), 
                        ScalePadDimension(pad.dy)
                      );
    }
    else
    {
        ctx.fillRect(   ScalePadDimension(pad.x), 
                        ScalePadDimension(pad.y), 
                        ScalePadDimension(pad.dx), 
                        ScalePadDimension(pad.dy)
                      );
    }
}


module.exports = {
  RenderPad_Rectangle
}
