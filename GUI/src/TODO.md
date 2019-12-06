* Define a format for part data that will comprise the pcbdata.json file. 
    - Current version "works" but is chaotic, and not documented. 
    - Some entries are numbers but represented as strings. Represent all umbers as either strings or as numbers, not a combination of both.
    - Multiple entries have extra ',' characters at the end of there definition. Python will not parse the files when it has this. 
    - The pcbdata,json file will be the defined file format for working with EagleCAD pcb data. 

* Create a class that interacts can interact with the pcbdata.json file. 
    - The class will provide the interface for working with the parts and will extract the data or process the data per he user requirements.

* Be able to display all of top layer, as per the current iBOM release.

* Zoom works, but zooming in does not scale the elements on image. Need to figure out how to zoom in and scale using the float canvas interface. 