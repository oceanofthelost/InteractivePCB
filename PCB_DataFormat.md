This document defines the data interchange format between a electronic CAD program and this BOM tool. 

The following is a high level description of the file format.

```
PCB_DATA ::= <HEADER> <BODY>

HEADER   ::= <PROTOCOL_VERSION> <ECAD> <PROJECT_NAME> <GENERATED_DATE> <NUMBER_PARTS>

BODY     ::= <BOARD> <PARTS> <TRACES>

BOARD    ::= <PATHS>

PARTS    ::= <PART> | <PART> <PARTS>

PART     ::= <PART_NAME> <ATTRIBUTES> <PADS> <BOUNDING_BOX>

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
LINE  ::= (<POINT>, <POINT>)
ARC   ::= (<POINT>,<RADIUS>,<START_ANGLE>,<END_ANGLE>, <ARC_DIRECTION>) <- POINT is center point
BEZIER ::= (<POINT>,<POINT>,<POINT>)  <- points are (start, end, control)
QUADRATIC_BEZIER ::= (<POINT>,<POINT>,<POINT>,<POINT>) <- points are (start, end, control1, control2)

POINT         ::= (x,y)
RADIUS        ::= #
START_ANGLE   ::= # <- in radians
END_ANGLE     ::= # <- in radians
ARC_DIRECTION ::= clockwise | counterclockwise

BOUNDING_BOX ::= <PATHS>

PART_NAME  ::= STRING <- hold part reference name 
ATTRIBUTES ::= <ATTRIBUTE> | <ATTRIBUTE> <ATTRIBUTES>
PADS       ::= <PAD> | <PAD>, <PADS>
TRACE      ::= <PATHS>
PAD        ::= <PATHS>
ATTRIBUTE  ::= (<KEY>,<VALUE>)
```
