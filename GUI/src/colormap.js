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



function GetTraceColor(traceLayer)
{
    return traceColorMap[traceLayer];
}



function GetPadColor(isHighlited, isPlaced)
{
    let result = "#878787"
    

    // Highlighted and part is placed.
    if (isHighlited && isPlaced) 
    {
        result     = "#40D040"
    }
    // Highlighted and not placed
    else if(isHighlited)
    {
      result     = "#D04040";
    }
    /* 
        If debug mode is enabled then force drawing a bounding box
      not highlighted,  not placed, and debug mode active
    */
    else if(globalData.getDebugMode())
    {
       result     =  "#2977ff"
    }
    return result;
}


function GetPadOutlineColor(isHighlited, isPlaced)
{
  
    let result = "#ffb629"

    // Currently only the one color is used for pin 1. 
    
    return result;
}

module.exports = {
    GetTraceColor, GetPadColor, GetPadOutlineColor
}
