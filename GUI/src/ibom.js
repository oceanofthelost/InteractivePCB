/* DOM manipulation and misc code */


var Split = require('../vender/split.js')
var globalData = require('./global.js')
var render = require('./render.js')
var pcb    = require('./pcb.js')


//TODO:  GLOBAL VARIABLE REFACTOR
var filter = "";
function getFilter(input) {
  return filter;
}

function setFilter(input) {
  filter = input.toLowerCase();
  populateBomTable();
}

function dbg(html) {
  dbgdiv.innerHTML = html;
}

function setDarkMode(value) {
  if (value) {
    topmostdiv.classList.add("dark");
  } else {
    topmostdiv.classList.remove("dark");
  }
  globalData.writeStorage("darkmode", value);
  render.redrawCanvas(allcanvas.front);
  render.redrawCanvas(allcanvas.back);
}

function getStoredCheckboxRefs(checkbox) {
  var existingRefs = globalData.readStorage("checkbox_" + checkbox);
  if (!existingRefs) {
    return new Set();
  } else {
    return new Set(existingRefs.split(","));
  }
}

function getCheckboxState(checkbox, references) {
  var storedRefsSet = getStoredCheckboxRefs(checkbox);
  var currentRefsSet = new Set(references);
  // Get difference of current - stored
  var difference = new Set(currentRefsSet);
  for (ref of storedRefsSet) {
    difference.delete(ref);
  }
  if (difference.size == 0) {
    // All the current refs are stored
    return "checked";
  } else if (difference.size == currentRefsSet.size) {
    // None of the current refs are stored
    return "unchecked";
  } else {
    // Some of the refs are stored
    return "indeterminate";
  }
}

function setBomCheckboxState(checkbox, element, references) {
  var state = getCheckboxState(checkbox, references);
  element.checked = (state == "checked");
  element.indeterminate = (state == "indeterminate");
}

function createCheckboxChangeHandler(checkbox, references) {
  return function() {
    refsSet = getStoredCheckboxRefs(checkbox);
    if (this.checked) {
      // checkbox ticked
      for (var ref of references) {
        refsSet.add(ref);
      }
    } else {
      // checkbox unticked
      for (var ref of references) {
        refsSet.delete(ref);
      }
    }
    globalData.writeStorage("checkbox_" + checkbox, [...refsSet].join(","));
  }
}

function createRowHighlightHandler(rowid, refs) {
  return function() {
    if (globalData.getCurrentHighlightedRowId()) {
      if (globalData.getCurrentHighlightedRowId() == rowid) {
        return;
      }
      document.getElementById(globalData.getCurrentHighlightedRowId()).classList.remove("highlighted");
    }
    document.getElementById(rowid).classList.add("highlighted");
    globalData.setCurrentHighlightedRowId(rowid);
    globalData.setHighlightedRefs(refs);
    render.drawHighlights();
  }
}

function entryMatches(entry) {
  // check refs
  for (var ref of entry[3]) {
    if (ref.toLowerCase().indexOf(getFilter()) >= 0) {
      return true;
    }
  }
  // check value
  if (entry[1].toLowerCase().indexOf(getFilter()) >= 0) {
    return true;
  }
  // check footprint
  if (entry[2].toLowerCase().indexOf(getFilter()) >= 0) {
    return true;
  }
  return false;
}

function findRefInEntry(entry) {
  for (var ref of entry[3]) {
    if (ref.toLowerCase() == getFilter()) {
      return [ref];
    }
  }
  return false;
}

function highlightFilter(s) {
  if (!getFilter()) {
    return s;
  }
  var parts = s.toLowerCase().split(getFilter());
  if (parts.length == 1) {
    return s;
  }
  var r = "";
  var pos = 0;
  for (var i in parts) {
    if (i > 0) {
      r += '<mark class="highlight">' +
        s.substring(pos, pos + getFilter().length) +
        '</mark>';
      pos += getFilter().length;
    }
    r += s.substring(pos, pos + parts[i].length);
    pos += parts[i].length;
  }
  return r;
}

function checkboxSetUnsetAllHandler(checkboxname) {
  return function() {
    var checkboxnum = 0;
    while (checkboxnum < globalData.getCheckboxes().length &&
      globalData.getCheckboxes()[checkboxnum].toLowerCase() != checkboxname.toLowerCase()) {
      checkboxnum++;
    }
    if (checkboxnum >= globalData.getCheckboxes().length) {
      return;
    }
    var allset = true;
    var checkbox;
    var row;
    for (row of bombody.childNodes) {
      checkbox = row.childNodes[checkboxnum + 1].childNodes[0];
      if (!checkbox.checked || checkbox.indeterminate) {
        allset = false;
        break;
      }
    }
    for (row of bombody.childNodes) {
      checkbox = row.childNodes[checkboxnum + 1].childNodes[0];
      checkbox.checked = !allset;
      checkbox.indeterminate = false;
      checkbox.onchange();
    }
  }
}

function createColumnHeader(name, cls, comparator) {
  var th = document.createElement("TH");
  th.innerHTML = name;
  th.classList.add(cls);
  th.style.cursor = "pointer";
  var span = document.createElement("SPAN");
  span.classList.add("sortmark");
  span.classList.add("none");
  th.appendChild(span);
  th.onclick = function() {
    if (globalData.getCurrentSortColumn() && this !== globalData.getCurrentSortColumn()) {
      // Currently sorted by another column
      globalData.getCurrentSortColumn().childNodes[1].classList.remove(globalData.getCurrentSortOrder());
      globalData.getCurrentSortColumn().childNodes[1].classList.add("none");
      globalData.setCurrentSortColumn(null);
      globalData.setCurrentSortOrder(null);
    }
    if (globalData.getCurrentSortColumn() && this === globalData.getCurrentSortColumn()) {
      // Already sorted by this column
      if (globalData.getCurrentSortOrder() == "asc") {
        // Sort by this column, descending order
        globalData.setBomSortFunction(function(a, b) {
          return -comparator(a, b);
        });
        globalData.getCurrentSortColumn().childNodes[1].classList.remove("asc");
        globalData.getCurrentSortColumn().childNodes[1].classList.add("desc");
        globalData.setCurrentSortOrder("desc");
      } else {
        // Unsort
        globalData.setBomSortFunction(null);
        globalData.getCurrentSortColumn().childNodes[1].classList.remove("desc");
        globalData.getCurrentSortColumn().childNodes[1].classList.add("none");
        globalData.setCurrentSortColumn(null);
        globalData.setCurrentSortOrder(null);
      }
    } else {
      // Sort by this column, ascending order
      globalData.setBomSortFunction(comparator);
      globalData.setCurrentSortColumn(this);
      globalData.getCurrentSortColumn().childNodes[1].classList.remove("none");
      globalData.getCurrentSortColumn().childNodes[1].classList.add("asc");
      globalData.setCurrentSortOrder("asc");
    }
    populateBomBody();
  }
  return th;
}

function fancyDblClickHandler(el, onsingle, ondouble) {
  return function() {
    if (el.getAttribute("data-dblclick") == null) {
      el.setAttribute("data-dblclick", 1);
      setTimeout(function() {
        if (el.getAttribute("data-dblclick") == 1) {
          onsingle();
        }
        el.removeAttribute("data-dblclick");
      }, 200);
    } else {
      el.removeAttribute("data-dblclick");
      ondouble();
    }
  }
}

function populateBomHeader() {
  while (bomhead.firstChild) {
    bomhead.removeChild(bomhead.firstChild);
  }
  var tr = document.createElement("TR");
  var th = document.createElement("TH");
  th.classList.add("numCol");
  tr.appendChild(th);
  globalData.setCheckboxes(globalData.getBomCheckboxes().split(",").filter((e) => e));
  var checkboxCompareClosure = function(checkbox) {
    return (a, b) => {
      var stateA = getCheckboxState(checkbox, a[3]);
      var stateB = getCheckboxState(checkbox, b[3]);
      if (stateA > stateB) return -1;
      if (stateA < stateB) return 1;
      return 0;
    }
  }

  for (var checkbox of globalData.getCheckboxes()) {
    th = createColumnHeader(
      checkbox, checkbox, checkboxCompareClosure(checkbox));
    th.onclick = fancyDblClickHandler(
      th, th.onclick.bind(th), checkboxSetUnsetAllHandler(checkbox));
    tr.appendChild(th);
  }

  tr.appendChild(createColumnHeader("References", "References", (a, b) => {
    var i = 0;
    while (i < a[3].length && i < b[3].length) {
      if (a[3][i] != b[3][i]) return a[3][i] > b[3][i] ? 1 : -1;
      i++;
    }
    return a[3].length - b[3].length;
  }));

  tr.appendChild(createColumnHeader("Value", "Value", (a, b) => {
    if (a[1] != b[1]) return a[1] > b[1] ? 1 : -1;
    else return 0;
  }));

  tr.appendChild(createColumnHeader("Footprint", "Footprint", (a, b) => {
    if (a[2] != b[2]) return a[2] > b[2] ? 1 : -1;
    else return 0;
  }));

  var additionalAttributes = globalData.getAdditionalAttributes().split(',');
  // Remove null, "", undefined, and 0 values
  additionalAttributes    =additionalAttributes.filter(function(e){return e});
  for (var x of additionalAttributes) {
      // remove beginning and trailing whitespace
      x = x.trim()
      if (x) {
        tr.appendChild(createColumnHeader(x, "Attributes", (a, b) => {
          if (a[2] != b[2]) return a[2] > b[2] ? 1 : -1;
          else return 0;
        }));
      }
    }

  if(globalData.getCombineValues())
  {
    tr.appendChild(createColumnHeader("Quantity", "Quantity", (a, b) => {
      return a[3].length - b[3].length;
    }));
  }

  bomhead.appendChild(tr);

}

function filterBOMTable(bomtable)
{
    var result = [];
    for(var entry of bomtable){
      for(var part of entry[3]){
        if( !filterEntry(entry[4], entry[5]) )
        {
          result.push(entry);
        }
      }
    }
    return result;
}

// this function takes the input sting, which is a comma separated string.
// if there is a match of entry attribute with the filter string, then
// the bom entry needs to be filtered
// return true if string should be filters, otherwise return false.
function filterEntryMultipleEntry(entryAttributesName, entryAttributesValue, filterString){
  var result = true;
  // split input string into an array of strings, split by ','
  var splitFilterString = filterString.split(',');
  // Remove null, "", undefined, and 0 values
  splitFilterString    = splitFilterString.filter(function(e){return e});
  entryAttributesName  = entryAttributesName.split(';');
  entryAttributesValue = entryAttributesValue.split(';');

  for(var i of splitFilterString){
    // removing beginning and trailing whitespace
    i = i.trim()
    if(entryAttributesName.indexOf(i) != -1){
      // Id the value is an empty string then dont filter out the entry. 
      // if the value is anything then filter out the bom entry
      if(entryAttributesValue[entryAttributesName.indexOf(i)] != "")
      {
        result = false;
      }
    }
  }
  return result;
}

// Input is a string seperated by ;. If there is an entry that matches a filerable key
// then teh value should not be included in the BOM
// Return true if value should be filtered, otherwise return false
function filterEntry(inputStringName, inputStringValue)
{
  var result = true;
  var filterString = globalData.getRemoveBOMEntries().toLowerCase();

  inputStringName  = inputStringName.toLowerCase();
  inputStringValue = inputStringValue.toLowerCase();

  // If there is no user specified filter value, then dont filter
  if(globalData.getRemoveBOMEntries()=="")
  {
    result = false;
  }
  // Check that the part has the fileable attribute. If it does not then dontfilter
  else if( filterEntryMultipleEntry(inputStringName, inputStringValue, filterString ))
  {
    result = false;
  }

  return result;
}


function GenerateBOMTable()
{
  // XXX: pcbdata is a global variable. 
  //      should create a seperate js file for dealing with the json file. 
  //      Then dont have to deal with it directly. 
  var bomtableTemp = [];
    switch (globalData.getCanvasLayout()) {
    case 'F':
      bomtableTemp = pcbdata.bom.F;
      break;
    case 'FB':
      bomtableTemp = pcb.GetBOM();
      break;
    case 'B':
      bomtableTemp = pcbdata.bom.B;
      break;
  }
  bomtableTemp = filterBOMTable(bomtableTemp);

  // If the parts are displayed one per line (not combined values), then the the bom table needs to be flattened. 
  // By default the data in the json file is combined
  if(globalData.getCombineValues())
  {
    bomtable = [];
    if(bomtableTemp.length>0){
      //[1,"0.1uF","C0805",["C2"]],
      // XXX: Assuming that the input json data has bom entries presorted
      // TODO: Start at index 1, and compare the current to the last, this should simplify the logic
      bomtable.push([1,bomtableTemp[0][1],bomtableTemp[0][2],bomtableTemp[0][3],bomtableTemp[0][4],bomtableTemp[0][5]])
      count = 0;
      for (var n = 1; n < bomtableTemp.length;n++)
      {
        if(bomtable[count][1] == bomtableTemp[n][1])
        {
          refString = bomtable[count][3].concat(bomtableTemp[n][3]);
          bomtable[count] = [bomtable[count][0]+1,
                bomtable[count][1],
                bomtable[count][2],
                refString,
                bomtable[count][4],
                bomtable[count][5]
                ];
        }
        else
        {
          bomtable.push([1,
                      bomtableTemp[n][1],
                      bomtableTemp[n][2],
                      bomtableTemp[n][3],
                      bomtableTemp[n][4],
                      bomtableTemp[n][5]
                    ]);
            count++;
        }
      }
    }
  }
  else
  {
    bomtable = bomtableTemp;
  }

  // Remove the elements specified n removeBOMEntries
  // removeBOMEntries is a string containing an attribute that if a part includes
  // will force the part not to be displayed
  return bomtable;

}



function getAttributeValue(attributeNames, attributeValues, attributeToLookup){
  var result = "";

  attributeNames  = attributeNames.split(';');
  attributeValues = attributeValues.split(';');

  if(attributeNames.indexOf(attributeToLookup) >= 0){
    result = attributeValues[attributeNames.indexOf(attributeToLookup)];
  }

  return result;
}


//TODO: This should be rewritten to interact with json using the tags instead of 
//      having all of the elements hardcoded.
function populateBomBody() {
  while (bom.firstChild) {
    bom.removeChild(bom.firstChild);
  }
  globalData.setHighlightHandlers([]);
  globalData.setCurrentHighlightedRowId(null);
  var first = true;

  bomtable = GenerateBOMTable();

  if (globalData.getBomSortFunction()) {
    bomtable = bomtable.slice().sort(globalData.getBomSortFunction());
  }
  for (var i in bomtable) {
    var bomentry = bomtable[i];
     var references = bomentry[3];
    if (getFilter() && !entryMatches(bomentry)) {
      continue;
    }


    var tr = document.createElement("TR");
    var td = document.createElement("TD");
    var rownum = +i + 1;
    tr.id = "bomrow" + rownum;
    td.textContent = rownum;
    tr.appendChild(td);

    // Checkboxes
    for (var checkbox of globalData.getCheckboxes()) {
      if (checkbox) {
        td = document.createElement("TD");
        var input = document.createElement("input");
        input.type = "checkbox";
        input.onchange = createCheckboxChangeHandler(checkbox, references);
        setBomCheckboxState(checkbox, input, references);
        td.appendChild(input);
        tr.appendChild(td);
      }
    }

    //INFO: The lines below add the control the columns on the bom table
    // References
    td = document.createElement("TD");
    td.innerHTML = highlightFilter(references.join(", "));
    tr.appendChild(td);
    // Value
    td = document.createElement("TD");
    td.innerHTML = highlightFilter(bomentry[1]);
    tr.appendChild(td);
    // Footprint
    td = document.createElement("TD");
    td.innerHTML = highlightFilter(bomentry[2]);
    tr.appendChild(td);
    
    // Attributes
    var additionalAttributes = globalData.getAdditionalAttributes().split(',');
    for (var x of additionalAttributes) {
      x = x.trim()
      if (x) {
        td = document.createElement("TD");
        td.innerHTML = highlightFilter(getAttributeValue(bomentry[4].toLowerCase(), bomentry[5].toLowerCase(),x.toLowerCase()));
        tr.appendChild(td);
      }
    }

    if(globalData.getCombineValues())
    {

      td = document.createElement("TD");
      td.textContent = bomentry[3].length;
      tr.appendChild(td);
    }
    bom.appendChild(tr);


    bom.appendChild(tr);
    var handler = createRowHighlightHandler(tr.id, references);
    tr.onmousemove = handler;
    globalData.pushHighlightHandlers({
      id: tr.id,
      handler: handler,
      refs: references
    });
    if (getFilter() && first) {
      handler();
      first = false;
    }
  }
}

function smoothScrollToRow(rowid) {
  document.getElementById(rowid).scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest"
  });
}

function highlightPreviousRow() {
  if (!globalData.getCurrentHighlightedRowId()) {
    globalData.getHighlightHandlers()[globalData.getHighlightHandlers().length - 1].handler();
  } else {
    if (globalData.getHighlightHandlers().length > 1 &&
      globalData.getHighlightHandlers()[0].id == globalData.getCurrentHighlightedRowId()) {
      globalData.getHighlightHandlers()[globalData.getHighlightHandlers().length - 1].handler();
    } else {
      for (var i = 0; i < globalData.getHighlightHandlers().length - 1; i++) {
        if (globalData.getHighlightHandlers()[i + 1].id == globalData.getCurrentHighlightedRowId()) {
          globalData.getHighlightHandlers()[i].handler();
          break;
        }
      }
    }
  }
  smoothScrollToRow(globalData.getCurrentHighlightedRowId());
}

function highlightNextRow() {
  if (!globalData.getCurrentHighlightedRowId()) {
    globalData.getHighlightHandlers()[0].handler();
  } else {
    if (globalData.getHighlightHandlers().length > 1 &&
      globalData.getHighlightHandlers()[globalData.getHighlightHandlers().length - 1].id == globalData.getCurrentHighlightedRowId()) {
      globalData.getHighlightHandlers()[0].handler();
    } else {
      for (var i = 1; i < globalData.getHighlightHandlers().length; i++) {
        if (globalData.getHighlightHandlers()[i - 1].id == globalData.getCurrentHighlightedRowId()) {
          globalData.getHighlightHandlers()[i].handler();
          break;
        }
      }
    }
  }
  smoothScrollToRow(globalData.getCurrentHighlightedRowId());
}

function populateBomTable() {
  populateBomHeader();
  populateBomBody();
}

function modulesClicked(references) {
  var lastClickedIndex = references.indexOf(globalData.getLastClickedRef());
  var ref = references[(lastClickedIndex + 1) % references.length];
  for (var handler of globalData.getHighlightHandlers()) {
    if (handler.refs.indexOf(ref) >= 0) {
      globalData.setLastClickedRef(ref);
      handler.handler();
      smoothScrollToRow(globalData.getCurrentHighlightedRowId());
      break;
    }
  }
}

function silkscreenVisible(visible) {
  if (visible) {
    allcanvas.front.silk.style.display = "";
    allcanvas.back.silk.style.display = "";
    globalData.writeStorage("silkscreenVisible", true);
  } else {
    allcanvas.front.silk.style.display = "none";
    allcanvas.back.silk.style.display = "none";
    globalData.writeStorage("silkscreenVisible", false);
  }
}

function changeCanvasLayout(layout) {
  document.getElementById("fl-btn").classList.remove("depressed");
  document.getElementById("fb-btn").classList.remove("depressed");
  document.getElementById("bl-btn").classList.remove("depressed");
  switch (layout) {
    case 'F':
      document.getElementById("fl-btn").classList.add("depressed");
      if (globalData.getBomLayout() != "BOM") {
        globalData.collapseCanvasSplit(1);
      }
      break;
    case 'B':
      document.getElementById("bl-btn").classList.add("depressed");
      if (globalData.getBomLayout() != "BOM") {
        globalData.collapseCanvasSplit(0);
      }
      break;
    default:
      document.getElementById("fb-btn").classList.add("depressed");
      if (globalData.getBomLayout() != "BOM") {
        globalData.setSizesCanvasSplit([50, 50]);
      }
  }
  globalData.setCanvasLayout(layout);
  globalData.writeStorage("canvaslayout", layout);
  render.resizeAll();
  populateBomTable();
}

function populateMetadata() {
  document.getElementById("title").innerHTML    = pcbdata.metadata.title;
  document.getElementById("revision").innerHTML = "Rev: " + pcbdata.metadata.revision;
  document.getElementById("company").innerHTML  = pcbdata.metadata.company;
  document.getElementById("filedate").innerHTML = pcbdata.metadata.date;
  if (pcbdata.metadata.title != "") {
    document.title = pcbdata.metadata.title + " BOM";
  }
}

function changeBomLayout(layout) {
  document.getElementById("bom-btn").classList.remove("depressed");
  document.getElementById("lr-btn").classList.remove("depressed");
  document.getElementById("tb-btn").classList.remove("depressed");
  switch (layout) {
    case 'BOM':
      document.getElementById("bom-btn").classList.add("depressed");
      if (globalData.getBomSplit()) {
        globalData.destroyBomSplit();
        globalData.setBomSplit(null);
        globalData.destroyCanvasSplit();
        globalData.setCanvasSplit(null);
      }
      document.getElementById("frontcanvas").style.display = "none";
      document.getElementById("backcanvas").style.display = "none";
      document.getElementById("bot").style.height = "";
      break;
    case 'TB':
      document.getElementById("tb-btn").classList.add("depressed");
      document.getElementById("frontcanvas").style.display = "";
      document.getElementById("backcanvas").style.display = "";
      document.getElementById("bot").style.height = "calc(100% - 80px)";
      document.getElementById("bomdiv").classList.remove("split-horizontal");
      document.getElementById("canvasdiv").classList.remove("split-horizontal");
      document.getElementById("frontcanvas").classList.add("split-horizontal");
      document.getElementById("backcanvas").classList.add("split-horizontal");
      if (globalData.getBomSplit()) {
        globalData.destroyBomSplit();
        globalData.setBomSplit(null);
        globalData.destroyCanvasSplit();
        globalData.setCanvasSplit(null);
      }
      globalData.setBomSplit(Split(['#bomdiv', '#canvasdiv'], {
        sizes: [50, 50],
        onDragEnd: render.resizeAll,
        direction: "vertical",
        gutterSize: 5
      }));
      globalData.setCanvasSplit(Split(['#frontcanvas', '#backcanvas'], {
        sizes: [50, 50],
        gutterSize: 5,
        onDragEnd: render.resizeAll
      }));
      break;
    case 'LR':
      document.getElementById("lr-btn").classList.add("depressed");
      document.getElementById("frontcanvas").style.display = "";
      document.getElementById("backcanvas").style.display = "";
      document.getElementById("bot").style.height = "calc(100% - 80px)";
      document.getElementById("bomdiv").classList.add("split-horizontal");
      document.getElementById("canvasdiv").classList.add("split-horizontal");
      document.getElementById("frontcanvas").classList.remove("split-horizontal");
      document.getElementById("backcanvas").classList.remove("split-horizontal");
      if (globalData.getBomSplit()) {
        globalData.destroyBomSplit();
        globalData.setBomSplit(null);
        globalData.destroyCanvasSplit();
        globalData.setCanvasSplit(null);
      }
      globalData.setBomSplit(Split(['#bomdiv', '#canvasdiv'], {
        sizes: [50, 50],
        onDragEnd: render.resizeAll,
        gutterSize: 5
      }));
      globalData.setCanvasSplit(Split(['#frontcanvas', '#backcanvas'], {
        sizes: [50, 50],
        gutterSize: 5,
        direction: "vertical",
        onDragEnd: render.resizeAll
      }));
  }
  globalData.setBomLayout(layout);
  globalData.writeStorage("bomlayout", layout);
  changeCanvasLayout(globalData.getCanvasLayout());
}

function focusInputField(input) {
  input.scrollIntoView(false);
  input.focus();
  input.select();
}

function focusFilterField() {
  focusInputField(document.getElementById("filter"));
}

function toggleBomCheckbox(bomrowid, checkboxnum) {
  if (!bomrowid || checkboxnum > globalData.getCheckboxes().length) {
    return;
  }
  var bomrow = document.getElementById(bomrowid);
  var checkbox = bomrow.childNodes[checkboxnum].childNodes[0];
  checkbox.checked = !checkbox.checked;
  checkbox.indeterminate = false;
  checkbox.onchange();
}

function checkBomCheckbox(bomrowid, checkboxname) {
  var checkboxnum = 0;
  while (checkboxnum < globalData.getCheckboxes().length &&
    globalData.getCheckboxes()[checkboxnum].toLowerCase() != checkboxname.toLowerCase()) {
    checkboxnum++;
  }
  if (!bomrowid || checkboxnum >= globalData.getCheckboxes().length) {
    return;
  }
  var bomrow = document.getElementById(bomrowid);
  var checkbox = bomrow.childNodes[checkboxnum + 1].childNodes[0];
  checkbox.checked = true;
  checkbox.indeterminate = false;
  checkbox.onchange();
}


function removeGutterNode(node) {
  for (var i = 0; i < node.childNodes.length; i++) {
    if (node.childNodes[i].classList &&
      node.childNodes[i].classList.contains("gutter")) {
      node.removeChild(node.childNodes[i]);
      break;
    }
  }
}

function cleanGutters() {
  removeGutterNode(document.getElementById("bot"));
  removeGutterNode(document.getElementById("canvasdiv"));
}

function setBomCheckboxes(value) {
  globalData.setBomCheckboxes(value);
  globalData.writeStorage("bomCheckboxes", value);
  populateBomTable();
}

function setRemoveBOMEntries(value) {
  globalData.setRemoveBOMEntries(value);
  globalData.writeStorage("removeBOMEntries", value);
  populateBomTable();
}

function setAdditionalAttributes(value) {
  globalData.setAdditionalAttributes(value);
  globalData.writeStorage("additionalAttributes", value);
  populateBomTable();
}


document.onkeydown = function(e) {
  switch (e.key) {
    case "n":
      if (document.activeElement.type == "text") {
        return;
      }
      if (globalData.getCurrentHighlightedRowId() !== null) {
        checkBomCheckbox(globalData.getCurrentHighlightedRowId(), "placed");
        highlightNextRow();
        e.preventDefault();
      }
      break;
    case "ArrowUp":
      highlightPreviousRow();
      e.preventDefault();
      break;
    case "ArrowDown":
      highlightNextRow();
      e.preventDefault();
      break;
    default:
      break;
  }
  if (e.altKey) {
    switch (e.key) {
      case "f":
        focusFilterField();
        e.preventDefault();
        break;
      case "z":
        changeBomLayout("BOM");
        e.preventDefault();
        break;
      case "x":
        changeBomLayout("LR");
        e.preventDefault();
        break;
      case "c":
        changeBomLayout("TB");
        e.preventDefault();
        break;
      case "v":
        changeCanvasLayout("F");
        e.preventDefault();
        break;
      case "b":
        changeCanvasLayout("FB");
        e.preventDefault();
        break;
      case "n":
        changeCanvasLayout("B");
        e.preventDefault();
        break;
      default:
        break;
    }
    if (e.key >= '1' && e.key <= '9') {
      toggleBomCheckbox(currentHighlightedRowId, parseInt(e.key));
    }
  }
}

window.onload = function(e) {
  pcb.CreateBOM(pcbdata)
  pcb.PrintBOM()
  globalData.initStorage();
  cleanGutters();
  render.initRender();
  dbgdiv = document.getElementById("dbg");
  bom = document.getElementById("bombody");
  bomhead = document.getElementById("bomhead");
  globalData.setBomLayout(globalData.readStorage("bomlayout"));
  if (!globalData.getBomLayout()) {
    globalData.setBomLayout("LR");
  }
  globalData.setCanvasLayout(globalData.readStorage("canvaslayout"));
  if (!globalData.getCanvasLayout()) {
    globalData.setCanvasLayout("FB");
  }

  populateMetadata();
  globalData.setBomCheckboxes(globalData.readStorage("bomCheckboxes"));
  if (globalData.getBomCheckboxes() === null) {
    globalData.setBomCheckboxes("Placed");
  }
  globalData.setRemoveBOMEntries(globalData.readStorage("removeBOMEntries"));
  if (globalData.getRemoveBOMEntries() === null) {
    globalData.setRemoveBOMEntries("");
  }
  globalData.setAdditionalAttributes(globalData.readStorage("additionalAttributes"));
  if (globalData.getAdditionalAttributes() === null) {
    globalData.setAdditionalAttributes("");
  }
  document.getElementById("bomCheckboxes").value = globalData.getBomCheckboxes();
  if (globalData.readStorage("silkscreenVisible") === "false") {
    document.getElementById("silkscreenCheckbox").checked = false;
    silkscreenVisible(false);
  }
  if (globalData.readStorage("redrawOnDrag") === "false") {
    document.getElementById("dragCheckbox").checked = false;
    globalData.setRedrawOnDrag(false);
  }
  if (globalData.readStorage("darkmode") === "true") {
    document.getElementById("darkmodeCheckbox").checked = true;
    setDarkMode(true);
  }
  if (globalData.readStorage("highlightpin1") === "true") {
    document.getElementById("highlightpin1Checkbox").checked = true;
    globalData.setHighlightPin1(true);
    render.redrawCanvas(allcanvas.front);
    render.redrawCanvas(allcanvas.back);
  }
  // If this is true then combine parts and display quantity
  if (globalData.readStorage("combineValues") === "true") {
    document.getElementById("combineValues").checked = true;
    globalData.setCombineValues(true);
  }
  boardRotation = globalData.readStorage("boardRotation");
  if (boardRotation === null) {
    boardRotation = 0;
  } else {
    boardRotation = parseInt(boardRotation);
  }
  document.getElementById("boardRotation").value = boardRotation / 5;
  document.getElementById("rotationDegree").textContent = boardRotation;
  // Triggers render
  changeBomLayout(globalData.getBomLayout());
}

window.onresize = render.resizeAll;
window.matchMedia("print").addListener(render.resizeAll);

module.exports = {
  setDarkMode        , silkscreenVisible      , changeBomLayout, changeCanvasLayout,
  setBomCheckboxes   , populateBomTable       , setFilter      , getFilter         ,
  setRemoveBOMEntries, setAdditionalAttributes
}
