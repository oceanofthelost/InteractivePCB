This document defines the data interchange format between a electronic CAD program and this BOM tool. 

The following is a high level description of the file format.

```
PCB_DATA ::= <HEADER> <BOARD> <PARTS>

HEADER   ::= <PROTOCOL_VERSION> <ECAD> <PROJECT_NAME> <GENERATED_DATE> <NUMBER_PARTS>

BOARD    ::= <PCB_SHAPE> <LAYERS> <SILKSCREEN>

LAYERS ::= <LAYER> | <LAYER> <LAYERS>

LAYER ::= <LAYER_NAME> <TRACES> <POURS>

POURS ::= <POUR> | <POUR> <POURS>

SILKSCREEN ::= <TOP_SILK> <BOTTOM_SILK>

TOP_SILK ::= <PATHS>
BOTTOM_SILK ::= <PATHS>

POUR ::= <PATHS>
PCB_SHAPE ::= <PATHS>

PARTS    ::= <PART> | <PART> <PARTS>

PART     ::= <PART_NAME> <ATTRIBUTES> <LOCATION> <PADS> <BOUNDING_BOX>

TRACES   ::= <TRACE> | <TRACE> <TRACES>

PROTOCOL_VERSION ::= "1.0"
ECAD             ::= "eagle"
PROJECT_NAME     ::= XXX <- USER specified
GENERATED_DATE   ::= XXX <- User specified
NUMBER_PARTS     ::= <NUM_PARTS_TOP> <NUM_PARTS_BOTTOM>

NUM_PARTS_TOP     ::= # parts top of board
NUM_PARTS_BOTTOM  ::= # parts bottom of board

PATHS ::= <PATH> | <PATH>, <PATHS>
PATH  ::=  <LINE> | <ARC> | <BEZIER> | <QUADRATIC_BEZIER>
LINE  ::= (<POINT>, <POINT>,<WIDTH>)
ARC   ::= (<POINT>,<RADIUS>,<START_ANGLE>,<END_ANGLE>, <ARC_DIRECTION>,<WIDTH>) <- POINT is center point
BEZIER ::= (<POINT>,<POINT>,<POINT>,<WIDTH>)  <- points are (start, end, control)
QUADRATIC_BEZIER ::= (<POINT>,<POINT>,<POINT>,<POINT>,<WIDTH>) <- points are (start, end, control1, control2)

LOCATION ::= t | b <- t = top, b = bottom

POINT         ::= (x,y)
RADIUS        ::= #
START_ANGLE   ::= # <- in radians
END_ANGLE     ::= # <- in radians
ARC_DIRECTION ::= clockwise | counterclockwise
WIDTH         ::= # <- How wide the line should be drawn

BOUNDING_BOX ::= <PATHS>

LAYER_NAME ::= STRING 
PART_NAME  ::= STRING <- hold part reference name 
ATTRIBUTES ::= <ATTRIBUTE> | <ATTRIBUTE> <ATTRIBUTES>
PADS       ::= <PAD> | <PAD>, <PADS>
TRACE      ::= <PATHS>
PAD        ::= <PAD_TYPE> <PATHS>
PAD_TYPE   := SMD | THT  <- SMD = surface mount, THT = Through hole
ATTRIBUTE  ::= (<KEY>,<VALUE>)

```
