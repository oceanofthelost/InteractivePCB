
Data interchange format between EagleCAD and iBOM will be JSON. 

## JSON Sections

### board_shape

The board_shape section is an array of segment objects. The format of the board_shape section is the following. 

```json
"board_shape":
[
    {SEGMENT_1},
    {SEGMENT_2},
    ...
    {SEGMENT_N},
]
```

Segment is defined to be one of the following types
* Line
* Circle
* Arc





### silkscreen_top

### silkscreen_bottom

### modules

#### pads
* An array of objects. Each entry represents a single pad shape. 