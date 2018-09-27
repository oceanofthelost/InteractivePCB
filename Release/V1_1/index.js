(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*************************************************
              Board Rotation                    
*************************************************/
var storage
var storagePrefix = 'KiCad_HTML_BOM__' + pcbdata.metadata.title + '__' + pcbdata.metadata.revision + '__'

function initStorage (key) {
  try {
    window.localStorage.getItem("blank");
    storage = window.localStorage;
  } catch (e) {
    console.log("Storage init error");
    // localStorage not available
  }
  if (!storage) {
    try {
      window.sessionStorage.getItem("blank");
      storage = window.sessionStorage;
    } catch (e) {
      // sessionStorage also not available
    }
  }
}

function readStorage(key) {
  if (storage) {
    return storage.getItem(storagePrefix + '#' + key);
  } else {
    return null;
  }
}

function writeStorage(key, value) {
  if (storage) {
    storage.setItem(storagePrefix + '#' + key, value);
  }
}

/************************************************/

/*************************************************
              Highlighted Refs                    
*************************************************/
var highlightedRefs = [];

function setHighlightedRefs(refs){
    highlightedRefs = refs;
}

function getHighlightedRefs(){
    return highlightedRefs;
}
/************************************************/

/*************************************************
              Redraw On Drag                      
*************************************************/
var redrawOnDrag = true;

  
function setRedrawOnDrag(value){
    redrawOnDrag = value;
    writeStorage("redrawOnDrag", value);
}

function getRedrawOnDrag(){
    return redrawOnDrag;
}

/************************************************/

/*************************************************
BOM Split
*************************************************/
var bomsplit;

function setBomSplit(value){
    bomsplit = value;
}

function getBomSplit(){
    return bomsplit;
}

function destroyBomSplit(){
    bomsplit.destroy()
}

/************************************************/

/*************************************************
Canvas Split
*************************************************/
var canvassplit;

function setCanvasSplit(value){
    canvassplit = value;
}

function getCanvasSplit(){
    return canvassplit;
}

function destroyCanvasSplit(){
    canvassplit.destroy()
}

function collapseCanvasSplit(value)
{
    canvassplit.collapse(value);
}

function setSizesCanvasSplit(value){
    canvassplit.setSizes([50, 50]);
}

/************************************************/

/*************************************************
Canvas Layout
*************************************************/
var canvaslayout = "FB";

/*XXX Found a bug at startup. Code assumes that canvas layout 
is in one of three states. then system fails. he bug was that the 
canvasLayout was being set to 'default' which is not a valid state. 
So no is check that if default is sent in then set the layout to FB mode.
*/
/* TODO: Make the default check below actually check that the item 
is in one of the three valid states. If not then set to FB, otherwise set to one of
the three valid states
*/
function setCanvasLayout(value){
    if(value == 'default'){
        canvaslayout = 'FB'
    }
    else {
        canvaslayout = value;
    }
}

function getCanvasLayout(){
    return canvaslayout;
}

/************************************************/

/*************************************************
BOM Layout
*************************************************/
var bomlayout = "default";

function setBomLayout(value){
    bomlayout = value;
}

function getBomLayout(){
    return bomlayout;
}

/************************************************/

/*************************************************
BOM Sort Function
*************************************************/
var bomSortFunction = null;

function setBomSortFunction(value){
    bomSortFunction = value;
}

function getBomSortFunction(){
    return bomSortFunction;
}

/************************************************/

/*************************************************
Current Sort Column
*************************************************/
var currentSortColumn = null;

function setCurrentSortColumn(value){
    currentSortColumn = value;
}

function getCurrentSortColumn(){
    return currentSortColumn;
}

/************************************************/

/*************************************************
Current Sort Order
*************************************************/
var currentSortOrder = null;

function setCurrentSortOrder(value){
    currentSortOrder = value;
}

function getCurrentSortOrder(){
    return currentSortOrder;
}

/************************************************/

/*************************************************
Current Highlighted Row ID
*************************************************/
var currentHighlightedRowId;

function setCurrentHighlightedRowId(value){
    currentHighlightedRowId = value;
}

function getCurrentHighlightedRowId(){
    return currentHighlightedRowId;
}

/************************************************/

/*************************************************
Highlight Handlers
*************************************************/
var highlightHandlers = [];

function setHighlightHandlers(values){
    highlightHandlers = values;
}

function getHighlightHandlers(){
    return highlightHandlers;
}

function pushHighlightHandlers(value){
    highlightHandlers.push(value);
}

/************************************************/

/*************************************************
Checkboxes
*************************************************/
var checkboxes = [];

function setCheckboxes(values){
    checkboxes = values;
}

function getCheckboxes(){
    return checkboxes;
}

/************************************************/

/*************************************************
BOM Checkboxes
*************************************************/
var bomCheckboxes = "";

function setBomCheckboxes(values){
    bomCheckboxes = values;
}

function getBomCheckboxes(){
    return bomCheckboxes;
}

/************************************************/

/*************************************************
Highlight Pin 1
*************************************************/
var highlightpin1 = false;

function setHighlightPin1(value) {
  writeStorage("highlightpin1", value);
  highlightpin1 = value;
}

function getHighlightPin1(){
    return highlightpin1;
}

/************************************************/

/*************************************************
Last Clicked Ref
*************************************************/
var lastClickedRef;

function setLastClickedRef(value) {
    lastClickedRef = value;
}

function getLastClickedRef() {
  return lastClickedRef;
}

/************************************************/


/*************************************************
Last Clicked Ref
*************************************************/
var combineValues = false;

function setCombineValues(value) {
  writeStorage("combineValues", value);
  combineValues = value;
}

function getCombineValues(){
    return combineValues;
}
/************************************************/


module.exports = {
  initStorage                , readStorage                , writeStorage       ,
  setHighlightedRefs         , getHighlightedRefs         ,
  setRedrawOnDrag            , getRedrawOnDrag            ,
  setBomSplit                , getBomSplit                , destroyBomSplit    ,
  setCanvasSplit             , getCanvasSplit             , destroyCanvasSplit , collapseCanvasSplit , setSizesCanvasSplit,
  setCanvasLayout            , getCanvasLayout            ,
  setBomLayout               , getBomLayout               ,
  setBomSortFunction         , getBomSortFunction         ,
  setCurrentSortColumn       , getCurrentSortColumn       ,
  setCurrentSortOrder        , getCurrentSortOrder        ,
  setCurrentHighlightedRowId , getCurrentHighlightedRowId ,
  setHighlightHandlers       , getHighlightHandlers       , pushHighlightHandlers ,
  setCheckboxes              , getCheckboxes              ,
  setBomCheckboxes           , getBomCheckboxes           ,
  setHighlightPin1           , getHighlightPin1           ,
  setLastClickedRef          , getLastClickedRef          ,
  setCombineValues           , getCombineValues           ,
};
},{}],2:[function(require,module,exports){

var globalData = require('./global.js')
var render     = require('./render.js')
var ibom       = require('./ibom.js')

const boardRotation = document.getElementById('boardRotation');
boardRotation.oninput=function()
{
  render.setBoardRotation(boardRotation.value);
}

const darkModeBox = document.getElementById('darkmodeCheckbox');
darkModeBox.onchange = function () {
  ibom.setDarkMode(darkModeBox.checked)
}

const silkscreenCheckbox = document.getElementById('silkscreenCheckbox');
silkscreenCheckbox.checked=function(){
  ibom.silkscreenVisible(silkscreenCheckbox.checked)
}
silkscreenCheckbox.onchange=function(){
  ibom.silkscreenVisible(silkscreenCheckbox.checked)
}

const highlightpin1Checkbox =document.getElementById('highlightpin1Checkbox');
highlightpin1Checkbox.onchange=function(){
  globalData.setHighlightPin1(highlightpin1Checkbox.checked);
  render.redrawCanvas(allcanvas.front);
  render.redrawCanvas(allcanvas.back);
}

const dragCheckbox = document.getElementById('dragCheckbox');
dragCheckbox.checked=function(){
  globalData.setRedrawOnDrag(dragCheckbox.checked)
}
dragCheckbox.onchange=function(){
  globalData.setRedrawOnDrag(dragCheckbox.checked)
}


const combineValues = document.getElementById('combineValues');
combineValues.onchange=function(){
  globalData.setCombineValues(combineValues.checked);
  ibom.populateBomTable();
}


const filter_2 = document.getElementById('filter');
filter_2.oninput=function(){
  ibom.updateFilter(filter_2.value)
}


const reflookup_2 = document.getElementById('reflookup');
reflookup_2.oninput=function(){
  ibom.updateRefLookup(reflookup_2.value)
}

const bomCheckboxes = document.getElementById('bomCheckboxes');
bomCheckboxes.oninput=function(){
  ibom.setBomCheckboxes(bomCheckboxes.value);
}

const fl_btn = document.getElementById('fl-btn');
fl_btn.onclick=function(){
  ibom.changeCanvasLayout('F');
}

const fb_btn = document.getElementById('fb-btn');
fb_btn.onclick=function(){
  ibom.changeCanvasLayout('FB');
}


const bl_btn = document.getElementById('bl-btn');
bl_btn.onclick=function(){
  ibom.changeCanvasLayout('B');
}

const bom_btn = document.getElementById('bom-btn');
bom_btn.onclick=function(){
  ibom.changeBomLayout('BOM')
}

const lr_btn = document.getElementById('lr-btn');
lr_btn.onclick=function(){
  ibom.changeBomLayout('LR')
}

const tb_btn = document.getElementById('tb-btn');
tb_btn.onclick=function(){
  ibom.changeBomLayout('TB')
}

},{"./global.js":1,"./ibom.js":3,"./render.js":5}],3:[function(require,module,exports){
/* DOM manipulation and misc code */


var Split = require('../vender/split.js')
var globalData = require('./global.js')
var render = require('./render.js')

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

//XXX THis function has filter. Filter is not global. Where does it come from then
function entryMatches(entry) {
  // check refs
  for (var ref of entry[2]) {
    if (ref.toLowerCase().indexOf(filter) >= 0) {
      return true;
    }
  }
  // check value
  if (entry[1].toLowerCase().indexOf(filter) >= 0) {
    return true;
  }
  // check footprint
  if (entry[2].toLowerCase().indexOf(filter) >= 0) {
    return true;
  }
  return false;
}

function findRefInEntry(entry) {
  for (var ref of entry[3]) {
    if (ref.toLowerCase() == reflookup) {
      return [ref];
    }
  }
  return false;
}

function highlightFilter(s) {
  if (!filter) {
    return s;
  }
  var parts = s.toLowerCase().split(filter);
  if (parts.length == 1) {
    return s;
  }
  var r = "";
  var pos = 0;
  for (var i in parts) {
    if (i > 0) {
      r += '<mark class="highlight">' +
        s.substring(pos, pos + filter.length) +
        '</mark>';
      pos += filter.length;
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

  if(globalData.getCombineValues())
  {
    tr.appendChild(createColumnHeader("Quantity", "Quantity", (a, b) => {
      return a[3].length - b[3].length;
    }));
  }

  bomhead.appendChild(tr);

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
  switch (globalData.getCanvasLayout()) {
    case 'F':
      bomtableTemp = pcbdata.bom.F;
      break;
    case 'FB':
      bomtableTemp = pcbdata.bom.both;
      break;
    case 'B':
      bomtableTemp = pcbdata.bom.B;
      break;
  }
  // If the parts are displayed one per line (not combined values), then the the bom table needs to be flattened. 
  // By default the data in the json file is combined
  if(globalData.getCombineValues())
  {
    bomtable = bomtableTemp;
  }
  else
  {
    bomtable = [];
    for(var entry of bomtableTemp){
      for(var part of entry[3]){
        //XXX: This format is hard coded to the format of the bom entry in the json file
        bomtable.push([1,entry[1],entry[2],[part]]);
      }
    }
  }

  if (globalData.getBomSortFunction()) {
    bomtable = bomtable.slice().sort(globalData.getBomSortFunction());
  }
  for (var i in bomtable) {
    var bomentry = bomtable[i];
    if (filter && !entryMatches(bomentry)) {
      continue;
    }
    var references = bomentry[3];
    if (reflookup) {
      references = findRefInEntry(bomentry);
      if (!references) {
        continue;
      }
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
    if ((filter || reflookup) && first) {
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

function updateFilter(input) {
  filter = input.toLowerCase();
  populateBomTable();
}

function updateRefLookup(input) {
  reflookup = input.toLowerCase();
  populateBomTable();
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

function focusRefLookupField() {
  focusInputField(document.getElementById("reflookup"));
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
      case "r":
        focusRefLookupField();
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
  //XXX These are actually global variables. Put them in there own functions 
  // There is actually a hidden dependency due to these two variables.
  filter = "";
  reflookup = "";
  populateMetadata();
  globalData.setBomCheckboxes(globalData.readStorage("bomCheckboxes"));
  if (globalData.getBomCheckboxes() === null) {
    globalData.setBomCheckboxes("Placed");
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
  setDarkMode, silkscreenVisible, updateFilter, updateRefLookup, changeBomLayout, changeCanvasLayout, setBomCheckboxes,  populateBomTable
}
},{"../vender/split.js":6,"./global.js":1,"./render.js":5}],4:[function(require,module,exports){
var pcbFont = {
    "font_data": {
        " ": {
            "l": [],
            "w": 0.7619047619047619
        },
        "#": {
            "l": [
                [
                    [
                        0.19047619047619047,
                        -0.7142857142857142
                    ],
                    [
                        0.9047619047619047,
                        -0.7142857142857142
                    ]
                ],
                [
                    [
                        0.47619047619047616,
                        -1.1428571428571428
                    ],
                    [
                        0.19047619047619047,
                        0.14285714285714285
                    ]
                ],
                [
                    [
                        0.8095238095238095,
                        -0.2857142857142857
                    ],
                    [
                        0.09523809523809523,
                        -0.2857142857142857
                    ]
                ],
                [
                    [
                        0.5238095238095237,
                        0.14285714285714285
                    ],
                    [
                        0.8095238095238095,
                        -1.1428571428571428
                    ]
                ]
            ],
            "w": 1.0
        },
        "-": {
            "l": [
                [
                    [
                        0.23809523809523814,
                        -0.42857142857142855
                    ],
                    [
                        1.0,
                        -0.42857142857142855
                    ]
                ]
            ],
            "w": 1.2380952380952381
        },
        ".": {
            "l": [
                [
                    [
                        0.23809523809523808,
                        -0.14285714285714285
                    ],
                    [
                        0.2857142857142857,
                        -0.09523809523809523
                    ],
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ],
                    [
                        0.19047619047619047,
                        -0.09523809523809523
                    ],
                    [
                        0.23809523809523808,
                        -0.14285714285714285
                    ],
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ]
                ]
            ],
            "w": 0.47619047619047616
        },
        "0": {
            "l": [
                [
                    [
                        0.42857142857142855,
                        -1.0476190476190474
                    ],
                    [
                        0.5238095238095237,
                        -1.0476190476190474
                    ],
                    [
                        0.6190476190476191,
                        -1.0
                    ],
                    [
                        0.6666666666666666,
                        -0.9523809523809523
                    ],
                    [
                        0.7142857142857142,
                        -0.8571428571428571
                    ],
                    [
                        0.7619047619047619,
                        -0.6666666666666666
                    ],
                    [
                        0.7619047619047619,
                        -0.42857142857142855
                    ],
                    [
                        0.7142857142857142,
                        -0.23809523809523808
                    ],
                    [
                        0.6666666666666666,
                        -0.14285714285714285
                    ],
                    [
                        0.6190476190476191,
                        -0.09523809523809523
                    ],
                    [
                        0.5238095238095237,
                        -0.047619047619047616
                    ],
                    [
                        0.42857142857142855,
                        -0.047619047619047616
                    ],
                    [
                        0.3333333333333333,
                        -0.09523809523809523
                    ],
                    [
                        0.2857142857142857,
                        -0.14285714285714285
                    ],
                    [
                        0.23809523809523808,
                        -0.23809523809523808
                    ],
                    [
                        0.19047619047619047,
                        -0.42857142857142855
                    ],
                    [
                        0.19047619047619047,
                        -0.6666666666666666
                    ],
                    [
                        0.23809523809523808,
                        -0.8571428571428571
                    ],
                    [
                        0.2857142857142857,
                        -0.9523809523809523
                    ],
                    [
                        0.3333333333333333,
                        -1.0
                    ],
                    [
                        0.42857142857142855,
                        -1.0476190476190474
                    ]
                ]
            ],
            "w": 0.9523809523809523
        },
        "1": {
            "l": [
                [
                    [
                        0.7619047619047619,
                        -0.047619047619047616
                    ],
                    [
                        0.19047619047619047,
                        -0.047619047619047616
                    ]
                ],
                [
                    [
                        0.47619047619047616,
                        -0.047619047619047616
                    ],
                    [
                        0.47619047619047616,
                        -1.0476190476190474
                    ],
                    [
                        0.38095238095238093,
                        -0.9047619047619047
                    ],
                    [
                        0.2857142857142857,
                        -0.8095238095238095
                    ],
                    [
                        0.19047619047619047,
                        -0.7619047619047619
                    ]
                ]
            ],
            "w": 0.9523809523809523
        },
        "2": {
            "l": [
                [
                    [
                        0.19047619047619047,
                        -0.9523809523809523
                    ],
                    [
                        0.23809523809523808,
                        -1.0
                    ],
                    [
                        0.3333333333333333,
                        -1.0476190476190474
                    ],
                    [
                        0.5714285714285714,
                        -1.0476190476190474
                    ],
                    [
                        0.6666666666666666,
                        -1.0
                    ],
                    [
                        0.7142857142857142,
                        -0.9523809523809523
                    ],
                    [
                        0.7619047619047619,
                        -0.8571428571428571
                    ],
                    [
                        0.7619047619047619,
                        -0.7619047619047619
                    ],
                    [
                        0.7142857142857142,
                        -0.6190476190476191
                    ],
                    [
                        0.14285714285714285,
                        -0.047619047619047616
                    ],
                    [
                        0.7619047619047619,
                        -0.047619047619047616
                    ]
                ]
            ],
            "w": 0.9523809523809523
        },
        "3": {
            "l": [
                [
                    [
                        0.14285714285714285,
                        -1.0476190476190474
                    ],
                    [
                        0.7619047619047619,
                        -1.0476190476190474
                    ],
                    [
                        0.42857142857142855,
                        -0.6666666666666666
                    ],
                    [
                        0.5714285714285714,
                        -0.6666666666666666
                    ],
                    [
                        0.6666666666666666,
                        -0.6190476190476191
                    ],
                    [
                        0.7142857142857142,
                        -0.5714285714285714
                    ],
                    [
                        0.7619047619047619,
                        -0.47619047619047616
                    ],
                    [
                        0.7619047619047619,
                        -0.23809523809523808
                    ],
                    [
                        0.7142857142857142,
                        -0.14285714285714285
                    ],
                    [
                        0.6666666666666666,
                        -0.09523809523809523
                    ],
                    [
                        0.5714285714285714,
                        -0.047619047619047616
                    ],
                    [
                        0.2857142857142857,
                        -0.047619047619047616
                    ],
                    [
                        0.19047619047619047,
                        -0.09523809523809523
                    ],
                    [
                        0.14285714285714285,
                        -0.14285714285714285
                    ]
                ]
            ],
            "w": 0.9523809523809523
        },
        "4": {
            "l": [
                [
                    [
                        0.6666666666666666,
                        -0.7142857142857142
                    ],
                    [
                        0.6666666666666666,
                        -0.047619047619047616
                    ]
                ],
                [
                    [
                        0.42857142857142855,
                        -1.0952380952380951
                    ],
                    [
                        0.19047619047619047,
                        -0.38095238095238093
                    ],
                    [
                        0.8095238095238095,
                        -0.38095238095238093
                    ]
                ]
            ],
            "w": 0.9523809523809523
        },
        "5": {
            "l": [
                [
                    [
                        0.7142857142857142,
                        -1.0476190476190474
                    ],
                    [
                        0.23809523809523808,
                        -1.0476190476190474
                    ],
                    [
                        0.19047619047619047,
                        -0.5714285714285714
                    ],
                    [
                        0.23809523809523808,
                        -0.6190476190476191
                    ],
                    [
                        0.3333333333333333,
                        -0.6666666666666666
                    ],
                    [
                        0.5714285714285714,
                        -0.6666666666666666
                    ],
                    [
                        0.6666666666666666,
                        -0.6190476190476191
                    ],
                    [
                        0.7142857142857142,
                        -0.5714285714285714
                    ],
                    [
                        0.7619047619047619,
                        -0.47619047619047616
                    ],
                    [
                        0.7619047619047619,
                        -0.23809523809523808
                    ],
                    [
                        0.7142857142857142,
                        -0.14285714285714285
                    ],
                    [
                        0.6666666666666666,
                        -0.09523809523809523
                    ],
                    [
                        0.5714285714285714,
                        -0.047619047619047616
                    ],
                    [
                        0.3333333333333333,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -0.09523809523809523
                    ],
                    [
                        0.19047619047619047,
                        -0.14285714285714285
                    ]
                ]
            ],
            "w": 0.9523809523809523
        },
        ":": {
            "l": [
                [
                    [
                        0.23809523809523808,
                        -0.14285714285714285
                    ],
                    [
                        0.2857142857142857,
                        -0.09523809523809523
                    ],
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ],
                    [
                        0.19047619047619047,
                        -0.09523809523809523
                    ],
                    [
                        0.23809523809523808,
                        -0.14285714285714285
                    ],
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ]
                ],
                [
                    [
                        0.23809523809523808,
                        -0.6666666666666666
                    ],
                    [
                        0.2857142857142857,
                        -0.6190476190476191
                    ],
                    [
                        0.23809523809523808,
                        -0.5714285714285714
                    ],
                    [
                        0.19047619047619047,
                        -0.6190476190476191
                    ],
                    [
                        0.23809523809523808,
                        -0.6666666666666666
                    ],
                    [
                        0.23809523809523808,
                        -0.5714285714285714
                    ]
                ]
            ],
            "w": 0.47619047619047616
        },
        "A": {
            "l": [
                [
                    [
                        0.19047619047619047,
                        -0.3333333333333333
                    ],
                    [
                        0.6666666666666666,
                        -0.3333333333333333
                    ]
                ],
                [
                    [
                        0.09523809523809523,
                        -0.047619047619047616
                    ],
                    [
                        0.42857142857142855,
                        -1.0476190476190474
                    ],
                    [
                        0.7619047619047619,
                        -0.047619047619047616
                    ]
                ]
            ],
            "w": 0.8571428571428571
        },
        "B": {
            "l": [
                [
                    [
                        0.5714285714285714,
                        -0.5714285714285714
                    ],
                    [
                        0.7142857142857142,
                        -0.5238095238095237
                    ],
                    [
                        0.7619047619047619,
                        -0.47619047619047616
                    ],
                    [
                        0.8095238095238094,
                        -0.38095238095238093
                    ],
                    [
                        0.8095238095238094,
                        -0.23809523809523808
                    ],
                    [
                        0.7619047619047619,
                        -0.14285714285714285
                    ],
                    [
                        0.7142857142857142,
                        -0.09523809523809523
                    ],
                    [
                        0.619047619047619,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523803,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523803,
                        -1.0476190476190474
                    ],
                    [
                        0.5714285714285714,
                        -1.0476190476190474
                    ],
                    [
                        0.6666666666666665,
                        -1.0
                    ],
                    [
                        0.7142857142857142,
                        -0.9523809523809523
                    ],
                    [
                        0.7619047619047619,
                        -0.8571428571428571
                    ],
                    [
                        0.7619047619047619,
                        -0.7619047619047619
                    ],
                    [
                        0.7142857142857142,
                        -0.6666666666666666
                    ],
                    [
                        0.6666666666666665,
                        -0.6190476190476191
                    ],
                    [
                        0.5714285714285714,
                        -0.5714285714285714
                    ],
                    [
                        0.23809523809523803,
                        -0.5714285714285714
                    ]
                ]
            ],
            "w": 1.0
        },
        "C": {
            "l": [
                [
                    [
                        0.8095238095238095,
                        -0.14285714285714285
                    ],
                    [
                        0.7619047619047619,
                        -0.09523809523809523
                    ],
                    [
                        0.6190476190476191,
                        -0.047619047619047616
                    ],
                    [
                        0.5238095238095237,
                        -0.047619047619047616
                    ],
                    [
                        0.38095238095238093,
                        -0.09523809523809523
                    ],
                    [
                        0.2857142857142857,
                        -0.19047619047619047
                    ],
                    [
                        0.23809523809523808,
                        -0.2857142857142857
                    ],
                    [
                        0.19047619047619047,
                        -0.47619047619047616
                    ],
                    [
                        0.19047619047619047,
                        -0.6190476190476191
                    ],
                    [
                        0.23809523809523808,
                        -0.8095238095238095
                    ],
                    [
                        0.2857142857142857,
                        -0.9047619047619047
                    ],
                    [
                        0.38095238095238093,
                        -1.0
                    ],
                    [
                        0.5238095238095237,
                        -1.0476190476190474
                    ],
                    [
                        0.6190476190476191,
                        -1.0476190476190474
                    ],
                    [
                        0.7619047619047619,
                        -1.0
                    ],
                    [
                        0.8095238095238095,
                        -0.9523809523809523
                    ]
                ]
            ],
            "w": 1.0
        },
        "D": {
            "l": [
                [
                    [
                        0.23809523809523803,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523803,
                        -1.0476190476190474
                    ],
                    [
                        0.4761904761904761,
                        -1.0476190476190474
                    ],
                    [
                        0.619047619047619,
                        -1.0
                    ],
                    [
                        0.7142857142857142,
                        -0.9047619047619047
                    ],
                    [
                        0.7619047619047619,
                        -0.8095238095238095
                    ],
                    [
                        0.8095238095238094,
                        -0.6190476190476191
                    ],
                    [
                        0.8095238095238094,
                        -0.47619047619047616
                    ],
                    [
                        0.7619047619047619,
                        -0.2857142857142857
                    ],
                    [
                        0.7142857142857142,
                        -0.19047619047619047
                    ],
                    [
                        0.619047619047619,
                        -0.09523809523809523
                    ],
                    [
                        0.4761904761904761,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523803,
                        -0.047619047619047616
                    ]
                ]
            ],
            "w": 1.0
        },
        "E": {
            "l": [
                [
                    [
                        0.23809523809523808,
                        -0.5714285714285714
                    ],
                    [
                        0.5714285714285714,
                        -0.5714285714285714
                    ]
                ],
                [
                    [
                        0.7142857142857142,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -1.0476190476190474
                    ],
                    [
                        0.7142857142857142,
                        -1.0476190476190474
                    ]
                ]
            ],
            "w": 0.9047619047619047
        },
        "F": {
            "l": [
                [
                    [
                        0.5714285714285714,
                        -0.5714285714285714
                    ],
                    [
                        0.23809523809523808,
                        -0.5714285714285714
                    ]
                ],
                [
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -1.0476190476190474
                    ],
                    [
                        0.7142857142857142,
                        -1.0476190476190474
                    ]
                ]
            ],
            "w": 0.8571428571428571
        },
        "G": {
            "l": [
                [
                    [
                        0.7619047619047619,
                        -1.0
                    ],
                    [
                        0.6666666666666666,
                        -1.0476190476190474
                    ],
                    [
                        0.5238095238095237,
                        -1.0476190476190474
                    ],
                    [
                        0.38095238095238093,
                        -1.0
                    ],
                    [
                        0.2857142857142857,
                        -0.9047619047619047
                    ],
                    [
                        0.23809523809523808,
                        -0.8095238095238095
                    ],
                    [
                        0.19047619047619047,
                        -0.6190476190476191
                    ],
                    [
                        0.19047619047619047,
                        -0.47619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -0.2857142857142857
                    ],
                    [
                        0.2857142857142857,
                        -0.19047619047619047
                    ],
                    [
                        0.38095238095238093,
                        -0.09523809523809523
                    ],
                    [
                        0.5238095238095237,
                        -0.047619047619047616
                    ],
                    [
                        0.6190476190476191,
                        -0.047619047619047616
                    ],
                    [
                        0.7619047619047619,
                        -0.09523809523809523
                    ],
                    [
                        0.8095238095238095,
                        -0.14285714285714285
                    ],
                    [
                        0.8095238095238095,
                        -0.47619047619047616
                    ],
                    [
                        0.6190476190476191,
                        -0.47619047619047616
                    ]
                ]
            ],
            "w": 1.0
        },
        "I": {
            "l": [
                [
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -1.0476190476190474
                    ]
                ]
            ],
            "w": 0.47619047619047616
        },
        "J": {
            "l": [
                [
                    [
                        0.5238095238095237,
                        -1.0476190476190474
                    ],
                    [
                        0.5238095238095237,
                        -0.3333333333333333
                    ],
                    [
                        0.47619047619047616,
                        -0.19047619047619047
                    ],
                    [
                        0.38095238095238093,
                        -0.09523809523809523
                    ],
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ],
                    [
                        0.14285714285714285,
                        -0.047619047619047616
                    ]
                ]
            ],
            "w": 0.7619047619047619
        },
        "L": {
            "l": [
                [
                    [
                        0.7142857142857142,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -1.0476190476190474
                    ]
                ]
            ],
            "w": 0.8095238095238095
        },
        "M": {
            "l": [
                [
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -1.0476190476190474
                    ],
                    [
                        0.5714285714285714,
                        -0.3333333333333333
                    ],
                    [
                        0.9047619047619047,
                        -1.0476190476190474
                    ],
                    [
                        0.9047619047619047,
                        -0.047619047619047616
                    ]
                ]
            ],
            "w": 1.1428571428571428
        },
        "N": {
            "l": [
                [
                    [
                        0.23809523809523803,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523803,
                        -1.0476190476190474
                    ],
                    [
                        0.8095238095238094,
                        -0.047619047619047616
                    ],
                    [
                        0.8095238095238094,
                        -1.0476190476190474
                    ]
                ]
            ],
            "w": 1.0476190476190474
        },
        "P": {
            "l": [
                [
                    [
                        0.23809523809523803,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523803,
                        -1.0476190476190474
                    ],
                    [
                        0.619047619047619,
                        -1.0476190476190474
                    ],
                    [
                        0.7142857142857142,
                        -1.0
                    ],
                    [
                        0.7619047619047619,
                        -0.9523809523809523
                    ],
                    [
                        0.8095238095238094,
                        -0.8571428571428571
                    ],
                    [
                        0.8095238095238094,
                        -0.7142857142857142
                    ],
                    [
                        0.7619047619047619,
                        -0.6190476190476191
                    ],
                    [
                        0.7142857142857142,
                        -0.5714285714285714
                    ],
                    [
                        0.619047619047619,
                        -0.5238095238095237
                    ],
                    [
                        0.23809523809523803,
                        -0.5238095238095237
                    ]
                ]
            ],
            "w": 1.0
        },
        "R": {
            "l": [
                [
                    [
                        0.8095238095238094,
                        -0.047619047619047616
                    ],
                    [
                        0.4761904761904761,
                        -0.5238095238095237
                    ]
                ],
                [
                    [
                        0.23809523809523803,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523803,
                        -1.0476190476190474
                    ],
                    [
                        0.619047619047619,
                        -1.0476190476190474
                    ],
                    [
                        0.7142857142857142,
                        -1.0
                    ],
                    [
                        0.7619047619047619,
                        -0.9523809523809523
                    ],
                    [
                        0.8095238095238094,
                        -0.8571428571428571
                    ],
                    [
                        0.8095238095238094,
                        -0.7142857142857142
                    ],
                    [
                        0.7619047619047619,
                        -0.6190476190476191
                    ],
                    [
                        0.7142857142857142,
                        -0.5714285714285714
                    ],
                    [
                        0.619047619047619,
                        -0.5238095238095237
                    ],
                    [
                        0.23809523809523803,
                        -0.5238095238095237
                    ]
                ]
            ],
            "w": 1.0
        },
        "S": {
            "l": [
                [
                    [
                        0.19047619047619047,
                        -0.09523809523809523
                    ],
                    [
                        0.3333333333333333,
                        -0.047619047619047616
                    ],
                    [
                        0.5714285714285714,
                        -0.047619047619047616
                    ],
                    [
                        0.6666666666666666,
                        -0.09523809523809523
                    ],
                    [
                        0.7142857142857142,
                        -0.14285714285714285
                    ],
                    [
                        0.7619047619047619,
                        -0.23809523809523808
                    ],
                    [
                        0.7619047619047619,
                        -0.3333333333333333
                    ],
                    [
                        0.7142857142857142,
                        -0.42857142857142855
                    ],
                    [
                        0.6666666666666666,
                        -0.47619047619047616
                    ],
                    [
                        0.5714285714285714,
                        -0.5238095238095237
                    ],
                    [
                        0.38095238095238093,
                        -0.5714285714285714
                    ],
                    [
                        0.2857142857142857,
                        -0.6190476190476191
                    ],
                    [
                        0.23809523809523808,
                        -0.6666666666666666
                    ],
                    [
                        0.19047619047619047,
                        -0.7619047619047619
                    ],
                    [
                        0.19047619047619047,
                        -0.8571428571428571
                    ],
                    [
                        0.23809523809523808,
                        -0.9523809523809523
                    ],
                    [
                        0.2857142857142857,
                        -1.0
                    ],
                    [
                        0.38095238095238093,
                        -1.0476190476190474
                    ],
                    [
                        0.6190476190476191,
                        -1.0476190476190474
                    ],
                    [
                        0.7619047619047619,
                        -1.0
                    ]
                ]
            ],
            "w": 0.9523809523809523
        },
        "U": {
            "l": [
                [
                    [
                        0.23809523809523803,
                        -1.0476190476190474
                    ],
                    [
                        0.23809523809523803,
                        -0.23809523809523808
                    ],
                    [
                        0.28571428571428564,
                        -0.14285714285714285
                    ],
                    [
                        0.33333333333333326,
                        -0.09523809523809523
                    ],
                    [
                        0.4285714285714285,
                        -0.047619047619047616
                    ],
                    [
                        0.619047619047619,
                        -0.047619047619047616
                    ],
                    [
                        0.7142857142857142,
                        -0.09523809523809523
                    ],
                    [
                        0.7619047619047619,
                        -0.14285714285714285
                    ],
                    [
                        0.8095238095238094,
                        -0.23809523809523808
                    ],
                    [
                        0.8095238095238094,
                        -1.0476190476190474
                    ]
                ]
            ],
            "w": 1.0476190476190474
        },
        "V": {
            "l": [
                [
                    [
                        0.09523809523809523,
                        -1.0476190476190474
                    ],
                    [
                        0.42857142857142855,
                        -0.047619047619047616
                    ],
                    [
                        0.7619047619047619,
                        -1.0476190476190474
                    ]
                ]
            ],
            "w": 0.8571428571428571
        },
        "W": {
            "l": [
                [
                    [
                        0.14285714285714285,
                        -1.0476190476190474
                    ],
                    [
                        0.38095238095238093,
                        -0.047619047619047616
                    ],
                    [
                        0.5714285714285714,
                        -0.7619047619047619
                    ],
                    [
                        0.7619047619047619,
                        -0.047619047619047616
                    ],
                    [
                        1.0,
                        -1.0476190476190474
                    ]
                ]
            ],
            "w": 1.1428571428571428
        },
        "X": {
            "l": [
                [
                    [
                        0.14285714285714285,
                        -1.0476190476190474
                    ],
                    [
                        0.8095238095238095,
                        -0.047619047619047616
                    ]
                ],
                [
                    [
                        0.8095238095238095,
                        -1.0476190476190474
                    ],
                    [
                        0.14285714285714285,
                        -0.047619047619047616
                    ]
                ]
            ],
            "w": 0.9523809523809523
        },
        "a": {
            "l": [
                [
                    [
                        0.6666666666666666,
                        -0.047619047619047616
                    ],
                    [
                        0.6666666666666666,
                        -0.5714285714285714
                    ],
                    [
                        0.6190476190476191,
                        -0.6666666666666666
                    ],
                    [
                        0.5238095238095237,
                        -0.7142857142857142
                    ],
                    [
                        0.3333333333333333,
                        -0.7142857142857142
                    ],
                    [
                        0.23809523809523808,
                        -0.6666666666666666
                    ]
                ],
                [
                    [
                        0.6666666666666666,
                        -0.09523809523809523
                    ],
                    [
                        0.5714285714285714,
                        -0.047619047619047616
                    ],
                    [
                        0.3333333333333333,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -0.09523809523809523
                    ],
                    [
                        0.19047619047619047,
                        -0.19047619047619047
                    ],
                    [
                        0.19047619047619047,
                        -0.2857142857142857
                    ],
                    [
                        0.23809523809523808,
                        -0.38095238095238093
                    ],
                    [
                        0.3333333333333333,
                        -0.42857142857142855
                    ],
                    [
                        0.5714285714285714,
                        -0.42857142857142855
                    ],
                    [
                        0.6666666666666666,
                        -0.47619047619047616
                    ]
                ]
            ],
            "w": 0.9047619047619047
        },
        "d": {
            "l": [
                [
                    [
                        0.6666666666666666,
                        -0.047619047619047616
                    ],
                    [
                        0.6666666666666666,
                        -1.0476190476190474
                    ]
                ],
                [
                    [
                        0.6666666666666666,
                        -0.09523809523809523
                    ],
                    [
                        0.5714285714285714,
                        -0.047619047619047616
                    ],
                    [
                        0.38095238095238093,
                        -0.047619047619047616
                    ],
                    [
                        0.2857142857142857,
                        -0.09523809523809523
                    ],
                    [
                        0.23809523809523808,
                        -0.14285714285714285
                    ],
                    [
                        0.19047619047619047,
                        -0.23809523809523808
                    ],
                    [
                        0.19047619047619047,
                        -0.5238095238095237
                    ],
                    [
                        0.23809523809523808,
                        -0.6190476190476191
                    ],
                    [
                        0.2857142857142857,
                        -0.6666666666666666
                    ],
                    [
                        0.38095238095238093,
                        -0.7142857142857142
                    ],
                    [
                        0.5714285714285714,
                        -0.7142857142857142
                    ],
                    [
                        0.6666666666666666,
                        -0.6666666666666666
                    ]
                ]
            ],
            "w": 0.9047619047619047
        },
        "e": {
            "l": [
                [
                    [
                        0.6190476190476191,
                        -0.09523809523809523
                    ],
                    [
                        0.5238095238095237,
                        -0.047619047619047616
                    ],
                    [
                        0.3333333333333333,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -0.09523809523809523
                    ],
                    [
                        0.19047619047619047,
                        -0.19047619047619047
                    ],
                    [
                        0.19047619047619047,
                        -0.5714285714285714
                    ],
                    [
                        0.23809523809523808,
                        -0.6666666666666666
                    ],
                    [
                        0.3333333333333333,
                        -0.7142857142857142
                    ],
                    [
                        0.5238095238095237,
                        -0.7142857142857142
                    ],
                    [
                        0.6190476190476191,
                        -0.6666666666666666
                    ],
                    [
                        0.6666666666666666,
                        -0.5714285714285714
                    ],
                    [
                        0.6666666666666666,
                        -0.47619047619047616
                    ],
                    [
                        0.19047619047619047,
                        -0.38095238095238093
                    ]
                ]
            ],
            "w": 0.8571428571428571
        },
        "g": {
            "l": [
                [
                    [
                        0.6666666666666666,
                        -0.7142857142857142
                    ],
                    [
                        0.6666666666666666,
                        0.09523809523809523
                    ],
                    [
                        0.6190476190476191,
                        0.19047619047619047
                    ],
                    [
                        0.5714285714285714,
                        0.23809523809523808
                    ],
                    [
                        0.47619047619047616,
                        0.2857142857142857
                    ],
                    [
                        0.3333333333333333,
                        0.2857142857142857
                    ],
                    [
                        0.23809523809523808,
                        0.23809523809523808
                    ]
                ],
                [
                    [
                        0.6666666666666666,
                        -0.09523809523809523
                    ],
                    [
                        0.5714285714285714,
                        -0.047619047619047616
                    ],
                    [
                        0.38095238095238093,
                        -0.047619047619047616
                    ],
                    [
                        0.2857142857142857,
                        -0.09523809523809523
                    ],
                    [
                        0.23809523809523808,
                        -0.14285714285714285
                    ],
                    [
                        0.19047619047619047,
                        -0.23809523809523808
                    ],
                    [
                        0.19047619047619047,
                        -0.5238095238095237
                    ],
                    [
                        0.23809523809523808,
                        -0.6190476190476191
                    ],
                    [
                        0.2857142857142857,
                        -0.6666666666666666
                    ],
                    [
                        0.38095238095238093,
                        -0.7142857142857142
                    ],
                    [
                        0.5714285714285714,
                        -0.7142857142857142
                    ],
                    [
                        0.6666666666666666,
                        -0.6666666666666666
                    ]
                ]
            ],
            "w": 0.9047619047619047
        },
        "i": {
            "l": [
                [
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -0.7142857142857142
                    ]
                ],
                [
                    [
                        0.23809523809523808,
                        -1.0476190476190474
                    ],
                    [
                        0.19047619047619047,
                        -1.0
                    ],
                    [
                        0.23809523809523808,
                        -0.9523809523809523
                    ],
                    [
                        0.2857142857142857,
                        -1.0
                    ],
                    [
                        0.23809523809523808,
                        -1.0476190476190474
                    ],
                    [
                        0.23809523809523808,
                        -0.9523809523809523
                    ]
                ]
            ],
            "w": 0.47619047619047616
        },
        "k": {
            "l": [
                [
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -1.0476190476190474
                    ]
                ],
                [
                    [
                        0.3333333333333333,
                        -0.42857142857142855
                    ],
                    [
                        0.6190476190476191,
                        -0.047619047619047616
                    ]
                ],
                [
                    [
                        0.6190476190476191,
                        -0.7142857142857142
                    ],
                    [
                        0.23809523809523808,
                        -0.3333333333333333
                    ]
                ]
            ],
            "w": 0.8095238095238095
        },
        "l": {
            "l": [
                [
                    [
                        0.38095238095238093,
                        -0.047619047619047616
                    ],
                    [
                        0.2857142857142857,
                        -0.09523809523809523
                    ],
                    [
                        0.23809523809523808,
                        -0.19047619047619047
                    ],
                    [
                        0.23809523809523808,
                        -1.0476190476190474
                    ]
                ]
            ],
            "w": 0.5238095238095237
        },
        "n": {
            "l": [
                [
                    [
                        0.23809523809523808,
                        -0.7142857142857142
                    ],
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ]
                ],
                [
                    [
                        0.23809523809523808,
                        -0.6190476190476191
                    ],
                    [
                        0.2857142857142857,
                        -0.6666666666666666
                    ],
                    [
                        0.38095238095238093,
                        -0.7142857142857142
                    ],
                    [
                        0.5238095238095237,
                        -0.7142857142857142
                    ],
                    [
                        0.6190476190476191,
                        -0.6666666666666666
                    ],
                    [
                        0.6666666666666666,
                        -0.5714285714285714
                    ],
                    [
                        0.6666666666666666,
                        -0.047619047619047616
                    ]
                ]
            ],
            "w": 0.9047619047619047
        },
        "o": {
            "l": [
                [
                    [
                        0.38095238095238093,
                        -0.047619047619047616
                    ],
                    [
                        0.2857142857142857,
                        -0.09523809523809523
                    ],
                    [
                        0.23809523809523808,
                        -0.14285714285714285
                    ],
                    [
                        0.19047619047619047,
                        -0.23809523809523808
                    ],
                    [
                        0.19047619047619047,
                        -0.5238095238095237
                    ],
                    [
                        0.23809523809523808,
                        -0.6190476190476191
                    ],
                    [
                        0.2857142857142857,
                        -0.6666666666666666
                    ],
                    [
                        0.38095238095238093,
                        -0.7142857142857142
                    ],
                    [
                        0.5238095238095237,
                        -0.7142857142857142
                    ],
                    [
                        0.6190476190476191,
                        -0.6666666666666666
                    ],
                    [
                        0.6666666666666666,
                        -0.6190476190476191
                    ],
                    [
                        0.7142857142857142,
                        -0.5238095238095237
                    ],
                    [
                        0.7142857142857142,
                        -0.23809523809523808
                    ],
                    [
                        0.6666666666666666,
                        -0.14285714285714285
                    ],
                    [
                        0.6190476190476191,
                        -0.09523809523809523
                    ],
                    [
                        0.5238095238095237,
                        -0.047619047619047616
                    ],
                    [
                        0.38095238095238093,
                        -0.047619047619047616
                    ]
                ]
            ],
            "w": 0.9047619047619047
        },
        "r": {
            "l": [
                [
                    [
                        0.23809523809523808,
                        -0.047619047619047616
                    ],
                    [
                        0.23809523809523808,
                        -0.7142857142857142
                    ]
                ],
                [
                    [
                        0.23809523809523808,
                        -0.5238095238095237
                    ],
                    [
                        0.2857142857142857,
                        -0.6190476190476191
                    ],
                    [
                        0.3333333333333333,
                        -0.6666666666666666
                    ],
                    [
                        0.42857142857142855,
                        -0.7142857142857142
                    ],
                    [
                        0.5238095238095237,
                        -0.7142857142857142
                    ]
                ]
            ],
            "w": 0.6190476190476191
        },
        "s": {
            "l": [
                [
                    [
                        0.19047619047619047,
                        -0.09523809523809523
                    ],
                    [
                        0.2857142857142857,
                        -0.047619047619047616
                    ],
                    [
                        0.47619047619047616,
                        -0.047619047619047616
                    ],
                    [
                        0.5714285714285714,
                        -0.09523809523809523
                    ],
                    [
                        0.6190476190476191,
                        -0.19047619047619047
                    ],
                    [
                        0.6190476190476191,
                        -0.23809523809523808
                    ],
                    [
                        0.5714285714285714,
                        -0.3333333333333333
                    ],
                    [
                        0.47619047619047616,
                        -0.38095238095238093
                    ],
                    [
                        0.3333333333333333,
                        -0.38095238095238093
                    ],
                    [
                        0.23809523809523808,
                        -0.42857142857142855
                    ],
                    [
                        0.19047619047619047,
                        -0.5238095238095237
                    ],
                    [
                        0.19047619047619047,
                        -0.5714285714285714
                    ],
                    [
                        0.23809523809523808,
                        -0.6666666666666666
                    ],
                    [
                        0.3333333333333333,
                        -0.7142857142857142
                    ],
                    [
                        0.47619047619047616,
                        -0.7142857142857142
                    ],
                    [
                        0.5714285714285714,
                        -0.6666666666666666
                    ]
                ]
            ],
            "w": 0.8095238095238095
        },
        "t": {
            "l": [
                [
                    [
                        0.09523809523809523,
                        -0.7142857142857142
                    ],
                    [
                        0.47619047619047616,
                        -0.7142857142857142
                    ]
                ],
                [
                    [
                        0.23809523809523808,
                        -1.0476190476190474
                    ],
                    [
                        0.23809523809523808,
                        -0.19047619047619047
                    ],
                    [
                        0.2857142857142857,
                        -0.09523809523809523
                    ],
                    [
                        0.38095238095238093,
                        -0.047619047619047616
                    ],
                    [
                        0.47619047619047616,
                        -0.047619047619047616
                    ]
                ]
            ],
            "w": 0.5714285714285714
        },
        "u": {
            "l": [
                [
                    [
                        0.6666666666666666,
                        -0.7142857142857142
                    ],
                    [
                        0.6666666666666666,
                        -0.047619047619047616
                    ]
                ],
                [
                    [
                        0.23809523809523808,
                        -0.7142857142857142
                    ],
                    [
                        0.23809523809523808,
                        -0.19047619047619047
                    ],
                    [
                        0.2857142857142857,
                        -0.09523809523809523
                    ],
                    [
                        0.38095238095238093,
                        -0.047619047619047616
                    ],
                    [
                        0.5238095238095237,
                        -0.047619047619047616
                    ],
                    [
                        0.6190476190476191,
                        -0.09523809523809523
                    ],
                    [
                        0.6666666666666666,
                        -0.14285714285714285
                    ]
                ]
            ],
            "w": 0.9047619047619047
        },
        "v": {
            "l": [
                [
                    [
                        0.14285714285714285,
                        -0.7142857142857142
                    ],
                    [
                        0.38095238095238093,
                        -0.047619047619047616
                    ],
                    [
                        0.6190476190476191,
                        -0.7142857142857142
                    ]
                ]
            ],
            "w": 0.7619047619047619
        }
    }
}
},{}],5:[function(require,module,exports){
/* PCB rendering code */

var globalData = require('./global.js')

function deg2rad(deg) {
  return deg * Math.PI / 180;
}

function calcFontPoint(linepoint, text, offsetx, offsety, tilt) {
  var point = [
    linepoint[0] * text.width + offsetx,
    linepoint[1] * text.height + offsety
  ];
  // Adding half a line height here is technically a bug
  // but pcbnew currently does the same, text is slightly shifted.
  point[0] -= (point[1] + text.height * 0.5) * tilt;
  return point;
}

function drawtext(ctx, text, color, flip) {
  ctx.save();
  ctx.translate(...text.pos);
  var angle = -text.angle;
  if (text.attr.includes("mirrored")) {
    ctx.scale(-1, 1);
    angle = -angle;
  }
  var tilt = 0;
  if (text.attr.includes("italic")) {
    tilt = 0.125;
  }
  var interline = (text.height * 1.5 + text.thickness) / 2;
  var txt = text.text.split("\n");
  ctx.rotate(deg2rad(angle));
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineWidth = text.thickness;
  for (var i in txt) {
    var offsety = (-(txt.length - 1) + i * 2) * interline + text.height / 2;
    var lineWidth = 0;
    for (var c of txt[i]) {
      lineWidth += pcbFont.font_data[c].w * text.width;
    }
    var offsetx = 0;
    switch (text.horiz_justify) {
      case -1:
        // Justify left, do nothing
        break;
      case 0:
        // Justify center
        offsetx -= lineWidth / 2;
        break;
      case 1:
        // Justify right
        offsetx -= lineWidth;
        break;
    }
    for (var c of txt[i]) {
      for (var line of pcbFont.font_data[c].l) {
        // Drawing each segment separately instead of
        // polyline because round line caps don't work in joints
        for (var i = 0; i < line.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(...calcFontPoint(line[i], text, offsetx, offsety, tilt));
          ctx.lineTo(...calcFontPoint(line[i + 1], text, offsetx, offsety, tilt));
          ctx.stroke();
        }
      }
      offsetx += pcbFont.font_data[c].w * text.width;
    }
  }
  ctx.restore();
}

function drawedge(ctx, scalefactor, edge, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1 / scalefactor, edge.width);
  ctx.lineCap = "round";
  if (edge.type == "segment") 
  {
    ctx.beginPath();
    ctx.moveTo(...edge.start);
    ctx.lineTo(...edge.end);
    ctx.stroke();
  }
  if (edge.type == "arc") {
    ctx.beginPath();
    ctx.arc(
      ...edge.start,
      edge.radius,
      deg2rad(edge.startangle),
      deg2rad(edge.endangle));
    ctx.stroke();
  }
  if (edge.type == "circle") {
    ctx.beginPath();
    ctx.arc(
      ...edge.start,
      edge.radius,
      0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}

function drawRoundRect(ctx, color, size, radius, ctxmethod) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  var x = size[0] * -0.5;
  var y = size[1] * -0.5;
  var width = size[0];
  var height = size[1];
  ctx.moveTo(x, 0);
  ctx.arcTo(x, y + height, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y, radius);
  ctx.arcTo(x + width, y, x, y, radius);
  ctx.arcTo(x, y, x, y + height, radius);
  ctx.closePath();
  ctxmethod();
}

function drawOblong(ctx, color, size, ctxmethod) {
  drawRoundRect(ctx, color, size, Math.min(size[0], size[1]) / 2, ctxmethod);
}

function drawPolygons(ctx, color, polygons, ctxmethod) {
  ctx.fillStyle = color;
  if(polygons.length>0)
  {
    for (var polygon of polygons) {
      ctx.beginPath();
      for (var vertex of polygon) {
        ctx.lineTo(...vertex)
      }
      ctx.closePath();
      ctxmethod();
    }
  }
}

function drawPolygonShape(ctx, shape, color) {
  ctx.save();
  ctx.translate(...shape.pos);
  ctx.rotate(deg2rad(-shape.angle));
  drawPolygons(ctx, color, shape.polygons, ctx.fill.bind(ctx));
  ctx.restore();
}

function drawDrawing(ctx, layer, scalefactor, drawing, color) {
  if (["segment", "arc", "circle"].includes(drawing.type)) {
    drawedge(ctx, scalefactor, drawing, color);
  } else if (drawing.type == "polygon") {
    drawPolygonShape(ctx, drawing, color);
  } else {
    drawtext(ctx, drawing, color, layer == "B");
  }
}

function drawCircle(ctx, radius, ctxmethod) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctxmethod();
}

function drawPad(ctx, pad, color, outline) {
  ctx.save();
  ctx.translate(...pad.pos);
  ctx.rotate(deg2rad(pad.angle));
  if (pad.offset) {
    ctx.translate(...pad.offset);
  }
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  var ctxmethod = outline ? ctx.stroke.bind(ctx) : ctx.fill.bind(ctx);
  if (pad.shape == "rect") {
    var rect = [...pad.size.map(c => -c * 0.5), ...pad.size];
    if (outline) {
      ctx.strokeRect(...rect);
    } else {
      ctx.fillRect(...rect);
    }
  } else if (pad.shape == "oval") {
    drawOblong(ctx, color, pad.size, ctxmethod);
  } else if (pad.shape == "circle") {
    drawCircle(ctx, pad.size[0] / 2, ctxmethod);
  } else if (pad.shape == "roundrect") {
    drawRoundRect(ctx, color, pad.size, pad.radius, ctxmethod);
  } else if (pad.shape == "custom") {
    drawPolygons(ctx, color, pad.polygons, ctxmethod);
  }
  if (pad.type == "th" && !outline) {
    ctx.fillStyle = "#CCCCCC";
    if (pad.drillshape == "oblong") {
      drawOblong(ctx, "#CCCCCC", pad.drillsize, ctxmethod);
    } else {
      drawCircle(ctx, pad.drillsize[0] / 2, ctxmethod);
    }
  }
  ctx.restore();
}

function drawModule(ctx, layer, scalefactor, module, padcolor, outlinecolor, highlight) {
  if (highlight) {
    // draw bounding box
    if (module.layer == layer) {
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.translate(...module.bbox.pos);
      ctx.fillStyle = padcolor;
      ctx.fillRect(0, 0,...module.bbox.size);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = padcolor;
      ctx.strokeRect(
        0, 0,
        ...module.bbox.size);
      ctx.restore();
    }
  }
  // draw drawings
  for (var drawing of module.drawings) {
    if (drawing.layer == layer) {
      drawDrawing(ctx, layer, scalefactor, drawing.drawing, padcolor);
    }
  }
  // draw pads
  for (var pad of module.pads) {
    if (pad.layers.includes(layer)) {
      drawPad(ctx, pad, padcolor, false);
      
      
      if (pad.pin1 && globalData.getHighlightPin1()) 
      {
        drawPad(ctx, pad, outlinecolor, true);
      }
    }
  }
}

function drawEdges(canvas, scalefactor) {
  var ctx = canvas.getContext("2d");
  var edgecolor = getComputedStyle(topmostdiv).getPropertyValue('--pcb-edge-color');
  for (var edge of pcbdata.edges) {
    drawedge(ctx, scalefactor, edge, edgecolor);
  }
}

function drawModules(canvas, layer, scalefactor, highlightedRefs) {
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 3 / scalefactor;
  var style = getComputedStyle(topmostdiv);
  var padcolor = style.getPropertyValue('--pad-color');
  var outlinecolor = style.getPropertyValue('--pin1-outline-color');
  if (highlightedRefs.length > 0) {
    padcolor = style.getPropertyValue('--pad-color-highlight');
    outlinecolor = style.getPropertyValue('--pin1-outline-color-highlight');
  }
  for (var i in pcbdata.modules) {
    var mod = pcbdata.modules[i];
    var highlight = highlightedRefs.includes(mod.ref);
    if (highlightedRefs.length == 0 || highlight) {
      drawModule(ctx, layer, scalefactor, mod, padcolor, outlinecolor, highlight);
    }
  }
}

function drawSilkscreen(canvas, layer, scalefactor)
{
  var ctx = canvas.getContext("2d");
  for (var d of pcbdata.silkscreen[layer])
  {
    if (["segment", "arc", "circle"].includes(d.type))
    {
      drawedge(ctx, scalefactor, d, "#aa4");
    }
    else if (d.type == "polygon")
    {
      drawPolygonShape(ctx, d, "#4aa");
    }
    else
    {
      drawtext(ctx, d, "#4aa", layer == "B");
    }
  }
}

function clearCanvas(canvas) {
  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawHighlightsOnLayer(canvasdict) {
  clearCanvas(canvasdict.highlight);
  drawModules(canvasdict.highlight, canvasdict.layer,
    canvasdict.transform.s, globalData.getHighlightedRefs());
}

function drawHighlights() {
  drawHighlightsOnLayer(allcanvas.front);
  drawHighlightsOnLayer(allcanvas.back);
}

function drawBackground(canvasdict) {
  clearCanvas(canvasdict.bg);
  clearCanvas(canvasdict.silk);
  drawEdges(canvasdict.bg, canvasdict.transform.s);
  drawModules(canvasdict.bg, canvasdict.layer, canvasdict.transform.s, []);
  drawSilkscreen(canvasdict.silk, canvasdict.layer, canvasdict.transform.s);
}

function prepareCanvas(canvas, flip, transform) {
  var ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  var fontsize = 1.55;
  ctx.scale(transform.zoom, transform.zoom);
  ctx.translate(transform.panx, transform.pany);
  if (flip) {
    ctx.scale(-1, 1);
  }
  ctx.translate(transform.x, transform.y);
  ctx.rotate(deg2rad(boardRotation));
  ctx.scale(transform.s, transform.s);
}

function prepareLayer(canvasdict) {
  var flip = (canvasdict.layer != "B");
  for (var c of ["bg", "silk", "highlight"]) {
    prepareCanvas(canvasdict[c], flip, canvasdict.transform);
  }
}

function rotateVector(v, angle) {
  angle = deg2rad(angle);
  return [
    v[0] * Math.cos(angle) - v[1] * Math.sin(angle),
    v[0] * Math.sin(angle) + v[1] * Math.cos(angle)
  ];
}

function applyRotation(bbox) {
  var corners = [
    [bbox.minx, bbox.miny],
    [bbox.minx, bbox.maxy],
    [bbox.maxx, bbox.miny],
    [bbox.maxx, bbox.maxy],
  ];
  corners = corners.map((v) => rotateVector(v, boardRotation));
  return {
    minx: corners.reduce((a, v) => Math.min(a, v[0]), Infinity),
    miny: corners.reduce((a, v) => Math.min(a, v[1]), Infinity),
    maxx: corners.reduce((a, v) => Math.max(a, v[0]), -Infinity),
    maxy: corners.reduce((a, v) => Math.max(a, v[1]), -Infinity),
  }
}

function recalcLayerScale(canvasdict) {
  var canvasdivid = {
    "F": "frontcanvas",
    "B": "backcanvas"
  } [canvasdict.layer];
  var width = document.getElementById(canvasdivid).clientWidth * 2;
  var height = document.getElementById(canvasdivid).clientHeight * 2;
  var bbox = applyRotation(pcbdata.edges_bbox);
  var scalefactor = 0.98 * Math.min(
    width / (bbox.maxx - bbox.minx),
    height / (bbox.maxy - bbox.miny)
  );
  if (scalefactor < 0.1) {
    scalefactor = 1;
  }
  canvasdict.transform.s = scalefactor;
  var flip = (canvasdict.layer != "B");
  if (flip) {
    canvasdict.transform.x = -((bbox.maxx + bbox.minx) * scalefactor + width) * 0.5;
  } else {
    canvasdict.transform.x = -((bbox.maxx + bbox.minx) * scalefactor - width) * 0.5;
  }
  canvasdict.transform.y = -((bbox.maxy + bbox.miny) * scalefactor - height) * 0.5;
  for (var c of ["bg", "silk", "highlight"]) {
    canvas = canvasdict[c];
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = (width / 2) + "px";
    canvas.style.height = (height / 2) + "px";
  }
  console.log("Scale factor " + canvasdivid + ": ", canvasdict.transform);
}

function redrawCanvas(layerdict) {
  prepareLayer(layerdict);
  drawBackground(layerdict);
  drawHighlightsOnLayer(layerdict);
}

function resizeCanvas(layerdict) {
  recalcLayerScale(layerdict);
  redrawCanvas(layerdict);
}

function resizeAll() {
  resizeCanvas(allcanvas.front);
  resizeCanvas(allcanvas.back);
}

function bboxScan(layer, x, y) {
  var result = [];
  for (var i in pcbdata.modules) {
    var module = pcbdata.modules[i];
    if (module.layer == layer) {
      var b = module.bbox;
      if (b.pos[0] <= x && b.pos[0] + b.size[0] >= x &&
        b.pos[1] <= y && b.pos[1] + b.size[1] >= y) {
        result.push(module.ref);
      }
    }
  }
  return result;
}

function handleMouseDown(e, layerdict) {
  if (e.which != 1) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  layerdict.transform.mousestartx = e.offsetX;
  layerdict.transform.mousestarty = e.offsetY;
  layerdict.transform.mousedownx = e.offsetX;
  layerdict.transform.mousedowny = e.offsetY;
  layerdict.transform.mousedown = true;
}

function handleMouseClick(e, layerdict) {
  var x = e.offsetX;
  var y = e.offsetY;
  var t = layerdict.transform;
  if (layerdict.layer == "B") {
    x = (2 * x / t.zoom - t.panx + t.x) / -t.s;
  } else {
    x = (2 * x / t.zoom - t.panx - t.x) / t.s;
  }
  y = (2 * y / t.zoom - t.y - t.pany) / t.s;
  var v = rotateVector([x, y], -boardRotation);
  var reflist = bboxScan(layerdict.layer, v[0], v[1]);
  if (reflist.length > 0) {
    modulesClicked(reflist);
    drawHighlights();
  }
}

function handleMouseUp(e, layerdict) {
  e.preventDefault();
  e.stopPropagation();
  if (e.which == 1 &&
    layerdict.transform.mousedown &&
    layerdict.transform.mousedownx == e.offsetX &&
    layerdict.transform.mousedowny == e.offsetY) {
    // This is just a click
    handleMouseClick(e, layerdict);
    layerdict.transform.mousedown = false;
    return;
  }
  if (e.which == 3) {
    // Reset pan and zoom on right click.
    layerdict.transform.panx = 0;
    layerdict.transform.pany = 0;
    layerdict.transform.zoom = 1;
    redrawCanvas(layerdict);
  } else if (!globalData.getRedrawOnDrag()) {
    redrawCanvas(layerdict);
  }
  layerdict.transform.mousedown = false;
}

function handleMouseMove(e, layerdict) {
  if (!layerdict.transform.mousedown) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  var dx = e.offsetX - layerdict.transform.mousestartx;
  var dy = e.offsetY - layerdict.transform.mousestarty;
  layerdict.transform.panx += 2 * dx / layerdict.transform.zoom;
  layerdict.transform.pany += 2 * dy / layerdict.transform.zoom;
  layerdict.transform.mousestartx = e.offsetX;
  layerdict.transform.mousestarty = e.offsetY;
  if (globalData.getRedrawOnDrag()) {
    redrawCanvas(layerdict);
  }
}

function handleMouseWheel(e, layerdict) {
  e.preventDefault();
  e.stopPropagation();
  var t = layerdict.transform;
  var wheeldelta = e.deltaY;
  if (e.deltaMode == 1) {
    // FF only, scroll by lines
    wheeldelta *= 30;
  } else if (e.deltaMode == 2) {
    wheeldelta *= 300;
  }
  var m = Math.pow(1.1, -wheeldelta / 40);
  // Limit amount of zoom per tick.
  if (m > 2) {
    m = 2;
  } else if (m < 0.5) {
    m = 0.5;
  }
  t.zoom *= m;
  var zoomd = (1 - m) / t.zoom;
  t.panx += 2 * e.offsetX * zoomd;
  t.pany += 2 * e.offsetY * zoomd;
  redrawCanvas(layerdict);
  console.log(layerdict.transform.zoom);
}

function addMouseHandlers(div, layerdict) {
  div.onmousedown = function(e) {
    handleMouseDown(e, layerdict);
  };
  div.onmousemove = function(e) {
    handleMouseMove(e, layerdict);
  };
  div.onmouseup = function(e) {
    handleMouseUp(e, layerdict);
  };
  div.onmouseout = function(e) {
    handleMouseUp(e, layerdict);
  }
  div.onwheel = function(e) {
    handleMouseWheel(e, layerdict);
  }
  for (var element of [div, layerdict.bg, layerdict.silk, layerdict.highlight]) {
    element.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    }, false);
  }
}

function setBoardRotation(value) {
  boardRotation = value * 5;
  globalData.writeStorage("boardRotation", boardRotation);
  document.getElementById("rotationDegree").textContent = boardRotation;
  resizeAll();
}

function initRender() {
  allcanvas = {
    front: {
      transform: {
        x: 0,
        y: 0,
        s: 1,
        panx: 0,
        pany: 0,
        zoom: 1,
        mousestartx: 0,
        mousestarty: 0,
        mousedown: false,
      },
      bg: document.getElementById("F_bg"),
      silk: document.getElementById("F_slk"),
      highlight: document.getElementById("F_hl"),
      layer: "F",
    },
    back: {
      transform: {
        x: 0,
        y: 0,
        s: 1,
        panx: 0,
        pany: 0,
        zoom: 1,
        mousestartx: 0,
        mousestarty: 0,
        mousedown: false,
      },
      bg: document.getElementById("B_bg"),
      silk: document.getElementById("B_slk"),
      highlight: document.getElementById("B_hl"),
      layer: "B",
    }
  };
  addMouseHandlers(document.getElementById("frontcanvas"), allcanvas.front);
  addMouseHandlers(document.getElementById("backcanvas"), allcanvas.back);
}

module.exports = {
  resizeAll,
  initRender,
  redrawCanvas,
  drawHighlights,
  setBoardRotation
};
},{"./global.js":1}],6:[function(require,module,exports){
/*
  Split.js - v1.3.5
  MIT License
  https://github.com/nathancahill/Split.js
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Split=t()}(this,function(){"use strict";var e=window,t=e.document,n="addEventListener",i="removeEventListener",r="getBoundingClientRect",s=function(){return!1},o=e.attachEvent&&!e[n],a=["","-webkit-","-moz-","-o-"].filter(function(e){var n=t.createElement("div");return n.style.cssText="width:"+e+"calc(9px)",!!n.style.length}).shift()+"calc",l=function(e){return"string"==typeof e||e instanceof String?t.querySelector(e):e};return function(u,c){function z(e,t,n){var i=A(y,t,n);Object.keys(i).forEach(function(t){return e.style[t]=i[t]})}function h(e,t){var n=B(y,t);Object.keys(n).forEach(function(t){return e.style[t]=n[t]})}function f(e){var t=E[this.a],n=E[this.b],i=t.size+n.size;t.size=e/this.size*i,n.size=i-e/this.size*i,z(t.element,t.size,this.aGutterSize),z(n.element,n.size,this.bGutterSize)}function m(e){var t;this.dragging&&((t="touches"in e?e.touches[0][b]-this.start:e[b]-this.start)<=E[this.a].minSize+M+this.aGutterSize?t=E[this.a].minSize+this.aGutterSize:t>=this.size-(E[this.b].minSize+M+this.bGutterSize)&&(t=this.size-(E[this.b].minSize+this.bGutterSize)),f.call(this,t),c.onDrag&&c.onDrag())}function g(){var e=E[this.a].element,t=E[this.b].element;this.size=e[r]()[y]+t[r]()[y]+this.aGutterSize+this.bGutterSize,this.start=e[r]()[G]}function d(){var t=this,n=E[t.a].element,r=E[t.b].element;t.dragging&&c.onDragEnd&&c.onDragEnd(),t.dragging=!1,e[i]("mouseup",t.stop),e[i]("touchend",t.stop),e[i]("touchcancel",t.stop),t.parent[i]("mousemove",t.move),t.parent[i]("touchmove",t.move),delete t.stop,delete t.move,n[i]("selectstart",s),n[i]("dragstart",s),r[i]("selectstart",s),r[i]("dragstart",s),n.style.userSelect="",n.style.webkitUserSelect="",n.style.MozUserSelect="",n.style.pointerEvents="",r.style.userSelect="",r.style.webkitUserSelect="",r.style.MozUserSelect="",r.style.pointerEvents="",t.gutter.style.cursor="",t.parent.style.cursor=""}function S(t){var i=this,r=E[i.a].element,o=E[i.b].element;!i.dragging&&c.onDragStart&&c.onDragStart(),t.preventDefault(),i.dragging=!0,i.move=m.bind(i),i.stop=d.bind(i),e[n]("mouseup",i.stop),e[n]("touchend",i.stop),e[n]("touchcancel",i.stop),i.parent[n]("mousemove",i.move),i.parent[n]("touchmove",i.move),r[n]("selectstart",s),r[n]("dragstart",s),o[n]("selectstart",s),o[n]("dragstart",s),r.style.userSelect="none",r.style.webkitUserSelect="none",r.style.MozUserSelect="none",r.style.pointerEvents="none",o.style.userSelect="none",o.style.webkitUserSelect="none",o.style.MozUserSelect="none",o.style.pointerEvents="none",i.gutter.style.cursor=j,i.parent.style.cursor=j,g.call(i)}function v(e){e.forEach(function(t,n){if(n>0){var i=F[n-1],r=E[i.a],s=E[i.b];r.size=e[n-1],s.size=t,z(r.element,r.size,i.aGutterSize),z(s.element,s.size,i.bGutterSize)}})}function p(){F.forEach(function(e){e.parent.removeChild(e.gutter),E[e.a].element.style[y]="",E[e.b].element.style[y]=""})}void 0===c&&(c={});var y,b,G,E,w=l(u[0]).parentNode,D=e.getComputedStyle(w).flexDirection,U=c.sizes||u.map(function(){return 100/u.length}),k=void 0!==c.minSize?c.minSize:100,x=Array.isArray(k)?k:u.map(function(){return k}),L=void 0!==c.gutterSize?c.gutterSize:10,M=void 0!==c.snapOffset?c.snapOffset:30,O=c.direction||"horizontal",j=c.cursor||("horizontal"===O?"ew-resize":"ns-resize"),C=c.gutter||function(e,n){var i=t.createElement("div");return i.className="gutter gutter-"+n,i},A=c.elementStyle||function(e,t,n){var i={};return"string"==typeof t||t instanceof String?i[e]=t:i[e]=o?t+"%":a+"("+t+"% - "+n+"px)",i},B=c.gutterStyle||function(e,t){return n={},n[e]=t+"px",n;var n};"horizontal"===O?(y="width","clientWidth",b="clientX",G="left","paddingLeft"):"vertical"===O&&(y="height","clientHeight",b="clientY",G="top","paddingTop");var F=[];return E=u.map(function(e,t){var i,s={element:l(e),size:U[t],minSize:x[t]};if(t>0&&(i={a:t-1,b:t,dragging:!1,isFirst:1===t,isLast:t===u.length-1,direction:O,parent:w},i.aGutterSize=L,i.bGutterSize=L,i.isFirst&&(i.aGutterSize=L/2),i.isLast&&(i.bGutterSize=L/2),"row-reverse"===D||"column-reverse"===D)){var a=i.a;i.a=i.b,i.b=a}if(!o&&t>0){var c=C(t,O);h(c,L),c[n]("mousedown",S.bind(i)),c[n]("touchstart",S.bind(i)),w.insertBefore(c,s.element),i.gutter=c}0===t||t===u.length-1?z(s.element,s.size,L/2):z(s.element,s.size,L);var f=s.element[r]()[y];return f<s.minSize&&(s.minSize=f),t>0&&F.push(i),s}),o?{setSizes:v,destroy:p}:{setSizes:v,getSizes:function(){return E.map(function(e){return e.size})},collapse:function(e){if(e===F.length){var t=F[e-1];g.call(t),o||f.call(t,t.size-t.bGutterSize)}else{var n=F[e];g.call(n),o||f.call(n,n.aGutterSize)}},destroy:p}}});

},{}]},{},[4,3,5,2,6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZ2xvYmFsLmpzIiwic3JjL2h0bWxGdW5jdGlvbnMuanMiLCJzcmMvaWJvbS5qcyIsInNyYy9wY2Jmb250LmpzIiwic3JjL3JlbmRlci5qcyIsInZlbmRlci9zcGxpdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5eEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsK0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdGxCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgQm9hcmQgUm90YXRpb24gICAgICAgICAgICAgICAgICAgIFxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG52YXIgc3RvcmFnZVxyXG52YXIgc3RvcmFnZVByZWZpeCA9ICdLaUNhZF9IVE1MX0JPTV9fJyArIHBjYmRhdGEubWV0YWRhdGEudGl0bGUgKyAnX18nICsgcGNiZGF0YS5tZXRhZGF0YS5yZXZpc2lvbiArICdfXydcclxuXHJcbmZ1bmN0aW9uIGluaXRTdG9yYWdlIChrZXkpIHtcclxuICB0cnkge1xyXG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYmxhbmtcIik7XHJcbiAgICBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlN0b3JhZ2UgaW5pdCBlcnJvclwiKTtcclxuICAgIC8vIGxvY2FsU3RvcmFnZSBub3QgYXZhaWxhYmxlXHJcbiAgfVxyXG4gIGlmICghc3RvcmFnZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJibGFua1wiKTtcclxuICAgICAgc3RvcmFnZSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgLy8gc2Vzc2lvblN0b3JhZ2UgYWxzbyBub3QgYXZhaWxhYmxlXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkU3RvcmFnZShrZXkpIHtcclxuICBpZiAoc3RvcmFnZSkge1xyXG4gICAgcmV0dXJuIHN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlUHJlZml4ICsgJyMnICsga2V5KTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB3cml0ZVN0b3JhZ2Uoa2V5LCB2YWx1ZSkge1xyXG4gIGlmIChzdG9yYWdlKSB7XHJcbiAgICBzdG9yYWdlLnNldEl0ZW0oc3RvcmFnZVByZWZpeCArICcjJyArIGtleSwgdmFsdWUpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgICAgSGlnaGxpZ2h0ZWQgUmVmcyAgICAgICAgICAgICAgICAgICAgXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbnZhciBoaWdobGlnaHRlZFJlZnMgPSBbXTtcclxuXHJcbmZ1bmN0aW9uIHNldEhpZ2hsaWdodGVkUmVmcyhyZWZzKXtcclxuICAgIGhpZ2hsaWdodGVkUmVmcyA9IHJlZnM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEhpZ2hsaWdodGVkUmVmcygpe1xyXG4gICAgcmV0dXJuIGhpZ2hsaWdodGVkUmVmcztcclxufVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgICBSZWRyYXcgT24gRHJhZyAgICAgICAgICAgICAgICAgICAgICBcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxudmFyIHJlZHJhd09uRHJhZyA9IHRydWU7XHJcblxyXG4gIFxyXG5mdW5jdGlvbiBzZXRSZWRyYXdPbkRyYWcodmFsdWUpe1xyXG4gICAgcmVkcmF3T25EcmFnID0gdmFsdWU7XHJcbiAgICB3cml0ZVN0b3JhZ2UoXCJyZWRyYXdPbkRyYWdcIiwgdmFsdWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRSZWRyYXdPbkRyYWcoKXtcclxuICAgIHJldHVybiByZWRyYXdPbkRyYWc7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5CT00gU3BsaXRcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxudmFyIGJvbXNwbGl0O1xyXG5cclxuZnVuY3Rpb24gc2V0Qm9tU3BsaXQodmFsdWUpe1xyXG4gICAgYm9tc3BsaXQgPSB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm9tU3BsaXQoKXtcclxuICAgIHJldHVybiBib21zcGxpdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVzdHJveUJvbVNwbGl0KCl7XHJcbiAgICBib21zcGxpdC5kZXN0cm95KClcclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNhbnZhcyBTcGxpdFxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG52YXIgY2FudmFzc3BsaXQ7XHJcblxyXG5mdW5jdGlvbiBzZXRDYW52YXNTcGxpdCh2YWx1ZSl7XHJcbiAgICBjYW52YXNzcGxpdCA9IHZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDYW52YXNTcGxpdCgpe1xyXG4gICAgcmV0dXJuIGNhbnZhc3NwbGl0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZXN0cm95Q2FudmFzU3BsaXQoKXtcclxuICAgIGNhbnZhc3NwbGl0LmRlc3Ryb3koKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb2xsYXBzZUNhbnZhc1NwbGl0KHZhbHVlKVxyXG57XHJcbiAgICBjYW52YXNzcGxpdC5jb2xsYXBzZSh2YWx1ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFNpemVzQ2FudmFzU3BsaXQodmFsdWUpe1xyXG4gICAgY2FudmFzc3BsaXQuc2V0U2l6ZXMoWzUwLCA1MF0pO1xyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ2FudmFzIExheW91dFxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG52YXIgY2FudmFzbGF5b3V0ID0gXCJGQlwiO1xyXG5cclxuLypYWFggRm91bmQgYSBidWcgYXQgc3RhcnR1cC4gQ29kZSBhc3N1bWVzIHRoYXQgY2FudmFzIGxheW91dCBcclxuaXMgaW4gb25lIG9mIHRocmVlIHN0YXRlcy4gdGhlbiBzeXN0ZW0gZmFpbHMuIGhlIGJ1ZyB3YXMgdGhhdCB0aGUgXHJcbmNhbnZhc0xheW91dCB3YXMgYmVpbmcgc2V0IHRvICdkZWZhdWx0JyB3aGljaCBpcyBub3QgYSB2YWxpZCBzdGF0ZS4gXHJcblNvIG5vIGlzIGNoZWNrIHRoYXQgaWYgZGVmYXVsdCBpcyBzZW50IGluIHRoZW4gc2V0IHRoZSBsYXlvdXQgdG8gRkIgbW9kZS5cclxuKi9cclxuLyogVE9ETzogTWFrZSB0aGUgZGVmYXVsdCBjaGVjayBiZWxvdyBhY3R1YWxseSBjaGVjayB0aGF0IHRoZSBpdGVtIFxyXG5pcyBpbiBvbmUgb2YgdGhlIHRocmVlIHZhbGlkIHN0YXRlcy4gSWYgbm90IHRoZW4gc2V0IHRvIEZCLCBvdGhlcndpc2Ugc2V0IHRvIG9uZSBvZlxyXG50aGUgdGhyZWUgdmFsaWQgc3RhdGVzXHJcbiovXHJcbmZ1bmN0aW9uIHNldENhbnZhc0xheW91dCh2YWx1ZSl7XHJcbiAgICBpZih2YWx1ZSA9PSAnZGVmYXVsdCcpe1xyXG4gICAgICAgIGNhbnZhc2xheW91dCA9ICdGQidcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNhbnZhc2xheW91dCA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDYW52YXNMYXlvdXQoKXtcclxuICAgIHJldHVybiBjYW52YXNsYXlvdXQ7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5CT00gTGF5b3V0XHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbnZhciBib21sYXlvdXQgPSBcImRlZmF1bHRcIjtcclxuXHJcbmZ1bmN0aW9uIHNldEJvbUxheW91dCh2YWx1ZSl7XHJcbiAgICBib21sYXlvdXQgPSB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm9tTGF5b3V0KCl7XHJcbiAgICByZXR1cm4gYm9tbGF5b3V0O1xyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQk9NIFNvcnQgRnVuY3Rpb25cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxudmFyIGJvbVNvcnRGdW5jdGlvbiA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBzZXRCb21Tb3J0RnVuY3Rpb24odmFsdWUpe1xyXG4gICAgYm9tU29ydEZ1bmN0aW9uID0gdmFsdWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEJvbVNvcnRGdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIGJvbVNvcnRGdW5jdGlvbjtcclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkN1cnJlbnQgU29ydCBDb2x1bW5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxudmFyIGN1cnJlbnRTb3J0Q29sdW1uID0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIHNldEN1cnJlbnRTb3J0Q29sdW1uKHZhbHVlKXtcclxuICAgIGN1cnJlbnRTb3J0Q29sdW1uID0gdmFsdWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEN1cnJlbnRTb3J0Q29sdW1uKCl7XHJcbiAgICByZXR1cm4gY3VycmVudFNvcnRDb2x1bW47XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5DdXJyZW50IFNvcnQgT3JkZXJcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxudmFyIGN1cnJlbnRTb3J0T3JkZXIgPSBudWxsO1xyXG5cclxuZnVuY3Rpb24gc2V0Q3VycmVudFNvcnRPcmRlcih2YWx1ZSl7XHJcbiAgICBjdXJyZW50U29ydE9yZGVyID0gdmFsdWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEN1cnJlbnRTb3J0T3JkZXIoKXtcclxuICAgIHJldHVybiBjdXJyZW50U29ydE9yZGVyO1xyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ3VycmVudCBIaWdobGlnaHRlZCBSb3cgSURcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxudmFyIGN1cnJlbnRIaWdobGlnaHRlZFJvd0lkO1xyXG5cclxuZnVuY3Rpb24gc2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQodmFsdWUpe1xyXG4gICAgY3VycmVudEhpZ2hsaWdodGVkUm93SWQgPSB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKXtcclxuICAgIHJldHVybiBjdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZDtcclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkhpZ2hsaWdodCBIYW5kbGVyc1xyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG52YXIgaGlnaGxpZ2h0SGFuZGxlcnMgPSBbXTtcclxuXHJcbmZ1bmN0aW9uIHNldEhpZ2hsaWdodEhhbmRsZXJzKHZhbHVlcyl7XHJcbiAgICBoaWdobGlnaHRIYW5kbGVycyA9IHZhbHVlcztcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKXtcclxuICAgIHJldHVybiBoaWdobGlnaHRIYW5kbGVycztcclxufVxyXG5cclxuZnVuY3Rpb24gcHVzaEhpZ2hsaWdodEhhbmRsZXJzKHZhbHVlKXtcclxuICAgIGhpZ2hsaWdodEhhbmRsZXJzLnB1c2godmFsdWUpO1xyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ2hlY2tib3hlc1xyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG52YXIgY2hlY2tib3hlcyA9IFtdO1xyXG5cclxuZnVuY3Rpb24gc2V0Q2hlY2tib3hlcyh2YWx1ZXMpe1xyXG4gICAgY2hlY2tib3hlcyA9IHZhbHVlcztcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2hlY2tib3hlcygpe1xyXG4gICAgcmV0dXJuIGNoZWNrYm94ZXM7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5CT00gQ2hlY2tib3hlc1xyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG52YXIgYm9tQ2hlY2tib3hlcyA9IFwiXCI7XHJcblxyXG5mdW5jdGlvbiBzZXRCb21DaGVja2JveGVzKHZhbHVlcyl7XHJcbiAgICBib21DaGVja2JveGVzID0gdmFsdWVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRCb21DaGVja2JveGVzKCl7XHJcbiAgICByZXR1cm4gYm9tQ2hlY2tib3hlcztcclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkhpZ2hsaWdodCBQaW4gMVxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG52YXIgaGlnaGxpZ2h0cGluMSA9IGZhbHNlO1xyXG5cclxuZnVuY3Rpb24gc2V0SGlnaGxpZ2h0UGluMSh2YWx1ZSkge1xyXG4gIHdyaXRlU3RvcmFnZShcImhpZ2hsaWdodHBpbjFcIiwgdmFsdWUpO1xyXG4gIGhpZ2hsaWdodHBpbjEgPSB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SGlnaGxpZ2h0UGluMSgpe1xyXG4gICAgcmV0dXJuIGhpZ2hsaWdodHBpbjE7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5MYXN0IENsaWNrZWQgUmVmXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbnZhciBsYXN0Q2xpY2tlZFJlZjtcclxuXHJcbmZ1bmN0aW9uIHNldExhc3RDbGlja2VkUmVmKHZhbHVlKSB7XHJcbiAgICBsYXN0Q2xpY2tlZFJlZiA9IHZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMYXN0Q2xpY2tlZFJlZigpIHtcclxuICByZXR1cm4gbGFzdENsaWNrZWRSZWY7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuTGFzdCBDbGlja2VkIFJlZlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG52YXIgY29tYmluZVZhbHVlcyA9IGZhbHNlO1xyXG5cclxuZnVuY3Rpb24gc2V0Q29tYmluZVZhbHVlcyh2YWx1ZSkge1xyXG4gIHdyaXRlU3RvcmFnZShcImNvbWJpbmVWYWx1ZXNcIiwgdmFsdWUpO1xyXG4gIGNvbWJpbmVWYWx1ZXMgPSB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29tYmluZVZhbHVlcygpe1xyXG4gICAgcmV0dXJuIGNvbWJpbmVWYWx1ZXM7XHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBpbml0U3RvcmFnZSAgICAgICAgICAgICAgICAsIHJlYWRTdG9yYWdlICAgICAgICAgICAgICAgICwgd3JpdGVTdG9yYWdlICAgICAgICxcclxuICBzZXRIaWdobGlnaHRlZFJlZnMgICAgICAgICAsIGdldEhpZ2hsaWdodGVkUmVmcyAgICAgICAgICxcclxuICBzZXRSZWRyYXdPbkRyYWcgICAgICAgICAgICAsIGdldFJlZHJhd09uRHJhZyAgICAgICAgICAgICxcclxuICBzZXRCb21TcGxpdCAgICAgICAgICAgICAgICAsIGdldEJvbVNwbGl0ICAgICAgICAgICAgICAgICwgZGVzdHJveUJvbVNwbGl0ICAgICxcclxuICBzZXRDYW52YXNTcGxpdCAgICAgICAgICAgICAsIGdldENhbnZhc1NwbGl0ICAgICAgICAgICAgICwgZGVzdHJveUNhbnZhc1NwbGl0ICwgY29sbGFwc2VDYW52YXNTcGxpdCAsIHNldFNpemVzQ2FudmFzU3BsaXQsXHJcbiAgc2V0Q2FudmFzTGF5b3V0ICAgICAgICAgICAgLCBnZXRDYW52YXNMYXlvdXQgICAgICAgICAgICAsXHJcbiAgc2V0Qm9tTGF5b3V0ICAgICAgICAgICAgICAgLCBnZXRCb21MYXlvdXQgICAgICAgICAgICAgICAsXHJcbiAgc2V0Qm9tU29ydEZ1bmN0aW9uICAgICAgICAgLCBnZXRCb21Tb3J0RnVuY3Rpb24gICAgICAgICAsXHJcbiAgc2V0Q3VycmVudFNvcnRDb2x1bW4gICAgICAgLCBnZXRDdXJyZW50U29ydENvbHVtbiAgICAgICAsXHJcbiAgc2V0Q3VycmVudFNvcnRPcmRlciAgICAgICAgLCBnZXRDdXJyZW50U29ydE9yZGVyICAgICAgICAsXHJcbiAgc2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQgLCBnZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCAsXHJcbiAgc2V0SGlnaGxpZ2h0SGFuZGxlcnMgICAgICAgLCBnZXRIaWdobGlnaHRIYW5kbGVycyAgICAgICAsIHB1c2hIaWdobGlnaHRIYW5kbGVycyAsXHJcbiAgc2V0Q2hlY2tib3hlcyAgICAgICAgICAgICAgLCBnZXRDaGVja2JveGVzICAgICAgICAgICAgICAsXHJcbiAgc2V0Qm9tQ2hlY2tib3hlcyAgICAgICAgICAgLCBnZXRCb21DaGVja2JveGVzICAgICAgICAgICAsXHJcbiAgc2V0SGlnaGxpZ2h0UGluMSAgICAgICAgICAgLCBnZXRIaWdobGlnaHRQaW4xICAgICAgICAgICAsXHJcbiAgc2V0TGFzdENsaWNrZWRSZWYgICAgICAgICAgLCBnZXRMYXN0Q2xpY2tlZFJlZiAgICAgICAgICAsXHJcbiAgc2V0Q29tYmluZVZhbHVlcyAgICAgICAgICAgLCBnZXRDb21iaW5lVmFsdWVzICAgICAgICAgICAsXHJcbn07IiwiXHJcbnZhciBnbG9iYWxEYXRhID0gcmVxdWlyZSgnLi9nbG9iYWwuanMnKVxyXG52YXIgcmVuZGVyICAgICA9IHJlcXVpcmUoJy4vcmVuZGVyLmpzJylcclxudmFyIGlib20gICAgICAgPSByZXF1aXJlKCcuL2lib20uanMnKVxyXG5cclxuY29uc3QgYm9hcmRSb3RhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZFJvdGF0aW9uJyk7XHJcbmJvYXJkUm90YXRpb24ub25pbnB1dD1mdW5jdGlvbigpXHJcbntcclxuICByZW5kZXIuc2V0Qm9hcmRSb3RhdGlvbihib2FyZFJvdGF0aW9uLnZhbHVlKTtcclxufVxyXG5cclxuY29uc3QgZGFya01vZGVCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFya21vZGVDaGVja2JveCcpO1xyXG5kYXJrTW9kZUJveC5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICBpYm9tLnNldERhcmtNb2RlKGRhcmtNb2RlQm94LmNoZWNrZWQpXHJcbn1cclxuXHJcbmNvbnN0IHNpbGtzY3JlZW5DaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWxrc2NyZWVuQ2hlY2tib3gnKTtcclxuc2lsa3NjcmVlbkNoZWNrYm94LmNoZWNrZWQ9ZnVuY3Rpb24oKXtcclxuICBpYm9tLnNpbGtzY3JlZW5WaXNpYmxlKHNpbGtzY3JlZW5DaGVja2JveC5jaGVja2VkKVxyXG59XHJcbnNpbGtzY3JlZW5DaGVja2JveC5vbmNoYW5nZT1mdW5jdGlvbigpe1xyXG4gIGlib20uc2lsa3NjcmVlblZpc2libGUoc2lsa3NjcmVlbkNoZWNrYm94LmNoZWNrZWQpXHJcbn1cclxuXHJcbmNvbnN0IGhpZ2hsaWdodHBpbjFDaGVja2JveCA9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZ2hsaWdodHBpbjFDaGVja2JveCcpO1xyXG5oaWdobGlnaHRwaW4xQ2hlY2tib3gub25jaGFuZ2U9ZnVuY3Rpb24oKXtcclxuICBnbG9iYWxEYXRhLnNldEhpZ2hsaWdodFBpbjEoaGlnaGxpZ2h0cGluMUNoZWNrYm94LmNoZWNrZWQpO1xyXG4gIHJlbmRlci5yZWRyYXdDYW52YXMoYWxsY2FudmFzLmZyb250KTtcclxuICByZW5kZXIucmVkcmF3Q2FudmFzKGFsbGNhbnZhcy5iYWNrKTtcclxufVxyXG5cclxuY29uc3QgZHJhZ0NoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RyYWdDaGVja2JveCcpO1xyXG5kcmFnQ2hlY2tib3guY2hlY2tlZD1mdW5jdGlvbigpe1xyXG4gIGdsb2JhbERhdGEuc2V0UmVkcmF3T25EcmFnKGRyYWdDaGVja2JveC5jaGVja2VkKVxyXG59XHJcbmRyYWdDaGVja2JveC5vbmNoYW5nZT1mdW5jdGlvbigpe1xyXG4gIGdsb2JhbERhdGEuc2V0UmVkcmF3T25EcmFnKGRyYWdDaGVja2JveC5jaGVja2VkKVxyXG59XHJcblxyXG5cclxuY29uc3QgY29tYmluZVZhbHVlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21iaW5lVmFsdWVzJyk7XHJcbmNvbWJpbmVWYWx1ZXMub25jaGFuZ2U9ZnVuY3Rpb24oKXtcclxuICBnbG9iYWxEYXRhLnNldENvbWJpbmVWYWx1ZXMoY29tYmluZVZhbHVlcy5jaGVja2VkKTtcclxuICBpYm9tLnBvcHVsYXRlQm9tVGFibGUoKTtcclxufVxyXG5cclxuXHJcbmNvbnN0IGZpbHRlcl8yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlcicpO1xyXG5maWx0ZXJfMi5vbmlucHV0PWZ1bmN0aW9uKCl7XHJcbiAgaWJvbS51cGRhdGVGaWx0ZXIoZmlsdGVyXzIudmFsdWUpXHJcbn1cclxuXHJcblxyXG5jb25zdCByZWZsb29rdXBfMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWZsb29rdXAnKTtcclxucmVmbG9va3VwXzIub25pbnB1dD1mdW5jdGlvbigpe1xyXG4gIGlib20udXBkYXRlUmVmTG9va3VwKHJlZmxvb2t1cF8yLnZhbHVlKVxyXG59XHJcblxyXG5jb25zdCBib21DaGVja2JveGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvbUNoZWNrYm94ZXMnKTtcclxuYm9tQ2hlY2tib3hlcy5vbmlucHV0PWZ1bmN0aW9uKCl7XHJcbiAgaWJvbS5zZXRCb21DaGVja2JveGVzKGJvbUNoZWNrYm94ZXMudmFsdWUpO1xyXG59XHJcblxyXG5jb25zdCBmbF9idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmwtYnRuJyk7XHJcbmZsX2J0bi5vbmNsaWNrPWZ1bmN0aW9uKCl7XHJcbiAgaWJvbS5jaGFuZ2VDYW52YXNMYXlvdXQoJ0YnKTtcclxufVxyXG5cclxuY29uc3QgZmJfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZiLWJ0bicpO1xyXG5mYl9idG4ub25jbGljaz1mdW5jdGlvbigpe1xyXG4gIGlib20uY2hhbmdlQ2FudmFzTGF5b3V0KCdGQicpO1xyXG59XHJcblxyXG5cclxuY29uc3QgYmxfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JsLWJ0bicpO1xyXG5ibF9idG4ub25jbGljaz1mdW5jdGlvbigpe1xyXG4gIGlib20uY2hhbmdlQ2FudmFzTGF5b3V0KCdCJyk7XHJcbn1cclxuXHJcbmNvbnN0IGJvbV9idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9tLWJ0bicpO1xyXG5ib21fYnRuLm9uY2xpY2s9ZnVuY3Rpb24oKXtcclxuICBpYm9tLmNoYW5nZUJvbUxheW91dCgnQk9NJylcclxufVxyXG5cclxuY29uc3QgbHJfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xyLWJ0bicpO1xyXG5scl9idG4ub25jbGljaz1mdW5jdGlvbigpe1xyXG4gIGlib20uY2hhbmdlQm9tTGF5b3V0KCdMUicpXHJcbn1cclxuXHJcbmNvbnN0IHRiX2J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Yi1idG4nKTtcclxudGJfYnRuLm9uY2xpY2s9ZnVuY3Rpb24oKXtcclxuICBpYm9tLmNoYW5nZUJvbUxheW91dCgnVEInKVxyXG59XHJcbiIsIi8qIERPTSBtYW5pcHVsYXRpb24gYW5kIG1pc2MgY29kZSAqL1xyXG5cclxuXHJcbnZhciBTcGxpdCA9IHJlcXVpcmUoJy4uL3ZlbmRlci9zcGxpdC5qcycpXHJcbnZhciBnbG9iYWxEYXRhID0gcmVxdWlyZSgnLi9nbG9iYWwuanMnKVxyXG52YXIgcmVuZGVyID0gcmVxdWlyZSgnLi9yZW5kZXIuanMnKVxyXG5cclxuZnVuY3Rpb24gZGJnKGh0bWwpIHtcclxuICBkYmdkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0RGFya01vZGUodmFsdWUpIHtcclxuICBpZiAodmFsdWUpIHtcclxuICAgIHRvcG1vc3RkaXYuY2xhc3NMaXN0LmFkZChcImRhcmtcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRvcG1vc3RkaXYuY2xhc3NMaXN0LnJlbW92ZShcImRhcmtcIik7XHJcbiAgfVxyXG4gIGdsb2JhbERhdGEud3JpdGVTdG9yYWdlKFwiZGFya21vZGVcIiwgdmFsdWUpO1xyXG4gIHJlbmRlci5yZWRyYXdDYW52YXMoYWxsY2FudmFzLmZyb250KTtcclxuICByZW5kZXIucmVkcmF3Q2FudmFzKGFsbGNhbnZhcy5iYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3RvcmVkQ2hlY2tib3hSZWZzKGNoZWNrYm94KSB7XHJcbiAgdmFyIGV4aXN0aW5nUmVmcyA9IGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJjaGVja2JveF9cIiArIGNoZWNrYm94KTtcclxuICBpZiAoIWV4aXN0aW5nUmVmcykge1xyXG4gICAgcmV0dXJuIG5ldyBTZXQoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG5ldyBTZXQoZXhpc3RpbmdSZWZzLnNwbGl0KFwiLFwiKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDaGVja2JveFN0YXRlKGNoZWNrYm94LCByZWZlcmVuY2VzKSB7XHJcbiAgdmFyIHN0b3JlZFJlZnNTZXQgPSBnZXRTdG9yZWRDaGVja2JveFJlZnMoY2hlY2tib3gpO1xyXG4gIHZhciBjdXJyZW50UmVmc1NldCA9IG5ldyBTZXQocmVmZXJlbmNlcyk7XHJcbiAgLy8gR2V0IGRpZmZlcmVuY2Ugb2YgY3VycmVudCAtIHN0b3JlZFxyXG4gIHZhciBkaWZmZXJlbmNlID0gbmV3IFNldChjdXJyZW50UmVmc1NldCk7XHJcbiAgZm9yIChyZWYgb2Ygc3RvcmVkUmVmc1NldCkge1xyXG4gICAgZGlmZmVyZW5jZS5kZWxldGUocmVmKTtcclxuICB9XHJcbiAgaWYgKGRpZmZlcmVuY2Uuc2l6ZSA9PSAwKSB7XHJcbiAgICAvLyBBbGwgdGhlIGN1cnJlbnQgcmVmcyBhcmUgc3RvcmVkXHJcbiAgICByZXR1cm4gXCJjaGVja2VkXCI7XHJcbiAgfSBlbHNlIGlmIChkaWZmZXJlbmNlLnNpemUgPT0gY3VycmVudFJlZnNTZXQuc2l6ZSkge1xyXG4gICAgLy8gTm9uZSBvZiB0aGUgY3VycmVudCByZWZzIGFyZSBzdG9yZWRcclxuICAgIHJldHVybiBcInVuY2hlY2tlZFwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBTb21lIG9mIHRoZSByZWZzIGFyZSBzdG9yZWRcclxuICAgIHJldHVybiBcImluZGV0ZXJtaW5hdGVcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEJvbUNoZWNrYm94U3RhdGUoY2hlY2tib3gsIGVsZW1lbnQsIHJlZmVyZW5jZXMpIHtcclxuICB2YXIgc3RhdGUgPSBnZXRDaGVja2JveFN0YXRlKGNoZWNrYm94LCByZWZlcmVuY2VzKTtcclxuICBlbGVtZW50LmNoZWNrZWQgPSAoc3RhdGUgPT0gXCJjaGVja2VkXCIpO1xyXG4gIGVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IChzdGF0ZSA9PSBcImluZGV0ZXJtaW5hdGVcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNoZWNrYm94Q2hhbmdlSGFuZGxlcihjaGVja2JveCwgcmVmZXJlbmNlcykge1xyXG4gIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgIHJlZnNTZXQgPSBnZXRTdG9yZWRDaGVja2JveFJlZnMoY2hlY2tib3gpO1xyXG4gICAgaWYgKHRoaXMuY2hlY2tlZCkge1xyXG4gICAgICAvLyBjaGVja2JveCB0aWNrZWRcclxuICAgICAgZm9yICh2YXIgcmVmIG9mIHJlZmVyZW5jZXMpIHtcclxuICAgICAgICByZWZzU2V0LmFkZChyZWYpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBjaGVja2JveCB1bnRpY2tlZFxyXG4gICAgICBmb3IgKHZhciByZWYgb2YgcmVmZXJlbmNlcykge1xyXG4gICAgICAgIHJlZnNTZXQuZGVsZXRlKHJlZik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGdsb2JhbERhdGEud3JpdGVTdG9yYWdlKFwiY2hlY2tib3hfXCIgKyBjaGVja2JveCwgWy4uLnJlZnNTZXRdLmpvaW4oXCIsXCIpKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVJvd0hpZ2hsaWdodEhhbmRsZXIocm93aWQsIHJlZnMpIHtcclxuICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKSB7XHJcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkgPT0gcm93aWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0ZWRcIik7XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChyb3dpZCkuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodGVkXCIpO1xyXG4gICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZChyb3dpZCk7XHJcbiAgICBnbG9iYWxEYXRhLnNldEhpZ2hsaWdodGVkUmVmcyhyZWZzKTtcclxuICAgIHJlbmRlci5kcmF3SGlnaGxpZ2h0cygpO1xyXG4gIH1cclxufVxyXG5cclxuLy9YWFggVEhpcyBmdW5jdGlvbiBoYXMgZmlsdGVyLiBGaWx0ZXIgaXMgbm90IGdsb2JhbC4gV2hlcmUgZG9lcyBpdCBjb21lIGZyb20gdGhlblxyXG5mdW5jdGlvbiBlbnRyeU1hdGNoZXMoZW50cnkpIHtcclxuICAvLyBjaGVjayByZWZzXHJcbiAgZm9yICh2YXIgcmVmIG9mIGVudHJ5WzJdKSB7XHJcbiAgICBpZiAocmVmLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIpID49IDApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIGNoZWNrIHZhbHVlXHJcbiAgaWYgKGVudHJ5WzFdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIpID49IDApIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICAvLyBjaGVjayBmb290cHJpbnRcclxuICBpZiAoZW50cnlbMl0udG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlcikgPj0gMCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFJlZkluRW50cnkoZW50cnkpIHtcclxuICBmb3IgKHZhciByZWYgb2YgZW50cnlbM10pIHtcclxuICAgIGlmIChyZWYudG9Mb3dlckNhc2UoKSA9PSByZWZsb29rdXApIHtcclxuICAgICAgcmV0dXJuIFtyZWZdO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZ2hsaWdodEZpbHRlcihzKSB7XHJcbiAgaWYgKCFmaWx0ZXIpIHtcclxuICAgIHJldHVybiBzO1xyXG4gIH1cclxuICB2YXIgcGFydHMgPSBzLnRvTG93ZXJDYXNlKCkuc3BsaXQoZmlsdGVyKTtcclxuICBpZiAocGFydHMubGVuZ3RoID09IDEpIHtcclxuICAgIHJldHVybiBzO1xyXG4gIH1cclxuICB2YXIgciA9IFwiXCI7XHJcbiAgdmFyIHBvcyA9IDA7XHJcbiAgZm9yICh2YXIgaSBpbiBwYXJ0cykge1xyXG4gICAgaWYgKGkgPiAwKSB7XHJcbiAgICAgIHIgKz0gJzxtYXJrIGNsYXNzPVwiaGlnaGxpZ2h0XCI+JyArXHJcbiAgICAgICAgcy5zdWJzdHJpbmcocG9zLCBwb3MgKyBmaWx0ZXIubGVuZ3RoKSArXHJcbiAgICAgICAgJzwvbWFyaz4nO1xyXG4gICAgICBwb3MgKz0gZmlsdGVyLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHIgKz0gcy5zdWJzdHJpbmcocG9zLCBwb3MgKyBwYXJ0c1tpXS5sZW5ndGgpO1xyXG4gICAgcG9zICs9IHBhcnRzW2ldLmxlbmd0aDtcclxuICB9XHJcbiAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrYm94U2V0VW5zZXRBbGxIYW5kbGVyKGNoZWNrYm94bmFtZSkge1xyXG4gIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjaGVja2JveG51bSA9IDA7XHJcbiAgICB3aGlsZSAoY2hlY2tib3hudW0gPCBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKS5sZW5ndGggJiZcclxuICAgICAgZ2xvYmFsRGF0YS5nZXRDaGVja2JveGVzKClbY2hlY2tib3hudW1dLnRvTG93ZXJDYXNlKCkgIT0gY2hlY2tib3huYW1lLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgY2hlY2tib3hudW0rKztcclxuICAgIH1cclxuICAgIGlmIChjaGVja2JveG51bSA+PSBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKS5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGFsbHNldCA9IHRydWU7XHJcbiAgICB2YXIgY2hlY2tib3g7XHJcbiAgICB2YXIgcm93O1xyXG4gICAgZm9yIChyb3cgb2YgYm9tYm9keS5jaGlsZE5vZGVzKSB7XHJcbiAgICAgIGNoZWNrYm94ID0gcm93LmNoaWxkTm9kZXNbY2hlY2tib3hudW0gKyAxXS5jaGlsZE5vZGVzWzBdO1xyXG4gICAgICBpZiAoIWNoZWNrYm94LmNoZWNrZWQgfHwgY2hlY2tib3guaW5kZXRlcm1pbmF0ZSkge1xyXG4gICAgICAgIGFsbHNldCA9IGZhbHNlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKHJvdyBvZiBib21ib2R5LmNoaWxkTm9kZXMpIHtcclxuICAgICAgY2hlY2tib3ggPSByb3cuY2hpbGROb2Rlc1tjaGVja2JveG51bSArIDFdLmNoaWxkTm9kZXNbMF07XHJcbiAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSAhYWxsc2V0O1xyXG4gICAgICBjaGVja2JveC5pbmRldGVybWluYXRlID0gZmFsc2U7XHJcbiAgICAgIGNoZWNrYm94Lm9uY2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDb2x1bW5IZWFkZXIobmFtZSwgY2xzLCBjb21wYXJhdG9yKSB7XHJcbiAgdmFyIHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlRIXCIpO1xyXG4gIHRoLmlubmVySFRNTCA9IG5hbWU7XHJcbiAgdGguY2xhc3NMaXN0LmFkZChjbHMpO1xyXG4gIHRoLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gIHZhciBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlNQQU5cIik7XHJcbiAgc3Bhbi5jbGFzc0xpc3QuYWRkKFwic29ydG1hcmtcIik7XHJcbiAgc3Bhbi5jbGFzc0xpc3QuYWRkKFwibm9uZVwiKTtcclxuICB0aC5hcHBlbmRDaGlsZChzcGFuKTtcclxuICB0aC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpICYmIHRoaXMgIT09IGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKSkge1xyXG4gICAgICAvLyBDdXJyZW50bHkgc29ydGVkIGJ5IGFub3RoZXIgY29sdW1uXHJcbiAgICAgIGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKS5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5yZW1vdmUoZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydE9yZGVyKCkpO1xyXG4gICAgICBnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QuYWRkKFwibm9uZVwiKTtcclxuICAgICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50U29ydENvbHVtbihudWxsKTtcclxuICAgICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50U29ydE9yZGVyKG51bGwpO1xyXG4gICAgfVxyXG4gICAgaWYgKGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKSAmJiB0aGlzID09PSBnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkpIHtcclxuICAgICAgLy8gQWxyZWFkeSBzb3J0ZWQgYnkgdGhpcyBjb2x1bW5cclxuICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRPcmRlcigpID09IFwiYXNjXCIpIHtcclxuICAgICAgICAvLyBTb3J0IGJ5IHRoaXMgY29sdW1uLCBkZXNjZW5kaW5nIG9yZGVyXHJcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRCb21Tb3J0RnVuY3Rpb24oZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgICAgcmV0dXJuIC1jb21wYXJhdG9yKGEsIGIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKS5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5yZW1vdmUoXCJhc2NcIik7XHJcbiAgICAgICAgZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZChcImRlc2NcIik7XHJcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50U29ydE9yZGVyKFwiZGVzY1wiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBVbnNvcnRcclxuICAgICAgICBnbG9iYWxEYXRhLnNldEJvbVNvcnRGdW5jdGlvbihudWxsKTtcclxuICAgICAgICBnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QucmVtb3ZlKFwiZGVzY1wiKTtcclxuICAgICAgICBnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QuYWRkKFwibm9uZVwiKTtcclxuICAgICAgICBnbG9iYWxEYXRhLnNldEN1cnJlbnRTb3J0Q29sdW1uKG51bGwpO1xyXG4gICAgICAgIGdsb2JhbERhdGEuc2V0Q3VycmVudFNvcnRPcmRlcihudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU29ydCBieSB0aGlzIGNvbHVtbiwgYXNjZW5kaW5nIG9yZGVyXHJcbiAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU29ydEZ1bmN0aW9uKGNvbXBhcmF0b3IpO1xyXG4gICAgICBnbG9iYWxEYXRhLnNldEN1cnJlbnRTb3J0Q29sdW1uKHRoaXMpO1xyXG4gICAgICBnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QucmVtb3ZlKFwibm9uZVwiKTtcclxuICAgICAgZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZChcImFzY1wiKTtcclxuICAgICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50U29ydE9yZGVyKFwiYXNjXCIpO1xyXG4gICAgfVxyXG4gICAgcG9wdWxhdGVCb21Cb2R5KCk7XHJcbiAgfVxyXG4gIHJldHVybiB0aDtcclxufVxyXG5cclxuZnVuY3Rpb24gZmFuY3lEYmxDbGlja0hhbmRsZXIoZWwsIG9uc2luZ2xlLCBvbmRvdWJsZSkge1xyXG4gIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRibGNsaWNrXCIpID09IG51bGwpIHtcclxuICAgICAgZWwuc2V0QXR0cmlidXRlKFwiZGF0YS1kYmxjbGlja1wiLCAxKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1kYmxjbGlja1wiKSA9PSAxKSB7XHJcbiAgICAgICAgICBvbnNpbmdsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWRibGNsaWNrXCIpO1xyXG4gICAgICB9LCAyMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1kYmxjbGlja1wiKTtcclxuICAgICAgb25kb3VibGUoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvcHVsYXRlQm9tSGVhZGVyKCkge1xyXG4gIHdoaWxlIChib21oZWFkLmZpcnN0Q2hpbGQpIHtcclxuICAgIGJvbWhlYWQucmVtb3ZlQ2hpbGQoYm9taGVhZC5maXJzdENoaWxkKTtcclxuICB9XHJcbiAgdmFyIHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlRSXCIpO1xyXG4gIHZhciB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJUSFwiKTtcclxuICB0aC5jbGFzc0xpc3QuYWRkKFwibnVtQ29sXCIpO1xyXG4gIHRyLmFwcGVuZENoaWxkKHRoKTtcclxuICBnbG9iYWxEYXRhLnNldENoZWNrYm94ZXMoZ2xvYmFsRGF0YS5nZXRCb21DaGVja2JveGVzKCkuc3BsaXQoXCIsXCIpLmZpbHRlcigoZSkgPT4gZSkpO1xyXG4gIHZhciBjaGVja2JveENvbXBhcmVDbG9zdXJlID0gZnVuY3Rpb24oY2hlY2tib3gpIHtcclxuICAgIHJldHVybiAoYSwgYikgPT4ge1xyXG4gICAgICB2YXIgc3RhdGVBID0gZ2V0Q2hlY2tib3hTdGF0ZShjaGVja2JveCwgYVszXSk7XHJcbiAgICAgIHZhciBzdGF0ZUIgPSBnZXRDaGVja2JveFN0YXRlKGNoZWNrYm94LCBiWzNdKTtcclxuICAgICAgaWYgKHN0YXRlQSA+IHN0YXRlQikgcmV0dXJuIC0xO1xyXG4gICAgICBpZiAoc3RhdGVBIDwgc3RhdGVCKSByZXR1cm4gMTtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBjaGVja2JveCBvZiBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKSkge1xyXG4gICAgdGggPSBjcmVhdGVDb2x1bW5IZWFkZXIoXHJcbiAgICAgIGNoZWNrYm94LCBjaGVja2JveCwgY2hlY2tib3hDb21wYXJlQ2xvc3VyZShjaGVja2JveCkpO1xyXG4gICAgdGgub25jbGljayA9IGZhbmN5RGJsQ2xpY2tIYW5kbGVyKFxyXG4gICAgICB0aCwgdGgub25jbGljay5iaW5kKHRoKSwgY2hlY2tib3hTZXRVbnNldEFsbEhhbmRsZXIoY2hlY2tib3gpKTtcclxuICAgIHRyLmFwcGVuZENoaWxkKHRoKTtcclxuICB9XHJcblxyXG4gIHRyLmFwcGVuZENoaWxkKGNyZWF0ZUNvbHVtbkhlYWRlcihcIlJlZmVyZW5jZXNcIiwgXCJSZWZlcmVuY2VzXCIsIChhLCBiKSA9PiB7XHJcbiAgICB2YXIgaSA9IDA7XHJcbiAgICB3aGlsZSAoaSA8IGFbM10ubGVuZ3RoICYmIGkgPCBiWzNdLmxlbmd0aCkge1xyXG4gICAgICBpZiAoYVszXVtpXSAhPSBiWzNdW2ldKSByZXR1cm4gYVszXVtpXSA+IGJbM11baV0gPyAxIDogLTE7XHJcbiAgICAgIGkrKztcclxuICAgIH1cclxuICAgIHJldHVybiBhWzNdLmxlbmd0aCAtIGJbM10ubGVuZ3RoO1xyXG4gIH0pKTtcclxuXHJcbiAgdHIuYXBwZW5kQ2hpbGQoY3JlYXRlQ29sdW1uSGVhZGVyKFwiVmFsdWVcIiwgXCJWYWx1ZVwiLCAoYSwgYikgPT4ge1xyXG4gICAgaWYgKGFbMV0gIT0gYlsxXSkgcmV0dXJuIGFbMV0gPiBiWzFdID8gMSA6IC0xO1xyXG4gICAgZWxzZSByZXR1cm4gMDtcclxuICB9KSk7XHJcblxyXG4gIHRyLmFwcGVuZENoaWxkKGNyZWF0ZUNvbHVtbkhlYWRlcihcIkZvb3RwcmludFwiLCBcIkZvb3RwcmludFwiLCAoYSwgYikgPT4ge1xyXG4gICAgaWYgKGFbMl0gIT0gYlsyXSkgcmV0dXJuIGFbMl0gPiBiWzJdID8gMSA6IC0xO1xyXG4gICAgZWxzZSByZXR1cm4gMDtcclxuICB9KSk7XHJcblxyXG4gIGlmKGdsb2JhbERhdGEuZ2V0Q29tYmluZVZhbHVlcygpKVxyXG4gIHtcclxuICAgIHRyLmFwcGVuZENoaWxkKGNyZWF0ZUNvbHVtbkhlYWRlcihcIlF1YW50aXR5XCIsIFwiUXVhbnRpdHlcIiwgKGEsIGIpID0+IHtcclxuICAgICAgcmV0dXJuIGFbM10ubGVuZ3RoIC0gYlszXS5sZW5ndGg7XHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBib21oZWFkLmFwcGVuZENoaWxkKHRyKTtcclxuXHJcbn1cclxuXHJcbi8vVE9ETzogVGhpcyBzaG91bGQgYmUgcmV3cml0dGVuIHRvIGludGVyYWN0IHdpdGgganNvbiB1c2luZyB0aGUgdGFncyBpbnN0ZWFkIG9mIFxyXG4vLyAgICAgIGhhdmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGhhcmRjb2RlZC5cclxuZnVuY3Rpb24gcG9wdWxhdGVCb21Cb2R5KCkge1xyXG4gIHdoaWxlIChib20uZmlyc3RDaGlsZCkge1xyXG4gICAgYm9tLnJlbW92ZUNoaWxkKGJvbS5maXJzdENoaWxkKTtcclxuICB9XHJcbiAgZ2xvYmFsRGF0YS5zZXRIaWdobGlnaHRIYW5kbGVycyhbXSk7XHJcbiAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZChudWxsKTtcclxuICB2YXIgZmlyc3QgPSB0cnVlO1xyXG4gIHN3aXRjaCAoZ2xvYmFsRGF0YS5nZXRDYW52YXNMYXlvdXQoKSkge1xyXG4gICAgY2FzZSAnRic6XHJcbiAgICAgIGJvbXRhYmxlVGVtcCA9IHBjYmRhdGEuYm9tLkY7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnRkInOlxyXG4gICAgICBib210YWJsZVRlbXAgPSBwY2JkYXRhLmJvbS5ib3RoO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0InOlxyXG4gICAgICBib210YWJsZVRlbXAgPSBwY2JkYXRhLmJvbS5CO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgLy8gSWYgdGhlIHBhcnRzIGFyZSBkaXNwbGF5ZWQgb25lIHBlciBsaW5lIChub3QgY29tYmluZWQgdmFsdWVzKSwgdGhlbiB0aGUgdGhlIGJvbSB0YWJsZSBuZWVkcyB0byBiZSBmbGF0dGVuZWQuIFxyXG4gIC8vIEJ5IGRlZmF1bHQgdGhlIGRhdGEgaW4gdGhlIGpzb24gZmlsZSBpcyBjb21iaW5lZFxyXG4gIGlmKGdsb2JhbERhdGEuZ2V0Q29tYmluZVZhbHVlcygpKVxyXG4gIHtcclxuICAgIGJvbXRhYmxlID0gYm9tdGFibGVUZW1wO1xyXG4gIH1cclxuICBlbHNlXHJcbiAge1xyXG4gICAgYm9tdGFibGUgPSBbXTtcclxuICAgIGZvcih2YXIgZW50cnkgb2YgYm9tdGFibGVUZW1wKXtcclxuICAgICAgZm9yKHZhciBwYXJ0IG9mIGVudHJ5WzNdKXtcclxuICAgICAgICAvL1hYWDogVGhpcyBmb3JtYXQgaXMgaGFyZCBjb2RlZCB0byB0aGUgZm9ybWF0IG9mIHRoZSBib20gZW50cnkgaW4gdGhlIGpzb24gZmlsZVxyXG4gICAgICAgIGJvbXRhYmxlLnB1c2goWzEsZW50cnlbMV0sZW50cnlbMl0sW3BhcnRdXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChnbG9iYWxEYXRhLmdldEJvbVNvcnRGdW5jdGlvbigpKSB7XHJcbiAgICBib210YWJsZSA9IGJvbXRhYmxlLnNsaWNlKCkuc29ydChnbG9iYWxEYXRhLmdldEJvbVNvcnRGdW5jdGlvbigpKTtcclxuICB9XHJcbiAgZm9yICh2YXIgaSBpbiBib210YWJsZSkge1xyXG4gICAgdmFyIGJvbWVudHJ5ID0gYm9tdGFibGVbaV07XHJcbiAgICBpZiAoZmlsdGVyICYmICFlbnRyeU1hdGNoZXMoYm9tZW50cnkpKSB7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG4gICAgdmFyIHJlZmVyZW5jZXMgPSBib21lbnRyeVszXTtcclxuICAgIGlmIChyZWZsb29rdXApIHtcclxuICAgICAgcmVmZXJlbmNlcyA9IGZpbmRSZWZJbkVudHJ5KGJvbWVudHJ5KTtcclxuICAgICAgaWYgKCFyZWZlcmVuY2VzKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJUUlwiKTtcclxuICAgIHZhciB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJURFwiKTtcclxuICAgIHZhciByb3dudW0gPSAraSArIDE7XHJcbiAgICB0ci5pZCA9IFwiYm9tcm93XCIgKyByb3dudW07XHJcbiAgICB0ZC50ZXh0Q29udGVudCA9IHJvd251bTtcclxuICAgIHRyLmFwcGVuZENoaWxkKHRkKTtcclxuXHJcbiAgICAvLyBDaGVja2JveGVzXHJcbiAgICBmb3IgKHZhciBjaGVja2JveCBvZiBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKSkge1xyXG4gICAgICBpZiAoY2hlY2tib3gpIHtcclxuICAgICAgICB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJURFwiKTtcclxuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgaW5wdXQudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgICAgICBpbnB1dC5vbmNoYW5nZSA9IGNyZWF0ZUNoZWNrYm94Q2hhbmdlSGFuZGxlcihjaGVja2JveCwgcmVmZXJlbmNlcyk7XHJcbiAgICAgICAgc2V0Qm9tQ2hlY2tib3hTdGF0ZShjaGVja2JveCwgaW5wdXQsIHJlZmVyZW5jZXMpO1xyXG4gICAgICAgIHRkLmFwcGVuZENoaWxkKGlucHV0KTtcclxuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL0lORk86IFRoZSBsaW5lcyBiZWxvdyBhZGQgdGhlIGNvbnRyb2wgdGhlIGNvbHVtbnMgb24gdGhlIGJvbSB0YWJsZVxyXG4gICAgLy8gUmVmZXJlbmNlc1xyXG4gICAgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVERcIik7XHJcbiAgICB0ZC5pbm5lckhUTUwgPSBoaWdobGlnaHRGaWx0ZXIocmVmZXJlbmNlcy5qb2luKFwiLCBcIikpO1xyXG4gICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xyXG4gICAgLy8gVmFsdWVcclxuICAgIHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlREXCIpO1xyXG4gICAgdGQuaW5uZXJIVE1MID0gaGlnaGxpZ2h0RmlsdGVyKGJvbWVudHJ5WzFdKTtcclxuICAgIHRyLmFwcGVuZENoaWxkKHRkKTtcclxuICAgIC8vIEZvb3RwcmludFxyXG4gICAgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVERcIik7XHJcbiAgICB0ZC5pbm5lckhUTUwgPSBoaWdobGlnaHRGaWx0ZXIoYm9tZW50cnlbMl0pO1xyXG4gICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xyXG4gICAgXHJcbiAgICBpZihnbG9iYWxEYXRhLmdldENvbWJpbmVWYWx1ZXMoKSlcclxuICAgIHtcclxuXHJcbiAgICAgIHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlREXCIpO1xyXG4gICAgICB0ZC50ZXh0Q29udGVudCA9IGJvbWVudHJ5WzNdLmxlbmd0aDtcclxuICAgICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xyXG4gICAgfVxyXG4gICAgYm9tLmFwcGVuZENoaWxkKHRyKTtcclxuXHJcblxyXG4gICAgYm9tLmFwcGVuZENoaWxkKHRyKTtcclxuICAgIHZhciBoYW5kbGVyID0gY3JlYXRlUm93SGlnaGxpZ2h0SGFuZGxlcih0ci5pZCwgcmVmZXJlbmNlcyk7XHJcbiAgICB0ci5vbm1vdXNlbW92ZSA9IGhhbmRsZXI7XHJcbiAgICBnbG9iYWxEYXRhLnB1c2hIaWdobGlnaHRIYW5kbGVycyh7XHJcbiAgICAgIGlkOiB0ci5pZCxcclxuICAgICAgaGFuZGxlcjogaGFuZGxlcixcclxuICAgICAgcmVmczogcmVmZXJlbmNlc1xyXG4gICAgfSk7XHJcbiAgICBpZiAoKGZpbHRlciB8fCByZWZsb29rdXApICYmIGZpcnN0KSB7XHJcbiAgICAgIGhhbmRsZXIoKTtcclxuICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNtb290aFNjcm9sbFRvUm93KHJvd2lkKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocm93aWQpLnNjcm9sbEludG9WaWV3KHtcclxuICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxyXG4gICAgYmxvY2s6IFwiY2VudGVyXCIsXHJcbiAgICBpbmxpbmU6IFwibmVhcmVzdFwiXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZ2hsaWdodFByZXZpb3VzUm93KCkge1xyXG4gIGlmICghZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKSB7XHJcbiAgICBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpLmxlbmd0aCAtIDFdLmhhbmRsZXIoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGggPiAxICYmXHJcbiAgICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVswXS5pZCA9PSBnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpIHtcclxuICAgICAgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpW2dsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGggLSAxXS5oYW5kbGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICBpZiAoZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpW2kgKyAxXS5pZCA9PSBnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpIHtcclxuICAgICAgICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVtpXS5oYW5kbGVyKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgc21vb3RoU2Nyb2xsVG9Sb3coZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlnaGxpZ2h0TmV4dFJvdygpIHtcclxuICBpZiAoIWdsb2JhbERhdGEuZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKSkge1xyXG4gICAgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpWzBdLmhhbmRsZXIoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGggPiAxICYmXHJcbiAgICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVtnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKCkubGVuZ3RoIC0gMV0uaWQgPT0gZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKSB7XHJcbiAgICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVswXS5oYW5kbGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbaSAtIDFdLmlkID09IGdsb2JhbERhdGEuZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKSkge1xyXG4gICAgICAgICAgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpW2ldLmhhbmRsZXIoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBzbW9vdGhTY3JvbGxUb1JvdyhnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwb3B1bGF0ZUJvbVRhYmxlKCkge1xyXG4gIHBvcHVsYXRlQm9tSGVhZGVyKCk7XHJcbiAgcG9wdWxhdGVCb21Cb2R5KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZHVsZXNDbGlja2VkKHJlZmVyZW5jZXMpIHtcclxuICB2YXIgbGFzdENsaWNrZWRJbmRleCA9IHJlZmVyZW5jZXMuaW5kZXhPZihnbG9iYWxEYXRhLmdldExhc3RDbGlja2VkUmVmKCkpO1xyXG4gIHZhciByZWYgPSByZWZlcmVuY2VzWyhsYXN0Q2xpY2tlZEluZGV4ICsgMSkgJSByZWZlcmVuY2VzLmxlbmd0aF07XHJcbiAgZm9yICh2YXIgaGFuZGxlciBvZiBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKCkpIHtcclxuICAgIGlmIChoYW5kbGVyLnJlZnMuaW5kZXhPZihyZWYpID49IDApIHtcclxuICAgICAgZ2xvYmFsRGF0YS5zZXRMYXN0Q2xpY2tlZFJlZihyZWYpO1xyXG4gICAgICBoYW5kbGVyLmhhbmRsZXIoKTtcclxuICAgICAgc21vb3RoU2Nyb2xsVG9Sb3coZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVGaWx0ZXIoaW5wdXQpIHtcclxuICBmaWx0ZXIgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xyXG4gIHBvcHVsYXRlQm9tVGFibGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUmVmTG9va3VwKGlucHV0KSB7XHJcbiAgcmVmbG9va3VwID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcclxuICBwb3B1bGF0ZUJvbVRhYmxlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNpbGtzY3JlZW5WaXNpYmxlKHZpc2libGUpIHtcclxuICBpZiAodmlzaWJsZSkge1xyXG4gICAgYWxsY2FudmFzLmZyb250LnNpbGsuc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgICBhbGxjYW52YXMuYmFjay5zaWxrLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xyXG4gICAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJzaWxrc2NyZWVuVmlzaWJsZVwiLCB0cnVlKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWxsY2FudmFzLmZyb250LnNpbGsuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgYWxsY2FudmFzLmJhY2suc2lsay5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBnbG9iYWxEYXRhLndyaXRlU3RvcmFnZShcInNpbGtzY3JlZW5WaXNpYmxlXCIsIGZhbHNlKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZUNhbnZhc0xheW91dChsYXlvdXQpIHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsLWJ0blwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZGVwcmVzc2VkXCIpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmItYnRuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXByZXNzZWRcIik7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibC1idG5cIikuY2xhc3NMaXN0LnJlbW92ZShcImRlcHJlc3NlZFwiKTtcclxuICBzd2l0Y2ggKGxheW91dCkge1xyXG4gICAgY2FzZSAnRic6XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmwtYnRuXCIpLmNsYXNzTGlzdC5hZGQoXCJkZXByZXNzZWRcIik7XHJcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEJvbUxheW91dCgpICE9IFwiQk9NXCIpIHtcclxuICAgICAgICBnbG9iYWxEYXRhLmNvbGxhcHNlQ2FudmFzU3BsaXQoMSk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdCJzpcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibC1idG5cIikuY2xhc3NMaXN0LmFkZChcImRlcHJlc3NlZFwiKTtcclxuICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0Qm9tTGF5b3V0KCkgIT0gXCJCT01cIikge1xyXG4gICAgICAgIGdsb2JhbERhdGEuY29sbGFwc2VDYW52YXNTcGxpdCgwKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmItYnRuXCIpLmNsYXNzTGlzdC5hZGQoXCJkZXByZXNzZWRcIik7XHJcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEJvbUxheW91dCgpICE9IFwiQk9NXCIpIHtcclxuICAgICAgICBnbG9iYWxEYXRhLnNldFNpemVzQ2FudmFzU3BsaXQoWzUwLCA1MF0pO1xyXG4gICAgICB9XHJcbiAgfVxyXG4gIGdsb2JhbERhdGEuc2V0Q2FudmFzTGF5b3V0KGxheW91dCk7XHJcbiAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJjYW52YXNsYXlvdXRcIiwgbGF5b3V0KTtcclxuICByZW5kZXIucmVzaXplQWxsKCk7XHJcbiAgcG9wdWxhdGVCb21UYWJsZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwb3B1bGF0ZU1ldGFkYXRhKCkge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIikuaW5uZXJIVE1MICAgID0gcGNiZGF0YS5tZXRhZGF0YS50aXRsZTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJldmlzaW9uXCIpLmlubmVySFRNTCA9IFwiUmV2OiBcIiArIHBjYmRhdGEubWV0YWRhdGEucmV2aXNpb247XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wYW55XCIpLmlubmVySFRNTCAgPSBwY2JkYXRhLm1ldGFkYXRhLmNvbXBhbnk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxlZGF0ZVwiKS5pbm5lckhUTUwgPSBwY2JkYXRhLm1ldGFkYXRhLmRhdGU7XHJcbiAgaWYgKHBjYmRhdGEubWV0YWRhdGEudGl0bGUgIT0gXCJcIikge1xyXG4gICAgZG9jdW1lbnQudGl0bGUgPSBwY2JkYXRhLm1ldGFkYXRhLnRpdGxlICsgXCIgQk9NXCI7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VCb21MYXlvdXQobGF5b3V0KSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib20tYnRuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXByZXNzZWRcIik7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsci1idG5cIikuY2xhc3NMaXN0LnJlbW92ZShcImRlcHJlc3NlZFwiKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRiLWJ0blwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZGVwcmVzc2VkXCIpO1xyXG4gIHN3aXRjaCAobGF5b3V0KSB7XHJcbiAgICBjYXNlICdCT00nOlxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvbS1idG5cIikuY2xhc3NMaXN0LmFkZChcImRlcHJlc3NlZFwiKTtcclxuICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0Qm9tU3BsaXQoKSkge1xyXG4gICAgICAgIGdsb2JhbERhdGEuZGVzdHJveUJvbVNwbGl0KCk7XHJcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRCb21TcGxpdChudWxsKTtcclxuICAgICAgICBnbG9iYWxEYXRhLmRlc3Ryb3lDYW52YXNTcGxpdCgpO1xyXG4gICAgICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzU3BsaXQobnVsbCk7XHJcbiAgICAgIH1cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcm9udGNhbnZhc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja2NhbnZhc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm90XCIpLnN0eWxlLmhlaWdodCA9IFwiXCI7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnVEInOlxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRiLWJ0blwiKS5jbGFzc0xpc3QuYWRkKFwiZGVwcmVzc2VkXCIpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb250Y2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm90XCIpLnN0eWxlLmhlaWdodCA9IFwiY2FsYygxMDAlIC0gODBweClcIjtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib21kaXZcIikuY2xhc3NMaXN0LnJlbW92ZShcInNwbGl0LWhvcml6b250YWxcIik7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzZGl2XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJzcGxpdC1ob3Jpem9udGFsXCIpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb250Y2FudmFzXCIpLmNsYXNzTGlzdC5hZGQoXCJzcGxpdC1ob3Jpem9udGFsXCIpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIikuY2xhc3NMaXN0LmFkZChcInNwbGl0LWhvcml6b250YWxcIik7XHJcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEJvbVNwbGl0KCkpIHtcclxuICAgICAgICBnbG9iYWxEYXRhLmRlc3Ryb3lCb21TcGxpdCgpO1xyXG4gICAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU3BsaXQobnVsbCk7XHJcbiAgICAgICAgZ2xvYmFsRGF0YS5kZXN0cm95Q2FudmFzU3BsaXQoKTtcclxuICAgICAgICBnbG9iYWxEYXRhLnNldENhbnZhc1NwbGl0KG51bGwpO1xyXG4gICAgICB9XHJcbiAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU3BsaXQoU3BsaXQoWycjYm9tZGl2JywgJyNjYW52YXNkaXYnXSwge1xyXG4gICAgICAgIHNpemVzOiBbNTAsIDUwXSxcclxuICAgICAgICBvbkRyYWdFbmQ6IHJlbmRlci5yZXNpemVBbGwsXHJcbiAgICAgICAgZGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsXHJcbiAgICAgICAgZ3V0dGVyU2l6ZTogNVxyXG4gICAgICB9KSk7XHJcbiAgICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzU3BsaXQoU3BsaXQoWycjZnJvbnRjYW52YXMnLCAnI2JhY2tjYW52YXMnXSwge1xyXG4gICAgICAgIHNpemVzOiBbNTAsIDUwXSxcclxuICAgICAgICBndXR0ZXJTaXplOiA1LFxyXG4gICAgICAgIG9uRHJhZ0VuZDogcmVuZGVyLnJlc2l6ZUFsbFxyXG4gICAgICB9KSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnTFInOlxyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxyLWJ0blwiKS5jbGFzc0xpc3QuYWRkKFwiZGVwcmVzc2VkXCIpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb250Y2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm90XCIpLnN0eWxlLmhlaWdodCA9IFwiY2FsYygxMDAlIC0gODBweClcIjtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib21kaXZcIikuY2xhc3NMaXN0LmFkZChcInNwbGl0LWhvcml6b250YWxcIik7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzZGl2XCIpLmNsYXNzTGlzdC5hZGQoXCJzcGxpdC1ob3Jpem9udGFsXCIpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb250Y2FudmFzXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJzcGxpdC1ob3Jpem9udGFsXCIpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIikuY2xhc3NMaXN0LnJlbW92ZShcInNwbGl0LWhvcml6b250YWxcIik7XHJcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEJvbVNwbGl0KCkpIHtcclxuICAgICAgICBnbG9iYWxEYXRhLmRlc3Ryb3lCb21TcGxpdCgpO1xyXG4gICAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU3BsaXQobnVsbCk7XHJcbiAgICAgICAgZ2xvYmFsRGF0YS5kZXN0cm95Q2FudmFzU3BsaXQoKTtcclxuICAgICAgICBnbG9iYWxEYXRhLnNldENhbnZhc1NwbGl0KG51bGwpO1xyXG4gICAgICB9XHJcbiAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU3BsaXQoU3BsaXQoWycjYm9tZGl2JywgJyNjYW52YXNkaXYnXSwge1xyXG4gICAgICAgIHNpemVzOiBbNTAsIDUwXSxcclxuICAgICAgICBvbkRyYWdFbmQ6IHJlbmRlci5yZXNpemVBbGwsXHJcbiAgICAgICAgZ3V0dGVyU2l6ZTogNVxyXG4gICAgICB9KSk7XHJcbiAgICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzU3BsaXQoU3BsaXQoWycjZnJvbnRjYW52YXMnLCAnI2JhY2tjYW52YXMnXSwge1xyXG4gICAgICAgIHNpemVzOiBbNTAsIDUwXSxcclxuICAgICAgICBndXR0ZXJTaXplOiA1LFxyXG4gICAgICAgIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgIG9uRHJhZ0VuZDogcmVuZGVyLnJlc2l6ZUFsbFxyXG4gICAgICB9KSk7XHJcbiAgfVxyXG4gIGdsb2JhbERhdGEuc2V0Qm9tTGF5b3V0KGxheW91dCk7XHJcbiAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJib21sYXlvdXRcIiwgbGF5b3V0KTtcclxuICBjaGFuZ2VDYW52YXNMYXlvdXQoZ2xvYmFsRGF0YS5nZXRDYW52YXNMYXlvdXQoKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvY3VzSW5wdXRGaWVsZChpbnB1dCkge1xyXG4gIGlucHV0LnNjcm9sbEludG9WaWV3KGZhbHNlKTtcclxuICBpbnB1dC5mb2N1cygpO1xyXG4gIGlucHV0LnNlbGVjdCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb2N1c0ZpbHRlckZpZWxkKCkge1xyXG4gIGZvY3VzSW5wdXRGaWVsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbHRlclwiKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvY3VzUmVmTG9va3VwRmllbGQoKSB7XHJcbiAgZm9jdXNJbnB1dEZpZWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVmbG9va3VwXCIpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQm9tQ2hlY2tib3goYm9tcm93aWQsIGNoZWNrYm94bnVtKSB7XHJcbiAgaWYgKCFib21yb3dpZCB8fCBjaGVja2JveG51bSA+IGdsb2JhbERhdGEuZ2V0Q2hlY2tib3hlcygpLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICB2YXIgYm9tcm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm9tcm93aWQpO1xyXG4gIHZhciBjaGVja2JveCA9IGJvbXJvdy5jaGlsZE5vZGVzW2NoZWNrYm94bnVtXS5jaGlsZE5vZGVzWzBdO1xyXG4gIGNoZWNrYm94LmNoZWNrZWQgPSAhY2hlY2tib3guY2hlY2tlZDtcclxuICBjaGVja2JveC5pbmRldGVybWluYXRlID0gZmFsc2U7XHJcbiAgY2hlY2tib3gub25jaGFuZ2UoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tCb21DaGVja2JveChib21yb3dpZCwgY2hlY2tib3huYW1lKSB7XHJcbiAgdmFyIGNoZWNrYm94bnVtID0gMDtcclxuICB3aGlsZSAoY2hlY2tib3hudW0gPCBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKS5sZW5ndGggJiZcclxuICAgIGdsb2JhbERhdGEuZ2V0Q2hlY2tib3hlcygpW2NoZWNrYm94bnVtXS50b0xvd2VyQ2FzZSgpICE9IGNoZWNrYm94bmFtZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICBjaGVja2JveG51bSsrO1xyXG4gIH1cclxuICBpZiAoIWJvbXJvd2lkIHx8IGNoZWNrYm94bnVtID49IGdsb2JhbERhdGEuZ2V0Q2hlY2tib3hlcygpLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICB2YXIgYm9tcm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm9tcm93aWQpO1xyXG4gIHZhciBjaGVja2JveCA9IGJvbXJvdy5jaGlsZE5vZGVzW2NoZWNrYm94bnVtICsgMV0uY2hpbGROb2Rlc1swXTtcclxuICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcclxuICBjaGVja2JveC5pbmRldGVybWluYXRlID0gZmFsc2U7XHJcbiAgY2hlY2tib3gub25jaGFuZ2UoKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUd1dHRlck5vZGUobm9kZSkge1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAobm9kZS5jaGlsZE5vZGVzW2ldLmNsYXNzTGlzdCAmJlxyXG4gICAgICBub2RlLmNoaWxkTm9kZXNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ3V0dGVyXCIpKSB7XHJcbiAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5jaGlsZE5vZGVzW2ldKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhbkd1dHRlcnMoKSB7XHJcbiAgcmVtb3ZlR3V0dGVyTm9kZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvdFwiKSk7XHJcbiAgcmVtb3ZlR3V0dGVyTm9kZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc2RpdlwiKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEJvbUNoZWNrYm94ZXModmFsdWUpIHtcclxuICBnbG9iYWxEYXRhLnNldEJvbUNoZWNrYm94ZXModmFsdWUpO1xyXG4gIGdsb2JhbERhdGEud3JpdGVTdG9yYWdlKFwiYm9tQ2hlY2tib3hlc1wiLCB2YWx1ZSk7XHJcbiAgcG9wdWxhdGVCb21UYWJsZSgpO1xyXG59XHJcblxyXG5kb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbihlKSB7XHJcbiAgc3dpdGNoIChlLmtleSkge1xyXG4gICAgY2FzZSBcIm5cIjpcclxuICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudHlwZSA9PSBcInRleHRcIikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpICE9PSBudWxsKSB7XHJcbiAgICAgICAgY2hlY2tCb21DaGVja2JveChnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCksIFwicGxhY2VkXCIpO1xyXG4gICAgICAgIGhpZ2hsaWdodE5leHRSb3coKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiQXJyb3dVcFwiOlxyXG4gICAgICBoaWdobGlnaHRQcmV2aW91c1JvdygpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIkFycm93RG93blwiOlxyXG4gICAgICBoaWdobGlnaHROZXh0Um93KCk7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgaWYgKGUuYWx0S2V5KSB7XHJcbiAgICBzd2l0Y2ggKGUua2V5KSB7XHJcbiAgICAgIGNhc2UgXCJmXCI6XHJcbiAgICAgICAgZm9jdXNGaWx0ZXJGaWVsZCgpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInJcIjpcclxuICAgICAgICBmb2N1c1JlZkxvb2t1cEZpZWxkKCk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwielwiOlxyXG4gICAgICAgIGNoYW5nZUJvbUxheW91dChcIkJPTVwiKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJ4XCI6XHJcbiAgICAgICAgY2hhbmdlQm9tTGF5b3V0KFwiTFJcIik7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiY1wiOlxyXG4gICAgICAgIGNoYW5nZUJvbUxheW91dChcIlRCXCIpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInZcIjpcclxuICAgICAgICBjaGFuZ2VDYW52YXNMYXlvdXQoXCJGXCIpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImJcIjpcclxuICAgICAgICBjaGFuZ2VDYW52YXNMYXlvdXQoXCJGQlwiKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJuXCI6XHJcbiAgICAgICAgY2hhbmdlQ2FudmFzTGF5b3V0KFwiQlwiKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBpZiAoZS5rZXkgPj0gJzEnICYmIGUua2V5IDw9ICc5Jykge1xyXG4gICAgICB0b2dnbGVCb21DaGVja2JveChjdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCwgcGFyc2VJbnQoZS5rZXkpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XHJcbiAgZ2xvYmFsRGF0YS5pbml0U3RvcmFnZSgpO1xyXG4gIGNsZWFuR3V0dGVycygpO1xyXG4gIHJlbmRlci5pbml0UmVuZGVyKCk7XHJcbiAgZGJnZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYmdcIik7XHJcbiAgYm9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib21ib2R5XCIpO1xyXG4gIGJvbWhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvbWhlYWRcIik7XHJcbiAgZ2xvYmFsRGF0YS5zZXRCb21MYXlvdXQoZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcImJvbWxheW91dFwiKSk7XHJcbiAgaWYgKCFnbG9iYWxEYXRhLmdldEJvbUxheW91dCgpKSB7XHJcbiAgICBnbG9iYWxEYXRhLnNldEJvbUxheW91dChcIkxSXCIpO1xyXG4gIH1cclxuICBnbG9iYWxEYXRhLnNldENhbnZhc0xheW91dChnbG9iYWxEYXRhLnJlYWRTdG9yYWdlKFwiY2FudmFzbGF5b3V0XCIpKTtcclxuICBpZiAoIWdsb2JhbERhdGEuZ2V0Q2FudmFzTGF5b3V0KCkpIHtcclxuICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzTGF5b3V0KFwiRkJcIik7XHJcbiAgfVxyXG4gIC8vWFhYIFRoZXNlIGFyZSBhY3R1YWxseSBnbG9iYWwgdmFyaWFibGVzLiBQdXQgdGhlbSBpbiB0aGVyZSBvd24gZnVuY3Rpb25zIFxyXG4gIC8vIFRoZXJlIGlzIGFjdHVhbGx5IGEgaGlkZGVuIGRlcGVuZGVuY3kgZHVlIHRvIHRoZXNlIHR3byB2YXJpYWJsZXMuXHJcbiAgZmlsdGVyID0gXCJcIjtcclxuICByZWZsb29rdXAgPSBcIlwiO1xyXG4gIHBvcHVsYXRlTWV0YWRhdGEoKTtcclxuICBnbG9iYWxEYXRhLnNldEJvbUNoZWNrYm94ZXMoZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcImJvbUNoZWNrYm94ZXNcIikpO1xyXG4gIGlmIChnbG9iYWxEYXRhLmdldEJvbUNoZWNrYm94ZXMoKSA9PT0gbnVsbCkge1xyXG4gICAgZ2xvYmFsRGF0YS5zZXRCb21DaGVja2JveGVzKFwiUGxhY2VkXCIpO1xyXG4gIH1cclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvbUNoZWNrYm94ZXNcIikudmFsdWUgPSBnbG9iYWxEYXRhLmdldEJvbUNoZWNrYm94ZXMoKTtcclxuICBpZiAoZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcInNpbGtzY3JlZW5WaXNpYmxlXCIpID09PSBcImZhbHNlXCIpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lsa3NjcmVlbkNoZWNrYm94XCIpLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgIHNpbGtzY3JlZW5WaXNpYmxlKGZhbHNlKTtcclxuICB9XHJcbiAgaWYgKGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJyZWRyYXdPbkRyYWdcIikgPT09IFwiZmFsc2VcIikge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcmFnQ2hlY2tib3hcIikuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgZ2xvYmFsRGF0YS5zZXRSZWRyYXdPbkRyYWcoZmFsc2UpO1xyXG4gIH1cclxuICBpZiAoZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcImRhcmttb2RlXCIpID09PSBcInRydWVcIikge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXJrbW9kZUNoZWNrYm94XCIpLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgc2V0RGFya01vZGUodHJ1ZSk7XHJcbiAgfVxyXG4gIGlmIChnbG9iYWxEYXRhLnJlYWRTdG9yYWdlKFwiaGlnaGxpZ2h0cGluMVwiKSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaGxpZ2h0cGluMUNoZWNrYm94XCIpLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgZ2xvYmFsRGF0YS5zZXRIaWdobGlnaHRQaW4xKHRydWUpO1xyXG4gICAgcmVuZGVyLnJlZHJhd0NhbnZhcyhhbGxjYW52YXMuZnJvbnQpO1xyXG4gICAgcmVuZGVyLnJlZHJhd0NhbnZhcyhhbGxjYW52YXMuYmFjayk7XHJcbiAgfVxyXG4gIC8vIElmIHRoaXMgaXMgdHJ1ZSB0aGVuIGNvbWJpbmUgcGFydHMgYW5kIGRpc3BsYXkgcXVhbnRpdHlcclxuICBpZiAoZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcImNvbWJpbmVWYWx1ZXNcIikgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbWJpbmVWYWx1ZXNcIikuY2hlY2tlZCA9IHRydWU7XHJcbiAgICBnbG9iYWxEYXRhLnNldENvbWJpbmVWYWx1ZXModHJ1ZSk7XHJcbiAgfVxyXG4gIGJvYXJkUm90YXRpb24gPSBnbG9iYWxEYXRhLnJlYWRTdG9yYWdlKFwiYm9hcmRSb3RhdGlvblwiKTtcclxuICBpZiAoYm9hcmRSb3RhdGlvbiA9PT0gbnVsbCkge1xyXG4gICAgYm9hcmRSb3RhdGlvbiA9IDA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGJvYXJkUm90YXRpb24gPSBwYXJzZUludChib2FyZFJvdGF0aW9uKTtcclxuICB9XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZFJvdGF0aW9uXCIpLnZhbHVlID0gYm9hcmRSb3RhdGlvbiAvIDU7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3RhdGlvbkRlZ3JlZVwiKS50ZXh0Q29udGVudCA9IGJvYXJkUm90YXRpb247XHJcbiAgLy8gVHJpZ2dlcnMgcmVuZGVyXHJcbiAgY2hhbmdlQm9tTGF5b3V0KGdsb2JhbERhdGEuZ2V0Qm9tTGF5b3V0KCkpO1xyXG59XHJcblxyXG53aW5kb3cub25yZXNpemUgPSByZW5kZXIucmVzaXplQWxsO1xyXG53aW5kb3cubWF0Y2hNZWRpYShcInByaW50XCIpLmFkZExpc3RlbmVyKHJlbmRlci5yZXNpemVBbGwpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgc2V0RGFya01vZGUsIHNpbGtzY3JlZW5WaXNpYmxlLCB1cGRhdGVGaWx0ZXIsIHVwZGF0ZVJlZkxvb2t1cCwgY2hhbmdlQm9tTGF5b3V0LCBjaGFuZ2VDYW52YXNMYXlvdXQsIHNldEJvbUNoZWNrYm94ZXMsICBwb3B1bGF0ZUJvbVRhYmxlXHJcbn0iLCJ2YXIgcGNiRm9udCA9IHtcclxuICAgIFwiZm9udF9kYXRhXCI6IHtcclxuICAgICAgICBcIiBcIjoge1xyXG4gICAgICAgICAgICBcImxcIjogW10sXHJcbiAgICAgICAgICAgIFwid1wiOiAwLjc2MTkwNDc2MTkwNDc2MTlcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiI1wiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC43MTQyODU3MTQyODU3MTQyXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuOTA0NzYxOTA0NzYxOTA0NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNzE0Mjg1NzE0Mjg1NzE0MlxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjQ3NjE5MDQ3NjE5MDQ3NjE2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4xNDI4NTcxNDI4NTcxNDI4XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTkwNDc2MTkwNDc2MTkwNDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTQyODU3MTQyODU3MTQyODVcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC44MDk1MjM4MDk1MjM4MDk1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4yODU3MTQyODU3MTQyODU3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMDk1MjM4MDk1MjM4MDk1MjMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjI4NTcxNDI4NTcxNDI4NTdcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41MjM4MDk1MjM4MDk1MjM3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE0Mjg1NzE0Mjg1NzE0Mjg1XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuODA5NTIzODA5NTIzODA5NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMTQyODU3MTQyODU3MTQyOFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDEuMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCItXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjQyODU3MTQyODU3MTQyODU1XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEuMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNDI4NTcxNDI4NTcxNDI4NTVcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAxLjIzODA5NTIzODA5NTIzODFcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiLlwiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xNDI4NTcxNDI4NTcxNDI4NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjI4NTcxNDI4NTcxNDI4NTcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xNDI4NTcxNDI4NTcxNDI4NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAwLjQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjBcIjoge1xyXG4gICAgICAgICAgICBcImxcIjogW1xyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC40Mjg1NzE0Mjg1NzE0Mjg1NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjUyMzgwOTUyMzgwOTUyMzcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42MTkwNDc2MTkwNDc2MTkxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjcxNDI4NTcxNDI4NTcxNDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjg1NzE0Mjg1NzE0Mjg1NzFcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43NjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42NjY2NjY2NjY2NjY2NjY2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzYxOTA0NzYxOTA0NzYxOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNDI4NTcxNDI4NTcxNDI4NTVcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43MTQyODU3MTQyODU3MTQyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4yMzgwOTUyMzgwOTUyMzgwOFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjE0Mjg1NzE0Mjg1NzE0Mjg1XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41MjM4MDk1MjM4MDk1MjM3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC40Mjg1NzE0Mjg1NzE0Mjg1NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzMzMzMzMzMzMzMzMzMzMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xNDI4NTcxNDI4NTcxNDI4NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4yMzgwOTUyMzgwOTUyMzgwOFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC40Mjg1NzE0Mjg1NzE0Mjg1NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42NjY2NjY2NjY2NjY2NjY2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjg1NzE0Mjg1NzE0Mjg1NzFcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC45NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzMzMzMzMzMzMzMzMzMzMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjQyODU3MTQyODU3MTQyODU1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIndcIjogMC45NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIjFcIjoge1xyXG4gICAgICAgICAgICBcImxcIjogW1xyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43NjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4xOTA0NzYxOTA0NzYxOTA0NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNDc2MTkwNDc2MTkwNDc2MTYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjQ3NjE5MDQ3NjE5MDQ3NjE2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjkwNDc2MTkwNDc2MTkwNDdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC44MDk1MjM4MDk1MjM4MDk1XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTkwNDc2MTkwNDc2MTkwNDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjc2MTkwNDc2MTkwNDc2MTlcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAwLjk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiMlwiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC45NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjBcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4zMzMzMzMzMzMzMzMzMzMzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTcxNDI4NTcxNDI4NTcxNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjBcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43MTQyODU3MTQyODU3MTQyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC45NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzYxOTA0NzYxOTA0NzYxOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuODU3MTQyODU3MTQyODU3MVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjc2MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjc2MTkwNDc2MTkwNDc2MTlcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43MTQyODU3MTQyODU3MTQyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42MTkwNDc2MTkwNDc2MTkxXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTQyODU3MTQyODU3MTQyODUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjc2MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIzXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTQyODU3MTQyODU3MTQyODUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43NjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNDI4NTcxNDI4NTcxNDI4NTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjY2NjY2NjY2NjY2NjY2NjZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41NzE0Mjg1NzE0Mjg1NzE0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42NjY2NjY2NjY2NjY2NjY2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjE5MDQ3NjE5MDQ3NjE5MVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjcxNDI4NTcxNDI4NTcxNDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjU3MTQyODU3MTQyODU3MTRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43NjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC40NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjc2MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjIzODA5NTIzODA5NTIzODA4XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzE0Mjg1NzE0Mjg1NzE0MixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMTQyODU3MTQyODU3MTQyODVcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjU3MTQyODU3MTQyODU3MTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjI4NTcxNDI4NTcxNDI4NTcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE0Mjg1NzE0Mjg1NzE0Mjg1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xNDI4NTcxNDI4NTcxNDI4NVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCI0XCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNzE0Mjg1NzE0Mjg1NzE0MlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjQyODU3MTQyODU3MTQyODU1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wOTUyMzgwOTUyMzgwOTUxXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTkwNDc2MTkwNDc2MTkwNDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjM4MDk1MjM4MDk1MjM4MDkzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuODA5NTIzODA5NTIzODA5NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMzgwOTUyMzgwOTUyMzgwOTNcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAwLjk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiNVwiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjcxNDI4NTcxNDI4NTcxNDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC41NzE0Mjg1NzE0Mjg1NzE0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjYxOTA0NzYxOTA0NzYxOTFcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4zMzMzMzMzMzMzMzMzMzMzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42NjY2NjY2NjY2NjY2NjY2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTcxNDI4NTcxNDI4NTcxNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjY2NjY2NjY2NjY2NjY2NlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjYxOTA0NzYxOTA0NzYxOTFcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43MTQyODU3MTQyODU3MTQyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC41NzE0Mjg1NzE0Mjg1NzE0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzYxOTA0NzYxOTA0NzYxOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43NjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4yMzgwOTUyMzgwOTUyMzgwOFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjcxNDI4NTcxNDI4NTcxNDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjE0Mjg1NzE0Mjg1NzE0Mjg1XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41NzE0Mjg1NzE0Mjg1NzE0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4zMzMzMzMzMzMzMzMzMzMzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4xOTA0NzYxOTA0NzYxOTA0NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMTQyODU3MTQyODU3MTQyODVcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAwLjk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiOlwiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xNDI4NTcxNDI4NTcxNDI4NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjI4NTcxNDI4NTcxNDI4NTcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xNDI4NTcxNDI4NTcxNDI4NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjY2NjY2NjY2NjY2NjY2NlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjI4NTcxNDI4NTcxNDI4NTcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjYxOTA0NzYxOTA0NzYxOTFcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNTcxNDI4NTcxNDI4NTcxNFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42MTkwNDc2MTkwNDc2MTkxXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjY2NjY2NjY2NjY2NjY2NjZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNTcxNDI4NTcxNDI4NTcxNFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiQVwiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4zMzMzMzMzMzMzMzMzMzMzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMzMzMzMzMzMzMzMzMzMzM1xyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjA5NTIzODA5NTIzODA5NTIzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC40Mjg1NzE0Mjg1NzE0Mjg1NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjc2MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuODU3MTQyODU3MTQyODU3MVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJCXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTcxNDI4NTcxNDI4NTcxNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNTcxNDI4NTcxNDI4NTcxNFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjcxNDI4NTcxNDI4NTcxNDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjUyMzgwOTUyMzgwOTUyMzdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43NjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC40NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjgwOTUyMzgwOTUyMzgwOTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjM4MDk1MjM4MDk1MjM4MDkzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuODA5NTIzODA5NTIzODA5NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMjM4MDk1MjM4MDk1MjM4MDhcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43NjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xNDI4NTcxNDI4NTcxNDI4NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjcxNDI4NTcxNDI4NTcxNDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41NzE0Mjg1NzE0Mjg1NzE0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjY2NjY2NjY2NjY2NjY2NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjcxNDI4NTcxNDI4NTcxNDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43NjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC44NTcxNDI4NTcxNDI4NTcxXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzYxOTA0NzYxOTA0NzYxOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNzYxOTA0NzYxOTA0NzYxOVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjcxNDI4NTcxNDI4NTcxNDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjY2NjY2NjY2NjY2NjY2NjZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42NjY2NjY2NjY2NjY2NjY1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42MTkwNDc2MTkwNDc2MTkxXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTcxNDI4NTcxNDI4NTcxNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNTcxNDI4NTcxNDI4NTcxNFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC41NzE0Mjg1NzE0Mjg1NzE0XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIndcIjogMS4wXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIkNcIjoge1xyXG4gICAgICAgICAgICBcImxcIjogW1xyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC44MDk1MjM4MDk1MjM4MDk1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xNDI4NTcxNDI4NTcxNDI4NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjc2MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTIzODA5NTIzODA5NTIzNyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjg1NzE0Mjg1NzE0Mjg1NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMTkwNDc2MTkwNDc2MTkwNDdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMjg1NzE0Mjg1NzE0Mjg1N1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC40NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42MTkwNDc2MTkwNDc2MTkxXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjgwOTUyMzgwOTUyMzgwOTVcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC45MDQ3NjE5MDQ3NjE5MDQ3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjBcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41MjM4MDk1MjM4MDk1MjM3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjc2MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjBcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC44MDk1MjM4MDk1MjM4MDk1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC45NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIndcIjogMS4wXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIkRcIjoge1xyXG4gICAgICAgICAgICBcImxcIjogW1xyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC40NzYxOTA0NzYxOTA0NzYxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzE0Mjg1NzE0Mjg1NzE0MixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuOTA0NzYxOTA0NzYxOTA0N1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjc2MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjgwOTUyMzgwOTUyMzgwOTVcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC44MDk1MjM4MDk1MjM4MDk0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42MTkwNDc2MTkwNDc2MTkxXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuODA5NTIzODA5NTIzODA5NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43NjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4yODU3MTQyODU3MTQyODU3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzE0Mjg1NzE0Mjg1NzE0MixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMTkwNDc2MTkwNDc2MTkwNDdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNDc2MTkwNDc2MTkwNDc2MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDEuMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJFXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjU3MTQyODU3MTQyODU3MTRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41NzE0Mjg1NzE0Mjg1NzE0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC41NzE0Mjg1NzE0Mjg1NzE0XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzE0Mjg1NzE0Mjg1NzE0MixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzE0Mjg1NzE0Mjg1NzE0MixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuOTA0NzYxOTA0NzYxOTA0N1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJGXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTcxNDI4NTcxNDI4NTcxNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNTcxNDI4NTcxNDI4NTcxNFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC41NzE0Mjg1NzE0Mjg1NzE0XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzE0Mjg1NzE0Mjg1NzE0MixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuODU3MTQyODU3MTQyODU3MVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJHXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzYxOTA0NzYxOTA0NzYxOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41MjM4MDk1MjM4MDk1MjM3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjBcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC45MDQ3NjE5MDQ3NjE5MDQ3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjgwOTUyMzgwOTUyMzgwOTVcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4xOTA0NzYxOTA0NzYxOTA0NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjE5MDQ3NjE5MDQ3NjE5MVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC40NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4yODU3MTQyODU3MTQyODU3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjg1NzE0Mjg1NzE0Mjg1NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMTkwNDc2MTkwNDc2MTkwNDdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4zODA5NTIzODA5NTIzODA5MyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41MjM4MDk1MjM4MDk1MjM3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42MTkwNDc2MTkwNDc2MTkxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43NjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjgwOTUyMzgwOTUyMzgwOTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjE0Mjg1NzE0Mjg1NzE0Mjg1XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuODA5NTIzODA5NTIzODA5NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42MTkwNDc2MTkwNDc2MTkxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC40NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDEuMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJJXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIndcIjogMC40NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJKXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTIzODA5NTIzODA5NTIzNyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjUyMzgwOTUyMzgwOTUyMzcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjMzMzMzMzMzMzMzMzMzMzNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC40NzYxOTA0NzYxOTA0NzYxNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMTkwNDc2MTkwNDc2MTkwNDdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4zODA5NTIzODA5NTIzODA5MyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTQyODU3MTQyODU3MTQyODUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuNzYxOTA0NzYxOTA0NzYxOVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJMXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzE0Mjg1NzE0Mjg1NzE0MixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIndcIjogMC44MDk1MjM4MDk1MjM4MDk1XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIk1cIjoge1xyXG4gICAgICAgICAgICBcImxcIjogW1xyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41NzE0Mjg1NzE0Mjg1NzE0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4zMzMzMzMzMzMzMzMzMzMzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuOTA0NzYxOTA0NzYxOTA0NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjkwNDc2MTkwNDc2MTkwNDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDEuMTQyODU3MTQyODU3MTQyOFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJOXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuODA5NTIzODA5NTIzODA5NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuODA5NTIzODA5NTIzODA5NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJQXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzE0Mjg1NzE0Mjg1NzE0MixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjc2MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC44MDk1MjM4MDk1MjM4MDk0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC44NTcxNDI4NTcxNDI4NTcxXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuODA5NTIzODA5NTIzODA5NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNzE0Mjg1NzE0Mjg1NzE0MlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjc2MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjYxOTA0NzYxOTA0NzYxOTFcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43MTQyODU3MTQyODU3MTQyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC41NzE0Mjg1NzE0Mjg1NzE0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC41MjM4MDk1MjM4MDk1MjM3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjUyMzgwOTUyMzgwOTUyMzdcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAxLjBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiUlwiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjgwOTUyMzgwOTUyMzgwOTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjQ3NjE5MDQ3NjE5MDQ3NjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjUyMzgwOTUyMzgwOTUyMzdcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43MTQyODU3MTQyODU3MTQyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzYxOTA0NzYxOTA0NzYxOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjgwOTUyMzgwOTUyMzgwOTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjg1NzE0Mjg1NzE0Mjg1NzFcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC44MDk1MjM4MDk1MjM4MDk0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC43MTQyODU3MTQyODU3MTQyXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzYxOTA0NzYxOTA0NzYxOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjE5MDQ3NjE5MDQ3NjE5MVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjcxNDI4NTcxNDI4NTcxNDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjU3MTQyODU3MTQyODU3MTRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjUyMzgwOTUyMzgwOTUyMzdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNTIzODA5NTIzODA5NTIzN1xyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDEuMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJTXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTkwNDc2MTkwNDc2MTkwNDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzMzMzMzMzMzMzMzMzMzMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTcxNDI4NTcxNDI4NTcxNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43MTQyODU3MTQyODU3MTQyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xNDI4NTcxNDI4NTcxNDI4NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjc2MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjIzODA5NTIzODA5NTIzODA4XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzYxOTA0NzYxOTA0NzYxOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMzMzMzMzMzMzMzMzMzMzM1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjcxNDI4NTcxNDI4NTcxNDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjQyODU3MTQyODU3MTQyODU1XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41NzE0Mjg1NzE0Mjg1NzE0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC41MjM4MDk1MjM4MDk1MjM3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjU3MTQyODU3MTQyODU3MTRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42MTkwNDc2MTkwNDc2MTkxXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjY2NjY2NjY2NjY2NjY2NjZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4xOTA0NzYxOTA0NzYxOTA0NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNzYxOTA0NzYxOTA0NzYxOVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC44NTcxNDI4NTcxNDI4NTcxXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42MTkwNDc2MTkwNDc2MTkxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzYxOTA0NzYxOTA0NzYxOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJVXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMjM4MDk1MjM4MDk1MjM4MDhcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU2NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMTQyODU3MTQyODU3MTQyODVcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4zMzMzMzMzMzMzMzMzMzMyNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC40Mjg1NzE0Mjg1NzE0Mjg1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjcxNDI4NTcxNDI4NTcxNDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzYxOTA0NzYxOTA0NzYxOSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMTQyODU3MTQyODU3MTQyODVcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC44MDk1MjM4MDk1MjM4MDk0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4yMzgwOTUyMzgwOTUyMzgwOFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjgwOTUyMzgwOTUyMzgwOTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAxLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiVlwiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjA5NTIzODA5NTIzODA5NTIzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNDI4NTcxNDI4NTcxNDI4NTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjc2MTkwNDc2MTkwNDc2MTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAwLjg1NzE0Mjg1NzE0Mjg1NzFcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiV1wiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE0Mjg1NzE0Mjg1NzE0Mjg1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjU3MTQyODU3MTQyODU3MTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjc2MTkwNDc2MTkwNDc2MTlcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43NjE5MDQ3NjE5MDQ3NjE5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMS4wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIndcIjogMS4xNDI4NTcxNDI4NTcxNDI4XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlhcIjoge1xyXG4gICAgICAgICAgICBcImxcIjogW1xyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4xNDI4NTcxNDI4NTcxNDI4NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjgwOTUyMzgwOTUyMzgwOTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjgwOTUyMzgwOTUyMzgwOTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4xNDI4NTcxNDI4NTcxNDI4NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIndcIjogMC45NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImFcIjoge1xyXG4gICAgICAgICAgICBcImxcIjogW1xyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC41NzE0Mjg1NzE0Mjg1NzE0XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjY2NjY2NjY2NjY2NjY2NlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjUyMzgwOTUyMzgwOTUyMzcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjcxNDI4NTcxNDI4NTcxNDJcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4zMzMzMzMzMzMzMzMzMzMzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC43MTQyODU3MTQyODU3MTQyXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjY2NjY2NjY2NjY2NjY2NjZcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjU3MTQyODU3MTQyODU3MTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjMzMzMzMzMzMzMzMzMzMzMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xOTA0NzYxOTA0NzYxOTA0N1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4yODU3MTQyODU3MTQyODU3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjM4MDk1MjM4MDk1MjM4MDkzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzMzMzMzMzMzMzMzMzMzMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNDI4NTcxNDI4NTcxNDI4NTVcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41NzE0Mjg1NzE0Mjg1NzE0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC40Mjg1NzE0Mjg1NzE0Mjg1NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIndcIjogMC45MDQ3NjE5MDQ3NjE5MDQ3XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImRcIjoge1xyXG4gICAgICAgICAgICBcImxcIjogW1xyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wNDc2MTkwNDc2MTkwNDc0XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41NzE0Mjg1NzE0Mjg1NzE0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4zODA5NTIzODA5NTIzODA5MyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjg1NzE0Mjg1NzE0Mjg1NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMTQyODU3MTQyODU3MTQyODVcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4xOTA0NzYxOTA0NzYxOTA0NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMjM4MDk1MjM4MDk1MjM4MDhcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4xOTA0NzYxOTA0NzYxOTA0NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNTIzODA5NTIzODA5NTIzN1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42MTkwNDc2MTkwNDc2MTkxXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjg1NzE0Mjg1NzE0Mjg1NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjY2NjY2NjY2NjY2NjY2NlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjM4MDk1MjM4MDk1MjM4MDkzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC43MTQyODU3MTQyODU3MTQyXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTcxNDI4NTcxNDI4NTcxNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNzE0Mjg1NzE0Mjg1NzE0MlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjY2NjY2NjY2NjY2NjY2NjZcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAwLjkwNDc2MTkwNDc2MTkwNDdcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZVwiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjYxOTA0NzYxOTA0NzYxOTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTIzODA5NTIzODA5NTIzNyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzMzMzMzMzMzMzMzMzMzMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTkwNDc2MTkwNDc2MTkwNDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjE5MDQ3NjE5MDQ3NjE5MDQ3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTkwNDc2MTkwNDc2MTkwNDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjU3MTQyODU3MTQyODU3MTRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjY2NjY2NjY2NjY2NjY2NlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjMzMzMzMzMzMzMzMzMzMzMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjcxNDI4NTcxNDI4NTcxNDJcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41MjM4MDk1MjM4MDk1MjM3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC43MTQyODU3MTQyODU3MTQyXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjY2NjY2NjY2NjY2NjY2NlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjU3MTQyODU3MTQyODU3MTRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC40NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4zODA5NTIzODA5NTIzODA5M1xyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuODU3MTQyODU3MTQyODU3MVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJnXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNzE0Mjg1NzE0Mjg1NzE0MlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMDk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42MTkwNDc2MTkwNDc2MTkxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTcxNDI4NTcxNDI4NTcxNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjQ3NjE5MDQ3NjE5MDQ3NjE2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjI4NTcxNDI4NTcxNDI4NTdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4zMzMzMzMzMzMzMzMzMzMzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjI4NTcxNDI4NTcxNDI4NTdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTcxNDI4NTcxNDI4NTcxNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjI4NTcxNDI4NTcxNDI4NTcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjE0Mjg1NzE0Mjg1NzE0Mjg1XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTkwNDc2MTkwNDc2MTkwNDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjIzODA5NTIzODA5NTIzODA4XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTkwNDc2MTkwNDc2MTkwNDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjUyMzgwOTUyMzgwOTUyMzdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjE5MDQ3NjE5MDQ3NjE5MVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjI4NTcxNDI4NTcxNDI4NTcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjY2NjY2NjY2NjY2NjY2NjZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4zODA5NTIzODA5NTIzODA5MyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNzE0Mjg1NzE0Mjg1NzE0MlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjU3MTQyODU3MTQyODU3MTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjcxNDI4NTcxNDI4NTcxNDJcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42NjY2NjY2NjY2NjY2NjY2XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIndcIjogMC45MDQ3NjE5MDQ3NjE5MDQ3XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImlcIjoge1xyXG4gICAgICAgICAgICBcImxcIjogW1xyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjcxNDI4NTcxNDI4NTcxNDJcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMS4wXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xLjA0NzYxOTA0NzYxOTA0NzRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwia1wiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjMzMzMzMzMzMzMzMzMzMzMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjQyODU3MTQyODU3MTQyODU1XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNzE0Mjg1NzE0Mjg1NzE0MlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4zMzMzMzMzMzMzMzMzMzMzXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIndcIjogMC44MDk1MjM4MDk1MjM4MDk1XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImxcIjoge1xyXG4gICAgICAgICAgICBcImxcIjogW1xyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4zODA5NTIzODA5NTIzODA5MyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjg1NzE0Mjg1NzE0Mjg1NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDk1MjM4MDk1MjM4MDk1MjNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMTkwNDc2MTkwNDc2MTkwNDdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuNTIzODA5NTIzODA5NTIzN1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJuXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjcxNDI4NTcxNDI4NTcxNDJcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjYxOTA0NzYxOTA0NzYxOTFcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42NjY2NjY2NjY2NjY2NjY2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjcxNDI4NTcxNDI4NTcxNDJcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41MjM4MDk1MjM4MDk1MjM3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC43MTQyODU3MTQyODU3MTQyXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjY2NjY2NjY2NjY2NjY2NlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjU3MTQyODU3MTQyODU3MTRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAwLjkwNDc2MTkwNDc2MTkwNDdcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwib1wiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjM4MDk1MjM4MDk1MjM4MDkzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wOTUyMzgwOTUyMzgwOTUyM1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xNDI4NTcxNDI4NTcxNDI4NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4yMzgwOTUyMzgwOTUyMzgwOFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC41MjM4MDk1MjM4MDk1MjM3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjYxOTA0NzYxOTA0NzYxOTFcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42NjY2NjY2NjY2NjY2NjY2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjcxNDI4NTcxNDI4NTcxNDJcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC41MjM4MDk1MjM4MDk1MjM3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC43MTQyODU3MTQyODU3MTQyXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjY2NjY2NjY2NjY2NjY2NlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjYxOTA0NzYxOTA0NzYxOTFcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC43MTQyODU3MTQyODU3MTQyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC41MjM4MDk1MjM4MDk1MjM3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNzE0Mjg1NzE0Mjg1NzE0MixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMjM4MDk1MjM4MDk1MjM4MDhcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xNDI4NTcxNDI4NTcxNDI4NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjYxOTA0NzYxOTA0NzYxOTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTIzODA5NTIzODA5NTIzNyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuOTA0NzYxOTA0NzYxOTA0N1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJyXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC43MTQyODU3MTQyODU3MTQyXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjM4MDk1MjM4MDk1MjM4MDgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjUyMzgwOTUyMzgwOTUyMzdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yODU3MTQyODU3MTQyODU3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC42MTkwNDc2MTkwNDc2MTkxXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzMzMzMzMzMzMzMzMzMzMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjY2NjY2NjY2NjY2NjY2NlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjQyODU3MTQyODU3MTQyODU1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC43MTQyODU3MTQyODU3MTQyXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNTIzODA5NTIzODA5NTIzNyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNzE0Mjg1NzE0Mjg1NzE0MlxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgXCJ3XCI6IDAuNjE5MDQ3NjE5MDQ3NjE5MVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzXCI6IHtcclxuICAgICAgICAgICAgXCJsXCI6IFtcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTkwNDc2MTkwNDc2MTkwNDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMjg1NzE0Mjg1NzE0Mjg1NyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMDQ3NjE5MDQ3NjE5MDQ3NjE2XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNDc2MTkwNDc2MTkwNDc2MTYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjU3MTQyODU3MTQyODU3MTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjE5MDQ3NjE5MDQ3NjE5MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMTkwNDc2MTkwNDc2MTkwNDdcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42MTkwNDc2MTkwNDc2MTkxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4yMzgwOTUyMzgwOTUyMzgwOFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjU3MTQyODU3MTQyODU3MTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjMzMzMzMzMzMzMzMzMzMzNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC40NzYxOTA0NzYxOTA0NzYxNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMzgwOTUyMzgwOTUyMzgwOTNcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4zMzMzMzMzMzMzMzMzMzMzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4zODA5NTIzODA5NTIzODA5M1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC40Mjg1NzE0Mjg1NzE0Mjg1NVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE5MDQ3NjE5MDQ3NjE5MDQ3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC41MjM4MDk1MjM4MDk1MjM3XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMTkwNDc2MTkwNDc2MTkwNDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjU3MTQyODU3MTQyODU3MTRcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNjY2NjY2NjY2NjY2NjY2NlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjMzMzMzMzMzMzMzMzMzMzMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjcxNDI4NTcxNDI4NTcxNDJcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC40NzYxOTA0NzYxOTA0NzYxNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNzE0Mjg1NzE0Mjg1NzE0MlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjU3MTQyODU3MTQyODU3MTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjY2NjY2NjY2NjY2NjY2NjZcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAwLjgwOTUyMzgwOTUyMzgwOTVcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidFwiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjA5NTIzODA5NTIzODA5NTIzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC43MTQyODU3MTQyODU3MTQyXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNDc2MTkwNDc2MTkwNDc2MTYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjcxNDI4NTcxNDI4NTcxNDJcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTEuMDQ3NjE5MDQ3NjE5MDQ3NFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xOTA0NzYxOTA0NzYxOTA0N1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjI4NTcxNDI4NTcxNDI4NTcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjQ3NjE5MDQ3NjE5MDQ3NjE2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAwLjU3MTQyODU3MTQyODU3MTRcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidVwiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjcxNDI4NTcxNDI4NTcxNDJcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC42NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4wNDc2MTkwNDc2MTkwNDc2MTZcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgMC4yMzgwOTUyMzgwOTUyMzgwOCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuNzE0Mjg1NzE0Mjg1NzE0MlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjIzODA5NTIzODA5NTIzODA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC4xOTA0NzYxOTA0NzYxOTA0N1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjI4NTcxNDI4NTcxNDI4NTcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjUyMzgwOTUyMzgwOTUyMzcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjYxOTA0NzYxOTA0NzYxOTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA5NTIzODA5NTIzODA5NTIzXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLTAuMTQyODU3MTQyODU3MTQyODVcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAwLjkwNDc2MTkwNDc2MTkwNDdcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidlwiOiB7XHJcbiAgICAgICAgICAgIFwibFwiOiBbXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjE0Mjg1NzE0Mjg1NzE0Mjg1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtMC43MTQyODU3MTQyODU3MTQyXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAuMzgwOTUyMzgwOTUyMzgwOTMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjA0NzYxOTA0NzYxOTA0NzYxNlxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLjYxOTA0NzYxOTA0NzYxOTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0wLjcxNDI4NTcxNDI4NTcxNDJcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwid1wiOiAwLjc2MTkwNDc2MTkwNDc2MTlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvKiBQQ0IgcmVuZGVyaW5nIGNvZGUgKi9cclxuXHJcbnZhciBnbG9iYWxEYXRhID0gcmVxdWlyZSgnLi9nbG9iYWwuanMnKVxyXG5cclxuZnVuY3Rpb24gZGVnMnJhZChkZWcpIHtcclxuICByZXR1cm4gZGVnICogTWF0aC5QSSAvIDE4MDtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY0ZvbnRQb2ludChsaW5lcG9pbnQsIHRleHQsIG9mZnNldHgsIG9mZnNldHksIHRpbHQpIHtcclxuICB2YXIgcG9pbnQgPSBbXHJcbiAgICBsaW5lcG9pbnRbMF0gKiB0ZXh0LndpZHRoICsgb2Zmc2V0eCxcclxuICAgIGxpbmVwb2ludFsxXSAqIHRleHQuaGVpZ2h0ICsgb2Zmc2V0eVxyXG4gIF07XHJcbiAgLy8gQWRkaW5nIGhhbGYgYSBsaW5lIGhlaWdodCBoZXJlIGlzIHRlY2huaWNhbGx5IGEgYnVnXHJcbiAgLy8gYnV0IHBjYm5ldyBjdXJyZW50bHkgZG9lcyB0aGUgc2FtZSwgdGV4dCBpcyBzbGlnaHRseSBzaGlmdGVkLlxyXG4gIHBvaW50WzBdIC09IChwb2ludFsxXSArIHRleHQuaGVpZ2h0ICogMC41KSAqIHRpbHQ7XHJcbiAgcmV0dXJuIHBvaW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3dGV4dChjdHgsIHRleHQsIGNvbG9yLCBmbGlwKSB7XHJcbiAgY3R4LnNhdmUoKTtcclxuICBjdHgudHJhbnNsYXRlKC4uLnRleHQucG9zKTtcclxuICB2YXIgYW5nbGUgPSAtdGV4dC5hbmdsZTtcclxuICBpZiAodGV4dC5hdHRyLmluY2x1ZGVzKFwibWlycm9yZWRcIikpIHtcclxuICAgIGN0eC5zY2FsZSgtMSwgMSk7XHJcbiAgICBhbmdsZSA9IC1hbmdsZTtcclxuICB9XHJcbiAgdmFyIHRpbHQgPSAwO1xyXG4gIGlmICh0ZXh0LmF0dHIuaW5jbHVkZXMoXCJpdGFsaWNcIikpIHtcclxuICAgIHRpbHQgPSAwLjEyNTtcclxuICB9XHJcbiAgdmFyIGludGVybGluZSA9ICh0ZXh0LmhlaWdodCAqIDEuNSArIHRleHQudGhpY2tuZXNzKSAvIDI7XHJcbiAgdmFyIHR4dCA9IHRleHQudGV4dC5zcGxpdChcIlxcblwiKTtcclxuICBjdHgucm90YXRlKGRlZzJyYWQoYW5nbGUpKTtcclxuICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgY3R4LmxpbmVDYXAgPSBcInJvdW5kXCI7XHJcbiAgY3R4LmxpbmVXaWR0aCA9IHRleHQudGhpY2tuZXNzO1xyXG4gIGZvciAodmFyIGkgaW4gdHh0KSB7XHJcbiAgICB2YXIgb2Zmc2V0eSA9ICgtKHR4dC5sZW5ndGggLSAxKSArIGkgKiAyKSAqIGludGVybGluZSArIHRleHQuaGVpZ2h0IC8gMjtcclxuICAgIHZhciBsaW5lV2lkdGggPSAwO1xyXG4gICAgZm9yICh2YXIgYyBvZiB0eHRbaV0pIHtcclxuICAgICAgbGluZVdpZHRoICs9IHBjYkZvbnQuZm9udF9kYXRhW2NdLncgKiB0ZXh0LndpZHRoO1xyXG4gICAgfVxyXG4gICAgdmFyIG9mZnNldHggPSAwO1xyXG4gICAgc3dpdGNoICh0ZXh0Lmhvcml6X2p1c3RpZnkpIHtcclxuICAgICAgY2FzZSAtMTpcclxuICAgICAgICAvLyBKdXN0aWZ5IGxlZnQsIGRvIG5vdGhpbmdcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIC8vIEp1c3RpZnkgY2VudGVyXHJcbiAgICAgICAgb2Zmc2V0eCAtPSBsaW5lV2lkdGggLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgLy8gSnVzdGlmeSByaWdodFxyXG4gICAgICAgIG9mZnNldHggLT0gbGluZVdpZHRoO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgYyBvZiB0eHRbaV0pIHtcclxuICAgICAgZm9yICh2YXIgbGluZSBvZiBwY2JGb250LmZvbnRfZGF0YVtjXS5sKSB7XHJcbiAgICAgICAgLy8gRHJhd2luZyBlYWNoIHNlZ21lbnQgc2VwYXJhdGVseSBpbnN0ZWFkIG9mXHJcbiAgICAgICAgLy8gcG9seWxpbmUgYmVjYXVzZSByb3VuZCBsaW5lIGNhcHMgZG9uJ3Qgd29yayBpbiBqb2ludHNcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmUubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICBjdHgubW92ZVRvKC4uLmNhbGNGb250UG9pbnQobGluZVtpXSwgdGV4dCwgb2Zmc2V0eCwgb2Zmc2V0eSwgdGlsdCkpO1xyXG4gICAgICAgICAgY3R4LmxpbmVUbyguLi5jYWxjRm9udFBvaW50KGxpbmVbaSArIDFdLCB0ZXh0LCBvZmZzZXR4LCBvZmZzZXR5LCB0aWx0KSk7XHJcbiAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIG9mZnNldHggKz0gcGNiRm9udC5mb250X2RhdGFbY10udyAqIHRleHQud2lkdGg7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGN0eC5yZXN0b3JlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdlZGdlKGN0eCwgc2NhbGVmYWN0b3IsIGVkZ2UsIGNvbG9yKSB7XHJcbiAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgY3R4LmxpbmVXaWR0aCA9IE1hdGgubWF4KDEgLyBzY2FsZWZhY3RvciwgZWRnZS53aWR0aCk7XHJcbiAgY3R4LmxpbmVDYXAgPSBcInJvdW5kXCI7XHJcbiAgaWYgKGVkZ2UudHlwZSA9PSBcInNlZ21lbnRcIikgXHJcbiAge1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4Lm1vdmVUbyguLi5lZGdlLnN0YXJ0KTtcclxuICAgIGN0eC5saW5lVG8oLi4uZWRnZS5lbmQpO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG4gIH1cclxuICBpZiAoZWRnZS50eXBlID09IFwiYXJjXCIpIHtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5hcmMoXHJcbiAgICAgIC4uLmVkZ2Uuc3RhcnQsXHJcbiAgICAgIGVkZ2UucmFkaXVzLFxyXG4gICAgICBkZWcycmFkKGVkZ2Uuc3RhcnRhbmdsZSksXHJcbiAgICAgIGRlZzJyYWQoZWRnZS5lbmRhbmdsZSkpO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG4gIH1cclxuICBpZiAoZWRnZS50eXBlID09IFwiY2lyY2xlXCIpIHtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5hcmMoXHJcbiAgICAgIC4uLmVkZ2Uuc3RhcnQsXHJcbiAgICAgIGVkZ2UucmFkaXVzLFxyXG4gICAgICAwLCAyICogTWF0aC5QSSk7XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3Um91bmRSZWN0KGN0eCwgY29sb3IsIHNpemUsIHJhZGl1cywgY3R4bWV0aG9kKSB7XHJcbiAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gIHZhciB4ID0gc2l6ZVswXSAqIC0wLjU7XHJcbiAgdmFyIHkgPSBzaXplWzFdICogLTAuNTtcclxuICB2YXIgd2lkdGggPSBzaXplWzBdO1xyXG4gIHZhciBoZWlnaHQgPSBzaXplWzFdO1xyXG4gIGN0eC5tb3ZlVG8oeCwgMCk7XHJcbiAgY3R4LmFyY1RvKHgsIHkgKyBoZWlnaHQsIHggKyB3aWR0aCwgeSArIGhlaWdodCwgcmFkaXVzKTtcclxuICBjdHguYXJjVG8oeCArIHdpZHRoLCB5ICsgaGVpZ2h0LCB4ICsgd2lkdGgsIHksIHJhZGl1cyk7XHJcbiAgY3R4LmFyY1RvKHggKyB3aWR0aCwgeSwgeCwgeSwgcmFkaXVzKTtcclxuICBjdHguYXJjVG8oeCwgeSwgeCwgeSArIGhlaWdodCwgcmFkaXVzKTtcclxuICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgY3R4bWV0aG9kKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdPYmxvbmcoY3R4LCBjb2xvciwgc2l6ZSwgY3R4bWV0aG9kKSB7XHJcbiAgZHJhd1JvdW5kUmVjdChjdHgsIGNvbG9yLCBzaXplLCBNYXRoLm1pbihzaXplWzBdLCBzaXplWzFdKSAvIDIsIGN0eG1ldGhvZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdQb2x5Z29ucyhjdHgsIGNvbG9yLCBwb2x5Z29ucywgY3R4bWV0aG9kKSB7XHJcbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gIGlmKHBvbHlnb25zLmxlbmd0aD4wKVxyXG4gIHtcclxuICAgIGZvciAodmFyIHBvbHlnb24gb2YgcG9seWdvbnMpIHtcclxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICBmb3IgKHZhciB2ZXJ0ZXggb2YgcG9seWdvbikge1xyXG4gICAgICAgIGN0eC5saW5lVG8oLi4udmVydGV4KVxyXG4gICAgICB9XHJcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgY3R4bWV0aG9kKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3UG9seWdvblNoYXBlKGN0eCwgc2hhcGUsIGNvbG9yKSB7XHJcbiAgY3R4LnNhdmUoKTtcclxuICBjdHgudHJhbnNsYXRlKC4uLnNoYXBlLnBvcyk7XHJcbiAgY3R4LnJvdGF0ZShkZWcycmFkKC1zaGFwZS5hbmdsZSkpO1xyXG4gIGRyYXdQb2x5Z29ucyhjdHgsIGNvbG9yLCBzaGFwZS5wb2x5Z29ucywgY3R4LmZpbGwuYmluZChjdHgpKTtcclxuICBjdHgucmVzdG9yZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3RHJhd2luZyhjdHgsIGxheWVyLCBzY2FsZWZhY3RvciwgZHJhd2luZywgY29sb3IpIHtcclxuICBpZiAoW1wic2VnbWVudFwiLCBcImFyY1wiLCBcImNpcmNsZVwiXS5pbmNsdWRlcyhkcmF3aW5nLnR5cGUpKSB7XHJcbiAgICBkcmF3ZWRnZShjdHgsIHNjYWxlZmFjdG9yLCBkcmF3aW5nLCBjb2xvcik7XHJcbiAgfSBlbHNlIGlmIChkcmF3aW5nLnR5cGUgPT0gXCJwb2x5Z29uXCIpIHtcclxuICAgIGRyYXdQb2x5Z29uU2hhcGUoY3R4LCBkcmF3aW5nLCBjb2xvcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGRyYXd0ZXh0KGN0eCwgZHJhd2luZywgY29sb3IsIGxheWVyID09IFwiQlwiKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdDaXJjbGUoY3R4LCByYWRpdXMsIGN0eG1ldGhvZCkge1xyXG4gIGN0eC5iZWdpblBhdGgoKTtcclxuICBjdHguYXJjKDAsIDAsIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xyXG4gIGN0eC5jbG9zZVBhdGgoKTtcclxuICBjdHhtZXRob2QoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd1BhZChjdHgsIHBhZCwgY29sb3IsIG91dGxpbmUpIHtcclxuICBjdHguc2F2ZSgpO1xyXG4gIGN0eC50cmFuc2xhdGUoLi4ucGFkLnBvcyk7XHJcbiAgY3R4LnJvdGF0ZShkZWcycmFkKHBhZC5hbmdsZSkpO1xyXG4gIGlmIChwYWQub2Zmc2V0KSB7XHJcbiAgICBjdHgudHJhbnNsYXRlKC4uLnBhZC5vZmZzZXQpO1xyXG4gIH1cclxuICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgdmFyIGN0eG1ldGhvZCA9IG91dGxpbmUgPyBjdHguc3Ryb2tlLmJpbmQoY3R4KSA6IGN0eC5maWxsLmJpbmQoY3R4KTtcclxuICBpZiAocGFkLnNoYXBlID09IFwicmVjdFwiKSB7XHJcbiAgICB2YXIgcmVjdCA9IFsuLi5wYWQuc2l6ZS5tYXAoYyA9PiAtYyAqIDAuNSksIC4uLnBhZC5zaXplXTtcclxuICAgIGlmIChvdXRsaW5lKSB7XHJcbiAgICAgIGN0eC5zdHJva2VSZWN0KC4uLnJlY3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3R4LmZpbGxSZWN0KC4uLnJlY3QpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocGFkLnNoYXBlID09IFwib3ZhbFwiKSB7XHJcbiAgICBkcmF3T2Jsb25nKGN0eCwgY29sb3IsIHBhZC5zaXplLCBjdHhtZXRob2QpO1xyXG4gIH0gZWxzZSBpZiAocGFkLnNoYXBlID09IFwiY2lyY2xlXCIpIHtcclxuICAgIGRyYXdDaXJjbGUoY3R4LCBwYWQuc2l6ZVswXSAvIDIsIGN0eG1ldGhvZCk7XHJcbiAgfSBlbHNlIGlmIChwYWQuc2hhcGUgPT0gXCJyb3VuZHJlY3RcIikge1xyXG4gICAgZHJhd1JvdW5kUmVjdChjdHgsIGNvbG9yLCBwYWQuc2l6ZSwgcGFkLnJhZGl1cywgY3R4bWV0aG9kKTtcclxuICB9IGVsc2UgaWYgKHBhZC5zaGFwZSA9PSBcImN1c3RvbVwiKSB7XHJcbiAgICBkcmF3UG9seWdvbnMoY3R4LCBjb2xvciwgcGFkLnBvbHlnb25zLCBjdHhtZXRob2QpO1xyXG4gIH1cclxuICBpZiAocGFkLnR5cGUgPT0gXCJ0aFwiICYmICFvdXRsaW5lKSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjQ0NDQ0NDXCI7XHJcbiAgICBpZiAocGFkLmRyaWxsc2hhcGUgPT0gXCJvYmxvbmdcIikge1xyXG4gICAgICBkcmF3T2Jsb25nKGN0eCwgXCIjQ0NDQ0NDXCIsIHBhZC5kcmlsbHNpemUsIGN0eG1ldGhvZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkcmF3Q2lyY2xlKGN0eCwgcGFkLmRyaWxsc2l6ZVswXSAvIDIsIGN0eG1ldGhvZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGN0eC5yZXN0b3JlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdNb2R1bGUoY3R4LCBsYXllciwgc2NhbGVmYWN0b3IsIG1vZHVsZSwgcGFkY29sb3IsIG91dGxpbmVjb2xvciwgaGlnaGxpZ2h0KSB7XHJcbiAgaWYgKGhpZ2hsaWdodCkge1xyXG4gICAgLy8gZHJhdyBib3VuZGluZyBib3hcclxuICAgIGlmIChtb2R1bGUubGF5ZXIgPT0gbGF5ZXIpIHtcclxuICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4yO1xyXG4gICAgICBjdHgudHJhbnNsYXRlKC4uLm1vZHVsZS5iYm94LnBvcyk7XHJcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBwYWRjb2xvcjtcclxuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsLi4ubW9kdWxlLmJib3guc2l6ZSk7XHJcbiAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHBhZGNvbG9yO1xyXG4gICAgICBjdHguc3Ryb2tlUmVjdChcclxuICAgICAgICAwLCAwLFxyXG4gICAgICAgIC4uLm1vZHVsZS5iYm94LnNpemUpO1xyXG4gICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBkcmF3IGRyYXdpbmdzXHJcbiAgZm9yICh2YXIgZHJhd2luZyBvZiBtb2R1bGUuZHJhd2luZ3MpIHtcclxuICAgIGlmIChkcmF3aW5nLmxheWVyID09IGxheWVyKSB7XHJcbiAgICAgIGRyYXdEcmF3aW5nKGN0eCwgbGF5ZXIsIHNjYWxlZmFjdG9yLCBkcmF3aW5nLmRyYXdpbmcsIHBhZGNvbG9yKTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gZHJhdyBwYWRzXHJcbiAgZm9yICh2YXIgcGFkIG9mIG1vZHVsZS5wYWRzKSB7XHJcbiAgICBpZiAocGFkLmxheWVycy5pbmNsdWRlcyhsYXllcikpIHtcclxuICAgICAgZHJhd1BhZChjdHgsIHBhZCwgcGFkY29sb3IsIGZhbHNlKTtcclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgICBpZiAocGFkLnBpbjEgJiYgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRQaW4xKCkpIFxyXG4gICAgICB7XHJcbiAgICAgICAgZHJhd1BhZChjdHgsIHBhZCwgb3V0bGluZWNvbG9yLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0VkZ2VzKGNhbnZhcywgc2NhbGVmYWN0b3IpIHtcclxuICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICB2YXIgZWRnZWNvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0b3Btb3N0ZGl2KS5nZXRQcm9wZXJ0eVZhbHVlKCctLXBjYi1lZGdlLWNvbG9yJyk7XHJcbiAgZm9yICh2YXIgZWRnZSBvZiBwY2JkYXRhLmVkZ2VzKSB7XHJcbiAgICBkcmF3ZWRnZShjdHgsIHNjYWxlZmFjdG9yLCBlZGdlLCBlZGdlY29sb3IpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd01vZHVsZXMoY2FudmFzLCBsYXllciwgc2NhbGVmYWN0b3IsIGhpZ2hsaWdodGVkUmVmcykge1xyXG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gIGN0eC5saW5lV2lkdGggPSAzIC8gc2NhbGVmYWN0b3I7XHJcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0b3Btb3N0ZGl2KTtcclxuICB2YXIgcGFkY29sb3IgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCctLXBhZC1jb2xvcicpO1xyXG4gIHZhciBvdXRsaW5lY29sb3IgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCctLXBpbjEtb3V0bGluZS1jb2xvcicpO1xyXG4gIGlmIChoaWdobGlnaHRlZFJlZnMubGVuZ3RoID4gMCkge1xyXG4gICAgcGFkY29sb3IgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCctLXBhZC1jb2xvci1oaWdobGlnaHQnKTtcclxuICAgIG91dGxpbmVjb2xvciA9IHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJy0tcGluMS1vdXRsaW5lLWNvbG9yLWhpZ2hsaWdodCcpO1xyXG4gIH1cclxuICBmb3IgKHZhciBpIGluIHBjYmRhdGEubW9kdWxlcykge1xyXG4gICAgdmFyIG1vZCA9IHBjYmRhdGEubW9kdWxlc1tpXTtcclxuICAgIHZhciBoaWdobGlnaHQgPSBoaWdobGlnaHRlZFJlZnMuaW5jbHVkZXMobW9kLnJlZik7XHJcbiAgICBpZiAoaGlnaGxpZ2h0ZWRSZWZzLmxlbmd0aCA9PSAwIHx8IGhpZ2hsaWdodCkge1xyXG4gICAgICBkcmF3TW9kdWxlKGN0eCwgbGF5ZXIsIHNjYWxlZmFjdG9yLCBtb2QsIHBhZGNvbG9yLCBvdXRsaW5lY29sb3IsIGhpZ2hsaWdodCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3U2lsa3NjcmVlbihjYW52YXMsIGxheWVyLCBzY2FsZWZhY3Rvcilcclxue1xyXG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gIGZvciAodmFyIGQgb2YgcGNiZGF0YS5zaWxrc2NyZWVuW2xheWVyXSlcclxuICB7XHJcbiAgICBpZiAoW1wic2VnbWVudFwiLCBcImFyY1wiLCBcImNpcmNsZVwiXS5pbmNsdWRlcyhkLnR5cGUpKVxyXG4gICAge1xyXG4gICAgICBkcmF3ZWRnZShjdHgsIHNjYWxlZmFjdG9yLCBkLCBcIiNhYTRcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChkLnR5cGUgPT0gXCJwb2x5Z29uXCIpXHJcbiAgICB7XHJcbiAgICAgIGRyYXdQb2x5Z29uU2hhcGUoY3R4LCBkLCBcIiM0YWFcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIGRyYXd0ZXh0KGN0eCwgZCwgXCIjNGFhXCIsIGxheWVyID09IFwiQlwiKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyQ2FudmFzKGNhbnZhcykge1xyXG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gIGN0eC5zYXZlKCk7XHJcbiAgY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcclxuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgY3R4LnJlc3RvcmUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0hpZ2hsaWdodHNPbkxheWVyKGNhbnZhc2RpY3QpIHtcclxuICBjbGVhckNhbnZhcyhjYW52YXNkaWN0LmhpZ2hsaWdodCk7XHJcbiAgZHJhd01vZHVsZXMoY2FudmFzZGljdC5oaWdobGlnaHQsIGNhbnZhc2RpY3QubGF5ZXIsXHJcbiAgICBjYW52YXNkaWN0LnRyYW5zZm9ybS5zLCBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodGVkUmVmcygpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0hpZ2hsaWdodHMoKSB7XHJcbiAgZHJhd0hpZ2hsaWdodHNPbkxheWVyKGFsbGNhbnZhcy5mcm9udCk7XHJcbiAgZHJhd0hpZ2hsaWdodHNPbkxheWVyKGFsbGNhbnZhcy5iYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0JhY2tncm91bmQoY2FudmFzZGljdCkge1xyXG4gIGNsZWFyQ2FudmFzKGNhbnZhc2RpY3QuYmcpO1xyXG4gIGNsZWFyQ2FudmFzKGNhbnZhc2RpY3Quc2lsayk7XHJcbiAgZHJhd0VkZ2VzKGNhbnZhc2RpY3QuYmcsIGNhbnZhc2RpY3QudHJhbnNmb3JtLnMpO1xyXG4gIGRyYXdNb2R1bGVzKGNhbnZhc2RpY3QuYmcsIGNhbnZhc2RpY3QubGF5ZXIsIGNhbnZhc2RpY3QudHJhbnNmb3JtLnMsIFtdKTtcclxuICBkcmF3U2lsa3NjcmVlbihjYW52YXNkaWN0LnNpbGssIGNhbnZhc2RpY3QubGF5ZXIsIGNhbnZhc2RpY3QudHJhbnNmb3JtLnMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVwYXJlQ2FudmFzKGNhbnZhcywgZmxpcCwgdHJhbnNmb3JtKSB7XHJcbiAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcclxuICB2YXIgZm9udHNpemUgPSAxLjU1O1xyXG4gIGN0eC5zY2FsZSh0cmFuc2Zvcm0uem9vbSwgdHJhbnNmb3JtLnpvb20pO1xyXG4gIGN0eC50cmFuc2xhdGUodHJhbnNmb3JtLnBhbngsIHRyYW5zZm9ybS5wYW55KTtcclxuICBpZiAoZmxpcCkge1xyXG4gICAgY3R4LnNjYWxlKC0xLCAxKTtcclxuICB9XHJcbiAgY3R4LnRyYW5zbGF0ZSh0cmFuc2Zvcm0ueCwgdHJhbnNmb3JtLnkpO1xyXG4gIGN0eC5yb3RhdGUoZGVnMnJhZChib2FyZFJvdGF0aW9uKSk7XHJcbiAgY3R4LnNjYWxlKHRyYW5zZm9ybS5zLCB0cmFuc2Zvcm0ucyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByZXBhcmVMYXllcihjYW52YXNkaWN0KSB7XHJcbiAgdmFyIGZsaXAgPSAoY2FudmFzZGljdC5sYXllciAhPSBcIkJcIik7XHJcbiAgZm9yICh2YXIgYyBvZiBbXCJiZ1wiLCBcInNpbGtcIiwgXCJoaWdobGlnaHRcIl0pIHtcclxuICAgIHByZXBhcmVDYW52YXMoY2FudmFzZGljdFtjXSwgZmxpcCwgY2FudmFzZGljdC50cmFuc2Zvcm0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcm90YXRlVmVjdG9yKHYsIGFuZ2xlKSB7XHJcbiAgYW5nbGUgPSBkZWcycmFkKGFuZ2xlKTtcclxuICByZXR1cm4gW1xyXG4gICAgdlswXSAqIE1hdGguY29zKGFuZ2xlKSAtIHZbMV0gKiBNYXRoLnNpbihhbmdsZSksXHJcbiAgICB2WzBdICogTWF0aC5zaW4oYW5nbGUpICsgdlsxXSAqIE1hdGguY29zKGFuZ2xlKVxyXG4gIF07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5Um90YXRpb24oYmJveCkge1xyXG4gIHZhciBjb3JuZXJzID0gW1xyXG4gICAgW2Jib3gubWlueCwgYmJveC5taW55XSxcclxuICAgIFtiYm94Lm1pbngsIGJib3gubWF4eV0sXHJcbiAgICBbYmJveC5tYXh4LCBiYm94Lm1pbnldLFxyXG4gICAgW2Jib3gubWF4eCwgYmJveC5tYXh5XSxcclxuICBdO1xyXG4gIGNvcm5lcnMgPSBjb3JuZXJzLm1hcCgodikgPT4gcm90YXRlVmVjdG9yKHYsIGJvYXJkUm90YXRpb24pKTtcclxuICByZXR1cm4ge1xyXG4gICAgbWlueDogY29ybmVycy5yZWR1Y2UoKGEsIHYpID0+IE1hdGgubWluKGEsIHZbMF0pLCBJbmZpbml0eSksXHJcbiAgICBtaW55OiBjb3JuZXJzLnJlZHVjZSgoYSwgdikgPT4gTWF0aC5taW4oYSwgdlsxXSksIEluZmluaXR5KSxcclxuICAgIG1heHg6IGNvcm5lcnMucmVkdWNlKChhLCB2KSA9PiBNYXRoLm1heChhLCB2WzBdKSwgLUluZmluaXR5KSxcclxuICAgIG1heHk6IGNvcm5lcnMucmVkdWNlKChhLCB2KSA9PiBNYXRoLm1heChhLCB2WzFdKSwgLUluZmluaXR5KSxcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlY2FsY0xheWVyU2NhbGUoY2FudmFzZGljdCkge1xyXG4gIHZhciBjYW52YXNkaXZpZCA9IHtcclxuICAgIFwiRlwiOiBcImZyb250Y2FudmFzXCIsXHJcbiAgICBcIkJcIjogXCJiYWNrY2FudmFzXCJcclxuICB9IFtjYW52YXNkaWN0LmxheWVyXTtcclxuICB2YXIgd2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNkaXZpZCkuY2xpZW50V2lkdGggKiAyO1xyXG4gIHZhciBoZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNkaXZpZCkuY2xpZW50SGVpZ2h0ICogMjtcclxuICB2YXIgYmJveCA9IGFwcGx5Um90YXRpb24ocGNiZGF0YS5lZGdlc19iYm94KTtcclxuICB2YXIgc2NhbGVmYWN0b3IgPSAwLjk4ICogTWF0aC5taW4oXHJcbiAgICB3aWR0aCAvIChiYm94Lm1heHggLSBiYm94Lm1pbngpLFxyXG4gICAgaGVpZ2h0IC8gKGJib3gubWF4eSAtIGJib3gubWlueSlcclxuICApO1xyXG4gIGlmIChzY2FsZWZhY3RvciA8IDAuMSkge1xyXG4gICAgc2NhbGVmYWN0b3IgPSAxO1xyXG4gIH1cclxuICBjYW52YXNkaWN0LnRyYW5zZm9ybS5zID0gc2NhbGVmYWN0b3I7XHJcbiAgdmFyIGZsaXAgPSAoY2FudmFzZGljdC5sYXllciAhPSBcIkJcIik7XHJcbiAgaWYgKGZsaXApIHtcclxuICAgIGNhbnZhc2RpY3QudHJhbnNmb3JtLnggPSAtKChiYm94Lm1heHggKyBiYm94Lm1pbngpICogc2NhbGVmYWN0b3IgKyB3aWR0aCkgKiAwLjU7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNhbnZhc2RpY3QudHJhbnNmb3JtLnggPSAtKChiYm94Lm1heHggKyBiYm94Lm1pbngpICogc2NhbGVmYWN0b3IgLSB3aWR0aCkgKiAwLjU7XHJcbiAgfVxyXG4gIGNhbnZhc2RpY3QudHJhbnNmb3JtLnkgPSAtKChiYm94Lm1heHkgKyBiYm94Lm1pbnkpICogc2NhbGVmYWN0b3IgLSBoZWlnaHQpICogMC41O1xyXG4gIGZvciAodmFyIGMgb2YgW1wiYmdcIiwgXCJzaWxrXCIsIFwiaGlnaGxpZ2h0XCJdKSB7XHJcbiAgICBjYW52YXMgPSBjYW52YXNkaWN0W2NdO1xyXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gKHdpZHRoIC8gMikgKyBcInB4XCI7XHJcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gKGhlaWdodCAvIDIpICsgXCJweFwiO1xyXG4gIH1cclxuICBjb25zb2xlLmxvZyhcIlNjYWxlIGZhY3RvciBcIiArIGNhbnZhc2RpdmlkICsgXCI6IFwiLCBjYW52YXNkaWN0LnRyYW5zZm9ybSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZHJhd0NhbnZhcyhsYXllcmRpY3QpIHtcclxuICBwcmVwYXJlTGF5ZXIobGF5ZXJkaWN0KTtcclxuICBkcmF3QmFja2dyb3VuZChsYXllcmRpY3QpO1xyXG4gIGRyYXdIaWdobGlnaHRzT25MYXllcihsYXllcmRpY3QpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNpemVDYW52YXMobGF5ZXJkaWN0KSB7XHJcbiAgcmVjYWxjTGF5ZXJTY2FsZShsYXllcmRpY3QpO1xyXG4gIHJlZHJhd0NhbnZhcyhsYXllcmRpY3QpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNpemVBbGwoKSB7XHJcbiAgcmVzaXplQ2FudmFzKGFsbGNhbnZhcy5mcm9udCk7XHJcbiAgcmVzaXplQ2FudmFzKGFsbGNhbnZhcy5iYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYmJveFNjYW4obGF5ZXIsIHgsIHkpIHtcclxuICB2YXIgcmVzdWx0ID0gW107XHJcbiAgZm9yICh2YXIgaSBpbiBwY2JkYXRhLm1vZHVsZXMpIHtcclxuICAgIHZhciBtb2R1bGUgPSBwY2JkYXRhLm1vZHVsZXNbaV07XHJcbiAgICBpZiAobW9kdWxlLmxheWVyID09IGxheWVyKSB7XHJcbiAgICAgIHZhciBiID0gbW9kdWxlLmJib3g7XHJcbiAgICAgIGlmIChiLnBvc1swXSA8PSB4ICYmIGIucG9zWzBdICsgYi5zaXplWzBdID49IHggJiZcclxuICAgICAgICBiLnBvc1sxXSA8PSB5ICYmIGIucG9zWzFdICsgYi5zaXplWzFdID49IHkpIHtcclxuICAgICAgICByZXN1bHQucHVzaChtb2R1bGUucmVmKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZSwgbGF5ZXJkaWN0KSB7XHJcbiAgaWYgKGUud2hpY2ggIT0gMSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlc3RhcnR4ID0gZS5vZmZzZXRYO1xyXG4gIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2VzdGFydHkgPSBlLm9mZnNldFk7XHJcbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZWRvd254ID0gZS5vZmZzZXRYO1xyXG4gIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3dueSA9IGUub2Zmc2V0WTtcclxuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlZG93biA9IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZU1vdXNlQ2xpY2soZSwgbGF5ZXJkaWN0KSB7XHJcbiAgdmFyIHggPSBlLm9mZnNldFg7XHJcbiAgdmFyIHkgPSBlLm9mZnNldFk7XHJcbiAgdmFyIHQgPSBsYXllcmRpY3QudHJhbnNmb3JtO1xyXG4gIGlmIChsYXllcmRpY3QubGF5ZXIgPT0gXCJCXCIpIHtcclxuICAgIHggPSAoMiAqIHggLyB0Lnpvb20gLSB0LnBhbnggKyB0LngpIC8gLXQucztcclxuICB9IGVsc2Uge1xyXG4gICAgeCA9ICgyICogeCAvIHQuem9vbSAtIHQucGFueCAtIHQueCkgLyB0LnM7XHJcbiAgfVxyXG4gIHkgPSAoMiAqIHkgLyB0Lnpvb20gLSB0LnkgLSB0LnBhbnkpIC8gdC5zO1xyXG4gIHZhciB2ID0gcm90YXRlVmVjdG9yKFt4LCB5XSwgLWJvYXJkUm90YXRpb24pO1xyXG4gIHZhciByZWZsaXN0ID0gYmJveFNjYW4obGF5ZXJkaWN0LmxheWVyLCB2WzBdLCB2WzFdKTtcclxuICBpZiAocmVmbGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICBtb2R1bGVzQ2xpY2tlZChyZWZsaXN0KTtcclxuICAgIGRyYXdIaWdobGlnaHRzKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVNb3VzZVVwKGUsIGxheWVyZGljdCkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIGlmIChlLndoaWNoID09IDEgJiZcclxuICAgIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3duICYmXHJcbiAgICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlZG93bnggPT0gZS5vZmZzZXRYICYmXHJcbiAgICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlZG93bnkgPT0gZS5vZmZzZXRZKSB7XHJcbiAgICAvLyBUaGlzIGlzIGp1c3QgYSBjbGlja1xyXG4gICAgaGFuZGxlTW91c2VDbGljayhlLCBsYXllcmRpY3QpO1xyXG4gICAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZWRvd24gPSBmYWxzZTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgaWYgKGUud2hpY2ggPT0gMykge1xyXG4gICAgLy8gUmVzZXQgcGFuIGFuZCB6b29tIG9uIHJpZ2h0IGNsaWNrLlxyXG4gICAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5wYW54ID0gMDtcclxuICAgIGxheWVyZGljdC50cmFuc2Zvcm0ucGFueSA9IDA7XHJcbiAgICBsYXllcmRpY3QudHJhbnNmb3JtLnpvb20gPSAxO1xyXG4gICAgcmVkcmF3Q2FudmFzKGxheWVyZGljdCk7XHJcbiAgfSBlbHNlIGlmICghZ2xvYmFsRGF0YS5nZXRSZWRyYXdPbkRyYWcoKSkge1xyXG4gICAgcmVkcmF3Q2FudmFzKGxheWVyZGljdCk7XHJcbiAgfVxyXG4gIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3duID0gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZU1vdXNlTW92ZShlLCBsYXllcmRpY3QpIHtcclxuICBpZiAoIWxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3duKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIHZhciBkeCA9IGUub2Zmc2V0WCAtIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2VzdGFydHg7XHJcbiAgdmFyIGR5ID0gZS5vZmZzZXRZIC0gbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZXN0YXJ0eTtcclxuICBsYXllcmRpY3QudHJhbnNmb3JtLnBhbnggKz0gMiAqIGR4IC8gbGF5ZXJkaWN0LnRyYW5zZm9ybS56b29tO1xyXG4gIGxheWVyZGljdC50cmFuc2Zvcm0ucGFueSArPSAyICogZHkgLyBsYXllcmRpY3QudHJhbnNmb3JtLnpvb207XHJcbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZXN0YXJ0eCA9IGUub2Zmc2V0WDtcclxuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlc3RhcnR5ID0gZS5vZmZzZXRZO1xyXG4gIGlmIChnbG9iYWxEYXRhLmdldFJlZHJhd09uRHJhZygpKSB7XHJcbiAgICByZWRyYXdDYW52YXMobGF5ZXJkaWN0KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZU1vdXNlV2hlZWwoZSwgbGF5ZXJkaWN0KSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgdmFyIHQgPSBsYXllcmRpY3QudHJhbnNmb3JtO1xyXG4gIHZhciB3aGVlbGRlbHRhID0gZS5kZWx0YVk7XHJcbiAgaWYgKGUuZGVsdGFNb2RlID09IDEpIHtcclxuICAgIC8vIEZGIG9ubHksIHNjcm9sbCBieSBsaW5lc1xyXG4gICAgd2hlZWxkZWx0YSAqPSAzMDtcclxuICB9IGVsc2UgaWYgKGUuZGVsdGFNb2RlID09IDIpIHtcclxuICAgIHdoZWVsZGVsdGEgKj0gMzAwO1xyXG4gIH1cclxuICB2YXIgbSA9IE1hdGgucG93KDEuMSwgLXdoZWVsZGVsdGEgLyA0MCk7XHJcbiAgLy8gTGltaXQgYW1vdW50IG9mIHpvb20gcGVyIHRpY2suXHJcbiAgaWYgKG0gPiAyKSB7XHJcbiAgICBtID0gMjtcclxuICB9IGVsc2UgaWYgKG0gPCAwLjUpIHtcclxuICAgIG0gPSAwLjU7XHJcbiAgfVxyXG4gIHQuem9vbSAqPSBtO1xyXG4gIHZhciB6b29tZCA9ICgxIC0gbSkgLyB0Lnpvb207XHJcbiAgdC5wYW54ICs9IDIgKiBlLm9mZnNldFggKiB6b29tZDtcclxuICB0LnBhbnkgKz0gMiAqIGUub2Zmc2V0WSAqIHpvb21kO1xyXG4gIHJlZHJhd0NhbnZhcyhsYXllcmRpY3QpO1xyXG4gIGNvbnNvbGUubG9nKGxheWVyZGljdC50cmFuc2Zvcm0uem9vbSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE1vdXNlSGFuZGxlcnMoZGl2LCBsYXllcmRpY3QpIHtcclxuICBkaXYub25tb3VzZWRvd24gPSBmdW5jdGlvbihlKSB7XHJcbiAgICBoYW5kbGVNb3VzZURvd24oZSwgbGF5ZXJkaWN0KTtcclxuICB9O1xyXG4gIGRpdi5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIGhhbmRsZU1vdXNlTW92ZShlLCBsYXllcmRpY3QpO1xyXG4gIH07XHJcbiAgZGl2Lm9ubW91c2V1cCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIGhhbmRsZU1vdXNlVXAoZSwgbGF5ZXJkaWN0KTtcclxuICB9O1xyXG4gIGRpdi5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oZSkge1xyXG4gICAgaGFuZGxlTW91c2VVcChlLCBsYXllcmRpY3QpO1xyXG4gIH1cclxuICBkaXYub253aGVlbCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIGhhbmRsZU1vdXNlV2hlZWwoZSwgbGF5ZXJkaWN0KTtcclxuICB9XHJcbiAgZm9yICh2YXIgZWxlbWVudCBvZiBbZGl2LCBsYXllcmRpY3QuYmcsIGxheWVyZGljdC5zaWxrLCBsYXllcmRpY3QuaGlnaGxpZ2h0XSkge1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9LCBmYWxzZSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRCb2FyZFJvdGF0aW9uKHZhbHVlKSB7XHJcbiAgYm9hcmRSb3RhdGlvbiA9IHZhbHVlICogNTtcclxuICBnbG9iYWxEYXRhLndyaXRlU3RvcmFnZShcImJvYXJkUm90YXRpb25cIiwgYm9hcmRSb3RhdGlvbik7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3RhdGlvbkRlZ3JlZVwiKS50ZXh0Q29udGVudCA9IGJvYXJkUm90YXRpb247XHJcbiAgcmVzaXplQWxsKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRSZW5kZXIoKSB7XHJcbiAgYWxsY2FudmFzID0ge1xyXG4gICAgZnJvbnQ6IHtcclxuICAgICAgdHJhbnNmb3JtOiB7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwLFxyXG4gICAgICAgIHM6IDEsXHJcbiAgICAgICAgcGFueDogMCxcclxuICAgICAgICBwYW55OiAwLFxyXG4gICAgICAgIHpvb206IDEsXHJcbiAgICAgICAgbW91c2VzdGFydHg6IDAsXHJcbiAgICAgICAgbW91c2VzdGFydHk6IDAsXHJcbiAgICAgICAgbW91c2Vkb3duOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgYmc6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRl9iZ1wiKSxcclxuICAgICAgc2lsazogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJGX3Nsa1wiKSxcclxuICAgICAgaGlnaGxpZ2h0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkZfaGxcIiksXHJcbiAgICAgIGxheWVyOiBcIkZcIixcclxuICAgIH0sXHJcbiAgICBiYWNrOiB7XHJcbiAgICAgIHRyYW5zZm9ybToge1xyXG4gICAgICAgIHg6IDAsXHJcbiAgICAgICAgeTogMCxcclxuICAgICAgICBzOiAxLFxyXG4gICAgICAgIHBhbng6IDAsXHJcbiAgICAgICAgcGFueTogMCxcclxuICAgICAgICB6b29tOiAxLFxyXG4gICAgICAgIG1vdXNlc3RhcnR4OiAwLFxyXG4gICAgICAgIG1vdXNlc3RhcnR5OiAwLFxyXG4gICAgICAgIG1vdXNlZG93bjogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJnOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkJfYmdcIiksXHJcbiAgICAgIHNpbGs6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQl9zbGtcIiksXHJcbiAgICAgIGhpZ2hsaWdodDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJCX2hsXCIpLFxyXG4gICAgICBsYXllcjogXCJCXCIsXHJcbiAgICB9XHJcbiAgfTtcclxuICBhZGRNb3VzZUhhbmRsZXJzKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJvbnRjYW52YXNcIiksIGFsbGNhbnZhcy5mcm9udCk7XHJcbiAgYWRkTW91c2VIYW5kbGVycyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIiksIGFsbGNhbnZhcy5iYWNrKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgcmVzaXplQWxsLFxyXG4gIGluaXRSZW5kZXIsXHJcbiAgcmVkcmF3Q2FudmFzLFxyXG4gIGRyYXdIaWdobGlnaHRzLFxyXG4gIHNldEJvYXJkUm90YXRpb25cclxufTsiLCIvKlxyXG4gIFNwbGl0LmpzIC0gdjEuMy41XHJcbiAgTUlUIExpY2Vuc2VcclxuICBodHRwczovL2dpdGh1Yi5jb20vbmF0aGFuY2FoaWxsL1NwbGl0LmpzXHJcbiovXHJcbiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOmUuU3BsaXQ9dCgpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9d2luZG93LHQ9ZS5kb2N1bWVudCxuPVwiYWRkRXZlbnRMaXN0ZW5lclwiLGk9XCJyZW1vdmVFdmVudExpc3RlbmVyXCIscj1cImdldEJvdW5kaW5nQ2xpZW50UmVjdFwiLHM9ZnVuY3Rpb24oKXtyZXR1cm4hMX0sbz1lLmF0dGFjaEV2ZW50JiYhZVtuXSxhPVtcIlwiLFwiLXdlYmtpdC1cIixcIi1tb3otXCIsXCItby1cIl0uZmlsdGVyKGZ1bmN0aW9uKGUpe3ZhciBuPXQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gbi5zdHlsZS5jc3NUZXh0PVwid2lkdGg6XCIrZStcImNhbGMoOXB4KVwiLCEhbi5zdHlsZS5sZW5ndGh9KS5zaGlmdCgpK1wiY2FsY1wiLGw9ZnVuY3Rpb24oZSl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGV8fGUgaW5zdGFuY2VvZiBTdHJpbmc/dC5xdWVyeVNlbGVjdG9yKGUpOmV9O3JldHVybiBmdW5jdGlvbih1LGMpe2Z1bmN0aW9uIHooZSx0LG4pe3ZhciBpPUEoeSx0LG4pO09iamVjdC5rZXlzKGkpLmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGUuc3R5bGVbdF09aVt0XX0pfWZ1bmN0aW9uIGgoZSx0KXt2YXIgbj1CKHksdCk7T2JqZWN0LmtleXMobikuZm9yRWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZS5zdHlsZVt0XT1uW3RdfSl9ZnVuY3Rpb24gZihlKXt2YXIgdD1FW3RoaXMuYV0sbj1FW3RoaXMuYl0saT10LnNpemUrbi5zaXplO3Quc2l6ZT1lL3RoaXMuc2l6ZSppLG4uc2l6ZT1pLWUvdGhpcy5zaXplKmkseih0LmVsZW1lbnQsdC5zaXplLHRoaXMuYUd1dHRlclNpemUpLHoobi5lbGVtZW50LG4uc2l6ZSx0aGlzLmJHdXR0ZXJTaXplKX1mdW5jdGlvbiBtKGUpe3ZhciB0O3RoaXMuZHJhZ2dpbmcmJigodD1cInRvdWNoZXNcImluIGU/ZS50b3VjaGVzWzBdW2JdLXRoaXMuc3RhcnQ6ZVtiXS10aGlzLnN0YXJ0KTw9RVt0aGlzLmFdLm1pblNpemUrTSt0aGlzLmFHdXR0ZXJTaXplP3Q9RVt0aGlzLmFdLm1pblNpemUrdGhpcy5hR3V0dGVyU2l6ZTp0Pj10aGlzLnNpemUtKEVbdGhpcy5iXS5taW5TaXplK00rdGhpcy5iR3V0dGVyU2l6ZSkmJih0PXRoaXMuc2l6ZS0oRVt0aGlzLmJdLm1pblNpemUrdGhpcy5iR3V0dGVyU2l6ZSkpLGYuY2FsbCh0aGlzLHQpLGMub25EcmFnJiZjLm9uRHJhZygpKX1mdW5jdGlvbiBnKCl7dmFyIGU9RVt0aGlzLmFdLmVsZW1lbnQsdD1FW3RoaXMuYl0uZWxlbWVudDt0aGlzLnNpemU9ZVtyXSgpW3ldK3Rbcl0oKVt5XSt0aGlzLmFHdXR0ZXJTaXplK3RoaXMuYkd1dHRlclNpemUsdGhpcy5zdGFydD1lW3JdKClbR119ZnVuY3Rpb24gZCgpe3ZhciB0PXRoaXMsbj1FW3QuYV0uZWxlbWVudCxyPUVbdC5iXS5lbGVtZW50O3QuZHJhZ2dpbmcmJmMub25EcmFnRW5kJiZjLm9uRHJhZ0VuZCgpLHQuZHJhZ2dpbmc9ITEsZVtpXShcIm1vdXNldXBcIix0LnN0b3ApLGVbaV0oXCJ0b3VjaGVuZFwiLHQuc3RvcCksZVtpXShcInRvdWNoY2FuY2VsXCIsdC5zdG9wKSx0LnBhcmVudFtpXShcIm1vdXNlbW92ZVwiLHQubW92ZSksdC5wYXJlbnRbaV0oXCJ0b3VjaG1vdmVcIix0Lm1vdmUpLGRlbGV0ZSB0LnN0b3AsZGVsZXRlIHQubW92ZSxuW2ldKFwic2VsZWN0c3RhcnRcIixzKSxuW2ldKFwiZHJhZ3N0YXJ0XCIscykscltpXShcInNlbGVjdHN0YXJ0XCIscykscltpXShcImRyYWdzdGFydFwiLHMpLG4uc3R5bGUudXNlclNlbGVjdD1cIlwiLG4uc3R5bGUud2Via2l0VXNlclNlbGVjdD1cIlwiLG4uc3R5bGUuTW96VXNlclNlbGVjdD1cIlwiLG4uc3R5bGUucG9pbnRlckV2ZW50cz1cIlwiLHIuc3R5bGUudXNlclNlbGVjdD1cIlwiLHIuc3R5bGUud2Via2l0VXNlclNlbGVjdD1cIlwiLHIuc3R5bGUuTW96VXNlclNlbGVjdD1cIlwiLHIuc3R5bGUucG9pbnRlckV2ZW50cz1cIlwiLHQuZ3V0dGVyLnN0eWxlLmN1cnNvcj1cIlwiLHQucGFyZW50LnN0eWxlLmN1cnNvcj1cIlwifWZ1bmN0aW9uIFModCl7dmFyIGk9dGhpcyxyPUVbaS5hXS5lbGVtZW50LG89RVtpLmJdLmVsZW1lbnQ7IWkuZHJhZ2dpbmcmJmMub25EcmFnU3RhcnQmJmMub25EcmFnU3RhcnQoKSx0LnByZXZlbnREZWZhdWx0KCksaS5kcmFnZ2luZz0hMCxpLm1vdmU9bS5iaW5kKGkpLGkuc3RvcD1kLmJpbmQoaSksZVtuXShcIm1vdXNldXBcIixpLnN0b3ApLGVbbl0oXCJ0b3VjaGVuZFwiLGkuc3RvcCksZVtuXShcInRvdWNoY2FuY2VsXCIsaS5zdG9wKSxpLnBhcmVudFtuXShcIm1vdXNlbW92ZVwiLGkubW92ZSksaS5wYXJlbnRbbl0oXCJ0b3VjaG1vdmVcIixpLm1vdmUpLHJbbl0oXCJzZWxlY3RzdGFydFwiLHMpLHJbbl0oXCJkcmFnc3RhcnRcIixzKSxvW25dKFwic2VsZWN0c3RhcnRcIixzKSxvW25dKFwiZHJhZ3N0YXJ0XCIscyksci5zdHlsZS51c2VyU2VsZWN0PVwibm9uZVwiLHIuc3R5bGUud2Via2l0VXNlclNlbGVjdD1cIm5vbmVcIixyLnN0eWxlLk1velVzZXJTZWxlY3Q9XCJub25lXCIsci5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwiLG8uc3R5bGUudXNlclNlbGVjdD1cIm5vbmVcIixvLnN0eWxlLndlYmtpdFVzZXJTZWxlY3Q9XCJub25lXCIsby5zdHlsZS5Nb3pVc2VyU2VsZWN0PVwibm9uZVwiLG8uc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIixpLmd1dHRlci5zdHlsZS5jdXJzb3I9aixpLnBhcmVudC5zdHlsZS5jdXJzb3I9aixnLmNhbGwoaSl9ZnVuY3Rpb24gdihlKXtlLmZvckVhY2goZnVuY3Rpb24odCxuKXtpZihuPjApe3ZhciBpPUZbbi0xXSxyPUVbaS5hXSxzPUVbaS5iXTtyLnNpemU9ZVtuLTFdLHMuc2l6ZT10LHooci5lbGVtZW50LHIuc2l6ZSxpLmFHdXR0ZXJTaXplKSx6KHMuZWxlbWVudCxzLnNpemUsaS5iR3V0dGVyU2l6ZSl9fSl9ZnVuY3Rpb24gcCgpe0YuZm9yRWFjaChmdW5jdGlvbihlKXtlLnBhcmVudC5yZW1vdmVDaGlsZChlLmd1dHRlciksRVtlLmFdLmVsZW1lbnQuc3R5bGVbeV09XCJcIixFW2UuYl0uZWxlbWVudC5zdHlsZVt5XT1cIlwifSl9dm9pZCAwPT09YyYmKGM9e30pO3ZhciB5LGIsRyxFLHc9bCh1WzBdKS5wYXJlbnROb2RlLEQ9ZS5nZXRDb21wdXRlZFN0eWxlKHcpLmZsZXhEaXJlY3Rpb24sVT1jLnNpemVzfHx1Lm1hcChmdW5jdGlvbigpe3JldHVybiAxMDAvdS5sZW5ndGh9KSxrPXZvaWQgMCE9PWMubWluU2l6ZT9jLm1pblNpemU6MTAwLHg9QXJyYXkuaXNBcnJheShrKT9rOnUubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIGt9KSxMPXZvaWQgMCE9PWMuZ3V0dGVyU2l6ZT9jLmd1dHRlclNpemU6MTAsTT12b2lkIDAhPT1jLnNuYXBPZmZzZXQ/Yy5zbmFwT2Zmc2V0OjMwLE89Yy5kaXJlY3Rpb258fFwiaG9yaXpvbnRhbFwiLGo9Yy5jdXJzb3J8fChcImhvcml6b250YWxcIj09PU8/XCJldy1yZXNpemVcIjpcIm5zLXJlc2l6ZVwiKSxDPWMuZ3V0dGVyfHxmdW5jdGlvbihlLG4pe3ZhciBpPXQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gaS5jbGFzc05hbWU9XCJndXR0ZXIgZ3V0dGVyLVwiK24saX0sQT1jLmVsZW1lbnRTdHlsZXx8ZnVuY3Rpb24oZSx0LG4pe3ZhciBpPXt9O3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0fHx0IGluc3RhbmNlb2YgU3RyaW5nP2lbZV09dDppW2VdPW8/dCtcIiVcIjphK1wiKFwiK3QrXCIlIC0gXCIrbitcInB4KVwiLGl9LEI9Yy5ndXR0ZXJTdHlsZXx8ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbj17fSxuW2VdPXQrXCJweFwiLG47dmFyIG59O1wiaG9yaXpvbnRhbFwiPT09Tz8oeT1cIndpZHRoXCIsXCJjbGllbnRXaWR0aFwiLGI9XCJjbGllbnRYXCIsRz1cImxlZnRcIixcInBhZGRpbmdMZWZ0XCIpOlwidmVydGljYWxcIj09PU8mJih5PVwiaGVpZ2h0XCIsXCJjbGllbnRIZWlnaHRcIixiPVwiY2xpZW50WVwiLEc9XCJ0b3BcIixcInBhZGRpbmdUb3BcIik7dmFyIEY9W107cmV0dXJuIEU9dS5tYXAoZnVuY3Rpb24oZSx0KXt2YXIgaSxzPXtlbGVtZW50OmwoZSksc2l6ZTpVW3RdLG1pblNpemU6eFt0XX07aWYodD4wJiYoaT17YTp0LTEsYjp0LGRyYWdnaW5nOiExLGlzRmlyc3Q6MT09PXQsaXNMYXN0OnQ9PT11Lmxlbmd0aC0xLGRpcmVjdGlvbjpPLHBhcmVudDp3fSxpLmFHdXR0ZXJTaXplPUwsaS5iR3V0dGVyU2l6ZT1MLGkuaXNGaXJzdCYmKGkuYUd1dHRlclNpemU9TC8yKSxpLmlzTGFzdCYmKGkuYkd1dHRlclNpemU9TC8yKSxcInJvdy1yZXZlcnNlXCI9PT1EfHxcImNvbHVtbi1yZXZlcnNlXCI9PT1EKSl7dmFyIGE9aS5hO2kuYT1pLmIsaS5iPWF9aWYoIW8mJnQ+MCl7dmFyIGM9Qyh0LE8pO2goYyxMKSxjW25dKFwibW91c2Vkb3duXCIsUy5iaW5kKGkpKSxjW25dKFwidG91Y2hzdGFydFwiLFMuYmluZChpKSksdy5pbnNlcnRCZWZvcmUoYyxzLmVsZW1lbnQpLGkuZ3V0dGVyPWN9MD09PXR8fHQ9PT11Lmxlbmd0aC0xP3oocy5lbGVtZW50LHMuc2l6ZSxMLzIpOnoocy5lbGVtZW50LHMuc2l6ZSxMKTt2YXIgZj1zLmVsZW1lbnRbcl0oKVt5XTtyZXR1cm4gZjxzLm1pblNpemUmJihzLm1pblNpemU9ZiksdD4wJiZGLnB1c2goaSksc30pLG8/e3NldFNpemVzOnYsZGVzdHJveTpwfTp7c2V0U2l6ZXM6dixnZXRTaXplczpmdW5jdGlvbigpe3JldHVybiBFLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gZS5zaXplfSl9LGNvbGxhcHNlOmZ1bmN0aW9uKGUpe2lmKGU9PT1GLmxlbmd0aCl7dmFyIHQ9RltlLTFdO2cuY2FsbCh0KSxvfHxmLmNhbGwodCx0LnNpemUtdC5iR3V0dGVyU2l6ZSl9ZWxzZXt2YXIgbj1GW2VdO2cuY2FsbChuKSxvfHxmLmNhbGwobixuLmFHdXR0ZXJTaXplKX19LGRlc3Ryb3k6cH19fSk7XHJcbiJdfQ==
