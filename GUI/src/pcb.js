/*
    This file contains all of the definitions for working with pcbdata.json. 
    This file declares all of the access functions and interfaces for converting 
    the json file into an internal data structure. 
*/


// Read the ecad property. This property lets the application know what 
// ecad software generated the json file. 
function GetCADType(pcbdataStructure)
{
    if(pcbdataStructure.hasOwnProperty("ecad")){
        return pcbdataStructure.ecad;
    }
}

// This will hold the part objects. There is one entry per part
// Format of a part is as follows
// [VALUE,PACKAGE,REFRENECE DESIGNATOR, ,LOCATION, ATTRIBUTE],
// where ATTRIBUTE is a dict of ATTRIBUTE NAME : ATTRIBUTE VALUE
var BOM = [];

// Constructor for creating a part.
function Part(value, package, reference, location, attributes) {
    this.quantity   = 1;
    this.value      = value;
    this.package    = package;
    this.reference  = reference;
    this.location   = location;
    this.attributes = attributes;
}

function CopyPart(inputPart){
  return new Part(inputPart.value, inputPart.package, inputPart.reference, inputPart.location, inputPart.attributes);
}

//TODO: There should be steps here for validating the data and putting it into a 
//      format that is valid for our application
function CreateBOM(pcbdataStructure){
    // For every part in the input file, convert it to our internal 
    // representation data structure.
    for(var part of pcbdataStructure.bom.both){
        // extract the part data. This is here so I can iterate the design 
        // when I make changes to the underlying json file.
        var value     = part[1];
        var package   = part[2];
        var reference = part[3][0];
        var location  = part[6];

        // AttributeName and AttributeValue are two strings that are deliminated by ';'. 
        // Split the strings by ';' and then zip them together
        var attributeNames = part[4].split(';');
        var attributeValues = part[5].split(';');

        //XXX: ASSUMTION that attributeNames is the same length as attributeValues
        attributes = new Map(); // Create a empty dictionary
        for(var i in attributeNames){
            attributes.set(attributeNames[i].toLowerCase(),attributeValues[i].toLowerCase());
        }
        // Add the par to the global part array
        BOM.push(new Part(value, package, reference, location, attributes));
    }
}


function GetBOM(){
    return BOM;
}

function GetBOM_Front()
{
  var result = [];
  for(var i in BOM){
    if(BOM[i].location == "F"){
      result.push(CopyPart(BOM[i]));
    }
  }
  return result;
}


function GetBOM_Back()
{
  var result = [];
  for(var i in BOM){
    if(BOM[i].location == "B"){
      result.push(CopyPart(BOM[i]));
    }
  }
  console.log(result)
  return result;
}

function GetBOMCombinedValues(bomtableTemp){
    result = [];
    if(bomtableTemp.length>0){
      // XXX: Assuming that the input json data has bom entries presorted
      // TODO: Start at index 1, and compare the current to the last, this should simplify the logic
      // Need to create a new object by deep copy. this is because objects by default are passed by reference and i dont 
      // want to modify them.
      result.push(CopyPart(bomtableTemp[0]));
      count = 0;
      for (var n = 1; n < bomtableTemp.length;n++)
      {
        if(result[count].value == bomtableTemp[n].value)
        {
          // For parts that are listed as combined, store the references as an array.
          // This is because the logic for highlighting needs to match strings and 
          // If an appended string is used it might not work right
          refString = result[count].reference + "," + bomtableTemp[n].reference;
          result[count].quantity += 1;
          result[count].reference = refString;
        }
        else
        {
          result.push(CopyPart(bomtableTemp[n]));
          count++;
        }
      }
    }
    return result;
}


function PrintBOM(){

    for(var part in BOM){
        //console.log(BOM[part])
    }
}

function getAttributeValue(part, attributeToLookup){
    var attributes = part.attributes;
    var result = "";

    if(attributeToLookup == "name")
    {
      result = part.reference;
    }
    else
    {
      result = (attributes.has(attributeToLookup) ? attributes.get(attributeToLookup) : "");
    }
    // Check that the attribute exists by looking up its name. If it exists
    // the return the value for the attribute, otherwise return an empty string. 
    return result;
}

module.exports = {
    CreateBOM, PrintBOM, GetBOM, getAttributeValue, GetBOMCombinedValues, GetBOM_Front, GetBOM_Back
}