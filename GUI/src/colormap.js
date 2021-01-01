var globalData        = require('./global.js')

var traceColorMap = 
[ 
  // Light Mode, Dark Mode
  ["#C83232B4" , "#C83232B4"],
  ["#CC6600C8" , "#CC6600C8"],
  ["#CC9900C8" , "#CC9900C8"],
  ["#336600C8" , "#336600C8"],
  ["#666633C8" , "#666633C8"],
  ["#FFCC33C8" , "#FFCC33C8"],
  ["#669900C8" , "#669900C8"],
  ["#999966C8" , "#999966C8"],
  ["#99CC99C8" , "#99CC99C8"],
  ["#669999C8" , "#669999C8"],
  ["#33CC99C8" , "#33CC99C8"],
  ["#669966C8" , "#669966C8"],
  ["#336666C8" , "#336666C8"],
  ["#009966C8" , "#009966C8"],
  ["#006699C8" , "#006699C8"],
  ["#3232C8B4" , "#3232C8B4"],
];
//                         Light Mode, Dark Mode
var padColor_Default     = ["#878787", "#878787"]   ;
var padColor_Pin1        = ["#ffb629", "#ffb629"]   ;
var padColor_IsHighlited = ["#D04040", "#D04040"]   ;
var padColor_IsPlaced    = ["#40D040", "#40D040"];

//                               Light Mode, Dark Mode
var boundingBoxColor_Default   = ["#878787", "#878787"];
var boundingBoxColor_Placed    = ["#40D040", "#40D040"];
var boundingBoxColor_Highlited = ["#D04040", "#D04040"];
var boundingBoxColor_Debug     = ["#2977ff", "#2977ff"];

//                 Light Mode, Dark Mode
var pcbEdgeColor = ["#000000FF","#FFFFFFFF"];


/*
    Currently 2 supported color palette. 
    Palette 0 is for light mode, and palette 1 
    id for dark mode.
*/
function GetColorPalette()
{
    return (globalData.readStorage("darkmode") === "true") ? 1 : 0;
}

function GetTraceColor(traceLayer)
{
    return traceColorMap[traceLayer][GetColorPalette()];
}



function GetBoundingBoxColor(isHighlited, isPlaced)
{
    let result = boundingBoxColor_Default

    // Order of color selection.
    if (isPlaced) 
    {
        result     = boundingBoxColor_Placed[GetColorPalette()];
    }
    // Highlighted and not placed
    else if(isHighlited)
    {
        result     = boundingBoxColor_Highlited[GetColorPalette()];
    }
    /* 
        If debug mode is enabled then force drawing a bounding box
      not highlighted,  not placed, and debug mode active
    */
    else if(globalData.getDebugMode())
    {
       result     = boundingBoxColor_Debug[GetColorPalette()];
    }
    else
    {
        result = boundingBoxColor_Default[GetColorPalette()];
    }
    return result;
}


function GetPadColor(isPin1, isHighlited, isPlaced)
{
    let result = padColor_Default

    if(isPin1)
    {
        result = padColor_Pin1[GetColorPalette()];
    }
    else if(isPlaced && isHighlited)
    {
        result = padColor_IsPlaced[GetColorPalette()];
    }
    else if(isHighlited)
    {
        result = padColor_IsHighlited[GetColorPalette()];
    }
    else
    {
        result = padColor_Default[GetColorPalette()];
    }
    return result;
}

function GetPCBEdgeColor()
{
    return pcbEdgeColor[GetColorPalette()];
}

module.exports = {
    GetTraceColor, GetBoundingBoxColor, GetPadColor, GetPCBEdgeColor
}
