This document defines the data interchange format between a electronic CAD program and this BOM tool. 

The following is a high level description of the file format.

```
PCB_DATA ::= <METEDATA> <BOARD> <PARTS>

METEDATA   ::= <PROTOCOL_VERSION> <ECAD> <PROJECT_NAME> <GENERATED_DATE> <NUMBER_PARTS>

BOARD    ::= <PCB_SHAPE> <LAYERS> 

LAYERS ::= <LAYER> | <LAYER> <LAYERS>

LAYER ::= <LAYER_NAME> <TRACES> <POURS>

POURS ::= <POUR> | <POUR> <POURS>

POUR ::= <PATHS>
PCB_SHAPE ::= <BOUNDING_BOX> <EDGES>
BOUNDING_BOX ::= <MAX_X> <MAX_Y> <MIN_X> <MIN_Y>
 
EDGES ::= <PATHS>

PARTS    ::= <PART> | <PART> <PARTS>

PART     ::= <PART_NAME> <PART_VALUE> <PACKAGE> <ATTRIBUTES> <LOCATION> 

PACKAGE :: <PADS> <BOUNDING_BOX> 

TRACES   ::= <TRACE> | <TRACE> <TRACES>

PROTOCOL_VERSION ::= "1.0"
ECAD             ::= "eagle"
PROJECT_NAME     ::= XXX <- USER specified
GENERATED_DATE   ::= XXX <- User specified
NUMBER_PARTS     ::= <NUM_PARTS_TOP> <NUM_PARTS_BOTTOM>

NUM_PARTS_TOP     ::= # parts top of board
NUM_PARTS_BOTTOM  ::= # parts bottom of board

PATHS ::= <PATH> | <PATH>, <PATHS>
PATH  ::=  <LINE> | <ARC> | <BEZIER> | <QUADRATIC_BEZIER> | <POLYGON>
LINE  ::= (<POINT>, <POINT>,<WIDTH>)
ARC   ::= (<POINT>,<RADIUS>,<START_ANGLE>,<END_ANGLE>, <ARC_DIRECTION>,<WIDTH>) <- POINT is center point
BEZIER ::= (<POINT>,<POINT>,<POINT>,<WIDTH>)  <- points are (start, end, control)
QUADRATIC_BEZIER ::= (<POINT>,<POINT>,<POINT>,<POINT>,<WIDTH>) <- points are (start, end, control1, control2)
POLYGON ::= <POINT> <POINT> | <POINT> <POINT> <POINTS> 

POINTS ::= <POINT> | <POINT> <POINTS>
LOCATION ::= F | B  <- F=Front, B=Back


MAX_X ::= #
MAX_Y ::= #
MIN_X ::= #
MIN_Y ::= #


POINT         ::= (x,y)
RADIUS        ::= #
START_ANGLE   ::= # <- in radians
END_ANGLE     ::= # <- in radians
ARC_DIRECTION ::= clockwise | counterclockwise
WIDTH         ::= # <- How wide the line should be drawn

BOUNDING_BOX ::= <PATHS>

LAYER_NAME ::= STRING 
PART_NAME  ::= STRING <- hold part reference name
PART_VALUE ::= STRING <- hold part value if assigned
ATTRIBUTES ::= <ATTRIBUTE> | <ATTRIBUTE> <ATTRIBUTES>

PADS       ::= <PAD> | <PAD> <PADS>
TRACE      ::= <PATHS>
PAD        ::= <PIN1> <PAD_TYPE> <SHAPE>
PIN1       ::= "YES" | "NO"

SHAPE ::= <TYPE> <XXX>   <- XXX is polymorhoic depending in what shape is. How to define in EBNF?

TYPE ::= rect | oval | circle | roundrect | custom

PAD_TYPE   := SMD | THT  <- SMD = surface mount, THT = Through hole
ATTRIBUTE  ::= (<KEY>,<VALUE>)

```