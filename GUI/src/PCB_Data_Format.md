
Data interchange format between EagleCAD and iBOM will be JSON. 

## JSON Sections

### dimension

The dimension section is an array of segment objects. The format of the dimension layer is the following. 

```json
"dimension":
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


