(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*************************************************
              Board Rotation                    
*************************************************/
var storage;
var storagePrefix = 'KiCad_HTML_BOM__' + pcbdata.metadata.title + '__' + pcbdata.metadata.revision + '__';

function initStorage(key) {
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

function setLastClickedRef(value){
    lastClickedRef = value;
}

function getLastClickedRef(){
    return lastClickedRef;
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
darkModeBox.onchange=function(){
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

},{"./global.js":1,"./ibom.js":3,"./render.js":4}],3:[function(require,module,exports){
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
  for (var ref of entry[3]) {
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
      checkbox, "bom-checkbox", checkboxCompareClosure(checkbox));
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
  tr.appendChild(createColumnHeader("Quantity", "Quantity", (a, b) => {
    return a[3].length - b[3].length;
  }));
  bomhead.appendChild(tr);
}

function populateBomBody() {
  while (bom.firstChild) {
    bom.removeChild(bom.firstChild);
  }
  globalData.setHighlightHandlers([]);
  globalData.setCurrentHighlightedRowId(null);
  var first = true;
  console.log(globalData.getCanvasLayout())
  switch (globalData.getCanvasLayout()) {
    case 'F':
      bomtable = pcbdata.bom.F;
      break;
    case 'FB':
      bomtable = pcbdata.bom.both;
      break;
    case 'B':
      bomtable = pcbdata.bom.B;
      break;
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
    // Quantity
    td = document.createElement("TD");
    td.textContent = bomentry[3].length;
    tr.appendChild(td);
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
  filter = "";
  reflookup = "";
  populateMetadata();
  globalData.setBomCheckboxes(globalData.readStorage("bomCheckboxes"));
  if (globalData.getBomCheckboxes() === null) {
    globalData.setBomCheckboxes("Sourced,Placed");
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
  setDarkMode, silkscreenVisible, updateFilter, updateRefLookup, changeBomLayout, changeCanvasLayout, setBomCheckboxes
}
},{"../vender/split.js":5,"./global.js":1,"./render.js":4}],4:[function(require,module,exports){
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
      lineWidth += pcbdata.font_data[c].w * text.width;
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
      for (var line of pcbdata.font_data[c].l) {
        // Drawing each segment separately instead of
        // polyline because round line caps don't work in joints
        for (var i = 0; i < line.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(...calcFontPoint(line[i], text, offsetx, offsety, tilt));
          ctx.lineTo(...calcFontPoint(line[i + 1], text, offsetx, offsety, tilt));
          ctx.stroke();
        }
      }
      offsetx += pcbdata.font_data[c].w * text.width;
    }
  }
  ctx.restore();
}

function drawedge(ctx, scalefactor, edge, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1 / scalefactor, edge.width);
  ctx.lineCap = "round";
  if (edge.type == "segment") {
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
  for (var polygon of polygons) {
    ctx.beginPath();
    for (var vertex of polygon) {
      ctx.lineTo(...vertex)
    }
    ctx.closePath();
    ctxmethod();
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
      ctx.fillRect(
        0, 0,
        ...module.bbox.size);
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
  var flip = (canvasdict.layer == "B");
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
  var flip = (canvasdict.layer == "B");
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
  resizeAll, initRender, redrawCanvas, drawHighlights,
  setBoardRotation
};
},{"./global.js":1}],5:[function(require,module,exports){
/*
  Split.js - v1.3.5
  MIT License
  https://github.com/nathancahill/Split.js
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Split=t()}(this,function(){"use strict";var e=window,t=e.document,n="addEventListener",i="removeEventListener",r="getBoundingClientRect",s=function(){return!1},o=e.attachEvent&&!e[n],a=["","-webkit-","-moz-","-o-"].filter(function(e){var n=t.createElement("div");return n.style.cssText="width:"+e+"calc(9px)",!!n.style.length}).shift()+"calc",l=function(e){return"string"==typeof e||e instanceof String?t.querySelector(e):e};return function(u,c){function z(e,t,n){var i=A(y,t,n);Object.keys(i).forEach(function(t){return e.style[t]=i[t]})}function h(e,t){var n=B(y,t);Object.keys(n).forEach(function(t){return e.style[t]=n[t]})}function f(e){var t=E[this.a],n=E[this.b],i=t.size+n.size;t.size=e/this.size*i,n.size=i-e/this.size*i,z(t.element,t.size,this.aGutterSize),z(n.element,n.size,this.bGutterSize)}function m(e){var t;this.dragging&&((t="touches"in e?e.touches[0][b]-this.start:e[b]-this.start)<=E[this.a].minSize+M+this.aGutterSize?t=E[this.a].minSize+this.aGutterSize:t>=this.size-(E[this.b].minSize+M+this.bGutterSize)&&(t=this.size-(E[this.b].minSize+this.bGutterSize)),f.call(this,t),c.onDrag&&c.onDrag())}function g(){var e=E[this.a].element,t=E[this.b].element;this.size=e[r]()[y]+t[r]()[y]+this.aGutterSize+this.bGutterSize,this.start=e[r]()[G]}function d(){var t=this,n=E[t.a].element,r=E[t.b].element;t.dragging&&c.onDragEnd&&c.onDragEnd(),t.dragging=!1,e[i]("mouseup",t.stop),e[i]("touchend",t.stop),e[i]("touchcancel",t.stop),t.parent[i]("mousemove",t.move),t.parent[i]("touchmove",t.move),delete t.stop,delete t.move,n[i]("selectstart",s),n[i]("dragstart",s),r[i]("selectstart",s),r[i]("dragstart",s),n.style.userSelect="",n.style.webkitUserSelect="",n.style.MozUserSelect="",n.style.pointerEvents="",r.style.userSelect="",r.style.webkitUserSelect="",r.style.MozUserSelect="",r.style.pointerEvents="",t.gutter.style.cursor="",t.parent.style.cursor=""}function S(t){var i=this,r=E[i.a].element,o=E[i.b].element;!i.dragging&&c.onDragStart&&c.onDragStart(),t.preventDefault(),i.dragging=!0,i.move=m.bind(i),i.stop=d.bind(i),e[n]("mouseup",i.stop),e[n]("touchend",i.stop),e[n]("touchcancel",i.stop),i.parent[n]("mousemove",i.move),i.parent[n]("touchmove",i.move),r[n]("selectstart",s),r[n]("dragstart",s),o[n]("selectstart",s),o[n]("dragstart",s),r.style.userSelect="none",r.style.webkitUserSelect="none",r.style.MozUserSelect="none",r.style.pointerEvents="none",o.style.userSelect="none",o.style.webkitUserSelect="none",o.style.MozUserSelect="none",o.style.pointerEvents="none",i.gutter.style.cursor=j,i.parent.style.cursor=j,g.call(i)}function v(e){e.forEach(function(t,n){if(n>0){var i=F[n-1],r=E[i.a],s=E[i.b];r.size=e[n-1],s.size=t,z(r.element,r.size,i.aGutterSize),z(s.element,s.size,i.bGutterSize)}})}function p(){F.forEach(function(e){e.parent.removeChild(e.gutter),E[e.a].element.style[y]="",E[e.b].element.style[y]=""})}void 0===c&&(c={});var y,b,G,E,w=l(u[0]).parentNode,D=e.getComputedStyle(w).flexDirection,U=c.sizes||u.map(function(){return 100/u.length}),k=void 0!==c.minSize?c.minSize:100,x=Array.isArray(k)?k:u.map(function(){return k}),L=void 0!==c.gutterSize?c.gutterSize:10,M=void 0!==c.snapOffset?c.snapOffset:30,O=c.direction||"horizontal",j=c.cursor||("horizontal"===O?"ew-resize":"ns-resize"),C=c.gutter||function(e,n){var i=t.createElement("div");return i.className="gutter gutter-"+n,i},A=c.elementStyle||function(e,t,n){var i={};return"string"==typeof t||t instanceof String?i[e]=t:i[e]=o?t+"%":a+"("+t+"% - "+n+"px)",i},B=c.gutterStyle||function(e,t){return n={},n[e]=t+"px",n;var n};"horizontal"===O?(y="width","clientWidth",b="clientX",G="left","paddingLeft"):"vertical"===O&&(y="height","clientHeight",b="clientY",G="top","paddingTop");var F=[];return E=u.map(function(e,t){var i,s={element:l(e),size:U[t],minSize:x[t]};if(t>0&&(i={a:t-1,b:t,dragging:!1,isFirst:1===t,isLast:t===u.length-1,direction:O,parent:w},i.aGutterSize=L,i.bGutterSize=L,i.isFirst&&(i.aGutterSize=L/2),i.isLast&&(i.bGutterSize=L/2),"row-reverse"===D||"column-reverse"===D)){var a=i.a;i.a=i.b,i.b=a}if(!o&&t>0){var c=C(t,O);h(c,L),c[n]("mousedown",S.bind(i)),c[n]("touchstart",S.bind(i)),w.insertBefore(c,s.element),i.gutter=c}0===t||t===u.length-1?z(s.element,s.size,L/2):z(s.element,s.size,L);var f=s.element[r]()[y];return f<s.minSize&&(s.minSize=f),t>0&&F.push(i),s}),o?{setSizes:v,destroy:p}:{setSizes:v,getSizes:function(){return E.map(function(e){return e.size})},collapse:function(e){if(e===F.length){var t=F[e-1];g.call(t),o||f.call(t,t.size-t.bGutterSize)}else{var n=F[e];g.call(n),o||f.call(n,n.aGutterSize)}},destroy:p}}});

},{}]},{},[3,4,2,5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZ2xvYmFsLmpzIiwic3JjL2h0bWxGdW5jdGlvbnMuanMiLCJzcmMvaWJvbS5qcyIsInNyYy9yZW5kZXIuanMiLCJ2ZW5kZXIvc3BsaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDanZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDamxCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgIEJvYXJkIFJvdGF0aW9uICAgICAgICAgICAgICAgICAgICBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgc3RvcmFnZTtcbnZhciBzdG9yYWdlUHJlZml4ID0gJ0tpQ2FkX0hUTUxfQk9NX18nICsgcGNiZGF0YS5tZXRhZGF0YS50aXRsZSArICdfXycgKyBwY2JkYXRhLm1ldGFkYXRhLnJldmlzaW9uICsgJ19fJztcblxuZnVuY3Rpb24gaW5pdFN0b3JhZ2Uoa2V5KSB7XG4gIHRyeSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYmxhbmtcIik7XG4gICAgc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhcIlN0b3JhZ2UgaW5pdCBlcnJvclwiKTtcbiAgICAvLyBsb2NhbFN0b3JhZ2Ugbm90IGF2YWlsYWJsZVxuICB9XG4gIGlmICghc3RvcmFnZSkge1xuICAgIHRyeSB7XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImJsYW5rXCIpO1xuICAgICAgc3RvcmFnZSA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBzZXNzaW9uU3RvcmFnZSBhbHNvIG5vdCBhdmFpbGFibGVcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVhZFN0b3JhZ2Uoa2V5KSB7XG4gIGlmIChzdG9yYWdlKSB7XG4gICAgcmV0dXJuIHN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlUHJlZml4ICsgJyMnICsga2V5KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cml0ZVN0b3JhZ2Uoa2V5LCB2YWx1ZSkge1xuICBpZiAoc3RvcmFnZSkge1xuICAgIHN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlUHJlZml4ICsgJyMnICsga2V5LCB2YWx1ZSk7XG4gIH1cbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgSGlnaGxpZ2h0ZWQgUmVmcyAgICAgICAgICAgICAgICAgICAgXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGhpZ2hsaWdodGVkUmVmcyA9IFtdO1xuXG5mdW5jdGlvbiBzZXRIaWdobGlnaHRlZFJlZnMocmVmcyl7XG4gICAgaGlnaGxpZ2h0ZWRSZWZzID0gcmVmcztcbn1cblxuZnVuY3Rpb24gZ2V0SGlnaGxpZ2h0ZWRSZWZzKCl7XG4gICAgcmV0dXJuIGhpZ2hsaWdodGVkUmVmcztcbn1cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgIFJlZHJhdyBPbiBEcmFnICAgICAgICAgICAgICAgICAgICAgIFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciByZWRyYXdPbkRyYWcgPSB0cnVlO1xuXG4gIFxuZnVuY3Rpb24gc2V0UmVkcmF3T25EcmFnKHZhbHVlKXtcbiAgICByZWRyYXdPbkRyYWcgPSB2YWx1ZTtcbiAgICB3cml0ZVN0b3JhZ2UoXCJyZWRyYXdPbkRyYWdcIiwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBnZXRSZWRyYXdPbkRyYWcoKXtcbiAgICByZXR1cm4gcmVkcmF3T25EcmFnO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5CT00gU3BsaXRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgYm9tc3BsaXQ7XG5cbmZ1bmN0aW9uIHNldEJvbVNwbGl0KHZhbHVlKXtcbiAgICBib21zcGxpdCA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRCb21TcGxpdCgpe1xuICAgIHJldHVybiBib21zcGxpdDtcbn1cblxuZnVuY3Rpb24gZGVzdHJveUJvbVNwbGl0KCl7XG4gICAgYm9tc3BsaXQuZGVzdHJveSgpXG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5DYW52YXMgU3BsaXRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgY2FudmFzc3BsaXQ7XG5cbmZ1bmN0aW9uIHNldENhbnZhc1NwbGl0KHZhbHVlKXtcbiAgICBjYW52YXNzcGxpdCA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRDYW52YXNTcGxpdCgpe1xuICAgIHJldHVybiBjYW52YXNzcGxpdDtcbn1cblxuZnVuY3Rpb24gZGVzdHJveUNhbnZhc1NwbGl0KCl7XG4gICAgY2FudmFzc3BsaXQuZGVzdHJveSgpXG59XG5cbmZ1bmN0aW9uIGNvbGxhcHNlQ2FudmFzU3BsaXQodmFsdWUpXG57XG4gICAgY2FudmFzc3BsaXQuY29sbGFwc2UodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBzZXRTaXplc0NhbnZhc1NwbGl0KHZhbHVlKXtcbiAgICBjYW52YXNzcGxpdC5zZXRTaXplcyhbNTAsIDUwXSk7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5DYW52YXMgTGF5b3V0XG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGNhbnZhc2xheW91dCA9IFwiRkJcIjtcblxuLypYWFggRm91bmQgYSBidWcgYXQgc3RhcnR1cC4gQ29kZSBhc3N1bWVzIHRoYXQgY2FudmFzIGxheW91dCBcbmlzIGluIG9uZSBvZiB0aHJlZSBzdGF0ZXMuIHRoZW4gc3lzdGVtIGZhaWxzLiBoZSBidWcgd2FzIHRoYXQgdGhlIFxuY2FudmFzTGF5b3V0IHdhcyBiZWluZyBzZXQgdG8gJ2RlZmF1bHQnIHdoaWNoIGlzIG5vdCBhIHZhbGlkIHN0YXRlLiBcblNvIG5vIGlzIGNoZWNrIHRoYXQgaWYgZGVmYXVsdCBpcyBzZW50IGluIHRoZW4gc2V0IHRoZSBsYXlvdXQgdG8gRkIgbW9kZS5cbiovXG4vKiBUT0RPOiBNYWtlIHRoZSBkZWZhdWx0IGNoZWNrIGJlbG93IGFjdHVhbGx5IGNoZWNrIHRoYXQgdGhlIGl0ZW0gXG5pcyBpbiBvbmUgb2YgdGhlIHRocmVlIHZhbGlkIHN0YXRlcy4gSWYgbm90IHRoZW4gc2V0IHRvIEZCLCBvdGhlcndpc2Ugc2V0IHRvIG9uZSBvZlxudGhlIHRocmVlIHZhbGlkIHN0YXRlc1xuKi9cbmZ1bmN0aW9uIHNldENhbnZhc0xheW91dCh2YWx1ZSl7XG4gICAgaWYodmFsdWUgPT0gJ2RlZmF1bHQnKXtcbiAgICAgICAgY2FudmFzbGF5b3V0ID0gJ0ZCJ1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY2FudmFzbGF5b3V0ID0gdmFsdWU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRDYW52YXNMYXlvdXQoKXtcbiAgICByZXR1cm4gY2FudmFzbGF5b3V0O1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQk9NIExheW91dFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBib21sYXlvdXQgPSBcImRlZmF1bHRcIjtcblxuZnVuY3Rpb24gc2V0Qm9tTGF5b3V0KHZhbHVlKXtcbiAgICBib21sYXlvdXQgPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Qm9tTGF5b3V0KCl7XG4gICAgcmV0dXJuIGJvbWxheW91dDtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkJPTSBTb3J0IEZ1bmN0aW9uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGJvbVNvcnRGdW5jdGlvbiA9IG51bGw7XG5cbmZ1bmN0aW9uIHNldEJvbVNvcnRGdW5jdGlvbih2YWx1ZSl7XG4gICAgYm9tU29ydEZ1bmN0aW9uID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldEJvbVNvcnRGdW5jdGlvbigpe1xuICAgIHJldHVybiBib21Tb3J0RnVuY3Rpb247XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5DdXJyZW50IFNvcnQgQ29sdW1uXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGN1cnJlbnRTb3J0Q29sdW1uID0gbnVsbDtcblxuZnVuY3Rpb24gc2V0Q3VycmVudFNvcnRDb2x1bW4odmFsdWUpe1xuICAgIGN1cnJlbnRTb3J0Q29sdW1uID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRTb3J0Q29sdW1uKCl7XG4gICAgcmV0dXJuIGN1cnJlbnRTb3J0Q29sdW1uO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ3VycmVudCBTb3J0IE9yZGVyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGN1cnJlbnRTb3J0T3JkZXIgPSBudWxsO1xuXG5mdW5jdGlvbiBzZXRDdXJyZW50U29ydE9yZGVyKHZhbHVlKXtcbiAgICBjdXJyZW50U29ydE9yZGVyID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRTb3J0T3JkZXIoKXtcbiAgICByZXR1cm4gY3VycmVudFNvcnRPcmRlcjtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkN1cnJlbnQgSGlnaGxpZ2h0ZWQgUm93IElEXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGN1cnJlbnRIaWdobGlnaHRlZFJvd0lkO1xuXG5mdW5jdGlvbiBzZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCh2YWx1ZSl7XG4gICAgY3VycmVudEhpZ2hsaWdodGVkUm93SWQgPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKXtcbiAgICByZXR1cm4gY3VycmVudEhpZ2hsaWdodGVkUm93SWQ7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5IaWdobGlnaHQgSGFuZGxlcnNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgaGlnaGxpZ2h0SGFuZGxlcnMgPSBbXTtcblxuZnVuY3Rpb24gc2V0SGlnaGxpZ2h0SGFuZGxlcnModmFsdWVzKXtcbiAgICBoaWdobGlnaHRIYW5kbGVycyA9IHZhbHVlcztcbn1cblxuZnVuY3Rpb24gZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKXtcbiAgICByZXR1cm4gaGlnaGxpZ2h0SGFuZGxlcnM7XG59XG5cbmZ1bmN0aW9uIHB1c2hIaWdobGlnaHRIYW5kbGVycyh2YWx1ZSl7XG4gICAgaGlnaGxpZ2h0SGFuZGxlcnMucHVzaCh2YWx1ZSk7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5DaGVja2JveGVzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGNoZWNrYm94ZXMgPSBbXTtcblxuZnVuY3Rpb24gc2V0Q2hlY2tib3hlcyh2YWx1ZXMpe1xuICAgIGNoZWNrYm94ZXMgPSB2YWx1ZXM7XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrYm94ZXMoKXtcbiAgICByZXR1cm4gY2hlY2tib3hlcztcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkJPTSBDaGVja2JveGVzXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGJvbUNoZWNrYm94ZXMgPSBcIlwiO1xuXG5mdW5jdGlvbiBzZXRCb21DaGVja2JveGVzKHZhbHVlcyl7XG4gICAgYm9tQ2hlY2tib3hlcyA9IHZhbHVlcztcbn1cblxuZnVuY3Rpb24gZ2V0Qm9tQ2hlY2tib3hlcygpe1xuICAgIHJldHVybiBib21DaGVja2JveGVzO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuSGlnaGxpZ2h0IFBpbiAxXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGhpZ2hsaWdodHBpbjEgPSBmYWxzZTtcblxuZnVuY3Rpb24gc2V0SGlnaGxpZ2h0UGluMSh2YWx1ZSkge1xuICB3cml0ZVN0b3JhZ2UoXCJoaWdobGlnaHRwaW4xXCIsIHZhbHVlKTtcbiAgaGlnaGxpZ2h0cGluMSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRIaWdobGlnaHRQaW4xKCl7XG4gICAgcmV0dXJuIGhpZ2hsaWdodHBpbjE7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5MYXN0IENsaWNrZWQgUmVmXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGxhc3RDbGlja2VkUmVmO1xuXG5mdW5jdGlvbiBzZXRMYXN0Q2xpY2tlZFJlZih2YWx1ZSl7XG4gICAgbGFzdENsaWNrZWRSZWYgPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0TGFzdENsaWNrZWRSZWYoKXtcbiAgICByZXR1cm4gbGFzdENsaWNrZWRSZWY7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0U3RvcmFnZSAgICAgICAgICAgICAgICAsIHJlYWRTdG9yYWdlICAgICAgICAgICAgICAgICwgd3JpdGVTdG9yYWdlICAgICAgICxcbiAgc2V0SGlnaGxpZ2h0ZWRSZWZzICAgICAgICAgLCBnZXRIaWdobGlnaHRlZFJlZnMgICAgICAgICAsXG4gIHNldFJlZHJhd09uRHJhZyAgICAgICAgICAgICwgZ2V0UmVkcmF3T25EcmFnICAgICAgICAgICAgLFxuICBzZXRCb21TcGxpdCAgICAgICAgICAgICAgICAsIGdldEJvbVNwbGl0ICAgICAgICAgICAgICAgICwgZGVzdHJveUJvbVNwbGl0ICAgICxcbiAgc2V0Q2FudmFzU3BsaXQgICAgICAgICAgICAgLCBnZXRDYW52YXNTcGxpdCAgICAgICAgICAgICAsIGRlc3Ryb3lDYW52YXNTcGxpdCAsIGNvbGxhcHNlQ2FudmFzU3BsaXQgLCBzZXRTaXplc0NhbnZhc1NwbGl0LFxuICBzZXRDYW52YXNMYXlvdXQgICAgICAgICAgICAsIGdldENhbnZhc0xheW91dCAgICAgICAgICAgICxcbiAgc2V0Qm9tTGF5b3V0ICAgICAgICAgICAgICAgLCBnZXRCb21MYXlvdXQgICAgICAgICAgICAgICAsXG4gIHNldEJvbVNvcnRGdW5jdGlvbiAgICAgICAgICwgZ2V0Qm9tU29ydEZ1bmN0aW9uICAgICAgICAgLFxuICBzZXRDdXJyZW50U29ydENvbHVtbiAgICAgICAsIGdldEN1cnJlbnRTb3J0Q29sdW1uICAgICAgICxcbiAgc2V0Q3VycmVudFNvcnRPcmRlciAgICAgICAgLCBnZXRDdXJyZW50U29ydE9yZGVyICAgICAgICAsXG4gIHNldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkICwgZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQgLFxuICBzZXRIaWdobGlnaHRIYW5kbGVycyAgICAgICAsIGdldEhpZ2hsaWdodEhhbmRsZXJzICAgICAgICwgcHVzaEhpZ2hsaWdodEhhbmRsZXJzICxcbiAgc2V0Q2hlY2tib3hlcyAgICAgICAgICAgICAgLCBnZXRDaGVja2JveGVzICAgICAgICAgICAgICAsXG4gIHNldEJvbUNoZWNrYm94ZXMgICAgICAgICAgICwgZ2V0Qm9tQ2hlY2tib3hlcyAgICAgICAgICAgLFxuICBzZXRIaWdobGlnaHRQaW4xICAgICAgICAgICAsIGdldEhpZ2hsaWdodFBpbjEgICAgICAgICAgICxcbiAgc2V0TGFzdENsaWNrZWRSZWYgICAgICAgICAgLCBnZXRMYXN0Q2xpY2tlZFJlZiAgICAgICAgICAsXG59OyIsIlxudmFyIGdsb2JhbERhdGEgPSByZXF1aXJlKCcuL2dsb2JhbC5qcycpXG52YXIgcmVuZGVyICAgICA9IHJlcXVpcmUoJy4vcmVuZGVyLmpzJylcbnZhciBpYm9tICAgICAgID0gcmVxdWlyZSgnLi9pYm9tLmpzJylcblxuY29uc3QgYm9hcmRSb3RhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZFJvdGF0aW9uJyk7XG5ib2FyZFJvdGF0aW9uLm9uaW5wdXQ9ZnVuY3Rpb24oKVxue1xuICByZW5kZXIuc2V0Qm9hcmRSb3RhdGlvbihib2FyZFJvdGF0aW9uLnZhbHVlKTtcbn1cblxuXG5jb25zdCBkYXJrTW9kZUJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXJrbW9kZUNoZWNrYm94Jyk7XG5kYXJrTW9kZUJveC5vbmNoYW5nZT1mdW5jdGlvbigpe1xuICBpYm9tLnNldERhcmtNb2RlKGRhcmtNb2RlQm94LmNoZWNrZWQpXG59XG5cbmNvbnN0IHNpbGtzY3JlZW5DaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWxrc2NyZWVuQ2hlY2tib3gnKTtcbnNpbGtzY3JlZW5DaGVja2JveC5jaGVja2VkPWZ1bmN0aW9uKCl7XG4gIGlib20uc2lsa3NjcmVlblZpc2libGUoc2lsa3NjcmVlbkNoZWNrYm94LmNoZWNrZWQpXG59XG5zaWxrc2NyZWVuQ2hlY2tib3gub25jaGFuZ2U9ZnVuY3Rpb24oKXtcbiAgaWJvbS5zaWxrc2NyZWVuVmlzaWJsZShzaWxrc2NyZWVuQ2hlY2tib3guY2hlY2tlZClcbn1cblxuY29uc3QgaGlnaGxpZ2h0cGluMUNoZWNrYm94ID1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlnaGxpZ2h0cGluMUNoZWNrYm94Jyk7XG5oaWdobGlnaHRwaW4xQ2hlY2tib3gub25jaGFuZ2U9ZnVuY3Rpb24oKXtcbiAgZ2xvYmFsRGF0YS5zZXRIaWdobGlnaHRQaW4xKGhpZ2hsaWdodHBpbjFDaGVja2JveC5jaGVja2VkKTtcbiAgcmVuZGVyLnJlZHJhd0NhbnZhcyhhbGxjYW52YXMuZnJvbnQpO1xuICByZW5kZXIucmVkcmF3Q2FudmFzKGFsbGNhbnZhcy5iYWNrKTtcbn1cblxuY29uc3QgZHJhZ0NoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RyYWdDaGVja2JveCcpO1xuZHJhZ0NoZWNrYm94LmNoZWNrZWQ9ZnVuY3Rpb24oKXtcbiAgZ2xvYmFsRGF0YS5zZXRSZWRyYXdPbkRyYWcoZHJhZ0NoZWNrYm94LmNoZWNrZWQpXG59XG5kcmFnQ2hlY2tib3gub25jaGFuZ2U9ZnVuY3Rpb24oKXtcbiAgZ2xvYmFsRGF0YS5zZXRSZWRyYXdPbkRyYWcoZHJhZ0NoZWNrYm94LmNoZWNrZWQpXG59XG5cblxuY29uc3QgZmlsdGVyXzIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyJyk7XG5maWx0ZXJfMi5vbmlucHV0PWZ1bmN0aW9uKCl7XG4gIGlib20udXBkYXRlRmlsdGVyKGZpbHRlcl8yLnZhbHVlKVxufVxuXG5cbmNvbnN0IHJlZmxvb2t1cF8yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZmxvb2t1cCcpO1xucmVmbG9va3VwXzIub25pbnB1dD1mdW5jdGlvbigpe1xuICBpYm9tLnVwZGF0ZVJlZkxvb2t1cChyZWZsb29rdXBfMi52YWx1ZSlcbn1cblxuY29uc3QgYm9tQ2hlY2tib3hlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib21DaGVja2JveGVzJyk7XG5ib21DaGVja2JveGVzLm9uaW5wdXQ9ZnVuY3Rpb24oKXtcbiAgaWJvbS5zZXRCb21DaGVja2JveGVzKGJvbUNoZWNrYm94ZXMudmFsdWUpO1xufVxuXG5cbmNvbnN0IGZsX2J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbC1idG4nKTtcbmZsX2J0bi5vbmNsaWNrPWZ1bmN0aW9uKCl7XG4gIGlib20uY2hhbmdlQ2FudmFzTGF5b3V0KCdGJyk7XG59XG5cblxuY29uc3QgZmJfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZiLWJ0bicpO1xuZmJfYnRuLm9uY2xpY2s9ZnVuY3Rpb24oKXtcbiAgaWJvbS5jaGFuZ2VDYW52YXNMYXlvdXQoJ0ZCJyk7XG59XG5cblxuY29uc3QgYmxfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JsLWJ0bicpO1xuYmxfYnRuLm9uY2xpY2s9ZnVuY3Rpb24oKXtcbiAgaWJvbS5jaGFuZ2VDYW52YXNMYXlvdXQoJ0InKTtcbn1cblxuY29uc3QgYm9tX2J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib20tYnRuJyk7XG5ib21fYnRuLm9uY2xpY2s9ZnVuY3Rpb24oKXtcbiAgaWJvbS5jaGFuZ2VCb21MYXlvdXQoJ0JPTScpXG59XG5cbmNvbnN0IGxyX2J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsci1idG4nKTtcbmxyX2J0bi5vbmNsaWNrPWZ1bmN0aW9uKCl7XG4gIGlib20uY2hhbmdlQm9tTGF5b3V0KCdMUicpXG59XG5cbmNvbnN0IHRiX2J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Yi1idG4nKTtcbnRiX2J0bi5vbmNsaWNrPWZ1bmN0aW9uKCl7XG4gIGlib20uY2hhbmdlQm9tTGF5b3V0KCdUQicpXG59XG4iLCIvKiBET00gbWFuaXB1bGF0aW9uIGFuZCBtaXNjIGNvZGUgKi9cblxuXG52YXIgU3BsaXQgPSByZXF1aXJlKCcuLi92ZW5kZXIvc3BsaXQuanMnKVxudmFyIGdsb2JhbERhdGEgPSByZXF1aXJlKCcuL2dsb2JhbC5qcycpXG52YXIgcmVuZGVyID0gcmVxdWlyZSgnLi9yZW5kZXIuanMnKVxuXG5mdW5jdGlvbiBkYmcoaHRtbCkge1xuICBkYmdkaXYuaW5uZXJIVE1MID0gaHRtbDtcbn1cblxuZnVuY3Rpb24gc2V0RGFya01vZGUodmFsdWUpIHtcbiAgaWYgKHZhbHVlKSB7XG4gICAgdG9wbW9zdGRpdi5jbGFzc0xpc3QuYWRkKFwiZGFya1wiKTtcbiAgfSBlbHNlIHtcbiAgICB0b3Btb3N0ZGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJkYXJrXCIpO1xuICB9XG4gIGdsb2JhbERhdGEud3JpdGVTdG9yYWdlKFwiZGFya21vZGVcIiwgdmFsdWUpO1xuICByZW5kZXIucmVkcmF3Q2FudmFzKGFsbGNhbnZhcy5mcm9udCk7XG4gIHJlbmRlci5yZWRyYXdDYW52YXMoYWxsY2FudmFzLmJhY2spO1xufVxuXG5mdW5jdGlvbiBnZXRTdG9yZWRDaGVja2JveFJlZnMoY2hlY2tib3gpIHtcbiAgdmFyIGV4aXN0aW5nUmVmcyA9IGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJjaGVja2JveF9cIiArIGNoZWNrYm94KTtcbiAgaWYgKCFleGlzdGluZ1JlZnMpIHtcbiAgICByZXR1cm4gbmV3IFNldCgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgU2V0KGV4aXN0aW5nUmVmcy5zcGxpdChcIixcIikpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrYm94U3RhdGUoY2hlY2tib3gsIHJlZmVyZW5jZXMpIHtcbiAgdmFyIHN0b3JlZFJlZnNTZXQgPSBnZXRTdG9yZWRDaGVja2JveFJlZnMoY2hlY2tib3gpO1xuICB2YXIgY3VycmVudFJlZnNTZXQgPSBuZXcgU2V0KHJlZmVyZW5jZXMpO1xuICAvLyBHZXQgZGlmZmVyZW5jZSBvZiBjdXJyZW50IC0gc3RvcmVkXG4gIHZhciBkaWZmZXJlbmNlID0gbmV3IFNldChjdXJyZW50UmVmc1NldCk7XG4gIGZvciAocmVmIG9mIHN0b3JlZFJlZnNTZXQpIHtcbiAgICBkaWZmZXJlbmNlLmRlbGV0ZShyZWYpO1xuICB9XG4gIGlmIChkaWZmZXJlbmNlLnNpemUgPT0gMCkge1xuICAgIC8vIEFsbCB0aGUgY3VycmVudCByZWZzIGFyZSBzdG9yZWRcbiAgICByZXR1cm4gXCJjaGVja2VkXCI7XG4gIH0gZWxzZSBpZiAoZGlmZmVyZW5jZS5zaXplID09IGN1cnJlbnRSZWZzU2V0LnNpemUpIHtcbiAgICAvLyBOb25lIG9mIHRoZSBjdXJyZW50IHJlZnMgYXJlIHN0b3JlZFxuICAgIHJldHVybiBcInVuY2hlY2tlZFwiO1xuICB9IGVsc2Uge1xuICAgIC8vIFNvbWUgb2YgdGhlIHJlZnMgYXJlIHN0b3JlZFxuICAgIHJldHVybiBcImluZGV0ZXJtaW5hdGVcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRCb21DaGVja2JveFN0YXRlKGNoZWNrYm94LCBlbGVtZW50LCByZWZlcmVuY2VzKSB7XG4gIHZhciBzdGF0ZSA9IGdldENoZWNrYm94U3RhdGUoY2hlY2tib3gsIHJlZmVyZW5jZXMpO1xuICBlbGVtZW50LmNoZWNrZWQgPSAoc3RhdGUgPT0gXCJjaGVja2VkXCIpO1xuICBlbGVtZW50LmluZGV0ZXJtaW5hdGUgPSAoc3RhdGUgPT0gXCJpbmRldGVybWluYXRlXCIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDaGVja2JveENoYW5nZUhhbmRsZXIoY2hlY2tib3gsIHJlZmVyZW5jZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJlZnNTZXQgPSBnZXRTdG9yZWRDaGVja2JveFJlZnMoY2hlY2tib3gpO1xuICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgIC8vIGNoZWNrYm94IHRpY2tlZFxuICAgICAgZm9yICh2YXIgcmVmIG9mIHJlZmVyZW5jZXMpIHtcbiAgICAgICAgcmVmc1NldC5hZGQocmVmKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY2hlY2tib3ggdW50aWNrZWRcbiAgICAgIGZvciAodmFyIHJlZiBvZiByZWZlcmVuY2VzKSB7XG4gICAgICAgIHJlZnNTZXQuZGVsZXRlKHJlZik7XG4gICAgICB9XG4gICAgfVxuICAgIGdsb2JhbERhdGEud3JpdGVTdG9yYWdlKFwiY2hlY2tib3hfXCIgKyBjaGVja2JveCwgWy4uLnJlZnNTZXRdLmpvaW4oXCIsXCIpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVSb3dIaWdobGlnaHRIYW5kbGVyKHJvd2lkLCByZWZzKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpZiAoZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKSB7XG4gICAgICBpZiAoZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpID09IHJvd2lkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGdsb2JhbERhdGEuZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKSkuY2xhc3NMaXN0LnJlbW92ZShcImhpZ2hsaWdodGVkXCIpO1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChyb3dpZCkuY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodGVkXCIpO1xuICAgIGdsb2JhbERhdGEuc2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQocm93aWQpO1xuICAgIGdsb2JhbERhdGEuc2V0SGlnaGxpZ2h0ZWRSZWZzKHJlZnMpO1xuICAgIHJlbmRlci5kcmF3SGlnaGxpZ2h0cygpO1xuICB9XG59XG5cbi8vWFhYIFRIaXMgZnVuY3Rpb24gaGFzIGZpbHRlci4gRmlsdGVyIGlzIG5vdCBnbG9iYWwuIFdoZXJlIGRvZXMgaXQgY29tZSBmcm9tIHRoZW5cbmZ1bmN0aW9uIGVudHJ5TWF0Y2hlcyhlbnRyeSkge1xuICAvLyBjaGVjayByZWZzXG4gIGZvciAodmFyIHJlZiBvZiBlbnRyeVszXSkge1xuICAgIGlmIChyZWYudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlcikgPj0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIC8vIGNoZWNrIHZhbHVlXG4gIGlmIChlbnRyeVsxXS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyKSA+PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLy8gY2hlY2sgZm9vdHByaW50XG4gIGlmIChlbnRyeVsyXS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyKSA+PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBmaW5kUmVmSW5FbnRyeShlbnRyeSkge1xuICBmb3IgKHZhciByZWYgb2YgZW50cnlbM10pIHtcbiAgICBpZiAocmVmLnRvTG93ZXJDYXNlKCkgPT0gcmVmbG9va3VwKSB7XG4gICAgICByZXR1cm4gW3JlZl07XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0RmlsdGVyKHMpIHtcbiAgaWYgKCFmaWx0ZXIpIHtcbiAgICByZXR1cm4gcztcbiAgfVxuICB2YXIgcGFydHMgPSBzLnRvTG93ZXJDYXNlKCkuc3BsaXQoZmlsdGVyKTtcbiAgaWYgKHBhcnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgcmV0dXJuIHM7XG4gIH1cbiAgdmFyIHIgPSBcIlwiO1xuICB2YXIgcG9zID0gMDtcbiAgZm9yICh2YXIgaSBpbiBwYXJ0cykge1xuICAgIGlmIChpID4gMCkge1xuICAgICAgciArPSAnPG1hcmsgY2xhc3M9XCJoaWdobGlnaHRcIj4nICtcbiAgICAgICAgcy5zdWJzdHJpbmcocG9zLCBwb3MgKyBmaWx0ZXIubGVuZ3RoKSArXG4gICAgICAgICc8L21hcms+JztcbiAgICAgIHBvcyArPSBmaWx0ZXIubGVuZ3RoO1xuICAgIH1cbiAgICByICs9IHMuc3Vic3RyaW5nKHBvcywgcG9zICsgcGFydHNbaV0ubGVuZ3RoKTtcbiAgICBwb3MgKz0gcGFydHNbaV0ubGVuZ3RoO1xuICB9XG4gIHJldHVybiByO1xufVxuXG5mdW5jdGlvbiBjaGVja2JveFNldFVuc2V0QWxsSGFuZGxlcihjaGVja2JveG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjaGVja2JveG51bSA9IDA7XG4gICAgd2hpbGUgKGNoZWNrYm94bnVtIDwgZ2xvYmFsRGF0YS5nZXRDaGVja2JveGVzKCkubGVuZ3RoICYmXG4gICAgICBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKVtjaGVja2JveG51bV0udG9Mb3dlckNhc2UoKSAhPSBjaGVja2JveG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgY2hlY2tib3hudW0rKztcbiAgICB9XG4gICAgaWYgKGNoZWNrYm94bnVtID49IGdsb2JhbERhdGEuZ2V0Q2hlY2tib3hlcygpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYWxsc2V0ID0gdHJ1ZTtcbiAgICB2YXIgY2hlY2tib3g7XG4gICAgdmFyIHJvdztcbiAgICBmb3IgKHJvdyBvZiBib21ib2R5LmNoaWxkTm9kZXMpIHtcbiAgICAgIGNoZWNrYm94ID0gcm93LmNoaWxkTm9kZXNbY2hlY2tib3hudW0gKyAxXS5jaGlsZE5vZGVzWzBdO1xuICAgICAgaWYgKCFjaGVja2JveC5jaGVja2VkIHx8IGNoZWNrYm94LmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgICAgYWxsc2V0ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHJvdyBvZiBib21ib2R5LmNoaWxkTm9kZXMpIHtcbiAgICAgIGNoZWNrYm94ID0gcm93LmNoaWxkTm9kZXNbY2hlY2tib3hudW0gKyAxXS5jaGlsZE5vZGVzWzBdO1xuICAgICAgY2hlY2tib3guY2hlY2tlZCA9ICFhbGxzZXQ7XG4gICAgICBjaGVja2JveC5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgICBjaGVja2JveC5vbmNoYW5nZSgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb2x1bW5IZWFkZXIobmFtZSwgY2xzLCBjb21wYXJhdG9yKSB7XG4gIHZhciB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJUSFwiKTtcbiAgdGguaW5uZXJIVE1MID0gbmFtZTtcbiAgdGguY2xhc3NMaXN0LmFkZChjbHMpO1xuICB0aC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiU1BBTlwiKTtcbiAgc3Bhbi5jbGFzc0xpc3QuYWRkKFwic29ydG1hcmtcIik7XG4gIHNwYW4uY2xhc3NMaXN0LmFkZChcIm5vbmVcIik7XG4gIHRoLmFwcGVuZENoaWxkKHNwYW4pO1xuICB0aC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKSAmJiB0aGlzICE9PSBnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkpIHtcbiAgICAgIC8vIEN1cnJlbnRseSBzb3J0ZWQgYnkgYW5vdGhlciBjb2x1bW5cbiAgICAgIGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKS5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5yZW1vdmUoZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydE9yZGVyKCkpO1xuICAgICAgZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZChcIm5vbmVcIik7XG4gICAgICBnbG9iYWxEYXRhLnNldEN1cnJlbnRTb3J0Q29sdW1uKG51bGwpO1xuICAgICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50U29ydE9yZGVyKG51bGwpO1xuICAgIH1cbiAgICBpZiAoZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpICYmIHRoaXMgPT09IGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKSkge1xuICAgICAgLy8gQWxyZWFkeSBzb3J0ZWQgYnkgdGhpcyBjb2x1bW5cbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0T3JkZXIoKSA9PSBcImFzY1wiKSB7XG4gICAgICAgIC8vIFNvcnQgYnkgdGhpcyBjb2x1bW4sIGRlc2NlbmRpbmcgb3JkZXJcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRCb21Tb3J0RnVuY3Rpb24oZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgIHJldHVybiAtY29tcGFyYXRvcihhLCBiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKS5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5yZW1vdmUoXCJhc2NcIik7XG4gICAgICAgIGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKS5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5hZGQoXCJkZXNjXCIpO1xuICAgICAgICBnbG9iYWxEYXRhLnNldEN1cnJlbnRTb3J0T3JkZXIoXCJkZXNjXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVW5zb3J0XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU29ydEZ1bmN0aW9uKG51bGwpO1xuICAgICAgICBnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QucmVtb3ZlKFwiZGVzY1wiKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZChcIm5vbmVcIik7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Q3VycmVudFNvcnRDb2x1bW4obnVsbCk7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Q3VycmVudFNvcnRPcmRlcihudWxsKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU29ydCBieSB0aGlzIGNvbHVtbiwgYXNjZW5kaW5nIG9yZGVyXG4gICAgICBnbG9iYWxEYXRhLnNldEJvbVNvcnRGdW5jdGlvbihjb21wYXJhdG9yKTtcbiAgICAgIGdsb2JhbERhdGEuc2V0Q3VycmVudFNvcnRDb2x1bW4odGhpcyk7XG4gICAgICBnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QucmVtb3ZlKFwibm9uZVwiKTtcbiAgICAgIGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKS5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5hZGQoXCJhc2NcIik7XG4gICAgICBnbG9iYWxEYXRhLnNldEN1cnJlbnRTb3J0T3JkZXIoXCJhc2NcIik7XG4gICAgfVxuICAgIHBvcHVsYXRlQm9tQm9keSgpO1xuICB9XG4gIHJldHVybiB0aDtcbn1cblxuZnVuY3Rpb24gZmFuY3lEYmxDbGlja0hhbmRsZXIoZWwsIG9uc2luZ2xlLCBvbmRvdWJsZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGVsLmdldEF0dHJpYnV0ZShcImRhdGEtZGJsY2xpY2tcIikgPT0gbnVsbCkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKFwiZGF0YS1kYmxjbGlja1wiLCAxKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRibGNsaWNrXCIpID09IDEpIHtcbiAgICAgICAgICBvbnNpbmdsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtZGJsY2xpY2tcIik7XG4gICAgICB9LCAyMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWRibGNsaWNrXCIpO1xuICAgICAgb25kb3VibGUoKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVCb21IZWFkZXIoKSB7XG4gIHdoaWxlIChib21oZWFkLmZpcnN0Q2hpbGQpIHtcbiAgICBib21oZWFkLnJlbW92ZUNoaWxkKGJvbWhlYWQuZmlyc3RDaGlsZCk7XG4gIH1cbiAgdmFyIHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlRSXCIpO1xuICB2YXIgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVEhcIik7XG4gIHRoLmNsYXNzTGlzdC5hZGQoXCJudW1Db2xcIik7XG4gIHRyLmFwcGVuZENoaWxkKHRoKTtcbiAgZ2xvYmFsRGF0YS5zZXRDaGVja2JveGVzKGdsb2JhbERhdGEuZ2V0Qm9tQ2hlY2tib3hlcygpLnNwbGl0KFwiLFwiKS5maWx0ZXIoKGUpID0+IGUpKTtcbiAgdmFyIGNoZWNrYm94Q29tcGFyZUNsb3N1cmUgPSBmdW5jdGlvbihjaGVja2JveCkge1xuICAgIHJldHVybiAoYSwgYikgPT4ge1xuICAgICAgdmFyIHN0YXRlQSA9IGdldENoZWNrYm94U3RhdGUoY2hlY2tib3gsIGFbM10pO1xuICAgICAgdmFyIHN0YXRlQiA9IGdldENoZWNrYm94U3RhdGUoY2hlY2tib3gsIGJbM10pO1xuICAgICAgaWYgKHN0YXRlQSA+IHN0YXRlQikgcmV0dXJuIC0xO1xuICAgICAgaWYgKHN0YXRlQSA8IHN0YXRlQikgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cbiAgZm9yICh2YXIgY2hlY2tib3ggb2YgZ2xvYmFsRGF0YS5nZXRDaGVja2JveGVzKCkpIHtcbiAgICB0aCA9IGNyZWF0ZUNvbHVtbkhlYWRlcihcbiAgICAgIGNoZWNrYm94LCBcImJvbS1jaGVja2JveFwiLCBjaGVja2JveENvbXBhcmVDbG9zdXJlKGNoZWNrYm94KSk7XG4gICAgdGgub25jbGljayA9IGZhbmN5RGJsQ2xpY2tIYW5kbGVyKFxuICAgICAgdGgsIHRoLm9uY2xpY2suYmluZCh0aCksIGNoZWNrYm94U2V0VW5zZXRBbGxIYW5kbGVyKGNoZWNrYm94KSk7XG4gICAgdHIuYXBwZW5kQ2hpbGQodGgpO1xuICB9XG4gIHRyLmFwcGVuZENoaWxkKGNyZWF0ZUNvbHVtbkhlYWRlcihcIlJlZmVyZW5jZXNcIiwgXCJSZWZlcmVuY2VzXCIsIChhLCBiKSA9PiB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgYVszXS5sZW5ndGggJiYgaSA8IGJbM10ubGVuZ3RoKSB7XG4gICAgICBpZiAoYVszXVtpXSAhPSBiWzNdW2ldKSByZXR1cm4gYVszXVtpXSA+IGJbM11baV0gPyAxIDogLTE7XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBhWzNdLmxlbmd0aCAtIGJbM10ubGVuZ3RoO1xuICB9KSk7XG4gIHRyLmFwcGVuZENoaWxkKGNyZWF0ZUNvbHVtbkhlYWRlcihcIlZhbHVlXCIsIFwiVmFsdWVcIiwgKGEsIGIpID0+IHtcbiAgICBpZiAoYVsxXSAhPSBiWzFdKSByZXR1cm4gYVsxXSA+IGJbMV0gPyAxIDogLTE7XG4gICAgZWxzZSByZXR1cm4gMDtcbiAgfSkpO1xuICB0ci5hcHBlbmRDaGlsZChjcmVhdGVDb2x1bW5IZWFkZXIoXCJGb290cHJpbnRcIiwgXCJGb290cHJpbnRcIiwgKGEsIGIpID0+IHtcbiAgICBpZiAoYVsyXSAhPSBiWzJdKSByZXR1cm4gYVsyXSA+IGJbMl0gPyAxIDogLTE7XG4gICAgZWxzZSByZXR1cm4gMDtcbiAgfSkpO1xuICB0ci5hcHBlbmRDaGlsZChjcmVhdGVDb2x1bW5IZWFkZXIoXCJRdWFudGl0eVwiLCBcIlF1YW50aXR5XCIsIChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIGFbM10ubGVuZ3RoIC0gYlszXS5sZW5ndGg7XG4gIH0pKTtcbiAgYm9taGVhZC5hcHBlbmRDaGlsZCh0cik7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlQm9tQm9keSgpIHtcbiAgd2hpbGUgKGJvbS5maXJzdENoaWxkKSB7XG4gICAgYm9tLnJlbW92ZUNoaWxkKGJvbS5maXJzdENoaWxkKTtcbiAgfVxuICBnbG9iYWxEYXRhLnNldEhpZ2hsaWdodEhhbmRsZXJzKFtdKTtcbiAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZChudWxsKTtcbiAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgY29uc29sZS5sb2coZ2xvYmFsRGF0YS5nZXRDYW52YXNMYXlvdXQoKSlcbiAgc3dpdGNoIChnbG9iYWxEYXRhLmdldENhbnZhc0xheW91dCgpKSB7XG4gICAgY2FzZSAnRic6XG4gICAgICBib210YWJsZSA9IHBjYmRhdGEuYm9tLkY7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdGQic6XG4gICAgICBib210YWJsZSA9IHBjYmRhdGEuYm9tLmJvdGg7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdCJzpcbiAgICAgIGJvbXRhYmxlID0gcGNiZGF0YS5ib20uQjtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGlmIChnbG9iYWxEYXRhLmdldEJvbVNvcnRGdW5jdGlvbigpKSB7XG4gICAgYm9tdGFibGUgPSBib210YWJsZS5zbGljZSgpLnNvcnQoZ2xvYmFsRGF0YS5nZXRCb21Tb3J0RnVuY3Rpb24oKSk7XG4gIH1cbiAgZm9yICh2YXIgaSBpbiBib210YWJsZSkge1xuICAgIHZhciBib21lbnRyeSA9IGJvbXRhYmxlW2ldO1xuICAgIGlmIChmaWx0ZXIgJiYgIWVudHJ5TWF0Y2hlcyhib21lbnRyeSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB2YXIgcmVmZXJlbmNlcyA9IGJvbWVudHJ5WzNdO1xuICAgIGlmIChyZWZsb29rdXApIHtcbiAgICAgIHJlZmVyZW5jZXMgPSBmaW5kUmVmSW5FbnRyeShib21lbnRyeSk7XG4gICAgICBpZiAoIXJlZmVyZW5jZXMpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJUUlwiKTtcbiAgICB2YXIgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVERcIik7XG4gICAgdmFyIHJvd251bSA9ICtpICsgMTtcbiAgICB0ci5pZCA9IFwiYm9tcm93XCIgKyByb3dudW07XG4gICAgdGQudGV4dENvbnRlbnQgPSByb3dudW07XG4gICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xuICAgIC8vIENoZWNrYm94ZXNcbiAgICBmb3IgKHZhciBjaGVja2JveCBvZiBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKSkge1xuICAgICAgaWYgKGNoZWNrYm94KSB7XG4gICAgICAgIHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlREXCIpO1xuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgIGlucHV0Lm9uY2hhbmdlID0gY3JlYXRlQ2hlY2tib3hDaGFuZ2VIYW5kbGVyKGNoZWNrYm94LCByZWZlcmVuY2VzKTtcbiAgICAgICAgc2V0Qm9tQ2hlY2tib3hTdGF0ZShjaGVja2JveCwgaW5wdXQsIHJlZmVyZW5jZXMpO1xuICAgICAgICB0ZC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgIHRyLmFwcGVuZENoaWxkKHRkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVmZXJlbmNlc1xuICAgIHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlREXCIpO1xuICAgIHRkLmlubmVySFRNTCA9IGhpZ2hsaWdodEZpbHRlcihyZWZlcmVuY2VzLmpvaW4oXCIsIFwiKSk7XG4gICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xuICAgIC8vIFZhbHVlXG4gICAgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVERcIik7XG4gICAgdGQuaW5uZXJIVE1MID0gaGlnaGxpZ2h0RmlsdGVyKGJvbWVudHJ5WzFdKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgLy8gRm9vdHByaW50XG4gICAgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVERcIik7XG4gICAgdGQuaW5uZXJIVE1MID0gaGlnaGxpZ2h0RmlsdGVyKGJvbWVudHJ5WzJdKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgLy8gUXVhbnRpdHlcbiAgICB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJURFwiKTtcbiAgICB0ZC50ZXh0Q29udGVudCA9IGJvbWVudHJ5WzNdLmxlbmd0aDtcbiAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgYm9tLmFwcGVuZENoaWxkKHRyKTtcbiAgICB2YXIgaGFuZGxlciA9IGNyZWF0ZVJvd0hpZ2hsaWdodEhhbmRsZXIodHIuaWQsIHJlZmVyZW5jZXMpO1xuICAgIHRyLm9ubW91c2Vtb3ZlID0gaGFuZGxlcjtcbiAgICBnbG9iYWxEYXRhLnB1c2hIaWdobGlnaHRIYW5kbGVycyh7XG4gICAgICBpZDogdHIuaWQsXG4gICAgICBoYW5kbGVyOiBoYW5kbGVyLFxuICAgICAgcmVmczogcmVmZXJlbmNlc1xuICAgIH0pO1xuICAgIGlmICgoZmlsdGVyIHx8IHJlZmxvb2t1cCkgJiYgZmlyc3QpIHtcbiAgICAgIGhhbmRsZXIoKTtcbiAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNtb290aFNjcm9sbFRvUm93KHJvd2lkKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJvd2lkKS5zY3JvbGxJbnRvVmlldyh7XG4gICAgYmVoYXZpb3I6IFwic21vb3RoXCIsXG4gICAgYmxvY2s6IFwiY2VudGVyXCIsXG4gICAgaW5saW5lOiBcIm5lYXJlc3RcIlxuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0UHJldmlvdXNSb3coKSB7XG4gIGlmICghZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKSB7XG4gICAgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpW2dsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGggLSAxXS5oYW5kbGVyKCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGggPiAxICYmXG4gICAgICBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbMF0uaWQgPT0gZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKSB7XG4gICAgICBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpLmxlbmd0aCAtIDFdLmhhbmRsZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKCkubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGlmIChnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbaSArIDFdLmlkID09IGdsb2JhbERhdGEuZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKSkge1xuICAgICAgICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVtpXS5oYW5kbGVyKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc21vb3RoU2Nyb2xsVG9Sb3coZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKTtcbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0TmV4dFJvdygpIHtcbiAgaWYgKCFnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpIHtcbiAgICBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbMF0uaGFuZGxlcigpO1xuICB9IGVsc2Uge1xuICAgIGlmIChnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKCkubGVuZ3RoID4gMSAmJlxuICAgICAgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpW2dsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGggLSAxXS5pZCA9PSBnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpIHtcbiAgICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVswXS5oYW5kbGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbaSAtIDFdLmlkID09IGdsb2JhbERhdGEuZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKSkge1xuICAgICAgICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVtpXS5oYW5kbGVyKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc21vb3RoU2Nyb2xsVG9Sb3coZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVCb21UYWJsZSgpIHtcbiAgcG9wdWxhdGVCb21IZWFkZXIoKTtcbiAgcG9wdWxhdGVCb21Cb2R5KCk7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNDbGlja2VkKHJlZmVyZW5jZXMpIHtcbiAgdmFyIGxhc3RDbGlja2VkSW5kZXggPSByZWZlcmVuY2VzLmluZGV4T2YoZ2xvYmFsRGF0YS5nZXRMYXN0Q2xpY2tlZFJlZigpKTtcbiAgdmFyIHJlZiA9IHJlZmVyZW5jZXNbKGxhc3RDbGlja2VkSW5kZXggKyAxKSAlIHJlZmVyZW5jZXMubGVuZ3RoXTtcbiAgZm9yICh2YXIgaGFuZGxlciBvZiBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKCkpIHtcbiAgICBpZiAoaGFuZGxlci5yZWZzLmluZGV4T2YocmVmKSA+PSAwKSB7XG4gICAgICBnbG9iYWxEYXRhLnNldExhc3RDbGlja2VkUmVmKHJlZik7XG4gICAgICBoYW5kbGVyLmhhbmRsZXIoKTtcbiAgICAgIHNtb290aFNjcm9sbFRvUm93KGdsb2JhbERhdGEuZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlRmlsdGVyKGlucHV0KSB7XG4gIGZpbHRlciA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gIHBvcHVsYXRlQm9tVGFibGUoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUmVmTG9va3VwKGlucHV0KSB7XG4gIHJlZmxvb2t1cCA9IGlucHV0LnRvTG93ZXJDYXNlKCk7XG4gIHBvcHVsYXRlQm9tVGFibGUoKTtcbn1cblxuZnVuY3Rpb24gc2lsa3NjcmVlblZpc2libGUodmlzaWJsZSkge1xuICBpZiAodmlzaWJsZSkge1xuICAgIGFsbGNhbnZhcy5mcm9udC5zaWxrLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgIGFsbGNhbnZhcy5iYWNrLnNpbGsuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJzaWxrc2NyZWVuVmlzaWJsZVwiLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBhbGxjYW52YXMuZnJvbnQuc2lsay5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgYWxsY2FudmFzLmJhY2suc2lsay5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJzaWxrc2NyZWVuVmlzaWJsZVwiLCBmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hhbmdlQ2FudmFzTGF5b3V0KGxheW91dCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsLWJ0blwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZGVwcmVzc2VkXCIpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZiLWJ0blwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZGVwcmVzc2VkXCIpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJsLWJ0blwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZGVwcmVzc2VkXCIpO1xuICBzd2l0Y2ggKGxheW91dCkge1xuICAgIGNhc2UgJ0YnOlxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbC1idG5cIikuY2xhc3NMaXN0LmFkZChcImRlcHJlc3NlZFwiKTtcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEJvbUxheW91dCgpICE9IFwiQk9NXCIpIHtcbiAgICAgICAgZ2xvYmFsRGF0YS5jb2xsYXBzZUNhbnZhc1NwbGl0KDEpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQic6XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJsLWJ0blwiKS5jbGFzc0xpc3QuYWRkKFwiZGVwcmVzc2VkXCIpO1xuICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0Qm9tTGF5b3V0KCkgIT0gXCJCT01cIikge1xuICAgICAgICBnbG9iYWxEYXRhLmNvbGxhcHNlQ2FudmFzU3BsaXQoMCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmYi1idG5cIikuY2xhc3NMaXN0LmFkZChcImRlcHJlc3NlZFwiKTtcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEJvbUxheW91dCgpICE9IFwiQk9NXCIpIHtcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRTaXplc0NhbnZhc1NwbGl0KFs1MCwgNTBdKTtcbiAgICAgIH1cbiAgfVxuICBnbG9iYWxEYXRhLnNldENhbnZhc0xheW91dChsYXlvdXQpO1xuICBnbG9iYWxEYXRhLndyaXRlU3RvcmFnZShcImNhbnZhc2xheW91dFwiLCBsYXlvdXQpO1xuICByZW5kZXIucmVzaXplQWxsKCk7XG4gIHBvcHVsYXRlQm9tVGFibGUoKTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVNZXRhZGF0YSgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKS5pbm5lckhUTUwgICAgPSBwY2JkYXRhLm1ldGFkYXRhLnRpdGxlO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJldmlzaW9uXCIpLmlubmVySFRNTCA9IFwiUmV2OiBcIiArIHBjYmRhdGEubWV0YWRhdGEucmV2aXNpb247XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcGFueVwiKS5pbm5lckhUTUwgID0gcGNiZGF0YS5tZXRhZGF0YS5jb21wYW55O1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGVkYXRlXCIpLmlubmVySFRNTCA9IHBjYmRhdGEubWV0YWRhdGEuZGF0ZTtcbiAgaWYgKHBjYmRhdGEubWV0YWRhdGEudGl0bGUgIT0gXCJcIikge1xuICAgIGRvY3VtZW50LnRpdGxlID0gcGNiZGF0YS5tZXRhZGF0YS50aXRsZSArIFwiIEJPTVwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoYW5nZUJvbUxheW91dChsYXlvdXQpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib20tYnRuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXByZXNzZWRcIik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibHItYnRuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXByZXNzZWRcIik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGItYnRuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXByZXNzZWRcIik7XG4gIHN3aXRjaCAobGF5b3V0KSB7XG4gICAgY2FzZSAnQk9NJzpcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9tLWJ0blwiKS5jbGFzc0xpc3QuYWRkKFwiZGVwcmVzc2VkXCIpO1xuICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0Qm9tU3BsaXQoKSkge1xuICAgICAgICBnbG9iYWxEYXRhLmRlc3Ryb3lCb21TcGxpdCgpO1xuICAgICAgICBnbG9iYWxEYXRhLnNldEJvbVNwbGl0KG51bGwpO1xuICAgICAgICBnbG9iYWxEYXRhLmRlc3Ryb3lDYW52YXNTcGxpdCgpO1xuICAgICAgICBnbG9iYWxEYXRhLnNldENhbnZhc1NwbGl0KG51bGwpO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcm9udGNhbnZhc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib3RcIikuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1RCJzpcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGItYnRuXCIpLmNsYXNzTGlzdC5hZGQoXCJkZXByZXNzZWRcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb250Y2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrY2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib3RcIikuc3R5bGUuaGVpZ2h0ID0gXCJjYWxjKDEwMCUgLSA4MHB4KVwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib21kaXZcIikuY2xhc3NMaXN0LnJlbW92ZShcInNwbGl0LWhvcml6b250YWxcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc2RpdlwiKS5jbGFzc0xpc3QucmVtb3ZlKFwic3BsaXQtaG9yaXpvbnRhbFwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJvbnRjYW52YXNcIikuY2xhc3NMaXN0LmFkZChcInNwbGl0LWhvcml6b250YWxcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIikuY2xhc3NMaXN0LmFkZChcInNwbGl0LWhvcml6b250YWxcIik7XG4gICAgICBpZiAoZ2xvYmFsRGF0YS5nZXRCb21TcGxpdCgpKSB7XG4gICAgICAgIGdsb2JhbERhdGEuZGVzdHJveUJvbVNwbGl0KCk7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU3BsaXQobnVsbCk7XG4gICAgICAgIGdsb2JhbERhdGEuZGVzdHJveUNhbnZhc1NwbGl0KCk7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzU3BsaXQobnVsbCk7XG4gICAgICB9XG4gICAgICBnbG9iYWxEYXRhLnNldEJvbVNwbGl0KFNwbGl0KFsnI2JvbWRpdicsICcjY2FudmFzZGl2J10sIHtcbiAgICAgICAgc2l6ZXM6IFs1MCwgNTBdLFxuICAgICAgICBvbkRyYWdFbmQ6IHJlbmRlci5yZXNpemVBbGwsXG4gICAgICAgIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxuICAgICAgICBndXR0ZXJTaXplOiA1XG4gICAgICB9KSk7XG4gICAgICBnbG9iYWxEYXRhLnNldENhbnZhc1NwbGl0KFNwbGl0KFsnI2Zyb250Y2FudmFzJywgJyNiYWNrY2FudmFzJ10sIHtcbiAgICAgICAgc2l6ZXM6IFs1MCwgNTBdLFxuICAgICAgICBndXR0ZXJTaXplOiA1LFxuICAgICAgICBvbkRyYWdFbmQ6IHJlbmRlci5yZXNpemVBbGxcbiAgICAgIH0pKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0xSJzpcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibHItYnRuXCIpLmNsYXNzTGlzdC5hZGQoXCJkZXByZXNzZWRcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb250Y2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrY2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib3RcIikuc3R5bGUuaGVpZ2h0ID0gXCJjYWxjKDEwMCUgLSA4MHB4KVwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib21kaXZcIikuY2xhc3NMaXN0LmFkZChcInNwbGl0LWhvcml6b250YWxcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc2RpdlwiKS5jbGFzc0xpc3QuYWRkKFwic3BsaXQtaG9yaXpvbnRhbFwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJvbnRjYW52YXNcIikuY2xhc3NMaXN0LnJlbW92ZShcInNwbGl0LWhvcml6b250YWxcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIikuY2xhc3NMaXN0LnJlbW92ZShcInNwbGl0LWhvcml6b250YWxcIik7XG4gICAgICBpZiAoZ2xvYmFsRGF0YS5nZXRCb21TcGxpdCgpKSB7XG4gICAgICAgIGdsb2JhbERhdGEuZGVzdHJveUJvbVNwbGl0KCk7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU3BsaXQobnVsbCk7XG4gICAgICAgIGdsb2JhbERhdGEuZGVzdHJveUNhbnZhc1NwbGl0KCk7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzU3BsaXQobnVsbCk7XG4gICAgICB9XG4gICAgICBnbG9iYWxEYXRhLnNldEJvbVNwbGl0KFNwbGl0KFsnI2JvbWRpdicsICcjY2FudmFzZGl2J10sIHtcbiAgICAgICAgc2l6ZXM6IFs1MCwgNTBdLFxuICAgICAgICBvbkRyYWdFbmQ6IHJlbmRlci5yZXNpemVBbGwsXG4gICAgICAgIGd1dHRlclNpemU6IDVcbiAgICAgIH0pKTtcbiAgICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzU3BsaXQoU3BsaXQoWycjZnJvbnRjYW52YXMnLCAnI2JhY2tjYW52YXMnXSwge1xuICAgICAgICBzaXplczogWzUwLCA1MF0sXG4gICAgICAgIGd1dHRlclNpemU6IDUsXG4gICAgICAgIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxuICAgICAgICBvbkRyYWdFbmQ6IHJlbmRlci5yZXNpemVBbGxcbiAgICAgIH0pKTtcbiAgfVxuICBnbG9iYWxEYXRhLnNldEJvbUxheW91dChsYXlvdXQpO1xuICBnbG9iYWxEYXRhLndyaXRlU3RvcmFnZShcImJvbWxheW91dFwiLCBsYXlvdXQpO1xuICBjaGFuZ2VDYW52YXNMYXlvdXQoZ2xvYmFsRGF0YS5nZXRDYW52YXNMYXlvdXQoKSk7XG59XG5cbmZ1bmN0aW9uIGZvY3VzSW5wdXRGaWVsZChpbnB1dCkge1xuICBpbnB1dC5zY3JvbGxJbnRvVmlldyhmYWxzZSk7XG4gIGlucHV0LmZvY3VzKCk7XG4gIGlucHV0LnNlbGVjdCgpO1xufVxuXG5mdW5jdGlvbiBmb2N1c0ZpbHRlckZpZWxkKCkge1xuICBmb2N1c0lucHV0RmllbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWx0ZXJcIikpO1xufVxuXG5mdW5jdGlvbiBmb2N1c1JlZkxvb2t1cEZpZWxkKCkge1xuICBmb2N1c0lucHV0RmllbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWZsb29rdXBcIikpO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVCb21DaGVja2JveChib21yb3dpZCwgY2hlY2tib3hudW0pIHtcbiAgaWYgKCFib21yb3dpZCB8fCBjaGVja2JveG51bSA+IGdsb2JhbERhdGEuZ2V0Q2hlY2tib3hlcygpLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgYm9tcm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm9tcm93aWQpO1xuICB2YXIgY2hlY2tib3ggPSBib21yb3cuY2hpbGROb2Rlc1tjaGVja2JveG51bV0uY2hpbGROb2Rlc1swXTtcbiAgY2hlY2tib3guY2hlY2tlZCA9ICFjaGVja2JveC5jaGVja2VkO1xuICBjaGVja2JveC5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gIGNoZWNrYm94Lm9uY2hhbmdlKCk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQm9tQ2hlY2tib3goYm9tcm93aWQsIGNoZWNrYm94bmFtZSkge1xuICB2YXIgY2hlY2tib3hudW0gPSAwO1xuICB3aGlsZSAoY2hlY2tib3hudW0gPCBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKS5sZW5ndGggJiZcbiAgICBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKVtjaGVja2JveG51bV0udG9Mb3dlckNhc2UoKSAhPSBjaGVja2JveG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgIGNoZWNrYm94bnVtKys7XG4gIH1cbiAgaWYgKCFib21yb3dpZCB8fCBjaGVja2JveG51bSA+PSBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGJvbXJvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJvbXJvd2lkKTtcbiAgdmFyIGNoZWNrYm94ID0gYm9tcm93LmNoaWxkTm9kZXNbY2hlY2tib3hudW0gKyAxXS5jaGlsZE5vZGVzWzBdO1xuICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgY2hlY2tib3guaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICBjaGVja2JveC5vbmNoYW5nZSgpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUd1dHRlck5vZGUobm9kZSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChub2RlLmNoaWxkTm9kZXNbaV0uY2xhc3NMaXN0ICYmXG4gICAgICBub2RlLmNoaWxkTm9kZXNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ3V0dGVyXCIpKSB7XG4gICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuY2hpbGROb2Rlc1tpXSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYW5HdXR0ZXJzKCkge1xuICByZW1vdmVHdXR0ZXJOb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm90XCIpKTtcbiAgcmVtb3ZlR3V0dGVyTm9kZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc2RpdlwiKSk7XG59XG5cbmZ1bmN0aW9uIHNldEJvbUNoZWNrYm94ZXModmFsdWUpIHtcbiAgZ2xvYmFsRGF0YS5zZXRCb21DaGVja2JveGVzKHZhbHVlKTtcbiAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJib21DaGVja2JveGVzXCIsIHZhbHVlKTtcbiAgcG9wdWxhdGVCb21UYWJsZSgpO1xufVxuXG5kb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbihlKSB7XG4gIHN3aXRjaCAoZS5rZXkpIHtcbiAgICBjYXNlIFwiblwiOlxuICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudHlwZSA9PSBcInRleHRcIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpICE9PSBudWxsKSB7XG4gICAgICAgIGNoZWNrQm9tQ2hlY2tib3goZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpLCBcInBsYWNlZFwiKTtcbiAgICAgICAgaGlnaGxpZ2h0TmV4dFJvdygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiQXJyb3dVcFwiOlxuICAgICAgaGlnaGxpZ2h0UHJldmlvdXNSb3coKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcbiAgICAgIGhpZ2hsaWdodE5leHRSb3coKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoZS5hbHRLZXkpIHtcbiAgICBzd2l0Y2ggKGUua2V5KSB7XG4gICAgICBjYXNlIFwiZlwiOlxuICAgICAgICBmb2N1c0ZpbHRlckZpZWxkKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiclwiOlxuICAgICAgICBmb2N1c1JlZkxvb2t1cEZpZWxkKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwielwiOlxuICAgICAgICBjaGFuZ2VCb21MYXlvdXQoXCJCT01cIik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwieFwiOlxuICAgICAgICBjaGFuZ2VCb21MYXlvdXQoXCJMUlwiKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJjXCI6XG4gICAgICAgIGNoYW5nZUJvbUxheW91dChcIlRCXCIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInZcIjpcbiAgICAgICAgY2hhbmdlQ2FudmFzTGF5b3V0KFwiRlwiKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJiXCI6XG4gICAgICAgIGNoYW5nZUNhbnZhc0xheW91dChcIkZCXCIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIm5cIjpcbiAgICAgICAgY2hhbmdlQ2FudmFzTGF5b3V0KFwiQlwiKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoZS5rZXkgPj0gJzEnICYmIGUua2V5IDw9ICc5Jykge1xuICAgICAgdG9nZ2xlQm9tQ2hlY2tib3goY3VycmVudEhpZ2hsaWdodGVkUm93SWQsIHBhcnNlSW50KGUua2V5KSk7XG4gICAgfVxuICB9XG59XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XG4gIGdsb2JhbERhdGEuaW5pdFN0b3JhZ2UoKTtcbiAgY2xlYW5HdXR0ZXJzKCk7XG4gIHJlbmRlci5pbml0UmVuZGVyKCk7XG4gIGRiZ2RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGJnXCIpO1xuICBib20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvbWJvZHlcIik7XG4gIGJvbWhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvbWhlYWRcIik7XG4gIGdsb2JhbERhdGEuc2V0Qm9tTGF5b3V0KGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJib21sYXlvdXRcIikpO1xuICBpZiAoIWdsb2JhbERhdGEuZ2V0Qm9tTGF5b3V0KCkpIHtcbiAgICBnbG9iYWxEYXRhLnNldEJvbUxheW91dChcIkxSXCIpO1xuICB9XG4gIGdsb2JhbERhdGEuc2V0Q2FudmFzTGF5b3V0KGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJjYW52YXNsYXlvdXRcIikpO1xuICBpZiAoIWdsb2JhbERhdGEuZ2V0Q2FudmFzTGF5b3V0KCkpIHtcbiAgICBnbG9iYWxEYXRhLnNldENhbnZhc0xheW91dChcIkZCXCIpO1xuICB9XG4gIGZpbHRlciA9IFwiXCI7XG4gIHJlZmxvb2t1cCA9IFwiXCI7XG4gIHBvcHVsYXRlTWV0YWRhdGEoKTtcbiAgZ2xvYmFsRGF0YS5zZXRCb21DaGVja2JveGVzKGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJib21DaGVja2JveGVzXCIpKTtcbiAgaWYgKGdsb2JhbERhdGEuZ2V0Qm9tQ2hlY2tib3hlcygpID09PSBudWxsKSB7XG4gICAgZ2xvYmFsRGF0YS5zZXRCb21DaGVja2JveGVzKFwiU291cmNlZCxQbGFjZWRcIik7XG4gIH1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib21DaGVja2JveGVzXCIpLnZhbHVlID0gZ2xvYmFsRGF0YS5nZXRCb21DaGVja2JveGVzKCk7XG4gIGlmIChnbG9iYWxEYXRhLnJlYWRTdG9yYWdlKFwic2lsa3NjcmVlblZpc2libGVcIikgPT09IFwiZmFsc2VcIikge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lsa3NjcmVlbkNoZWNrYm94XCIpLmNoZWNrZWQgPSBmYWxzZTtcbiAgICBzaWxrc2NyZWVuVmlzaWJsZShmYWxzZSk7XG4gIH1cbiAgaWYgKGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJyZWRyYXdPbkRyYWdcIikgPT09IFwiZmFsc2VcIikge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJhZ0NoZWNrYm94XCIpLmNoZWNrZWQgPSBmYWxzZTtcbiAgICBnbG9iYWxEYXRhLnNldFJlZHJhd09uRHJhZyhmYWxzZSk7XG4gIH1cbiAgaWYgKGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJkYXJrbW9kZVwiKSA9PT0gXCJ0cnVlXCIpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhcmttb2RlQ2hlY2tib3hcIikuY2hlY2tlZCA9IHRydWU7XG4gICAgc2V0RGFya01vZGUodHJ1ZSk7XG4gIH1cbiAgaWYgKGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJoaWdobGlnaHRwaW4xXCIpID09PSBcInRydWVcIikge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaGxpZ2h0cGluMUNoZWNrYm94XCIpLmNoZWNrZWQgPSB0cnVlO1xuICAgIGdsb2JhbERhdGEuc2V0SGlnaGxpZ2h0UGluMSh0cnVlKTtcbiAgICByZW5kZXIucmVkcmF3Q2FudmFzKGFsbGNhbnZhcy5mcm9udCk7XG4gICAgcmVuZGVyLnJlZHJhd0NhbnZhcyhhbGxjYW52YXMuYmFjayk7XG4gIH1cbiAgYm9hcmRSb3RhdGlvbiA9IGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJib2FyZFJvdGF0aW9uXCIpO1xuICBpZiAoYm9hcmRSb3RhdGlvbiA9PT0gbnVsbCkge1xuICAgIGJvYXJkUm90YXRpb24gPSAwO1xuICB9IGVsc2Uge1xuICAgIGJvYXJkUm90YXRpb24gPSBwYXJzZUludChib2FyZFJvdGF0aW9uKTtcbiAgfVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkUm90YXRpb25cIikudmFsdWUgPSBib2FyZFJvdGF0aW9uIC8gNTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3RhdGlvbkRlZ3JlZVwiKS50ZXh0Q29udGVudCA9IGJvYXJkUm90YXRpb247XG4gIC8vIFRyaWdnZXJzIHJlbmRlclxuICBjaGFuZ2VCb21MYXlvdXQoZ2xvYmFsRGF0YS5nZXRCb21MYXlvdXQoKSk7XG59XG5cbndpbmRvdy5vbnJlc2l6ZSA9IHJlbmRlci5yZXNpemVBbGw7XG53aW5kb3cubWF0Y2hNZWRpYShcInByaW50XCIpLmFkZExpc3RlbmVyKHJlbmRlci5yZXNpemVBbGwpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0RGFya01vZGUsIHNpbGtzY3JlZW5WaXNpYmxlLCB1cGRhdGVGaWx0ZXIsIHVwZGF0ZVJlZkxvb2t1cCwgY2hhbmdlQm9tTGF5b3V0LCBjaGFuZ2VDYW52YXNMYXlvdXQsIHNldEJvbUNoZWNrYm94ZXNcbn0iLCIvKiBQQ0IgcmVuZGVyaW5nIGNvZGUgKi9cblxudmFyIGdsb2JhbERhdGEgPSByZXF1aXJlKCcuL2dsb2JhbC5qcycpXG5cbmZ1bmN0aW9uIGRlZzJyYWQoZGVnKSB7XG4gIHJldHVybiBkZWcgKiBNYXRoLlBJIC8gMTgwO1xufVxuXG5mdW5jdGlvbiBjYWxjRm9udFBvaW50KGxpbmVwb2ludCwgdGV4dCwgb2Zmc2V0eCwgb2Zmc2V0eSwgdGlsdCkge1xuICB2YXIgcG9pbnQgPSBbXG4gICAgbGluZXBvaW50WzBdICogdGV4dC53aWR0aCArIG9mZnNldHgsXG4gICAgbGluZXBvaW50WzFdICogdGV4dC5oZWlnaHQgKyBvZmZzZXR5XG4gIF07XG4gIC8vIEFkZGluZyBoYWxmIGEgbGluZSBoZWlnaHQgaGVyZSBpcyB0ZWNobmljYWxseSBhIGJ1Z1xuICAvLyBidXQgcGNibmV3IGN1cnJlbnRseSBkb2VzIHRoZSBzYW1lLCB0ZXh0IGlzIHNsaWdodGx5IHNoaWZ0ZWQuXG4gIHBvaW50WzBdIC09IChwb2ludFsxXSArIHRleHQuaGVpZ2h0ICogMC41KSAqIHRpbHQ7XG4gIHJldHVybiBwb2ludDtcbn1cblxuZnVuY3Rpb24gZHJhd3RleHQoY3R4LCB0ZXh0LCBjb2xvciwgZmxpcCkge1xuICBjdHguc2F2ZSgpO1xuICBjdHgudHJhbnNsYXRlKC4uLnRleHQucG9zKTtcbiAgdmFyIGFuZ2xlID0gLXRleHQuYW5nbGU7XG4gIGlmICh0ZXh0LmF0dHIuaW5jbHVkZXMoXCJtaXJyb3JlZFwiKSkge1xuICAgIGN0eC5zY2FsZSgtMSwgMSk7XG4gICAgYW5nbGUgPSAtYW5nbGU7XG4gIH1cbiAgdmFyIHRpbHQgPSAwO1xuICBpZiAodGV4dC5hdHRyLmluY2x1ZGVzKFwiaXRhbGljXCIpKSB7XG4gICAgdGlsdCA9IDAuMTI1O1xuICB9XG4gIHZhciBpbnRlcmxpbmUgPSAodGV4dC5oZWlnaHQgKiAxLjUgKyB0ZXh0LnRoaWNrbmVzcykgLyAyO1xuICB2YXIgdHh0ID0gdGV4dC50ZXh0LnNwbGl0KFwiXFxuXCIpO1xuICBjdHgucm90YXRlKGRlZzJyYWQoYW5nbGUpKTtcbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgY3R4LmxpbmVDYXAgPSBcInJvdW5kXCI7XG4gIGN0eC5saW5lV2lkdGggPSB0ZXh0LnRoaWNrbmVzcztcbiAgZm9yICh2YXIgaSBpbiB0eHQpIHtcbiAgICB2YXIgb2Zmc2V0eSA9ICgtKHR4dC5sZW5ndGggLSAxKSArIGkgKiAyKSAqIGludGVybGluZSArIHRleHQuaGVpZ2h0IC8gMjtcbiAgICB2YXIgbGluZVdpZHRoID0gMDtcbiAgICBmb3IgKHZhciBjIG9mIHR4dFtpXSkge1xuICAgICAgbGluZVdpZHRoICs9IHBjYmRhdGEuZm9udF9kYXRhW2NdLncgKiB0ZXh0LndpZHRoO1xuICAgIH1cbiAgICB2YXIgb2Zmc2V0eCA9IDA7XG4gICAgc3dpdGNoICh0ZXh0Lmhvcml6X2p1c3RpZnkpIHtcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIC8vIEp1c3RpZnkgbGVmdCwgZG8gbm90aGluZ1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgLy8gSnVzdGlmeSBjZW50ZXJcbiAgICAgICAgb2Zmc2V0eCAtPSBsaW5lV2lkdGggLyAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgLy8gSnVzdGlmeSByaWdodFxuICAgICAgICBvZmZzZXR4IC09IGxpbmVXaWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGZvciAodmFyIGMgb2YgdHh0W2ldKSB7XG4gICAgICBmb3IgKHZhciBsaW5lIG9mIHBjYmRhdGEuZm9udF9kYXRhW2NdLmwpIHtcbiAgICAgICAgLy8gRHJhd2luZyBlYWNoIHNlZ21lbnQgc2VwYXJhdGVseSBpbnN0ZWFkIG9mXG4gICAgICAgIC8vIHBvbHlsaW5lIGJlY2F1c2Ugcm91bmQgbGluZSBjYXBzIGRvbid0IHdvcmsgaW4gam9pbnRzXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgY3R4Lm1vdmVUbyguLi5jYWxjRm9udFBvaW50KGxpbmVbaV0sIHRleHQsIG9mZnNldHgsIG9mZnNldHksIHRpbHQpKTtcbiAgICAgICAgICBjdHgubGluZVRvKC4uLmNhbGNGb250UG9pbnQobGluZVtpICsgMV0sIHRleHQsIG9mZnNldHgsIG9mZnNldHksIHRpbHQpKTtcbiAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9mZnNldHggKz0gcGNiZGF0YS5mb250X2RhdGFbY10udyAqIHRleHQud2lkdGg7XG4gICAgfVxuICB9XG4gIGN0eC5yZXN0b3JlKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdlZGdlKGN0eCwgc2NhbGVmYWN0b3IsIGVkZ2UsIGNvbG9yKSB7XG4gIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICBjdHgubGluZVdpZHRoID0gTWF0aC5tYXgoMSAvIHNjYWxlZmFjdG9yLCBlZGdlLndpZHRoKTtcbiAgY3R4LmxpbmVDYXAgPSBcInJvdW5kXCI7XG4gIGlmIChlZGdlLnR5cGUgPT0gXCJzZWdtZW50XCIpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyguLi5lZGdlLnN0YXJ0KTtcbiAgICBjdHgubGluZVRvKC4uLmVkZ2UuZW5kKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cbiAgaWYgKGVkZ2UudHlwZSA9PSBcImFyY1wiKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoXG4gICAgICAuLi5lZGdlLnN0YXJ0LFxuICAgICAgZWRnZS5yYWRpdXMsXG4gICAgICBkZWcycmFkKGVkZ2Uuc3RhcnRhbmdsZSksXG4gICAgICBkZWcycmFkKGVkZ2UuZW5kYW5nbGUpKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cbiAgaWYgKGVkZ2UudHlwZSA9PSBcImNpcmNsZVwiKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoXG4gICAgICAuLi5lZGdlLnN0YXJ0LFxuICAgICAgZWRnZS5yYWRpdXMsXG4gICAgICAwLCAyICogTWF0aC5QSSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkcmF3Um91bmRSZWN0KGN0eCwgY29sb3IsIHNpemUsIHJhZGl1cywgY3R4bWV0aG9kKSB7XG4gIGN0eC5iZWdpblBhdGgoKTtcbiAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gIHZhciB4ID0gc2l6ZVswXSAqIC0wLjU7XG4gIHZhciB5ID0gc2l6ZVsxXSAqIC0wLjU7XG4gIHZhciB3aWR0aCA9IHNpemVbMF07XG4gIHZhciBoZWlnaHQgPSBzaXplWzFdO1xuICBjdHgubW92ZVRvKHgsIDApO1xuICBjdHguYXJjVG8oeCwgeSArIGhlaWdodCwgeCArIHdpZHRoLCB5ICsgaGVpZ2h0LCByYWRpdXMpO1xuICBjdHguYXJjVG8oeCArIHdpZHRoLCB5ICsgaGVpZ2h0LCB4ICsgd2lkdGgsIHksIHJhZGl1cyk7XG4gIGN0eC5hcmNUbyh4ICsgd2lkdGgsIHksIHgsIHksIHJhZGl1cyk7XG4gIGN0eC5hcmNUbyh4LCB5LCB4LCB5ICsgaGVpZ2h0LCByYWRpdXMpO1xuICBjdHguY2xvc2VQYXRoKCk7XG4gIGN0eG1ldGhvZCgpO1xufVxuXG5mdW5jdGlvbiBkcmF3T2Jsb25nKGN0eCwgY29sb3IsIHNpemUsIGN0eG1ldGhvZCkge1xuICBkcmF3Um91bmRSZWN0KGN0eCwgY29sb3IsIHNpemUsIE1hdGgubWluKHNpemVbMF0sIHNpemVbMV0pIC8gMiwgY3R4bWV0aG9kKTtcbn1cblxuZnVuY3Rpb24gZHJhd1BvbHlnb25zKGN0eCwgY29sb3IsIHBvbHlnb25zLCBjdHhtZXRob2QpIHtcbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICBmb3IgKHZhciBwb2x5Z29uIG9mIHBvbHlnb25zKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGZvciAodmFyIHZlcnRleCBvZiBwb2x5Z29uKSB7XG4gICAgICBjdHgubGluZVRvKC4uLnZlcnRleClcbiAgICB9XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eG1ldGhvZCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdQb2x5Z29uU2hhcGUoY3R4LCBzaGFwZSwgY29sb3IpIHtcbiAgY3R4LnNhdmUoKTtcbiAgY3R4LnRyYW5zbGF0ZSguLi5zaGFwZS5wb3MpO1xuICBjdHgucm90YXRlKGRlZzJyYWQoLXNoYXBlLmFuZ2xlKSk7XG4gIGRyYXdQb2x5Z29ucyhjdHgsIGNvbG9yLCBzaGFwZS5wb2x5Z29ucywgY3R4LmZpbGwuYmluZChjdHgpKTtcbiAgY3R4LnJlc3RvcmUoKTtcbn1cblxuZnVuY3Rpb24gZHJhd0RyYXdpbmcoY3R4LCBsYXllciwgc2NhbGVmYWN0b3IsIGRyYXdpbmcsIGNvbG9yKSB7XG4gIGlmIChbXCJzZWdtZW50XCIsIFwiYXJjXCIsIFwiY2lyY2xlXCJdLmluY2x1ZGVzKGRyYXdpbmcudHlwZSkpIHtcbiAgICBkcmF3ZWRnZShjdHgsIHNjYWxlZmFjdG9yLCBkcmF3aW5nLCBjb2xvcik7XG4gIH0gZWxzZSBpZiAoZHJhd2luZy50eXBlID09IFwicG9seWdvblwiKSB7XG4gICAgZHJhd1BvbHlnb25TaGFwZShjdHgsIGRyYXdpbmcsIGNvbG9yKTtcbiAgfSBlbHNlIHtcbiAgICBkcmF3dGV4dChjdHgsIGRyYXdpbmcsIGNvbG9yLCBsYXllciA9PSBcIkJcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhd0NpcmNsZShjdHgsIHJhZGl1cywgY3R4bWV0aG9kKSB7XG4gIGN0eC5iZWdpblBhdGgoKTtcbiAgY3R4LmFyYygwLCAwLCByYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgY3R4LmNsb3NlUGF0aCgpO1xuICBjdHhtZXRob2QoKTtcbn1cblxuZnVuY3Rpb24gZHJhd1BhZChjdHgsIHBhZCwgY29sb3IsIG91dGxpbmUpIHtcbiAgY3R4LnNhdmUoKTtcbiAgY3R4LnRyYW5zbGF0ZSguLi5wYWQucG9zKTtcbiAgY3R4LnJvdGF0ZShkZWcycmFkKHBhZC5hbmdsZSkpO1xuICBpZiAocGFkLm9mZnNldCkge1xuICAgIGN0eC50cmFuc2xhdGUoLi4ucGFkLm9mZnNldCk7XG4gIH1cbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgdmFyIGN0eG1ldGhvZCA9IG91dGxpbmUgPyBjdHguc3Ryb2tlLmJpbmQoY3R4KSA6IGN0eC5maWxsLmJpbmQoY3R4KTtcbiAgaWYgKHBhZC5zaGFwZSA9PSBcInJlY3RcIikge1xuICAgIHZhciByZWN0ID0gWy4uLnBhZC5zaXplLm1hcChjID0+IC1jICogMC41KSwgLi4ucGFkLnNpemVdO1xuICAgIGlmIChvdXRsaW5lKSB7XG4gICAgICBjdHguc3Ryb2tlUmVjdCguLi5yZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LmZpbGxSZWN0KC4uLnJlY3QpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChwYWQuc2hhcGUgPT0gXCJvdmFsXCIpIHtcbiAgICBkcmF3T2Jsb25nKGN0eCwgY29sb3IsIHBhZC5zaXplLCBjdHhtZXRob2QpO1xuICB9IGVsc2UgaWYgKHBhZC5zaGFwZSA9PSBcImNpcmNsZVwiKSB7XG4gICAgZHJhd0NpcmNsZShjdHgsIHBhZC5zaXplWzBdIC8gMiwgY3R4bWV0aG9kKTtcbiAgfSBlbHNlIGlmIChwYWQuc2hhcGUgPT0gXCJyb3VuZHJlY3RcIikge1xuICAgIGRyYXdSb3VuZFJlY3QoY3R4LCBjb2xvciwgcGFkLnNpemUsIHBhZC5yYWRpdXMsIGN0eG1ldGhvZCk7XG4gIH0gZWxzZSBpZiAocGFkLnNoYXBlID09IFwiY3VzdG9tXCIpIHtcbiAgICBkcmF3UG9seWdvbnMoY3R4LCBjb2xvciwgcGFkLnBvbHlnb25zLCBjdHhtZXRob2QpO1xuICB9XG4gIGlmIChwYWQudHlwZSA9PSBcInRoXCIgJiYgIW91dGxpbmUpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjQ0NDQ0NDXCI7XG4gICAgaWYgKHBhZC5kcmlsbHNoYXBlID09IFwib2Jsb25nXCIpIHtcbiAgICAgIGRyYXdPYmxvbmcoY3R4LCBcIiNDQ0NDQ0NcIiwgcGFkLmRyaWxsc2l6ZSwgY3R4bWV0aG9kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZHJhd0NpcmNsZShjdHgsIHBhZC5kcmlsbHNpemVbMF0gLyAyLCBjdHhtZXRob2QpO1xuICAgIH1cbiAgfVxuICBjdHgucmVzdG9yZSgpO1xufVxuXG5mdW5jdGlvbiBkcmF3TW9kdWxlKGN0eCwgbGF5ZXIsIHNjYWxlZmFjdG9yLCBtb2R1bGUsIHBhZGNvbG9yLCBvdXRsaW5lY29sb3IsIGhpZ2hsaWdodCkge1xuICBpZiAoaGlnaGxpZ2h0KSB7XG4gICAgLy8gZHJhdyBib3VuZGluZyBib3hcbiAgICBpZiAobW9kdWxlLmxheWVyID09IGxheWVyKSB7XG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4yO1xuICAgICAgY3R4LnRyYW5zbGF0ZSguLi5tb2R1bGUuYmJveC5wb3MpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhZGNvbG9yO1xuICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAwLCAwLFxuICAgICAgICAuLi5tb2R1bGUuYmJveC5zaXplKTtcbiAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDE7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBwYWRjb2xvcjtcbiAgICAgIGN0eC5zdHJva2VSZWN0KFxuICAgICAgICAwLCAwLFxuICAgICAgICAuLi5tb2R1bGUuYmJveC5zaXplKTtcbiAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxuICB9XG4gIC8vIGRyYXcgZHJhd2luZ3NcbiAgZm9yICh2YXIgZHJhd2luZyBvZiBtb2R1bGUuZHJhd2luZ3MpIHtcbiAgICBpZiAoZHJhd2luZy5sYXllciA9PSBsYXllcikge1xuICAgICAgZHJhd0RyYXdpbmcoY3R4LCBsYXllciwgc2NhbGVmYWN0b3IsIGRyYXdpbmcuZHJhd2luZywgcGFkY29sb3IpO1xuICAgIH1cbiAgfVxuICAvLyBkcmF3IHBhZHNcbiAgZm9yICh2YXIgcGFkIG9mIG1vZHVsZS5wYWRzKSB7XG4gICAgaWYgKHBhZC5sYXllcnMuaW5jbHVkZXMobGF5ZXIpKSB7XG4gICAgICBkcmF3UGFkKGN0eCwgcGFkLCBwYWRjb2xvciwgZmFsc2UpO1xuICAgICAgXG4gICAgICBcbiAgICAgIGlmIChwYWQucGluMSAmJiBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodFBpbjEoKSkgXG4gICAgICB7XG4gICAgICAgIGRyYXdQYWQoY3R4LCBwYWQsIG91dGxpbmVjb2xvciwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdFZGdlcyhjYW52YXMsIHNjYWxlZmFjdG9yKSB7XG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICB2YXIgZWRnZWNvbG9yID0gZ2V0Q29tcHV0ZWRTdHlsZSh0b3Btb3N0ZGl2KS5nZXRQcm9wZXJ0eVZhbHVlKCctLXBjYi1lZGdlLWNvbG9yJyk7XG4gIGZvciAodmFyIGVkZ2Ugb2YgcGNiZGF0YS5lZGdlcykge1xuICAgIGRyYXdlZGdlKGN0eCwgc2NhbGVmYWN0b3IsIGVkZ2UsIGVkZ2Vjb2xvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhd01vZHVsZXMoY2FudmFzLCBsYXllciwgc2NhbGVmYWN0b3IsIGhpZ2hsaWdodGVkUmVmcykge1xuICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgY3R4LmxpbmVXaWR0aCA9IDMgLyBzY2FsZWZhY3RvcjtcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0b3Btb3N0ZGl2KTtcbiAgdmFyIHBhZGNvbG9yID0gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnLS1wYWQtY29sb3InKTtcbiAgdmFyIG91dGxpbmVjb2xvciA9IHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJy0tcGluMS1vdXRsaW5lLWNvbG9yJyk7XG4gIGlmIChoaWdobGlnaHRlZFJlZnMubGVuZ3RoID4gMCkge1xuICAgIHBhZGNvbG9yID0gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnLS1wYWQtY29sb3ItaGlnaGxpZ2h0Jyk7XG4gICAgb3V0bGluZWNvbG9yID0gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnLS1waW4xLW91dGxpbmUtY29sb3ItaGlnaGxpZ2h0Jyk7XG4gIH1cbiAgZm9yICh2YXIgaSBpbiBwY2JkYXRhLm1vZHVsZXMpIHtcbiAgICB2YXIgbW9kID0gcGNiZGF0YS5tb2R1bGVzW2ldO1xuICAgIHZhciBoaWdobGlnaHQgPSBoaWdobGlnaHRlZFJlZnMuaW5jbHVkZXMobW9kLnJlZik7XG4gICAgaWYgKGhpZ2hsaWdodGVkUmVmcy5sZW5ndGggPT0gMCB8fCBoaWdobGlnaHQpIHtcbiAgICAgIGRyYXdNb2R1bGUoY3R4LCBsYXllciwgc2NhbGVmYWN0b3IsIG1vZCwgcGFkY29sb3IsIG91dGxpbmVjb2xvciwgaGlnaGxpZ2h0KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhd1NpbGtzY3JlZW4oY2FudmFzLCBsYXllciwgc2NhbGVmYWN0b3IpXG57XG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBmb3IgKHZhciBkIG9mIHBjYmRhdGEuc2lsa3NjcmVlbltsYXllcl0pXG4gIHtcbiAgICBpZiAoW1wic2VnbWVudFwiLCBcImFyY1wiLCBcImNpcmNsZVwiXS5pbmNsdWRlcyhkLnR5cGUpKVxuICAgIHtcbiAgICAgIGRyYXdlZGdlKGN0eCwgc2NhbGVmYWN0b3IsIGQsIFwiI2FhNFwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZC50eXBlID09IFwicG9seWdvblwiKVxuICAgIHtcbiAgICAgIGRyYXdQb2x5Z29uU2hhcGUoY3R4LCBkLCBcIiM0YWFcIik7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBkcmF3dGV4dChjdHgsIGQsIFwiIzRhYVwiLCBsYXllciA9PSBcIkJcIik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2FudmFzKGNhbnZhcykge1xuICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgY3R4LnNhdmUoKTtcbiAgY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICBjdHgucmVzdG9yZSgpO1xufVxuXG5mdW5jdGlvbiBkcmF3SGlnaGxpZ2h0c09uTGF5ZXIoY2FudmFzZGljdCkge1xuICBjbGVhckNhbnZhcyhjYW52YXNkaWN0LmhpZ2hsaWdodCk7XG4gIGRyYXdNb2R1bGVzKGNhbnZhc2RpY3QuaGlnaGxpZ2h0LCBjYW52YXNkaWN0LmxheWVyLFxuICAgIGNhbnZhc2RpY3QudHJhbnNmb3JtLnMsIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0ZWRSZWZzKCkpO1xufVxuXG5mdW5jdGlvbiBkcmF3SGlnaGxpZ2h0cygpIHtcbiAgZHJhd0hpZ2hsaWdodHNPbkxheWVyKGFsbGNhbnZhcy5mcm9udCk7XG4gIGRyYXdIaWdobGlnaHRzT25MYXllcihhbGxjYW52YXMuYmFjayk7XG59XG5cbmZ1bmN0aW9uIGRyYXdCYWNrZ3JvdW5kKGNhbnZhc2RpY3QpIHtcbiAgY2xlYXJDYW52YXMoY2FudmFzZGljdC5iZyk7XG4gIGNsZWFyQ2FudmFzKGNhbnZhc2RpY3Quc2lsayk7XG4gIGRyYXdFZGdlcyhjYW52YXNkaWN0LmJnLCBjYW52YXNkaWN0LnRyYW5zZm9ybS5zKTtcbiAgZHJhd01vZHVsZXMoY2FudmFzZGljdC5iZywgY2FudmFzZGljdC5sYXllciwgY2FudmFzZGljdC50cmFuc2Zvcm0ucywgW10pO1xuICBkcmF3U2lsa3NjcmVlbihjYW52YXNkaWN0LnNpbGssIGNhbnZhc2RpY3QubGF5ZXIsIGNhbnZhc2RpY3QudHJhbnNmb3JtLnMpO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlQ2FudmFzKGNhbnZhcywgZmxpcCwgdHJhbnNmb3JtKSB7XG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICB2YXIgZm9udHNpemUgPSAxLjU1O1xuICBjdHguc2NhbGUodHJhbnNmb3JtLnpvb20sIHRyYW5zZm9ybS56b29tKTtcbiAgY3R4LnRyYW5zbGF0ZSh0cmFuc2Zvcm0ucGFueCwgdHJhbnNmb3JtLnBhbnkpO1xuICBpZiAoZmxpcCkge1xuICAgIGN0eC5zY2FsZSgtMSwgMSk7XG4gIH1cbiAgY3R4LnRyYW5zbGF0ZSh0cmFuc2Zvcm0ueCwgdHJhbnNmb3JtLnkpO1xuICBjdHgucm90YXRlKGRlZzJyYWQoYm9hcmRSb3RhdGlvbikpO1xuICBjdHguc2NhbGUodHJhbnNmb3JtLnMsIHRyYW5zZm9ybS5zKTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZUxheWVyKGNhbnZhc2RpY3QpIHtcbiAgdmFyIGZsaXAgPSAoY2FudmFzZGljdC5sYXllciA9PSBcIkJcIik7XG4gIGZvciAodmFyIGMgb2YgW1wiYmdcIiwgXCJzaWxrXCIsIFwiaGlnaGxpZ2h0XCJdKSB7XG4gICAgcHJlcGFyZUNhbnZhcyhjYW52YXNkaWN0W2NdLCBmbGlwLCBjYW52YXNkaWN0LnRyYW5zZm9ybSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm90YXRlVmVjdG9yKHYsIGFuZ2xlKSB7XG4gIGFuZ2xlID0gZGVnMnJhZChhbmdsZSk7XG4gIHJldHVybiBbXG4gICAgdlswXSAqIE1hdGguY29zKGFuZ2xlKSAtIHZbMV0gKiBNYXRoLnNpbihhbmdsZSksXG4gICAgdlswXSAqIE1hdGguc2luKGFuZ2xlKSArIHZbMV0gKiBNYXRoLmNvcyhhbmdsZSlcbiAgXTtcbn1cblxuZnVuY3Rpb24gYXBwbHlSb3RhdGlvbihiYm94KSB7XG4gIHZhciBjb3JuZXJzID0gW1xuICAgIFtiYm94Lm1pbngsIGJib3gubWlueV0sXG4gICAgW2Jib3gubWlueCwgYmJveC5tYXh5XSxcbiAgICBbYmJveC5tYXh4LCBiYm94Lm1pbnldLFxuICAgIFtiYm94Lm1heHgsIGJib3gubWF4eV0sXG4gIF07XG4gIGNvcm5lcnMgPSBjb3JuZXJzLm1hcCgodikgPT4gcm90YXRlVmVjdG9yKHYsIGJvYXJkUm90YXRpb24pKTtcbiAgcmV0dXJuIHtcbiAgICBtaW54OiBjb3JuZXJzLnJlZHVjZSgoYSwgdikgPT4gTWF0aC5taW4oYSwgdlswXSksIEluZmluaXR5KSxcbiAgICBtaW55OiBjb3JuZXJzLnJlZHVjZSgoYSwgdikgPT4gTWF0aC5taW4oYSwgdlsxXSksIEluZmluaXR5KSxcbiAgICBtYXh4OiBjb3JuZXJzLnJlZHVjZSgoYSwgdikgPT4gTWF0aC5tYXgoYSwgdlswXSksIC1JbmZpbml0eSksXG4gICAgbWF4eTogY29ybmVycy5yZWR1Y2UoKGEsIHYpID0+IE1hdGgubWF4KGEsIHZbMV0pLCAtSW5maW5pdHkpLFxuICB9XG59XG5cbmZ1bmN0aW9uIHJlY2FsY0xheWVyU2NhbGUoY2FudmFzZGljdCkge1xuICB2YXIgY2FudmFzZGl2aWQgPSB7XG4gICAgXCJGXCI6IFwiZnJvbnRjYW52YXNcIixcbiAgICBcIkJcIjogXCJiYWNrY2FudmFzXCJcbiAgfSBbY2FudmFzZGljdC5sYXllcl07XG4gIHZhciB3aWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc2RpdmlkKS5jbGllbnRXaWR0aCAqIDI7XG4gIHZhciBoZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNkaXZpZCkuY2xpZW50SGVpZ2h0ICogMjtcbiAgdmFyIGJib3ggPSBhcHBseVJvdGF0aW9uKHBjYmRhdGEuZWRnZXNfYmJveCk7XG4gIHZhciBzY2FsZWZhY3RvciA9IDAuOTggKiBNYXRoLm1pbihcbiAgICB3aWR0aCAvIChiYm94Lm1heHggLSBiYm94Lm1pbngpLFxuICAgIGhlaWdodCAvIChiYm94Lm1heHkgLSBiYm94Lm1pbnkpXG4gICk7XG4gIGlmIChzY2FsZWZhY3RvciA8IDAuMSkge1xuICAgIHNjYWxlZmFjdG9yID0gMTtcbiAgfVxuICBjYW52YXNkaWN0LnRyYW5zZm9ybS5zID0gc2NhbGVmYWN0b3I7XG4gIHZhciBmbGlwID0gKGNhbnZhc2RpY3QubGF5ZXIgPT0gXCJCXCIpO1xuICBpZiAoZmxpcCkge1xuICAgIGNhbnZhc2RpY3QudHJhbnNmb3JtLnggPSAtKChiYm94Lm1heHggKyBiYm94Lm1pbngpICogc2NhbGVmYWN0b3IgKyB3aWR0aCkgKiAwLjU7XG4gIH0gZWxzZSB7XG4gICAgY2FudmFzZGljdC50cmFuc2Zvcm0ueCA9IC0oKGJib3gubWF4eCArIGJib3gubWlueCkgKiBzY2FsZWZhY3RvciAtIHdpZHRoKSAqIDAuNTtcbiAgfVxuICBjYW52YXNkaWN0LnRyYW5zZm9ybS55ID0gLSgoYmJveC5tYXh5ICsgYmJveC5taW55KSAqIHNjYWxlZmFjdG9yIC0gaGVpZ2h0KSAqIDAuNTtcbiAgZm9yICh2YXIgYyBvZiBbXCJiZ1wiLCBcInNpbGtcIiwgXCJoaWdobGlnaHRcIl0pIHtcbiAgICBjYW52YXMgPSBjYW52YXNkaWN0W2NdO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gKHdpZHRoIC8gMikgKyBcInB4XCI7XG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IChoZWlnaHQgLyAyKSArIFwicHhcIjtcbiAgfVxuICBjb25zb2xlLmxvZyhcIlNjYWxlIGZhY3RvciBcIiArIGNhbnZhc2RpdmlkICsgXCI6IFwiLCBjYW52YXNkaWN0LnRyYW5zZm9ybSk7XG59XG5cbmZ1bmN0aW9uIHJlZHJhd0NhbnZhcyhsYXllcmRpY3QpIHtcbiAgcHJlcGFyZUxheWVyKGxheWVyZGljdCk7XG4gIGRyYXdCYWNrZ3JvdW5kKGxheWVyZGljdCk7XG4gIGRyYXdIaWdobGlnaHRzT25MYXllcihsYXllcmRpY3QpO1xufVxuXG5mdW5jdGlvbiByZXNpemVDYW52YXMobGF5ZXJkaWN0KSB7XG4gIHJlY2FsY0xheWVyU2NhbGUobGF5ZXJkaWN0KTtcbiAgcmVkcmF3Q2FudmFzKGxheWVyZGljdCk7XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZUFsbCgpIHtcbiAgcmVzaXplQ2FudmFzKGFsbGNhbnZhcy5mcm9udCk7XG4gIHJlc2l6ZUNhbnZhcyhhbGxjYW52YXMuYmFjayk7XG59XG5cbmZ1bmN0aW9uIGJib3hTY2FuKGxheWVyLCB4LCB5KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIgaSBpbiBwY2JkYXRhLm1vZHVsZXMpIHtcbiAgICB2YXIgbW9kdWxlID0gcGNiZGF0YS5tb2R1bGVzW2ldO1xuICAgIGlmIChtb2R1bGUubGF5ZXIgPT0gbGF5ZXIpIHtcbiAgICAgIHZhciBiID0gbW9kdWxlLmJib3g7XG4gICAgICBpZiAoYi5wb3NbMF0gPD0geCAmJiBiLnBvc1swXSArIGIuc2l6ZVswXSA+PSB4ICYmXG4gICAgICAgIGIucG9zWzFdIDw9IHkgJiYgYi5wb3NbMV0gKyBiLnNpemVbMV0gPj0geSkge1xuICAgICAgICByZXN1bHQucHVzaChtb2R1bGUucmVmKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duKGUsIGxheWVyZGljdCkge1xuICBpZiAoZS53aGljaCAhPSAxKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZXN0YXJ0eCA9IGUub2Zmc2V0WDtcbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZXN0YXJ0eSA9IGUub2Zmc2V0WTtcbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZWRvd254ID0gZS5vZmZzZXRYO1xuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlZG93bnkgPSBlLm9mZnNldFk7XG4gIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3duID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlTW91c2VDbGljayhlLCBsYXllcmRpY3QpIHtcbiAgdmFyIHggPSBlLm9mZnNldFg7XG4gIHZhciB5ID0gZS5vZmZzZXRZO1xuICB2YXIgdCA9IGxheWVyZGljdC50cmFuc2Zvcm07XG4gIGlmIChsYXllcmRpY3QubGF5ZXIgPT0gXCJCXCIpIHtcbiAgICB4ID0gKDIgKiB4IC8gdC56b29tIC0gdC5wYW54ICsgdC54KSAvIC10LnM7XG4gIH0gZWxzZSB7XG4gICAgeCA9ICgyICogeCAvIHQuem9vbSAtIHQucGFueCAtIHQueCkgLyB0LnM7XG4gIH1cbiAgeSA9ICgyICogeSAvIHQuem9vbSAtIHQueSAtIHQucGFueSkgLyB0LnM7XG4gIHZhciB2ID0gcm90YXRlVmVjdG9yKFt4LCB5XSwgLWJvYXJkUm90YXRpb24pO1xuICB2YXIgcmVmbGlzdCA9IGJib3hTY2FuKGxheWVyZGljdC5sYXllciwgdlswXSwgdlsxXSk7XG4gIGlmIChyZWZsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICBtb2R1bGVzQ2xpY2tlZChyZWZsaXN0KTtcbiAgICBkcmF3SGlnaGxpZ2h0cygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1vdXNlVXAoZSwgbGF5ZXJkaWN0KSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgaWYgKGUud2hpY2ggPT0gMSAmJlxuICAgIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3duICYmXG4gICAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZWRvd254ID09IGUub2Zmc2V0WCAmJlxuICAgIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3dueSA9PSBlLm9mZnNldFkpIHtcbiAgICAvLyBUaGlzIGlzIGp1c3QgYSBjbGlja1xuICAgIGhhbmRsZU1vdXNlQ2xpY2soZSwgbGF5ZXJkaWN0KTtcbiAgICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlZG93biA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZS53aGljaCA9PSAzKSB7XG4gICAgLy8gUmVzZXQgcGFuIGFuZCB6b29tIG9uIHJpZ2h0IGNsaWNrLlxuICAgIGxheWVyZGljdC50cmFuc2Zvcm0ucGFueCA9IDA7XG4gICAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5wYW55ID0gMDtcbiAgICBsYXllcmRpY3QudHJhbnNmb3JtLnpvb20gPSAxO1xuICAgIHJlZHJhd0NhbnZhcyhsYXllcmRpY3QpO1xuICB9IGVsc2UgaWYgKCFnbG9iYWxEYXRhLmdldFJlZHJhd09uRHJhZygpKSB7XG4gICAgcmVkcmF3Q2FudmFzKGxheWVyZGljdCk7XG4gIH1cbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZWRvd24gPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlTW91c2VNb3ZlKGUsIGxheWVyZGljdCkge1xuICBpZiAoIWxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3duKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgdmFyIGR4ID0gZS5vZmZzZXRYIC0gbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZXN0YXJ0eDtcbiAgdmFyIGR5ID0gZS5vZmZzZXRZIC0gbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZXN0YXJ0eTtcbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5wYW54ICs9IDIgKiBkeCAvIGxheWVyZGljdC50cmFuc2Zvcm0uem9vbTtcbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5wYW55ICs9IDIgKiBkeSAvIGxheWVyZGljdC50cmFuc2Zvcm0uem9vbTtcbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZXN0YXJ0eCA9IGUub2Zmc2V0WDtcbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZXN0YXJ0eSA9IGUub2Zmc2V0WTtcbiAgaWYgKGdsb2JhbERhdGEuZ2V0UmVkcmF3T25EcmFnKCkpIHtcbiAgICByZWRyYXdDYW52YXMobGF5ZXJkaWN0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVNb3VzZVdoZWVsKGUsIGxheWVyZGljdCkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIHZhciB0ID0gbGF5ZXJkaWN0LnRyYW5zZm9ybTtcbiAgdmFyIHdoZWVsZGVsdGEgPSBlLmRlbHRhWTtcbiAgaWYgKGUuZGVsdGFNb2RlID09IDEpIHtcbiAgICAvLyBGRiBvbmx5LCBzY3JvbGwgYnkgbGluZXNcbiAgICB3aGVlbGRlbHRhICo9IDMwO1xuICB9IGVsc2UgaWYgKGUuZGVsdGFNb2RlID09IDIpIHtcbiAgICB3aGVlbGRlbHRhICo9IDMwMDtcbiAgfVxuICB2YXIgbSA9IE1hdGgucG93KDEuMSwgLXdoZWVsZGVsdGEgLyA0MCk7XG4gIC8vIExpbWl0IGFtb3VudCBvZiB6b29tIHBlciB0aWNrLlxuICBpZiAobSA+IDIpIHtcbiAgICBtID0gMjtcbiAgfSBlbHNlIGlmIChtIDwgMC41KSB7XG4gICAgbSA9IDAuNTtcbiAgfVxuICB0Lnpvb20gKj0gbTtcbiAgdmFyIHpvb21kID0gKDEgLSBtKSAvIHQuem9vbTtcbiAgdC5wYW54ICs9IDIgKiBlLm9mZnNldFggKiB6b29tZDtcbiAgdC5wYW55ICs9IDIgKiBlLm9mZnNldFkgKiB6b29tZDtcbiAgcmVkcmF3Q2FudmFzKGxheWVyZGljdCk7XG4gIGNvbnNvbGUubG9nKGxheWVyZGljdC50cmFuc2Zvcm0uem9vbSk7XG59XG5cbmZ1bmN0aW9uIGFkZE1vdXNlSGFuZGxlcnMoZGl2LCBsYXllcmRpY3QpIHtcbiAgZGl2Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24oZSkge1xuICAgIGhhbmRsZU1vdXNlRG93bihlLCBsYXllcmRpY3QpO1xuICB9O1xuICBkaXYub25tb3VzZW1vdmUgPSBmdW5jdGlvbihlKSB7XG4gICAgaGFuZGxlTW91c2VNb3ZlKGUsIGxheWVyZGljdCk7XG4gIH07XG4gIGRpdi5vbm1vdXNldXAgPSBmdW5jdGlvbihlKSB7XG4gICAgaGFuZGxlTW91c2VVcChlLCBsYXllcmRpY3QpO1xuICB9O1xuICBkaXYub25tb3VzZW91dCA9IGZ1bmN0aW9uKGUpIHtcbiAgICBoYW5kbGVNb3VzZVVwKGUsIGxheWVyZGljdCk7XG4gIH1cbiAgZGl2Lm9ud2hlZWwgPSBmdW5jdGlvbihlKSB7XG4gICAgaGFuZGxlTW91c2VXaGVlbChlLCBsYXllcmRpY3QpO1xuICB9XG4gIGZvciAodmFyIGVsZW1lbnQgb2YgW2RpdiwgbGF5ZXJkaWN0LmJnLCBsYXllcmRpY3Quc2lsaywgbGF5ZXJkaWN0LmhpZ2hsaWdodF0pIHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEJvYXJkUm90YXRpb24odmFsdWUpIHtcbiAgYm9hcmRSb3RhdGlvbiA9IHZhbHVlICogNTtcbiAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJib2FyZFJvdGF0aW9uXCIsIGJvYXJkUm90YXRpb24pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvdGF0aW9uRGVncmVlXCIpLnRleHRDb250ZW50ID0gYm9hcmRSb3RhdGlvbjtcbiAgcmVzaXplQWxsKCk7XG59XG5cbmZ1bmN0aW9uIGluaXRSZW5kZXIoKSB7XG4gIGFsbGNhbnZhcyA9IHtcbiAgICBmcm9udDoge1xuICAgICAgdHJhbnNmb3JtOiB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHM6IDEsXG4gICAgICAgIHBhbng6IDAsXG4gICAgICAgIHBhbnk6IDAsXG4gICAgICAgIHpvb206IDEsXG4gICAgICAgIG1vdXNlc3RhcnR4OiAwLFxuICAgICAgICBtb3VzZXN0YXJ0eTogMCxcbiAgICAgICAgbW91c2Vkb3duOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBiZzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJGX2JnXCIpLFxuICAgICAgc2lsazogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJGX3Nsa1wiKSxcbiAgICAgIGhpZ2hsaWdodDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJGX2hsXCIpLFxuICAgICAgbGF5ZXI6IFwiRlwiLFxuICAgIH0sXG4gICAgYmFjazoge1xuICAgICAgdHJhbnNmb3JtOiB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHM6IDEsXG4gICAgICAgIHBhbng6IDAsXG4gICAgICAgIHBhbnk6IDAsXG4gICAgICAgIHpvb206IDEsXG4gICAgICAgIG1vdXNlc3RhcnR4OiAwLFxuICAgICAgICBtb3VzZXN0YXJ0eTogMCxcbiAgICAgICAgbW91c2Vkb3duOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBiZzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJCX2JnXCIpLFxuICAgICAgc2lsazogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJCX3Nsa1wiKSxcbiAgICAgIGhpZ2hsaWdodDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJCX2hsXCIpLFxuICAgICAgbGF5ZXI6IFwiQlwiLFxuICAgIH1cbiAgfTtcbiAgYWRkTW91c2VIYW5kbGVycyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb250Y2FudmFzXCIpLCBhbGxjYW52YXMuZnJvbnQpO1xuICBhZGRNb3VzZUhhbmRsZXJzKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja2NhbnZhc1wiKSwgYWxsY2FudmFzLmJhY2spO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVzaXplQWxsLCBpbml0UmVuZGVyLCByZWRyYXdDYW52YXMsIGRyYXdIaWdobGlnaHRzLFxuICBzZXRCb2FyZFJvdGF0aW9uXG59OyIsIi8qXG4gIFNwbGl0LmpzIC0gdjEuMy41XG4gIE1JVCBMaWNlbnNlXG4gIGh0dHBzOi8vZ2l0aHViLmNvbS9uYXRoYW5jYWhpbGwvU3BsaXQuanNcbiovXG4hZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZSh0KTplLlNwbGl0PXQoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBlPXdpbmRvdyx0PWUuZG9jdW1lbnQsbj1cImFkZEV2ZW50TGlzdGVuZXJcIixpPVwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiLHI9XCJnZXRCb3VuZGluZ0NsaWVudFJlY3RcIixzPWZ1bmN0aW9uKCl7cmV0dXJuITF9LG89ZS5hdHRhY2hFdmVudCYmIWVbbl0sYT1bXCJcIixcIi13ZWJraXQtXCIsXCItbW96LVwiLFwiLW8tXCJdLmZpbHRlcihmdW5jdGlvbihlKXt2YXIgbj10LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuIG4uc3R5bGUuY3NzVGV4dD1cIndpZHRoOlwiK2UrXCJjYWxjKDlweClcIiwhIW4uc3R5bGUubGVuZ3RofSkuc2hpZnQoKStcImNhbGNcIixsPWZ1bmN0aW9uKGUpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBlfHxlIGluc3RhbmNlb2YgU3RyaW5nP3QucXVlcnlTZWxlY3RvcihlKTplfTtyZXR1cm4gZnVuY3Rpb24odSxjKXtmdW5jdGlvbiB6KGUsdCxuKXt2YXIgaT1BKHksdCxuKTtPYmplY3Qua2V5cyhpKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBlLnN0eWxlW3RdPWlbdF19KX1mdW5jdGlvbiBoKGUsdCl7dmFyIG49Qih5LHQpO09iamVjdC5rZXlzKG4pLmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGUuc3R5bGVbdF09blt0XX0pfWZ1bmN0aW9uIGYoZSl7dmFyIHQ9RVt0aGlzLmFdLG49RVt0aGlzLmJdLGk9dC5zaXplK24uc2l6ZTt0LnNpemU9ZS90aGlzLnNpemUqaSxuLnNpemU9aS1lL3RoaXMuc2l6ZSppLHoodC5lbGVtZW50LHQuc2l6ZSx0aGlzLmFHdXR0ZXJTaXplKSx6KG4uZWxlbWVudCxuLnNpemUsdGhpcy5iR3V0dGVyU2l6ZSl9ZnVuY3Rpb24gbShlKXt2YXIgdDt0aGlzLmRyYWdnaW5nJiYoKHQ9XCJ0b3VjaGVzXCJpbiBlP2UudG91Y2hlc1swXVtiXS10aGlzLnN0YXJ0OmVbYl0tdGhpcy5zdGFydCk8PUVbdGhpcy5hXS5taW5TaXplK00rdGhpcy5hR3V0dGVyU2l6ZT90PUVbdGhpcy5hXS5taW5TaXplK3RoaXMuYUd1dHRlclNpemU6dD49dGhpcy5zaXplLShFW3RoaXMuYl0ubWluU2l6ZStNK3RoaXMuYkd1dHRlclNpemUpJiYodD10aGlzLnNpemUtKEVbdGhpcy5iXS5taW5TaXplK3RoaXMuYkd1dHRlclNpemUpKSxmLmNhbGwodGhpcyx0KSxjLm9uRHJhZyYmYy5vbkRyYWcoKSl9ZnVuY3Rpb24gZygpe3ZhciBlPUVbdGhpcy5hXS5lbGVtZW50LHQ9RVt0aGlzLmJdLmVsZW1lbnQ7dGhpcy5zaXplPWVbcl0oKVt5XSt0W3JdKClbeV0rdGhpcy5hR3V0dGVyU2l6ZSt0aGlzLmJHdXR0ZXJTaXplLHRoaXMuc3RhcnQ9ZVtyXSgpW0ddfWZ1bmN0aW9uIGQoKXt2YXIgdD10aGlzLG49RVt0LmFdLmVsZW1lbnQscj1FW3QuYl0uZWxlbWVudDt0LmRyYWdnaW5nJiZjLm9uRHJhZ0VuZCYmYy5vbkRyYWdFbmQoKSx0LmRyYWdnaW5nPSExLGVbaV0oXCJtb3VzZXVwXCIsdC5zdG9wKSxlW2ldKFwidG91Y2hlbmRcIix0LnN0b3ApLGVbaV0oXCJ0b3VjaGNhbmNlbFwiLHQuc3RvcCksdC5wYXJlbnRbaV0oXCJtb3VzZW1vdmVcIix0Lm1vdmUpLHQucGFyZW50W2ldKFwidG91Y2htb3ZlXCIsdC5tb3ZlKSxkZWxldGUgdC5zdG9wLGRlbGV0ZSB0Lm1vdmUsbltpXShcInNlbGVjdHN0YXJ0XCIscyksbltpXShcImRyYWdzdGFydFwiLHMpLHJbaV0oXCJzZWxlY3RzdGFydFwiLHMpLHJbaV0oXCJkcmFnc3RhcnRcIixzKSxuLnN0eWxlLnVzZXJTZWxlY3Q9XCJcIixuLnN0eWxlLndlYmtpdFVzZXJTZWxlY3Q9XCJcIixuLnN0eWxlLk1velVzZXJTZWxlY3Q9XCJcIixuLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJcIixyLnN0eWxlLnVzZXJTZWxlY3Q9XCJcIixyLnN0eWxlLndlYmtpdFVzZXJTZWxlY3Q9XCJcIixyLnN0eWxlLk1velVzZXJTZWxlY3Q9XCJcIixyLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJcIix0Lmd1dHRlci5zdHlsZS5jdXJzb3I9XCJcIix0LnBhcmVudC5zdHlsZS5jdXJzb3I9XCJcIn1mdW5jdGlvbiBTKHQpe3ZhciBpPXRoaXMscj1FW2kuYV0uZWxlbWVudCxvPUVbaS5iXS5lbGVtZW50OyFpLmRyYWdnaW5nJiZjLm9uRHJhZ1N0YXJ0JiZjLm9uRHJhZ1N0YXJ0KCksdC5wcmV2ZW50RGVmYXVsdCgpLGkuZHJhZ2dpbmc9ITAsaS5tb3ZlPW0uYmluZChpKSxpLnN0b3A9ZC5iaW5kKGkpLGVbbl0oXCJtb3VzZXVwXCIsaS5zdG9wKSxlW25dKFwidG91Y2hlbmRcIixpLnN0b3ApLGVbbl0oXCJ0b3VjaGNhbmNlbFwiLGkuc3RvcCksaS5wYXJlbnRbbl0oXCJtb3VzZW1vdmVcIixpLm1vdmUpLGkucGFyZW50W25dKFwidG91Y2htb3ZlXCIsaS5tb3ZlKSxyW25dKFwic2VsZWN0c3RhcnRcIixzKSxyW25dKFwiZHJhZ3N0YXJ0XCIscyksb1tuXShcInNlbGVjdHN0YXJ0XCIscyksb1tuXShcImRyYWdzdGFydFwiLHMpLHIuc3R5bGUudXNlclNlbGVjdD1cIm5vbmVcIixyLnN0eWxlLndlYmtpdFVzZXJTZWxlY3Q9XCJub25lXCIsci5zdHlsZS5Nb3pVc2VyU2VsZWN0PVwibm9uZVwiLHIuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIixvLnN0eWxlLnVzZXJTZWxlY3Q9XCJub25lXCIsby5zdHlsZS53ZWJraXRVc2VyU2VsZWN0PVwibm9uZVwiLG8uc3R5bGUuTW96VXNlclNlbGVjdD1cIm5vbmVcIixvLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCIsaS5ndXR0ZXIuc3R5bGUuY3Vyc29yPWosaS5wYXJlbnQuc3R5bGUuY3Vyc29yPWosZy5jYWxsKGkpfWZ1bmN0aW9uIHYoZSl7ZS5mb3JFYWNoKGZ1bmN0aW9uKHQsbil7aWYobj4wKXt2YXIgaT1GW24tMV0scj1FW2kuYV0scz1FW2kuYl07ci5zaXplPWVbbi0xXSxzLnNpemU9dCx6KHIuZWxlbWVudCxyLnNpemUsaS5hR3V0dGVyU2l6ZSkseihzLmVsZW1lbnQscy5zaXplLGkuYkd1dHRlclNpemUpfX0pfWZ1bmN0aW9uIHAoKXtGLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5wYXJlbnQucmVtb3ZlQ2hpbGQoZS5ndXR0ZXIpLEVbZS5hXS5lbGVtZW50LnN0eWxlW3ldPVwiXCIsRVtlLmJdLmVsZW1lbnQuc3R5bGVbeV09XCJcIn0pfXZvaWQgMD09PWMmJihjPXt9KTt2YXIgeSxiLEcsRSx3PWwodVswXSkucGFyZW50Tm9kZSxEPWUuZ2V0Q29tcHV0ZWRTdHlsZSh3KS5mbGV4RGlyZWN0aW9uLFU9Yy5zaXplc3x8dS5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gMTAwL3UubGVuZ3RofSksaz12b2lkIDAhPT1jLm1pblNpemU/Yy5taW5TaXplOjEwMCx4PUFycmF5LmlzQXJyYXkoayk/azp1Lm1hcChmdW5jdGlvbigpe3JldHVybiBrfSksTD12b2lkIDAhPT1jLmd1dHRlclNpemU/Yy5ndXR0ZXJTaXplOjEwLE09dm9pZCAwIT09Yy5zbmFwT2Zmc2V0P2Muc25hcE9mZnNldDozMCxPPWMuZGlyZWN0aW9ufHxcImhvcml6b250YWxcIixqPWMuY3Vyc29yfHwoXCJob3Jpem9udGFsXCI9PT1PP1wiZXctcmVzaXplXCI6XCJucy1yZXNpemVcIiksQz1jLmd1dHRlcnx8ZnVuY3Rpb24oZSxuKXt2YXIgaT10LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuIGkuY2xhc3NOYW1lPVwiZ3V0dGVyIGd1dHRlci1cIituLGl9LEE9Yy5lbGVtZW50U3R5bGV8fGZ1bmN0aW9uKGUsdCxuKXt2YXIgaT17fTtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgdHx8dCBpbnN0YW5jZW9mIFN0cmluZz9pW2VdPXQ6aVtlXT1vP3QrXCIlXCI6YStcIihcIit0K1wiJSAtIFwiK24rXCJweClcIixpfSxCPWMuZ3V0dGVyU3R5bGV8fGZ1bmN0aW9uKGUsdCl7cmV0dXJuIG49e30sbltlXT10K1wicHhcIixuO3ZhciBufTtcImhvcml6b250YWxcIj09PU8/KHk9XCJ3aWR0aFwiLFwiY2xpZW50V2lkdGhcIixiPVwiY2xpZW50WFwiLEc9XCJsZWZ0XCIsXCJwYWRkaW5nTGVmdFwiKTpcInZlcnRpY2FsXCI9PT1PJiYoeT1cImhlaWdodFwiLFwiY2xpZW50SGVpZ2h0XCIsYj1cImNsaWVudFlcIixHPVwidG9wXCIsXCJwYWRkaW5nVG9wXCIpO3ZhciBGPVtdO3JldHVybiBFPXUubWFwKGZ1bmN0aW9uKGUsdCl7dmFyIGkscz17ZWxlbWVudDpsKGUpLHNpemU6VVt0XSxtaW5TaXplOnhbdF19O2lmKHQ+MCYmKGk9e2E6dC0xLGI6dCxkcmFnZ2luZzohMSxpc0ZpcnN0OjE9PT10LGlzTGFzdDp0PT09dS5sZW5ndGgtMSxkaXJlY3Rpb246TyxwYXJlbnQ6d30saS5hR3V0dGVyU2l6ZT1MLGkuYkd1dHRlclNpemU9TCxpLmlzRmlyc3QmJihpLmFHdXR0ZXJTaXplPUwvMiksaS5pc0xhc3QmJihpLmJHdXR0ZXJTaXplPUwvMiksXCJyb3ctcmV2ZXJzZVwiPT09RHx8XCJjb2x1bW4tcmV2ZXJzZVwiPT09RCkpe3ZhciBhPWkuYTtpLmE9aS5iLGkuYj1hfWlmKCFvJiZ0PjApe3ZhciBjPUModCxPKTtoKGMsTCksY1tuXShcIm1vdXNlZG93blwiLFMuYmluZChpKSksY1tuXShcInRvdWNoc3RhcnRcIixTLmJpbmQoaSkpLHcuaW5zZXJ0QmVmb3JlKGMscy5lbGVtZW50KSxpLmd1dHRlcj1jfTA9PT10fHx0PT09dS5sZW5ndGgtMT96KHMuZWxlbWVudCxzLnNpemUsTC8yKTp6KHMuZWxlbWVudCxzLnNpemUsTCk7dmFyIGY9cy5lbGVtZW50W3JdKClbeV07cmV0dXJuIGY8cy5taW5TaXplJiYocy5taW5TaXplPWYpLHQ+MCYmRi5wdXNoKGkpLHN9KSxvP3tzZXRTaXplczp2LGRlc3Ryb3k6cH06e3NldFNpemVzOnYsZ2V0U2l6ZXM6ZnVuY3Rpb24oKXtyZXR1cm4gRS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGUuc2l6ZX0pfSxjb2xsYXBzZTpmdW5jdGlvbihlKXtpZihlPT09Ri5sZW5ndGgpe3ZhciB0PUZbZS0xXTtnLmNhbGwodCksb3x8Zi5jYWxsKHQsdC5zaXplLXQuYkd1dHRlclNpemUpfWVsc2V7dmFyIG49RltlXTtnLmNhbGwobiksb3x8Zi5jYWxsKG4sbi5hR3V0dGVyU2l6ZSl9fSxkZXN0cm95OnB9fX0pO1xuIl19
