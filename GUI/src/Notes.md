* Current HTML based version has some problems. 
    #) I am not fluent in web based programming
    #) Adding support for loading and saving files is running into problems due to security features of browsers.
    #) Extending with new features is providing a bottle neck whereas I know python and most tols already have a python interface. Use that over a janky JS solution. 

* Found that the pcbjson file produced by the EagleCAD ULP creates invalid JSON. Unable to import the file into python directly. 

* SMD pads are defined as square with an additional parameter, roundness. When roundness is 100%, then the square becomes a circle. I currently only render only if roundness is either 0% or 100%. I found an a project on github (https://github.com/chilipeppr/widget-eagle/blob/master/auto-generated-widget.html), that seems to have resolved the problem with displaying pads with arbitrary roundness.

* There is a distinction internally in EagleCAD between an smd (UL_SMD) and pad(UL_PAD). Keep this in mind when working with pads for a part. See ulp document for more information.