var globalData        = require('./global.js')

var traceColorMap = [
  "#C83232B4",
  "#CC6600C8",
  "#CC9900C8",
  "#336600C8",
  "#666633C8",
  "#FFCC33C8",
  "#669900C8",
  "#999966C8",
  "#99CC99C8",
  "#669999C8",
  "#33CC99C8",
  "#669966C8",
  "#336666C8",
  "#009966C8",
  "#006699C8",
  "#3232C8B4",
];

var padColor_Default     = "#878787";
var padColor_Pin1        = "#ffb629";
var padColor_IsHighlited = "#D04040";
var padColor_IsPlaced    = "#40D040";

var boundingBoxColor_Default   = "#878787";
var boundingBoxColor_Placed    = "#40D040";
var boundingBoxColor_Highlited = "#D04040";
var boundingBoxColor_Debug     = "#2977ff";


/*
    Element 0: Light Mode
    Element 1: Dark Mode
*/
var pcbEdgeColor = ["#000000FF","#FFFFFFFF"];

function GetTraceColor(traceLayer)
{
    return traceColorMap[traceLayer];
}



function GetBoundingBoxColor(isHighlited, isPlaced)
{
    let result = boundingBoxColor_Default

    // Order of color selection.
    if (isPlaced) 
    {
        result     = boundingBoxColor_Placed;
    }
    // Highlighted and not placed
    else if(isHighlited)
    {
        result     = boundingBoxColor_Highlited;
    }
    /* 
        If debug mode is enabled then force drawing a bounding box
      not highlighted,  not placed, and debug mode active
    */
    else if(globalData.getDebugMode())
    {
       result     = boundingBoxColor_Debug;
    }
    else
    {
        result = boundingBoxColor_Default
    }
    return result;
}


function GetPadColor(isPin1, isHighlited, isPlaced)
{
    let result = padColor_Default

    if(isPin1)
    {
        result = padColor_Pin1;
    }
    else if(isPlaced && isHighlited)
    {
        result = padColor_IsPlaced;
    }
    else if(isHighlited)
    {
        result = padColor_IsHighlited;
    }
    else
    {
        result = padColor_Default;
    }
    return result;
}

function GetPCBEdgeColor()
{
    let colorPalette = (globalData.readStorage("darkmode") === "true") ? 1 : 0;
    return pcbEdgeColor[colorPalette];
}

module.exports = {
    GetTraceColor, GetBoundingBoxColor, GetPadColor, GetPCBEdgeColor
}
