# STATUS: CLOSED [COMMIT: 437e50ce04170cc8c71a70b61b0d6ac1b201f950]

# DESCRIPTION
When 'Highlight first pin' is selected, no pins are highlighted in the design

# RESOLUTION: 
The EagleCAD ULP script was not outputing data on pin 1. The follwoing was added to the EagleCAD ULP.

    if(C.name=="1")
    {
        printf("\t\t\t\t\"pin1\":%s,\n","1");
    }
    else
    {
        printf("\t\t\t\t\"pin1\":%s,\n","0");
    }

This code snippet was in the module section. This snippet adds a field for each of the pads for a 
part, which is used by ibom to display a box around pin 1. 