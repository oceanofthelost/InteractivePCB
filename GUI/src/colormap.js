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

module.exports = {
    GetTraceColor,
}
