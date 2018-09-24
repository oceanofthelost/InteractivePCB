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
    var references = bomentry[2];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZ2xvYmFsLmpzIiwic3JjL2h0bWxGdW5jdGlvbnMuanMiLCJzcmMvaWJvbS5qcyIsInNyYy9yZW5kZXIuanMiLCJ2ZW5kZXIvc3BsaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvdUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgQm9hcmQgUm90YXRpb24gICAgICAgICAgICAgICAgICAgIFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBzdG9yYWdlO1xudmFyIHN0b3JhZ2VQcmVmaXggPSAnS2lDYWRfSFRNTF9CT01fXycgKyBwY2JkYXRhLm1ldGFkYXRhLnRpdGxlICsgJ19fJyArIHBjYmRhdGEubWV0YWRhdGEucmV2aXNpb24gKyAnX18nO1xuXG5mdW5jdGlvbiBpbml0U3RvcmFnZShrZXkpIHtcbiAgdHJ5IHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJibGFua1wiKTtcbiAgICBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKFwiU3RvcmFnZSBpbml0IGVycm9yXCIpO1xuICAgIC8vIGxvY2FsU3RvcmFnZSBub3QgYXZhaWxhYmxlXG4gIH1cbiAgaWYgKCFzdG9yYWdlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiYmxhbmtcIik7XG4gICAgICBzdG9yYWdlID0gd2luZG93LnNlc3Npb25TdG9yYWdlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNlc3Npb25TdG9yYWdlIGFsc28gbm90IGF2YWlsYWJsZVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZWFkU3RvcmFnZShrZXkpIHtcbiAgaWYgKHN0b3JhZ2UpIHtcbiAgICByZXR1cm4gc3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VQcmVmaXggKyAnIycgKyBrZXkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyaXRlU3RvcmFnZShrZXksIHZhbHVlKSB7XG4gIGlmIChzdG9yYWdlKSB7XG4gICAgc3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VQcmVmaXggKyAnIycgKyBrZXksIHZhbHVlKTtcbiAgfVxufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICBIaWdobGlnaHRlZCBSZWZzICAgICAgICAgICAgICAgICAgICBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgaGlnaGxpZ2h0ZWRSZWZzID0gW107XG5cbmZ1bmN0aW9uIHNldEhpZ2hsaWdodGVkUmVmcyhyZWZzKXtcbiAgICBoaWdobGlnaHRlZFJlZnMgPSByZWZzO1xufVxuXG5mdW5jdGlvbiBnZXRIaWdobGlnaHRlZFJlZnMoKXtcbiAgICByZXR1cm4gaGlnaGxpZ2h0ZWRSZWZzO1xufVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgUmVkcmF3IE9uIERyYWcgICAgICAgICAgICAgICAgICAgICAgXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIHJlZHJhd09uRHJhZyA9IHRydWU7XG5cbiAgXG5mdW5jdGlvbiBzZXRSZWRyYXdPbkRyYWcodmFsdWUpe1xuICAgIHJlZHJhd09uRHJhZyA9IHZhbHVlO1xuICAgIHdyaXRlU3RvcmFnZShcInJlZHJhd09uRHJhZ1wiLCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGdldFJlZHJhd09uRHJhZygpe1xuICAgIHJldHVybiByZWRyYXdPbkRyYWc7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkJPTSBTcGxpdFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBib21zcGxpdDtcblxuZnVuY3Rpb24gc2V0Qm9tU3BsaXQodmFsdWUpe1xuICAgIGJvbXNwbGl0ID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldEJvbVNwbGl0KCl7XG4gICAgcmV0dXJuIGJvbXNwbGl0O1xufVxuXG5mdW5jdGlvbiBkZXN0cm95Qm9tU3BsaXQoKXtcbiAgICBib21zcGxpdC5kZXN0cm95KClcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNhbnZhcyBTcGxpdFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBjYW52YXNzcGxpdDtcblxuZnVuY3Rpb24gc2V0Q2FudmFzU3BsaXQodmFsdWUpe1xuICAgIGNhbnZhc3NwbGl0ID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldENhbnZhc1NwbGl0KCl7XG4gICAgcmV0dXJuIGNhbnZhc3NwbGl0O1xufVxuXG5mdW5jdGlvbiBkZXN0cm95Q2FudmFzU3BsaXQoKXtcbiAgICBjYW52YXNzcGxpdC5kZXN0cm95KClcbn1cblxuZnVuY3Rpb24gY29sbGFwc2VDYW52YXNTcGxpdCh2YWx1ZSlcbntcbiAgICBjYW52YXNzcGxpdC5jb2xsYXBzZSh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHNldFNpemVzQ2FudmFzU3BsaXQodmFsdWUpe1xuICAgIGNhbnZhc3NwbGl0LnNldFNpemVzKFs1MCwgNTBdKTtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNhbnZhcyBMYXlvdXRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgY2FudmFzbGF5b3V0ID0gXCJGQlwiO1xuXG4vKlhYWCBGb3VuZCBhIGJ1ZyBhdCBzdGFydHVwLiBDb2RlIGFzc3VtZXMgdGhhdCBjYW52YXMgbGF5b3V0IFxuaXMgaW4gb25lIG9mIHRocmVlIHN0YXRlcy4gdGhlbiBzeXN0ZW0gZmFpbHMuIGhlIGJ1ZyB3YXMgdGhhdCB0aGUgXG5jYW52YXNMYXlvdXQgd2FzIGJlaW5nIHNldCB0byAnZGVmYXVsdCcgd2hpY2ggaXMgbm90IGEgdmFsaWQgc3RhdGUuIFxuU28gbm8gaXMgY2hlY2sgdGhhdCBpZiBkZWZhdWx0IGlzIHNlbnQgaW4gdGhlbiBzZXQgdGhlIGxheW91dCB0byBGQiBtb2RlLlxuKi9cbi8qIFRPRE86IE1ha2UgdGhlIGRlZmF1bHQgY2hlY2sgYmVsb3cgYWN0dWFsbHkgY2hlY2sgdGhhdCB0aGUgaXRlbSBcbmlzIGluIG9uZSBvZiB0aGUgdGhyZWUgdmFsaWQgc3RhdGVzLiBJZiBub3QgdGhlbiBzZXQgdG8gRkIsIG90aGVyd2lzZSBzZXQgdG8gb25lIG9mXG50aGUgdGhyZWUgdmFsaWQgc3RhdGVzXG4qL1xuZnVuY3Rpb24gc2V0Q2FudmFzTGF5b3V0KHZhbHVlKXtcbiAgICBpZih2YWx1ZSA9PSAnZGVmYXVsdCcpe1xuICAgICAgICBjYW52YXNsYXlvdXQgPSAnRkInXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjYW52YXNsYXlvdXQgPSB2YWx1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldENhbnZhc0xheW91dCgpe1xuICAgIHJldHVybiBjYW52YXNsYXlvdXQ7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5CT00gTGF5b3V0XG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIGJvbWxheW91dCA9IFwiZGVmYXVsdFwiO1xuXG5mdW5jdGlvbiBzZXRCb21MYXlvdXQodmFsdWUpe1xuICAgIGJvbWxheW91dCA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRCb21MYXlvdXQoKXtcbiAgICByZXR1cm4gYm9tbGF5b3V0O1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQk9NIFNvcnQgRnVuY3Rpb25cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgYm9tU29ydEZ1bmN0aW9uID0gbnVsbDtcblxuZnVuY3Rpb24gc2V0Qm9tU29ydEZ1bmN0aW9uKHZhbHVlKXtcbiAgICBib21Tb3J0RnVuY3Rpb24gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Qm9tU29ydEZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGJvbVNvcnRGdW5jdGlvbjtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkN1cnJlbnQgU29ydCBDb2x1bW5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgY3VycmVudFNvcnRDb2x1bW4gPSBudWxsO1xuXG5mdW5jdGlvbiBzZXRDdXJyZW50U29ydENvbHVtbih2YWx1ZSl7XG4gICAgY3VycmVudFNvcnRDb2x1bW4gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudFNvcnRDb2x1bW4oKXtcbiAgICByZXR1cm4gY3VycmVudFNvcnRDb2x1bW47XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5DdXJyZW50IFNvcnQgT3JkZXJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgY3VycmVudFNvcnRPcmRlciA9IG51bGw7XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnRTb3J0T3JkZXIodmFsdWUpe1xuICAgIGN1cnJlbnRTb3J0T3JkZXIgPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudFNvcnRPcmRlcigpe1xuICAgIHJldHVybiBjdXJyZW50U29ydE9yZGVyO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ3VycmVudCBIaWdobGlnaHRlZCBSb3cgSURcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgY3VycmVudEhpZ2hsaWdodGVkUm93SWQ7XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKHZhbHVlKXtcbiAgICBjdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpe1xuICAgIHJldHVybiBjdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZDtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkhpZ2hsaWdodCBIYW5kbGVyc1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBoaWdobGlnaHRIYW5kbGVycyA9IFtdO1xuXG5mdW5jdGlvbiBzZXRIaWdobGlnaHRIYW5kbGVycyh2YWx1ZXMpe1xuICAgIGhpZ2hsaWdodEhhbmRsZXJzID0gdmFsdWVzO1xufVxuXG5mdW5jdGlvbiBnZXRIaWdobGlnaHRIYW5kbGVycygpe1xuICAgIHJldHVybiBoaWdobGlnaHRIYW5kbGVycztcbn1cblxuZnVuY3Rpb24gcHVzaEhpZ2hsaWdodEhhbmRsZXJzKHZhbHVlKXtcbiAgICBoaWdobGlnaHRIYW5kbGVycy5wdXNoKHZhbHVlKTtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNoZWNrYm94ZXNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgY2hlY2tib3hlcyA9IFtdO1xuXG5mdW5jdGlvbiBzZXRDaGVja2JveGVzKHZhbHVlcyl7XG4gICAgY2hlY2tib3hlcyA9IHZhbHVlcztcbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tib3hlcygpe1xuICAgIHJldHVybiBjaGVja2JveGVzO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQk9NIENoZWNrYm94ZXNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgYm9tQ2hlY2tib3hlcyA9IFwiXCI7XG5cbmZ1bmN0aW9uIHNldEJvbUNoZWNrYm94ZXModmFsdWVzKXtcbiAgICBib21DaGVja2JveGVzID0gdmFsdWVzO1xufVxuXG5mdW5jdGlvbiBnZXRCb21DaGVja2JveGVzKCl7XG4gICAgcmV0dXJuIGJvbUNoZWNrYm94ZXM7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5IaWdobGlnaHQgUGluIDFcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgaGlnaGxpZ2h0cGluMSA9IGZhbHNlO1xuXG5mdW5jdGlvbiBzZXRIaWdobGlnaHRQaW4xKHZhbHVlKSB7XG4gIHdyaXRlU3RvcmFnZShcImhpZ2hsaWdodHBpbjFcIiwgdmFsdWUpO1xuICBoaWdobGlnaHRwaW4xID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldEhpZ2hsaWdodFBpbjEoKXtcbiAgICByZXR1cm4gaGlnaGxpZ2h0cGluMTtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkxhc3QgQ2xpY2tlZCBSZWZcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgbGFzdENsaWNrZWRSZWY7XG5cbmZ1bmN0aW9uIHNldExhc3RDbGlja2VkUmVmKHZhbHVlKXtcbiAgICBsYXN0Q2xpY2tlZFJlZiA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRMYXN0Q2xpY2tlZFJlZigpe1xuICAgIHJldHVybiBsYXN0Q2xpY2tlZFJlZjtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXRTdG9yYWdlICAgICAgICAgICAgICAgICwgcmVhZFN0b3JhZ2UgICAgICAgICAgICAgICAgLCB3cml0ZVN0b3JhZ2UgICAgICAgLFxuICBzZXRIaWdobGlnaHRlZFJlZnMgICAgICAgICAsIGdldEhpZ2hsaWdodGVkUmVmcyAgICAgICAgICxcbiAgc2V0UmVkcmF3T25EcmFnICAgICAgICAgICAgLCBnZXRSZWRyYXdPbkRyYWcgICAgICAgICAgICAsXG4gIHNldEJvbVNwbGl0ICAgICAgICAgICAgICAgICwgZ2V0Qm9tU3BsaXQgICAgICAgICAgICAgICAgLCBkZXN0cm95Qm9tU3BsaXQgICAgLFxuICBzZXRDYW52YXNTcGxpdCAgICAgICAgICAgICAsIGdldENhbnZhc1NwbGl0ICAgICAgICAgICAgICwgZGVzdHJveUNhbnZhc1NwbGl0ICwgY29sbGFwc2VDYW52YXNTcGxpdCAsIHNldFNpemVzQ2FudmFzU3BsaXQsXG4gIHNldENhbnZhc0xheW91dCAgICAgICAgICAgICwgZ2V0Q2FudmFzTGF5b3V0ICAgICAgICAgICAgLFxuICBzZXRCb21MYXlvdXQgICAgICAgICAgICAgICAsIGdldEJvbUxheW91dCAgICAgICAgICAgICAgICxcbiAgc2V0Qm9tU29ydEZ1bmN0aW9uICAgICAgICAgLCBnZXRCb21Tb3J0RnVuY3Rpb24gICAgICAgICAsXG4gIHNldEN1cnJlbnRTb3J0Q29sdW1uICAgICAgICwgZ2V0Q3VycmVudFNvcnRDb2x1bW4gICAgICAgLFxuICBzZXRDdXJyZW50U29ydE9yZGVyICAgICAgICAsIGdldEN1cnJlbnRTb3J0T3JkZXIgICAgICAgICxcbiAgc2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQgLCBnZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCAsXG4gIHNldEhpZ2hsaWdodEhhbmRsZXJzICAgICAgICwgZ2V0SGlnaGxpZ2h0SGFuZGxlcnMgICAgICAgLCBwdXNoSGlnaGxpZ2h0SGFuZGxlcnMgLFxuICBzZXRDaGVja2JveGVzICAgICAgICAgICAgICAsIGdldENoZWNrYm94ZXMgICAgICAgICAgICAgICxcbiAgc2V0Qm9tQ2hlY2tib3hlcyAgICAgICAgICAgLCBnZXRCb21DaGVja2JveGVzICAgICAgICAgICAsXG4gIHNldEhpZ2hsaWdodFBpbjEgICAgICAgICAgICwgZ2V0SGlnaGxpZ2h0UGluMSAgICAgICAgICAgLFxuICBzZXRMYXN0Q2xpY2tlZFJlZiAgICAgICAgICAsIGdldExhc3RDbGlja2VkUmVmICAgICAgICAgICxcbn07IiwiXG52YXIgZ2xvYmFsRGF0YSA9IHJlcXVpcmUoJy4vZ2xvYmFsLmpzJylcbnZhciByZW5kZXIgICAgID0gcmVxdWlyZSgnLi9yZW5kZXIuanMnKVxudmFyIGlib20gICAgICAgPSByZXF1aXJlKCcuL2lib20uanMnKVxuXG5jb25zdCBib2FyZFJvdGF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkUm90YXRpb24nKTtcbmJvYXJkUm90YXRpb24ub25pbnB1dD1mdW5jdGlvbigpXG57XG4gIHJlbmRlci5zZXRCb2FyZFJvdGF0aW9uKGJvYXJkUm90YXRpb24udmFsdWUpO1xufVxuXG5cbmNvbnN0IGRhcmtNb2RlQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rhcmttb2RlQ2hlY2tib3gnKTtcbmRhcmtNb2RlQm94Lm9uY2hhbmdlPWZ1bmN0aW9uKCl7XG4gIGlib20uc2V0RGFya01vZGUoZGFya01vZGVCb3guY2hlY2tlZClcbn1cblxuY29uc3Qgc2lsa3NjcmVlbkNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpbGtzY3JlZW5DaGVja2JveCcpO1xuc2lsa3NjcmVlbkNoZWNrYm94LmNoZWNrZWQ9ZnVuY3Rpb24oKXtcbiAgaWJvbS5zaWxrc2NyZWVuVmlzaWJsZShzaWxrc2NyZWVuQ2hlY2tib3guY2hlY2tlZClcbn1cbnNpbGtzY3JlZW5DaGVja2JveC5vbmNoYW5nZT1mdW5jdGlvbigpe1xuICBpYm9tLnNpbGtzY3JlZW5WaXNpYmxlKHNpbGtzY3JlZW5DaGVja2JveC5jaGVja2VkKVxufVxuXG5jb25zdCBoaWdobGlnaHRwaW4xQ2hlY2tib3ggPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWdobGlnaHRwaW4xQ2hlY2tib3gnKTtcbmhpZ2hsaWdodHBpbjFDaGVja2JveC5vbmNoYW5nZT1mdW5jdGlvbigpe1xuICBnbG9iYWxEYXRhLnNldEhpZ2hsaWdodFBpbjEoaGlnaGxpZ2h0cGluMUNoZWNrYm94LmNoZWNrZWQpO1xuICByZW5kZXIucmVkcmF3Q2FudmFzKGFsbGNhbnZhcy5mcm9udCk7XG4gIHJlbmRlci5yZWRyYXdDYW52YXMoYWxsY2FudmFzLmJhY2spO1xufVxuXG5jb25zdCBkcmFnQ2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJhZ0NoZWNrYm94Jyk7XG5kcmFnQ2hlY2tib3guY2hlY2tlZD1mdW5jdGlvbigpe1xuICBnbG9iYWxEYXRhLnNldFJlZHJhd09uRHJhZyhkcmFnQ2hlY2tib3guY2hlY2tlZClcbn1cbmRyYWdDaGVja2JveC5vbmNoYW5nZT1mdW5jdGlvbigpe1xuICBnbG9iYWxEYXRhLnNldFJlZHJhd09uRHJhZyhkcmFnQ2hlY2tib3guY2hlY2tlZClcbn1cblxuXG5jb25zdCBmaWx0ZXJfMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXInKTtcbmZpbHRlcl8yLm9uaW5wdXQ9ZnVuY3Rpb24oKXtcbiAgaWJvbS51cGRhdGVGaWx0ZXIoZmlsdGVyXzIudmFsdWUpXG59XG5cblxuY29uc3QgcmVmbG9va3VwXzIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVmbG9va3VwJyk7XG5yZWZsb29rdXBfMi5vbmlucHV0PWZ1bmN0aW9uKCl7XG4gIGlib20udXBkYXRlUmVmTG9va3VwKHJlZmxvb2t1cF8yLnZhbHVlKVxufVxuXG5jb25zdCBib21DaGVja2JveGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvbUNoZWNrYm94ZXMnKTtcbmJvbUNoZWNrYm94ZXMub25pbnB1dD1mdW5jdGlvbigpe1xuICBpYm9tLnNldEJvbUNoZWNrYm94ZXMoYm9tQ2hlY2tib3hlcy52YWx1ZSk7XG59XG5cblxuY29uc3QgZmxfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsLWJ0bicpO1xuZmxfYnRuLm9uY2xpY2s9ZnVuY3Rpb24oKXtcbiAgaWJvbS5jaGFuZ2VDYW52YXNMYXlvdXQoJ0YnKTtcbn1cblxuXG5jb25zdCBmYl9idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmItYnRuJyk7XG5mYl9idG4ub25jbGljaz1mdW5jdGlvbigpe1xuICBpYm9tLmNoYW5nZUNhbnZhc0xheW91dCgnRkInKTtcbn1cblxuXG5jb25zdCBibF9idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmwtYnRuJyk7XG5ibF9idG4ub25jbGljaz1mdW5jdGlvbigpe1xuICBpYm9tLmNoYW5nZUNhbnZhc0xheW91dCgnQicpO1xufVxuXG5jb25zdCBib21fYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvbS1idG4nKTtcbmJvbV9idG4ub25jbGljaz1mdW5jdGlvbigpe1xuICBpYm9tLmNoYW5nZUJvbUxheW91dCgnQk9NJylcbn1cblxuY29uc3QgbHJfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xyLWJ0bicpO1xubHJfYnRuLm9uY2xpY2s9ZnVuY3Rpb24oKXtcbiAgaWJvbS5jaGFuZ2VCb21MYXlvdXQoJ0xSJylcbn1cblxuY29uc3QgdGJfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RiLWJ0bicpO1xudGJfYnRuLm9uY2xpY2s9ZnVuY3Rpb24oKXtcbiAgaWJvbS5jaGFuZ2VCb21MYXlvdXQoJ1RCJylcbn1cbiIsIi8qIERPTSBtYW5pcHVsYXRpb24gYW5kIG1pc2MgY29kZSAqL1xuXG5cbnZhciBTcGxpdCA9IHJlcXVpcmUoJy4uL3ZlbmRlci9zcGxpdC5qcycpXG52YXIgZ2xvYmFsRGF0YSA9IHJlcXVpcmUoJy4vZ2xvYmFsLmpzJylcbnZhciByZW5kZXIgPSByZXF1aXJlKCcuL3JlbmRlci5qcycpXG5cbmZ1bmN0aW9uIGRiZyhodG1sKSB7XG4gIGRiZ2Rpdi5pbm5lckhUTUwgPSBodG1sO1xufVxuXG5mdW5jdGlvbiBzZXREYXJrTW9kZSh2YWx1ZSkge1xuICBpZiAodmFsdWUpIHtcbiAgICB0b3Btb3N0ZGl2LmNsYXNzTGlzdC5hZGQoXCJkYXJrXCIpO1xuICB9IGVsc2Uge1xuICAgIHRvcG1vc3RkaXYuY2xhc3NMaXN0LnJlbW92ZShcImRhcmtcIik7XG4gIH1cbiAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJkYXJrbW9kZVwiLCB2YWx1ZSk7XG4gIHJlbmRlci5yZWRyYXdDYW52YXMoYWxsY2FudmFzLmZyb250KTtcbiAgcmVuZGVyLnJlZHJhd0NhbnZhcyhhbGxjYW52YXMuYmFjayk7XG59XG5cbmZ1bmN0aW9uIGdldFN0b3JlZENoZWNrYm94UmVmcyhjaGVja2JveCkge1xuICB2YXIgZXhpc3RpbmdSZWZzID0gZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcImNoZWNrYm94X1wiICsgY2hlY2tib3gpO1xuICBpZiAoIWV4aXN0aW5nUmVmcykge1xuICAgIHJldHVybiBuZXcgU2V0KCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBTZXQoZXhpc3RpbmdSZWZzLnNwbGl0KFwiLFwiKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q2hlY2tib3hTdGF0ZShjaGVja2JveCwgcmVmZXJlbmNlcykge1xuICB2YXIgc3RvcmVkUmVmc1NldCA9IGdldFN0b3JlZENoZWNrYm94UmVmcyhjaGVja2JveCk7XG4gIHZhciBjdXJyZW50UmVmc1NldCA9IG5ldyBTZXQocmVmZXJlbmNlcyk7XG4gIC8vIEdldCBkaWZmZXJlbmNlIG9mIGN1cnJlbnQgLSBzdG9yZWRcbiAgdmFyIGRpZmZlcmVuY2UgPSBuZXcgU2V0KGN1cnJlbnRSZWZzU2V0KTtcbiAgZm9yIChyZWYgb2Ygc3RvcmVkUmVmc1NldCkge1xuICAgIGRpZmZlcmVuY2UuZGVsZXRlKHJlZik7XG4gIH1cbiAgaWYgKGRpZmZlcmVuY2Uuc2l6ZSA9PSAwKSB7XG4gICAgLy8gQWxsIHRoZSBjdXJyZW50IHJlZnMgYXJlIHN0b3JlZFxuICAgIHJldHVybiBcImNoZWNrZWRcIjtcbiAgfSBlbHNlIGlmIChkaWZmZXJlbmNlLnNpemUgPT0gY3VycmVudFJlZnNTZXQuc2l6ZSkge1xuICAgIC8vIE5vbmUgb2YgdGhlIGN1cnJlbnQgcmVmcyBhcmUgc3RvcmVkXG4gICAgcmV0dXJuIFwidW5jaGVja2VkXCI7XG4gIH0gZWxzZSB7XG4gICAgLy8gU29tZSBvZiB0aGUgcmVmcyBhcmUgc3RvcmVkXG4gICAgcmV0dXJuIFwiaW5kZXRlcm1pbmF0ZVwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEJvbUNoZWNrYm94U3RhdGUoY2hlY2tib3gsIGVsZW1lbnQsIHJlZmVyZW5jZXMpIHtcbiAgdmFyIHN0YXRlID0gZ2V0Q2hlY2tib3hTdGF0ZShjaGVja2JveCwgcmVmZXJlbmNlcyk7XG4gIGVsZW1lbnQuY2hlY2tlZCA9IChzdGF0ZSA9PSBcImNoZWNrZWRcIik7XG4gIGVsZW1lbnQuaW5kZXRlcm1pbmF0ZSA9IChzdGF0ZSA9PSBcImluZGV0ZXJtaW5hdGVcIik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoZWNrYm94Q2hhbmdlSGFuZGxlcihjaGVja2JveCwgcmVmZXJlbmNlcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmVmc1NldCA9IGdldFN0b3JlZENoZWNrYm94UmVmcyhjaGVja2JveCk7XG4gICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgLy8gY2hlY2tib3ggdGlja2VkXG4gICAgICBmb3IgKHZhciByZWYgb2YgcmVmZXJlbmNlcykge1xuICAgICAgICByZWZzU2V0LmFkZChyZWYpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjaGVja2JveCB1bnRpY2tlZFxuICAgICAgZm9yICh2YXIgcmVmIG9mIHJlZmVyZW5jZXMpIHtcbiAgICAgICAgcmVmc1NldC5kZWxldGUocmVmKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2xvYmFsRGF0YS53cml0ZVN0b3JhZ2UoXCJjaGVja2JveF9cIiArIGNoZWNrYm94LCBbLi4ucmVmc1NldF0uam9pbihcIixcIikpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvd0hpZ2hsaWdodEhhbmRsZXIocm93aWQsIHJlZnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGlmIChnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpIHtcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkgPT0gcm93aWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0ZWRcIik7XG4gICAgfVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJvd2lkKS5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0ZWRcIik7XG4gICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZChyb3dpZCk7XG4gICAgZ2xvYmFsRGF0YS5zZXRIaWdobGlnaHRlZFJlZnMocmVmcyk7XG4gICAgcmVuZGVyLmRyYXdIaWdobGlnaHRzKCk7XG4gIH1cbn1cblxuLy9YWFggVEhpcyBmdW5jdGlvbiBoYXMgZmlsdGVyLiBGaWx0ZXIgaXMgbm90IGdsb2JhbC4gV2hlcmUgZG9lcyBpdCBjb21lIGZyb20gdGhlblxuZnVuY3Rpb24gZW50cnlNYXRjaGVzKGVudHJ5KSB7XG4gIC8vIGNoZWNrIHJlZnNcbiAgZm9yICh2YXIgcmVmIG9mIGVudHJ5WzNdKSB7XG4gICAgaWYgKHJlZi50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyKSA+PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgLy8gY2hlY2sgdmFsdWVcbiAgaWYgKGVudHJ5WzFdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIpID49IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvLyBjaGVjayBmb290cHJpbnRcbiAgaWYgKGVudHJ5WzJdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIpID49IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGZpbmRSZWZJbkVudHJ5KGVudHJ5KSB7XG4gIGZvciAodmFyIHJlZiBvZiBlbnRyeVszXSkge1xuICAgIGlmIChyZWYudG9Mb3dlckNhc2UoKSA9PSByZWZsb29rdXApIHtcbiAgICAgIHJldHVybiBbcmVmXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBoaWdobGlnaHRGaWx0ZXIocykge1xuICBpZiAoIWZpbHRlcikge1xuICAgIHJldHVybiBzO1xuICB9XG4gIHZhciBwYXJ0cyA9IHMudG9Mb3dlckNhc2UoKS5zcGxpdChmaWx0ZXIpO1xuICBpZiAocGFydHMubGVuZ3RoID09IDEpIHtcbiAgICByZXR1cm4gcztcbiAgfVxuICB2YXIgciA9IFwiXCI7XG4gIHZhciBwb3MgPSAwO1xuICBmb3IgKHZhciBpIGluIHBhcnRzKSB7XG4gICAgaWYgKGkgPiAwKSB7XG4gICAgICByICs9ICc8bWFyayBjbGFzcz1cImhpZ2hsaWdodFwiPicgK1xuICAgICAgICBzLnN1YnN0cmluZyhwb3MsIHBvcyArIGZpbHRlci5sZW5ndGgpICtcbiAgICAgICAgJzwvbWFyaz4nO1xuICAgICAgcG9zICs9IGZpbHRlci5sZW5ndGg7XG4gICAgfVxuICAgIHIgKz0gcy5zdWJzdHJpbmcocG9zLCBwb3MgKyBwYXJ0c1tpXS5sZW5ndGgpO1xuICAgIHBvcyArPSBwYXJ0c1tpXS5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIGNoZWNrYm94U2V0VW5zZXRBbGxIYW5kbGVyKGNoZWNrYm94bmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNoZWNrYm94bnVtID0gMDtcbiAgICB3aGlsZSAoY2hlY2tib3hudW0gPCBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKS5sZW5ndGggJiZcbiAgICAgIGdsb2JhbERhdGEuZ2V0Q2hlY2tib3hlcygpW2NoZWNrYm94bnVtXS50b0xvd2VyQ2FzZSgpICE9IGNoZWNrYm94bmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICBjaGVja2JveG51bSsrO1xuICAgIH1cbiAgICBpZiAoY2hlY2tib3hudW0gPj0gZ2xvYmFsRGF0YS5nZXRDaGVja2JveGVzKCkubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBhbGxzZXQgPSB0cnVlO1xuICAgIHZhciBjaGVja2JveDtcbiAgICB2YXIgcm93O1xuICAgIGZvciAocm93IG9mIGJvbWJvZHkuY2hpbGROb2Rlcykge1xuICAgICAgY2hlY2tib3ggPSByb3cuY2hpbGROb2Rlc1tjaGVja2JveG51bSArIDFdLmNoaWxkTm9kZXNbMF07XG4gICAgICBpZiAoIWNoZWNrYm94LmNoZWNrZWQgfHwgY2hlY2tib3guaW5kZXRlcm1pbmF0ZSkge1xuICAgICAgICBhbGxzZXQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAocm93IG9mIGJvbWJvZHkuY2hpbGROb2Rlcykge1xuICAgICAgY2hlY2tib3ggPSByb3cuY2hpbGROb2Rlc1tjaGVja2JveG51bSArIDFdLmNoaWxkTm9kZXNbMF07XG4gICAgICBjaGVja2JveC5jaGVja2VkID0gIWFsbHNldDtcbiAgICAgIGNoZWNrYm94LmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgIGNoZWNrYm94Lm9uY2hhbmdlKCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbHVtbkhlYWRlcihuYW1lLCBjbHMsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlRIXCIpO1xuICB0aC5pbm5lckhUTUwgPSBuYW1lO1xuICB0aC5jbGFzc0xpc3QuYWRkKGNscyk7XG4gIHRoLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICB2YXIgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJTUEFOXCIpO1xuICBzcGFuLmNsYXNzTGlzdC5hZGQoXCJzb3J0bWFya1wiKTtcbiAgc3Bhbi5jbGFzc0xpc3QuYWRkKFwibm9uZVwiKTtcbiAgdGguYXBwZW5kQ2hpbGQoc3Bhbik7XG4gIHRoLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpICYmIHRoaXMgIT09IGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKSkge1xuICAgICAgLy8gQ3VycmVudGx5IHNvcnRlZCBieSBhbm90aGVyIGNvbHVtblxuICAgICAgZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LnJlbW92ZShnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0T3JkZXIoKSk7XG4gICAgICBnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QuYWRkKFwibm9uZVwiKTtcbiAgICAgIGdsb2JhbERhdGEuc2V0Q3VycmVudFNvcnRDb2x1bW4obnVsbCk7XG4gICAgICBnbG9iYWxEYXRhLnNldEN1cnJlbnRTb3J0T3JkZXIobnVsbCk7XG4gICAgfVxuICAgIGlmIChnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkgJiYgdGhpcyA9PT0gZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpKSB7XG4gICAgICAvLyBBbHJlYWR5IHNvcnRlZCBieSB0aGlzIGNvbHVtblxuICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRPcmRlcigpID09IFwiYXNjXCIpIHtcbiAgICAgICAgLy8gU29ydCBieSB0aGlzIGNvbHVtbiwgZGVzY2VuZGluZyBvcmRlclxuICAgICAgICBnbG9iYWxEYXRhLnNldEJvbVNvcnRGdW5jdGlvbihmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIC1jb21wYXJhdG9yKGEsIGIpO1xuICAgICAgICB9KTtcbiAgICAgICAgZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LnJlbW92ZShcImFzY1wiKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZChcImRlc2NcIik7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Q3VycmVudFNvcnRPcmRlcihcImRlc2NcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVbnNvcnRcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRCb21Tb3J0RnVuY3Rpb24obnVsbCk7XG4gICAgICAgIGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKS5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXNjXCIpO1xuICAgICAgICBnbG9iYWxEYXRhLmdldEN1cnJlbnRTb3J0Q29sdW1uKCkuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QuYWRkKFwibm9uZVwiKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50U29ydENvbHVtbihudWxsKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50U29ydE9yZGVyKG51bGwpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb3J0IGJ5IHRoaXMgY29sdW1uLCBhc2NlbmRpbmcgb3JkZXJcbiAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU29ydEZ1bmN0aW9uKGNvbXBhcmF0b3IpO1xuICAgICAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50U29ydENvbHVtbih0aGlzKTtcbiAgICAgIGdsb2JhbERhdGEuZ2V0Q3VycmVudFNvcnRDb2x1bW4oKS5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5yZW1vdmUoXCJub25lXCIpO1xuICAgICAgZ2xvYmFsRGF0YS5nZXRDdXJyZW50U29ydENvbHVtbigpLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZChcImFzY1wiKTtcbiAgICAgIGdsb2JhbERhdGEuc2V0Q3VycmVudFNvcnRPcmRlcihcImFzY1wiKTtcbiAgICB9XG4gICAgcG9wdWxhdGVCb21Cb2R5KCk7XG4gIH1cbiAgcmV0dXJuIHRoO1xufVxuXG5mdW5jdGlvbiBmYW5jeURibENsaWNrSGFuZGxlcihlbCwgb25zaW5nbGUsIG9uZG91YmxlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1kYmxjbGlja1wiKSA9PSBudWxsKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRibGNsaWNrXCIsIDEpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZShcImRhdGEtZGJsY2xpY2tcIikgPT0gMSkge1xuICAgICAgICAgIG9uc2luZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1kYmxjbGlja1wiKTtcbiAgICAgIH0sIDIwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtZGJsY2xpY2tcIik7XG4gICAgICBvbmRvdWJsZSgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUJvbUhlYWRlcigpIHtcbiAgd2hpbGUgKGJvbWhlYWQuZmlyc3RDaGlsZCkge1xuICAgIGJvbWhlYWQucmVtb3ZlQ2hpbGQoYm9taGVhZC5maXJzdENoaWxkKTtcbiAgfVxuICB2YXIgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVFJcIik7XG4gIHZhciB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJUSFwiKTtcbiAgdGguY2xhc3NMaXN0LmFkZChcIm51bUNvbFwiKTtcbiAgdHIuYXBwZW5kQ2hpbGQodGgpO1xuICBnbG9iYWxEYXRhLnNldENoZWNrYm94ZXMoZ2xvYmFsRGF0YS5nZXRCb21DaGVja2JveGVzKCkuc3BsaXQoXCIsXCIpLmZpbHRlcigoZSkgPT4gZSkpO1xuICB2YXIgY2hlY2tib3hDb21wYXJlQ2xvc3VyZSA9IGZ1bmN0aW9uKGNoZWNrYm94KSB7XG4gICAgcmV0dXJuIChhLCBiKSA9PiB7XG4gICAgICB2YXIgc3RhdGVBID0gZ2V0Q2hlY2tib3hTdGF0ZShjaGVja2JveCwgYVszXSk7XG4gICAgICB2YXIgc3RhdGVCID0gZ2V0Q2hlY2tib3hTdGF0ZShjaGVja2JveCwgYlszXSk7XG4gICAgICBpZiAoc3RhdGVBID4gc3RhdGVCKSByZXR1cm4gLTE7XG4gICAgICBpZiAoc3RhdGVBIDwgc3RhdGVCKSByZXR1cm4gMTtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuICBmb3IgKHZhciBjaGVja2JveCBvZiBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKSkge1xuICAgIHRoID0gY3JlYXRlQ29sdW1uSGVhZGVyKFxuICAgICAgY2hlY2tib3gsIFwiYm9tLWNoZWNrYm94XCIsIGNoZWNrYm94Q29tcGFyZUNsb3N1cmUoY2hlY2tib3gpKTtcbiAgICB0aC5vbmNsaWNrID0gZmFuY3lEYmxDbGlja0hhbmRsZXIoXG4gICAgICB0aCwgdGgub25jbGljay5iaW5kKHRoKSwgY2hlY2tib3hTZXRVbnNldEFsbEhhbmRsZXIoY2hlY2tib3gpKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0aCk7XG4gIH1cbiAgdHIuYXBwZW5kQ2hpbGQoY3JlYXRlQ29sdW1uSGVhZGVyKFwiUmVmZXJlbmNlc1wiLCBcIlJlZmVyZW5jZXNcIiwgKGEsIGIpID0+IHtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBhWzNdLmxlbmd0aCAmJiBpIDwgYlszXS5sZW5ndGgpIHtcbiAgICAgIGlmIChhWzNdW2ldICE9IGJbM11baV0pIHJldHVybiBhWzNdW2ldID4gYlszXVtpXSA/IDEgOiAtMTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGFbM10ubGVuZ3RoIC0gYlszXS5sZW5ndGg7XG4gIH0pKTtcbiAgdHIuYXBwZW5kQ2hpbGQoY3JlYXRlQ29sdW1uSGVhZGVyKFwiVmFsdWVcIiwgXCJWYWx1ZVwiLCAoYSwgYikgPT4ge1xuICAgIGlmIChhWzFdICE9IGJbMV0pIHJldHVybiBhWzFdID4gYlsxXSA/IDEgOiAtMTtcbiAgICBlbHNlIHJldHVybiAwO1xuICB9KSk7XG4gIHRyLmFwcGVuZENoaWxkKGNyZWF0ZUNvbHVtbkhlYWRlcihcIkZvb3RwcmludFwiLCBcIkZvb3RwcmludFwiLCAoYSwgYikgPT4ge1xuICAgIGlmIChhWzJdICE9IGJbMl0pIHJldHVybiBhWzJdID4gYlsyXSA/IDEgOiAtMTtcbiAgICBlbHNlIHJldHVybiAwO1xuICB9KSk7XG5cbiAgYm9taGVhZC5hcHBlbmRDaGlsZCh0cik7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlQm9tQm9keSgpIHtcbiAgd2hpbGUgKGJvbS5maXJzdENoaWxkKSB7XG4gICAgYm9tLnJlbW92ZUNoaWxkKGJvbS5maXJzdENoaWxkKTtcbiAgfVxuICBnbG9iYWxEYXRhLnNldEhpZ2hsaWdodEhhbmRsZXJzKFtdKTtcbiAgZ2xvYmFsRGF0YS5zZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZChudWxsKTtcbiAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgY29uc29sZS5sb2coZ2xvYmFsRGF0YS5nZXRDYW52YXNMYXlvdXQoKSlcbiAgc3dpdGNoIChnbG9iYWxEYXRhLmdldENhbnZhc0xheW91dCgpKSB7XG4gICAgY2FzZSAnRic6XG4gICAgICBib210YWJsZSA9IHBjYmRhdGEuYm9tLkY7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdGQic6XG4gICAgICBib210YWJsZSA9IHBjYmRhdGEuYm9tLmJvdGg7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdCJzpcbiAgICAgIGJvbXRhYmxlID0gcGNiZGF0YS5ib20uQjtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGlmIChnbG9iYWxEYXRhLmdldEJvbVNvcnRGdW5jdGlvbigpKSB7XG4gICAgYm9tdGFibGUgPSBib210YWJsZS5zbGljZSgpLnNvcnQoZ2xvYmFsRGF0YS5nZXRCb21Tb3J0RnVuY3Rpb24oKSk7XG4gIH1cbiAgZm9yICh2YXIgaSBpbiBib210YWJsZSkge1xuICAgIHZhciBib21lbnRyeSA9IGJvbXRhYmxlW2ldO1xuICAgIGlmIChmaWx0ZXIgJiYgIWVudHJ5TWF0Y2hlcyhib21lbnRyeSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB2YXIgcmVmZXJlbmNlcyA9IGJvbWVudHJ5WzJdO1xuICAgIGlmIChyZWZsb29rdXApIHtcbiAgICAgIHJlZmVyZW5jZXMgPSBmaW5kUmVmSW5FbnRyeShib21lbnRyeSk7XG4gICAgICBpZiAoIXJlZmVyZW5jZXMpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJUUlwiKTtcbiAgICB2YXIgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVERcIik7XG4gICAgdmFyIHJvd251bSA9ICtpICsgMTtcbiAgICB0ci5pZCA9IFwiYm9tcm93XCIgKyByb3dudW07XG4gICAgdGQudGV4dENvbnRlbnQgPSByb3dudW07XG4gICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xuICAgIC8vIENoZWNrYm94ZXNcbiAgICBmb3IgKHZhciBjaGVja2JveCBvZiBnbG9iYWxEYXRhLmdldENoZWNrYm94ZXMoKSkge1xuICAgICAgaWYgKGNoZWNrYm94KSB7XG4gICAgICAgIHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlREXCIpO1xuICAgICAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgIGlucHV0Lm9uY2hhbmdlID0gY3JlYXRlQ2hlY2tib3hDaGFuZ2VIYW5kbGVyKGNoZWNrYm94LCByZWZlcmVuY2VzKTtcbiAgICAgICAgc2V0Qm9tQ2hlY2tib3hTdGF0ZShjaGVja2JveCwgaW5wdXQsIHJlZmVyZW5jZXMpO1xuICAgICAgICB0ZC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgIHRyLmFwcGVuZENoaWxkKHRkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy9JTkZPOiBUaGUgbGluZXMgYmVsb3cgYWRkIHRoZSBjb250cm9sIHRoZSBjb2x1bW5zIG9uIHRoZSBib20gdGFibGVcbiAgICAvLyBSZWZlcmVuY2VzXG4gICAgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVERcIik7XG4gICAgdGQuaW5uZXJIVE1MID0gaGlnaGxpZ2h0RmlsdGVyKHJlZmVyZW5jZXMuam9pbihcIiwgXCIpKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgLy8gVmFsdWVcbiAgICB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJURFwiKTtcbiAgICB0ZC5pbm5lckhUTUwgPSBoaWdobGlnaHRGaWx0ZXIoYm9tZW50cnlbMV0pO1xuICAgIHRyLmFwcGVuZENoaWxkKHRkKTtcbiAgICAvLyBGb290cHJpbnRcbiAgICB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJURFwiKTtcbiAgICB0ZC5pbm5lckhUTUwgPSBoaWdobGlnaHRGaWx0ZXIoYm9tZW50cnlbMl0pO1xuICAgIHRyLmFwcGVuZENoaWxkKHRkKTtcblxuXG5cbiAgICBib20uYXBwZW5kQ2hpbGQodHIpO1xuICAgIHZhciBoYW5kbGVyID0gY3JlYXRlUm93SGlnaGxpZ2h0SGFuZGxlcih0ci5pZCwgcmVmZXJlbmNlcyk7XG4gICAgdHIub25tb3VzZW1vdmUgPSBoYW5kbGVyO1xuICAgIGdsb2JhbERhdGEucHVzaEhpZ2hsaWdodEhhbmRsZXJzKHtcbiAgICAgIGlkOiB0ci5pZCxcbiAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXG4gICAgICByZWZzOiByZWZlcmVuY2VzXG4gICAgfSk7XG4gICAgaWYgKChmaWx0ZXIgfHwgcmVmbG9va3VwKSAmJiBmaXJzdCkge1xuICAgICAgaGFuZGxlcigpO1xuICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc21vb3RoU2Nyb2xsVG9Sb3cocm93aWQpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocm93aWQpLnNjcm9sbEludG9WaWV3KHtcbiAgICBiZWhhdmlvcjogXCJzbW9vdGhcIixcbiAgICBibG9jazogXCJjZW50ZXJcIixcbiAgICBpbmxpbmU6IFwibmVhcmVzdFwiXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoaWdobGlnaHRQcmV2aW91c1JvdygpIHtcbiAgaWYgKCFnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpIHtcbiAgICBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpLmxlbmd0aCAtIDFdLmhhbmRsZXIoKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpLmxlbmd0aCA+IDEgJiZcbiAgICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVswXS5pZCA9PSBnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpIHtcbiAgICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVtnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKCkubGVuZ3RoIC0gMV0uaGFuZGxlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVtpICsgMV0uaWQgPT0gZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKSB7XG4gICAgICAgICAgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpW2ldLmhhbmRsZXIoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBzbW9vdGhTY3JvbGxUb1JvdyhnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpO1xufVxuXG5mdW5jdGlvbiBoaWdobGlnaHROZXh0Um93KCkge1xuICBpZiAoIWdsb2JhbERhdGEuZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKSkge1xuICAgIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVswXS5oYW5kbGVyKCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKS5sZW5ndGggPiAxICYmXG4gICAgICBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKClbZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpLmxlbmd0aCAtIDFdLmlkID09IGdsb2JhbERhdGEuZ2V0Q3VycmVudEhpZ2hsaWdodGVkUm93SWQoKSkge1xuICAgICAgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpWzBdLmhhbmRsZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBnbG9iYWxEYXRhLmdldEhpZ2hsaWdodEhhbmRsZXJzKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKVtpIC0gMV0uaWQgPT0gZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKSB7XG4gICAgICAgICAgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRIYW5kbGVycygpW2ldLmhhbmRsZXIoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBzbW9vdGhTY3JvbGxUb1JvdyhnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkpO1xufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUJvbVRhYmxlKCkge1xuICBwb3B1bGF0ZUJvbUhlYWRlcigpO1xuICBwb3B1bGF0ZUJvbUJvZHkoKTtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc0NsaWNrZWQocmVmZXJlbmNlcykge1xuICB2YXIgbGFzdENsaWNrZWRJbmRleCA9IHJlZmVyZW5jZXMuaW5kZXhPZihnbG9iYWxEYXRhLmdldExhc3RDbGlja2VkUmVmKCkpO1xuICB2YXIgcmVmID0gcmVmZXJlbmNlc1sobGFzdENsaWNrZWRJbmRleCArIDEpICUgcmVmZXJlbmNlcy5sZW5ndGhdO1xuICBmb3IgKHZhciBoYW5kbGVyIG9mIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0SGFuZGxlcnMoKSkge1xuICAgIGlmIChoYW5kbGVyLnJlZnMuaW5kZXhPZihyZWYpID49IDApIHtcbiAgICAgIGdsb2JhbERhdGEuc2V0TGFzdENsaWNrZWRSZWYocmVmKTtcbiAgICAgIGhhbmRsZXIuaGFuZGxlcigpO1xuICAgICAgc21vb3RoU2Nyb2xsVG9Sb3coZ2xvYmFsRGF0YS5nZXRDdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCgpKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVGaWx0ZXIoaW5wdXQpIHtcbiAgZmlsdGVyID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgcG9wdWxhdGVCb21UYWJsZSgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVSZWZMb29rdXAoaW5wdXQpIHtcbiAgcmVmbG9va3VwID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcbiAgcG9wdWxhdGVCb21UYWJsZSgpO1xufVxuXG5mdW5jdGlvbiBzaWxrc2NyZWVuVmlzaWJsZSh2aXNpYmxlKSB7XG4gIGlmICh2aXNpYmxlKSB7XG4gICAgYWxsY2FudmFzLmZyb250LnNpbGsuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgYWxsY2FudmFzLmJhY2suc2lsay5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICBnbG9iYWxEYXRhLndyaXRlU3RvcmFnZShcInNpbGtzY3JlZW5WaXNpYmxlXCIsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIGFsbGNhbnZhcy5mcm9udC5zaWxrLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBhbGxjYW52YXMuYmFjay5zaWxrLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBnbG9iYWxEYXRhLndyaXRlU3RvcmFnZShcInNpbGtzY3JlZW5WaXNpYmxlXCIsIGZhbHNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGFuZ2VDYW52YXNMYXlvdXQobGF5b3V0KSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmwtYnRuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXByZXNzZWRcIik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmItYnRuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXByZXNzZWRcIik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmwtYnRuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJkZXByZXNzZWRcIik7XG4gIHN3aXRjaCAobGF5b3V0KSB7XG4gICAgY2FzZSAnRic6XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsLWJ0blwiKS5jbGFzc0xpc3QuYWRkKFwiZGVwcmVzc2VkXCIpO1xuICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0Qm9tTGF5b3V0KCkgIT0gXCJCT01cIikge1xuICAgICAgICBnbG9iYWxEYXRhLmNvbGxhcHNlQ2FudmFzU3BsaXQoMSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdCJzpcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmwtYnRuXCIpLmNsYXNzTGlzdC5hZGQoXCJkZXByZXNzZWRcIik7XG4gICAgICBpZiAoZ2xvYmFsRGF0YS5nZXRCb21MYXlvdXQoKSAhPSBcIkJPTVwiKSB7XG4gICAgICAgIGdsb2JhbERhdGEuY29sbGFwc2VDYW52YXNTcGxpdCgwKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZiLWJ0blwiKS5jbGFzc0xpc3QuYWRkKFwiZGVwcmVzc2VkXCIpO1xuICAgICAgaWYgKGdsb2JhbERhdGEuZ2V0Qm9tTGF5b3V0KCkgIT0gXCJCT01cIikge1xuICAgICAgICBnbG9iYWxEYXRhLnNldFNpemVzQ2FudmFzU3BsaXQoWzUwLCA1MF0pO1xuICAgICAgfVxuICB9XG4gIGdsb2JhbERhdGEuc2V0Q2FudmFzTGF5b3V0KGxheW91dCk7XG4gIGdsb2JhbERhdGEud3JpdGVTdG9yYWdlKFwiY2FudmFzbGF5b3V0XCIsIGxheW91dCk7XG4gIHJlbmRlci5yZXNpemVBbGwoKTtcbiAgcG9wdWxhdGVCb21UYWJsZSgpO1xufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZU1ldGFkYXRhKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlXCIpLmlubmVySFRNTCAgICA9IHBjYmRhdGEubWV0YWRhdGEudGl0bGU7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmV2aXNpb25cIikuaW5uZXJIVE1MID0gXCJSZXY6IFwiICsgcGNiZGF0YS5tZXRhZGF0YS5yZXZpc2lvbjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wYW55XCIpLmlubmVySFRNTCAgPSBwY2JkYXRhLm1ldGFkYXRhLmNvbXBhbnk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsZWRhdGVcIikuaW5uZXJIVE1MID0gcGNiZGF0YS5tZXRhZGF0YS5kYXRlO1xuICBpZiAocGNiZGF0YS5tZXRhZGF0YS50aXRsZSAhPSBcIlwiKSB7XG4gICAgZG9jdW1lbnQudGl0bGUgPSBwY2JkYXRhLm1ldGFkYXRhLnRpdGxlICsgXCIgQk9NXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hhbmdlQm9tTGF5b3V0KGxheW91dCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvbS1idG5cIikuY2xhc3NMaXN0LnJlbW92ZShcImRlcHJlc3NlZFwiKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsci1idG5cIikuY2xhc3NMaXN0LnJlbW92ZShcImRlcHJlc3NlZFwiKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0Yi1idG5cIikuY2xhc3NMaXN0LnJlbW92ZShcImRlcHJlc3NlZFwiKTtcbiAgc3dpdGNoIChsYXlvdXQpIHtcbiAgICBjYXNlICdCT00nOlxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib20tYnRuXCIpLmNsYXNzTGlzdC5hZGQoXCJkZXByZXNzZWRcIik7XG4gICAgICBpZiAoZ2xvYmFsRGF0YS5nZXRCb21TcGxpdCgpKSB7XG4gICAgICAgIGdsb2JhbERhdGEuZGVzdHJveUJvbVNwbGl0KCk7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU3BsaXQobnVsbCk7XG4gICAgICAgIGdsb2JhbERhdGEuZGVzdHJveUNhbnZhc1NwbGl0KCk7XG4gICAgICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzU3BsaXQobnVsbCk7XG4gICAgICB9XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb250Y2FudmFzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja2NhbnZhc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvdFwiKS5zdHlsZS5oZWlnaHQgPSBcIlwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnVEInOlxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0Yi1idG5cIikuY2xhc3NMaXN0LmFkZChcImRlcHJlc3NlZFwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJvbnRjYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvdFwiKS5zdHlsZS5oZWlnaHQgPSBcImNhbGMoMTAwJSAtIDgwcHgpXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvbWRpdlwiKS5jbGFzc0xpc3QucmVtb3ZlKFwic3BsaXQtaG9yaXpvbnRhbFwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzZGl2XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJzcGxpdC1ob3Jpem9udGFsXCIpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcm9udGNhbnZhc1wiKS5jbGFzc0xpc3QuYWRkKFwic3BsaXQtaG9yaXpvbnRhbFwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja2NhbnZhc1wiKS5jbGFzc0xpc3QuYWRkKFwic3BsaXQtaG9yaXpvbnRhbFwiKTtcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEJvbVNwbGl0KCkpIHtcbiAgICAgICAgZ2xvYmFsRGF0YS5kZXN0cm95Qm9tU3BsaXQoKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRCb21TcGxpdChudWxsKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5kZXN0cm95Q2FudmFzU3BsaXQoKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRDYW52YXNTcGxpdChudWxsKTtcbiAgICAgIH1cbiAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU3BsaXQoU3BsaXQoWycjYm9tZGl2JywgJyNjYW52YXNkaXYnXSwge1xuICAgICAgICBzaXplczogWzUwLCA1MF0sXG4gICAgICAgIG9uRHJhZ0VuZDogcmVuZGVyLnJlc2l6ZUFsbCxcbiAgICAgICAgZGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsXG4gICAgICAgIGd1dHRlclNpemU6IDVcbiAgICAgIH0pKTtcbiAgICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzU3BsaXQoU3BsaXQoWycjZnJvbnRjYW52YXMnLCAnI2JhY2tjYW52YXMnXSwge1xuICAgICAgICBzaXplczogWzUwLCA1MF0sXG4gICAgICAgIGd1dHRlclNpemU6IDUsXG4gICAgICAgIG9uRHJhZ0VuZDogcmVuZGVyLnJlc2l6ZUFsbFxuICAgICAgfSkpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTFInOlxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsci1idG5cIikuY2xhc3NMaXN0LmFkZChcImRlcHJlc3NlZFwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJvbnRjYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tjYW52YXNcIikuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvdFwiKS5zdHlsZS5oZWlnaHQgPSBcImNhbGMoMTAwJSAtIDgwcHgpXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvbWRpdlwiKS5jbGFzc0xpc3QuYWRkKFwic3BsaXQtaG9yaXpvbnRhbFwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzZGl2XCIpLmNsYXNzTGlzdC5hZGQoXCJzcGxpdC1ob3Jpem9udGFsXCIpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcm9udGNhbnZhc1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwic3BsaXQtaG9yaXpvbnRhbFwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja2NhbnZhc1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwic3BsaXQtaG9yaXpvbnRhbFwiKTtcbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEJvbVNwbGl0KCkpIHtcbiAgICAgICAgZ2xvYmFsRGF0YS5kZXN0cm95Qm9tU3BsaXQoKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRCb21TcGxpdChudWxsKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5kZXN0cm95Q2FudmFzU3BsaXQoKTtcbiAgICAgICAgZ2xvYmFsRGF0YS5zZXRDYW52YXNTcGxpdChudWxsKTtcbiAgICAgIH1cbiAgICAgIGdsb2JhbERhdGEuc2V0Qm9tU3BsaXQoU3BsaXQoWycjYm9tZGl2JywgJyNjYW52YXNkaXYnXSwge1xuICAgICAgICBzaXplczogWzUwLCA1MF0sXG4gICAgICAgIG9uRHJhZ0VuZDogcmVuZGVyLnJlc2l6ZUFsbCxcbiAgICAgICAgZ3V0dGVyU2l6ZTogNVxuICAgICAgfSkpO1xuICAgICAgZ2xvYmFsRGF0YS5zZXRDYW52YXNTcGxpdChTcGxpdChbJyNmcm9udGNhbnZhcycsICcjYmFja2NhbnZhcyddLCB7XG4gICAgICAgIHNpemVzOiBbNTAsIDUwXSxcbiAgICAgICAgZ3V0dGVyU2l6ZTogNSxcbiAgICAgICAgZGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsXG4gICAgICAgIG9uRHJhZ0VuZDogcmVuZGVyLnJlc2l6ZUFsbFxuICAgICAgfSkpO1xuICB9XG4gIGdsb2JhbERhdGEuc2V0Qm9tTGF5b3V0KGxheW91dCk7XG4gIGdsb2JhbERhdGEud3JpdGVTdG9yYWdlKFwiYm9tbGF5b3V0XCIsIGxheW91dCk7XG4gIGNoYW5nZUNhbnZhc0xheW91dChnbG9iYWxEYXRhLmdldENhbnZhc0xheW91dCgpKTtcbn1cblxuZnVuY3Rpb24gZm9jdXNJbnB1dEZpZWxkKGlucHV0KSB7XG4gIGlucHV0LnNjcm9sbEludG9WaWV3KGZhbHNlKTtcbiAgaW5wdXQuZm9jdXMoKTtcbiAgaW5wdXQuc2VsZWN0KCk7XG59XG5cbmZ1bmN0aW9uIGZvY3VzRmlsdGVyRmllbGQoKSB7XG4gIGZvY3VzSW5wdXRGaWVsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbHRlclwiKSk7XG59XG5cbmZ1bmN0aW9uIGZvY3VzUmVmTG9va3VwRmllbGQoKSB7XG4gIGZvY3VzSW5wdXRGaWVsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZmxvb2t1cFwiKSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUJvbUNoZWNrYm94KGJvbXJvd2lkLCBjaGVja2JveG51bSkge1xuICBpZiAoIWJvbXJvd2lkIHx8IGNoZWNrYm94bnVtID4gZ2xvYmFsRGF0YS5nZXRDaGVja2JveGVzKCkubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBib21yb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChib21yb3dpZCk7XG4gIHZhciBjaGVja2JveCA9IGJvbXJvdy5jaGlsZE5vZGVzW2NoZWNrYm94bnVtXS5jaGlsZE5vZGVzWzBdO1xuICBjaGVja2JveC5jaGVja2VkID0gIWNoZWNrYm94LmNoZWNrZWQ7XG4gIGNoZWNrYm94LmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgY2hlY2tib3gub25jaGFuZ2UoKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tCb21DaGVja2JveChib21yb3dpZCwgY2hlY2tib3huYW1lKSB7XG4gIHZhciBjaGVja2JveG51bSA9IDA7XG4gIHdoaWxlIChjaGVja2JveG51bSA8IGdsb2JhbERhdGEuZ2V0Q2hlY2tib3hlcygpLmxlbmd0aCAmJlxuICAgIGdsb2JhbERhdGEuZ2V0Q2hlY2tib3hlcygpW2NoZWNrYm94bnVtXS50b0xvd2VyQ2FzZSgpICE9IGNoZWNrYm94bmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2hlY2tib3hudW0rKztcbiAgfVxuICBpZiAoIWJvbXJvd2lkIHx8IGNoZWNrYm94bnVtID49IGdsb2JhbERhdGEuZ2V0Q2hlY2tib3hlcygpLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgYm9tcm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm9tcm93aWQpO1xuICB2YXIgY2hlY2tib3ggPSBib21yb3cuY2hpbGROb2Rlc1tjaGVja2JveG51bSArIDFdLmNoaWxkTm9kZXNbMF07XG4gIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICBjaGVja2JveC5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gIGNoZWNrYm94Lm9uY2hhbmdlKCk7XG59XG5cblxuZnVuY3Rpb24gcmVtb3ZlR3V0dGVyTm9kZShub2RlKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG5vZGUuY2hpbGROb2Rlc1tpXS5jbGFzc0xpc3QgJiZcbiAgICAgIG5vZGUuY2hpbGROb2Rlc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJndXR0ZXJcIikpIHtcbiAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5jaGlsZE5vZGVzW2ldKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjbGVhbkd1dHRlcnMoKSB7XG4gIHJlbW92ZUd1dHRlck5vZGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib3RcIikpO1xuICByZW1vdmVHdXR0ZXJOb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzZGl2XCIpKTtcbn1cblxuZnVuY3Rpb24gc2V0Qm9tQ2hlY2tib3hlcyh2YWx1ZSkge1xuICBnbG9iYWxEYXRhLnNldEJvbUNoZWNrYm94ZXModmFsdWUpO1xuICBnbG9iYWxEYXRhLndyaXRlU3RvcmFnZShcImJvbUNoZWNrYm94ZXNcIiwgdmFsdWUpO1xuICBwb3B1bGF0ZUJvbVRhYmxlKCk7XG59XG5cbmRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uKGUpIHtcbiAgc3dpdGNoIChlLmtleSkge1xuICAgIGNhc2UgXCJuXCI6XG4gICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50eXBlID09IFwidGV4dFwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCkgIT09IG51bGwpIHtcbiAgICAgICAgY2hlY2tCb21DaGVja2JveChnbG9iYWxEYXRhLmdldEN1cnJlbnRIaWdobGlnaHRlZFJvd0lkKCksIFwicGxhY2VkXCIpO1xuICAgICAgICBoaWdobGlnaHROZXh0Um93KCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJBcnJvd1VwXCI6XG4gICAgICBoaWdobGlnaHRQcmV2aW91c1JvdygpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkFycm93RG93blwiOlxuICAgICAgaGlnaGxpZ2h0TmV4dFJvdygpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG4gIGlmIChlLmFsdEtleSkge1xuICAgIHN3aXRjaCAoZS5rZXkpIHtcbiAgICAgIGNhc2UgXCJmXCI6XG4gICAgICAgIGZvY3VzRmlsdGVyRmllbGQoKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyXCI6XG4gICAgICAgIGZvY3VzUmVmTG9va3VwRmllbGQoKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ6XCI6XG4gICAgICAgIGNoYW5nZUJvbUxheW91dChcIkJPTVwiKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ4XCI6XG4gICAgICAgIGNoYW5nZUJvbUxheW91dChcIkxSXCIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImNcIjpcbiAgICAgICAgY2hhbmdlQm9tTGF5b3V0KFwiVEJcIik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidlwiOlxuICAgICAgICBjaGFuZ2VDYW52YXNMYXlvdXQoXCJGXCIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJcIjpcbiAgICAgICAgY2hhbmdlQ2FudmFzTGF5b3V0KFwiRkJcIik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiblwiOlxuICAgICAgICBjaGFuZ2VDYW52YXNMYXlvdXQoXCJCXCIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChlLmtleSA+PSAnMScgJiYgZS5rZXkgPD0gJzknKSB7XG4gICAgICB0b2dnbGVCb21DaGVja2JveChjdXJyZW50SGlnaGxpZ2h0ZWRSb3dJZCwgcGFyc2VJbnQoZS5rZXkpKTtcbiAgICB9XG4gIH1cbn1cblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgZ2xvYmFsRGF0YS5pbml0U3RvcmFnZSgpO1xuICBjbGVhbkd1dHRlcnMoKTtcbiAgcmVuZGVyLmluaXRSZW5kZXIoKTtcbiAgZGJnZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYmdcIik7XG4gIGJvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9tYm9keVwiKTtcbiAgYm9taGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9taGVhZFwiKTtcbiAgZ2xvYmFsRGF0YS5zZXRCb21MYXlvdXQoZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcImJvbWxheW91dFwiKSk7XG4gIGlmICghZ2xvYmFsRGF0YS5nZXRCb21MYXlvdXQoKSkge1xuICAgIGdsb2JhbERhdGEuc2V0Qm9tTGF5b3V0KFwiTFJcIik7XG4gIH1cbiAgZ2xvYmFsRGF0YS5zZXRDYW52YXNMYXlvdXQoZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcImNhbnZhc2xheW91dFwiKSk7XG4gIGlmICghZ2xvYmFsRGF0YS5nZXRDYW52YXNMYXlvdXQoKSkge1xuICAgIGdsb2JhbERhdGEuc2V0Q2FudmFzTGF5b3V0KFwiRkJcIik7XG4gIH1cbiAgZmlsdGVyID0gXCJcIjtcbiAgcmVmbG9va3VwID0gXCJcIjtcbiAgcG9wdWxhdGVNZXRhZGF0YSgpO1xuICBnbG9iYWxEYXRhLnNldEJvbUNoZWNrYm94ZXMoZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcImJvbUNoZWNrYm94ZXNcIikpO1xuICBpZiAoZ2xvYmFsRGF0YS5nZXRCb21DaGVja2JveGVzKCkgPT09IG51bGwpIHtcbiAgICBnbG9iYWxEYXRhLnNldEJvbUNoZWNrYm94ZXMoXCJTb3VyY2VkLFBsYWNlZFwiKTtcbiAgfVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvbUNoZWNrYm94ZXNcIikudmFsdWUgPSBnbG9iYWxEYXRhLmdldEJvbUNoZWNrYm94ZXMoKTtcbiAgaWYgKGdsb2JhbERhdGEucmVhZFN0b3JhZ2UoXCJzaWxrc2NyZWVuVmlzaWJsZVwiKSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWxrc2NyZWVuQ2hlY2tib3hcIikuY2hlY2tlZCA9IGZhbHNlO1xuICAgIHNpbGtzY3JlZW5WaXNpYmxlKGZhbHNlKTtcbiAgfVxuICBpZiAoZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcInJlZHJhd09uRHJhZ1wiKSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcmFnQ2hlY2tib3hcIikuY2hlY2tlZCA9IGZhbHNlO1xuICAgIGdsb2JhbERhdGEuc2V0UmVkcmF3T25EcmFnKGZhbHNlKTtcbiAgfVxuICBpZiAoZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcImRhcmttb2RlXCIpID09PSBcInRydWVcIikge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFya21vZGVDaGVja2JveFwiKS5jaGVja2VkID0gdHJ1ZTtcbiAgICBzZXREYXJrTW9kZSh0cnVlKTtcbiAgfVxuICBpZiAoZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcImhpZ2hsaWdodHBpbjFcIikgPT09IFwidHJ1ZVwiKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWdobGlnaHRwaW4xQ2hlY2tib3hcIikuY2hlY2tlZCA9IHRydWU7XG4gICAgZ2xvYmFsRGF0YS5zZXRIaWdobGlnaHRQaW4xKHRydWUpO1xuICAgIHJlbmRlci5yZWRyYXdDYW52YXMoYWxsY2FudmFzLmZyb250KTtcbiAgICByZW5kZXIucmVkcmF3Q2FudmFzKGFsbGNhbnZhcy5iYWNrKTtcbiAgfVxuICBib2FyZFJvdGF0aW9uID0gZ2xvYmFsRGF0YS5yZWFkU3RvcmFnZShcImJvYXJkUm90YXRpb25cIik7XG4gIGlmIChib2FyZFJvdGF0aW9uID09PSBudWxsKSB7XG4gICAgYm9hcmRSb3RhdGlvbiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgYm9hcmRSb3RhdGlvbiA9IHBhcnNlSW50KGJvYXJkUm90YXRpb24pO1xuICB9XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRSb3RhdGlvblwiKS52YWx1ZSA9IGJvYXJkUm90YXRpb24gLyA1O1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvdGF0aW9uRGVncmVlXCIpLnRleHRDb250ZW50ID0gYm9hcmRSb3RhdGlvbjtcbiAgLy8gVHJpZ2dlcnMgcmVuZGVyXG4gIGNoYW5nZUJvbUxheW91dChnbG9iYWxEYXRhLmdldEJvbUxheW91dCgpKTtcbn1cblxud2luZG93Lm9ucmVzaXplID0gcmVuZGVyLnJlc2l6ZUFsbDtcbndpbmRvdy5tYXRjaE1lZGlhKFwicHJpbnRcIikuYWRkTGlzdGVuZXIocmVuZGVyLnJlc2l6ZUFsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXREYXJrTW9kZSwgc2lsa3NjcmVlblZpc2libGUsIHVwZGF0ZUZpbHRlciwgdXBkYXRlUmVmTG9va3VwLCBjaGFuZ2VCb21MYXlvdXQsIGNoYW5nZUNhbnZhc0xheW91dCwgc2V0Qm9tQ2hlY2tib3hlc1xufSIsIi8qIFBDQiByZW5kZXJpbmcgY29kZSAqL1xuXG52YXIgZ2xvYmFsRGF0YSA9IHJlcXVpcmUoJy4vZ2xvYmFsLmpzJylcblxuZnVuY3Rpb24gZGVnMnJhZChkZWcpIHtcbiAgcmV0dXJuIGRlZyAqIE1hdGguUEkgLyAxODA7XG59XG5cbmZ1bmN0aW9uIGNhbGNGb250UG9pbnQobGluZXBvaW50LCB0ZXh0LCBvZmZzZXR4LCBvZmZzZXR5LCB0aWx0KSB7XG4gIHZhciBwb2ludCA9IFtcbiAgICBsaW5lcG9pbnRbMF0gKiB0ZXh0LndpZHRoICsgb2Zmc2V0eCxcbiAgICBsaW5lcG9pbnRbMV0gKiB0ZXh0LmhlaWdodCArIG9mZnNldHlcbiAgXTtcbiAgLy8gQWRkaW5nIGhhbGYgYSBsaW5lIGhlaWdodCBoZXJlIGlzIHRlY2huaWNhbGx5IGEgYnVnXG4gIC8vIGJ1dCBwY2JuZXcgY3VycmVudGx5IGRvZXMgdGhlIHNhbWUsIHRleHQgaXMgc2xpZ2h0bHkgc2hpZnRlZC5cbiAgcG9pbnRbMF0gLT0gKHBvaW50WzFdICsgdGV4dC5oZWlnaHQgKiAwLjUpICogdGlsdDtcbiAgcmV0dXJuIHBvaW50O1xufVxuXG5mdW5jdGlvbiBkcmF3dGV4dChjdHgsIHRleHQsIGNvbG9yLCBmbGlwKSB7XG4gIGN0eC5zYXZlKCk7XG4gIGN0eC50cmFuc2xhdGUoLi4udGV4dC5wb3MpO1xuICB2YXIgYW5nbGUgPSAtdGV4dC5hbmdsZTtcbiAgaWYgKHRleHQuYXR0ci5pbmNsdWRlcyhcIm1pcnJvcmVkXCIpKSB7XG4gICAgY3R4LnNjYWxlKC0xLCAxKTtcbiAgICBhbmdsZSA9IC1hbmdsZTtcbiAgfVxuICB2YXIgdGlsdCA9IDA7XG4gIGlmICh0ZXh0LmF0dHIuaW5jbHVkZXMoXCJpdGFsaWNcIikpIHtcbiAgICB0aWx0ID0gMC4xMjU7XG4gIH1cbiAgdmFyIGludGVybGluZSA9ICh0ZXh0LmhlaWdodCAqIDEuNSArIHRleHQudGhpY2tuZXNzKSAvIDI7XG4gIHZhciB0eHQgPSB0ZXh0LnRleHQuc3BsaXQoXCJcXG5cIik7XG4gIGN0eC5yb3RhdGUoZGVnMnJhZChhbmdsZSkpO1xuICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICBjdHgubGluZUNhcCA9IFwicm91bmRcIjtcbiAgY3R4LmxpbmVXaWR0aCA9IHRleHQudGhpY2tuZXNzO1xuICBmb3IgKHZhciBpIGluIHR4dCkge1xuICAgIHZhciBvZmZzZXR5ID0gKC0odHh0Lmxlbmd0aCAtIDEpICsgaSAqIDIpICogaW50ZXJsaW5lICsgdGV4dC5oZWlnaHQgLyAyO1xuICAgIHZhciBsaW5lV2lkdGggPSAwO1xuICAgIGZvciAodmFyIGMgb2YgdHh0W2ldKSB7XG4gICAgICBsaW5lV2lkdGggKz0gcGNiZGF0YS5mb250X2RhdGFbY10udyAqIHRleHQud2lkdGg7XG4gICAgfVxuICAgIHZhciBvZmZzZXR4ID0gMDtcbiAgICBzd2l0Y2ggKHRleHQuaG9yaXpfanVzdGlmeSkge1xuICAgICAgY2FzZSAtMTpcbiAgICAgICAgLy8gSnVzdGlmeSBsZWZ0LCBkbyBub3RoaW5nXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAwOlxuICAgICAgICAvLyBKdXN0aWZ5IGNlbnRlclxuICAgICAgICBvZmZzZXR4IC09IGxpbmVXaWR0aCAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICAvLyBKdXN0aWZ5IHJpZ2h0XG4gICAgICAgIG9mZnNldHggLT0gbGluZVdpZHRoO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgZm9yICh2YXIgYyBvZiB0eHRbaV0pIHtcbiAgICAgIGZvciAodmFyIGxpbmUgb2YgcGNiZGF0YS5mb250X2RhdGFbY10ubCkge1xuICAgICAgICAvLyBEcmF3aW5nIGVhY2ggc2VnbWVudCBzZXBhcmF0ZWx5IGluc3RlYWQgb2ZcbiAgICAgICAgLy8gcG9seWxpbmUgYmVjYXVzZSByb3VuZCBsaW5lIGNhcHMgZG9uJ3Qgd29yayBpbiBqb2ludHNcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICBjdHgubW92ZVRvKC4uLmNhbGNGb250UG9pbnQobGluZVtpXSwgdGV4dCwgb2Zmc2V0eCwgb2Zmc2V0eSwgdGlsdCkpO1xuICAgICAgICAgIGN0eC5saW5lVG8oLi4uY2FsY0ZvbnRQb2ludChsaW5lW2kgKyAxXSwgdGV4dCwgb2Zmc2V0eCwgb2Zmc2V0eSwgdGlsdCkpO1xuICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb2Zmc2V0eCArPSBwY2JkYXRhLmZvbnRfZGF0YVtjXS53ICogdGV4dC53aWR0aDtcbiAgICB9XG4gIH1cbiAgY3R4LnJlc3RvcmUoKTtcbn1cblxuZnVuY3Rpb24gZHJhd2VkZ2UoY3R4LCBzY2FsZWZhY3RvciwgZWRnZSwgY29sb3IpIHtcbiAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gIGN0eC5saW5lV2lkdGggPSBNYXRoLm1heCgxIC8gc2NhbGVmYWN0b3IsIGVkZ2Uud2lkdGgpO1xuICBjdHgubGluZUNhcCA9IFwicm91bmRcIjtcbiAgaWYgKGVkZ2UudHlwZSA9PSBcInNlZ21lbnRcIikge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKC4uLmVkZ2Uuc3RhcnQpO1xuICAgIGN0eC5saW5lVG8oLi4uZWRnZS5lbmQpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuICBpZiAoZWRnZS50eXBlID09IFwiYXJjXCIpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhcbiAgICAgIC4uLmVkZ2Uuc3RhcnQsXG4gICAgICBlZGdlLnJhZGl1cyxcbiAgICAgIGRlZzJyYWQoZWRnZS5zdGFydGFuZ2xlKSxcbiAgICAgIGRlZzJyYWQoZWRnZS5lbmRhbmdsZSkpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuICBpZiAoZWRnZS50eXBlID09IFwiY2lyY2xlXCIpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhcbiAgICAgIC4uLmVkZ2Uuc3RhcnQsXG4gICAgICBlZGdlLnJhZGl1cyxcbiAgICAgIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdSb3VuZFJlY3QoY3R4LCBjb2xvciwgc2l6ZSwgcmFkaXVzLCBjdHhtZXRob2QpIHtcbiAgY3R4LmJlZ2luUGF0aCgpO1xuICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgdmFyIHggPSBzaXplWzBdICogLTAuNTtcbiAgdmFyIHkgPSBzaXplWzFdICogLTAuNTtcbiAgdmFyIHdpZHRoID0gc2l6ZVswXTtcbiAgdmFyIGhlaWdodCA9IHNpemVbMV07XG4gIGN0eC5tb3ZlVG8oeCwgMCk7XG4gIGN0eC5hcmNUbyh4LCB5ICsgaGVpZ2h0LCB4ICsgd2lkdGgsIHkgKyBoZWlnaHQsIHJhZGl1cyk7XG4gIGN0eC5hcmNUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQsIHggKyB3aWR0aCwgeSwgcmFkaXVzKTtcbiAgY3R4LmFyY1RvKHggKyB3aWR0aCwgeSwgeCwgeSwgcmFkaXVzKTtcbiAgY3R4LmFyY1RvKHgsIHksIHgsIHkgKyBoZWlnaHQsIHJhZGl1cyk7XG4gIGN0eC5jbG9zZVBhdGgoKTtcbiAgY3R4bWV0aG9kKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdPYmxvbmcoY3R4LCBjb2xvciwgc2l6ZSwgY3R4bWV0aG9kKSB7XG4gIGRyYXdSb3VuZFJlY3QoY3R4LCBjb2xvciwgc2l6ZSwgTWF0aC5taW4oc2l6ZVswXSwgc2l6ZVsxXSkgLyAyLCBjdHhtZXRob2QpO1xufVxuXG5mdW5jdGlvbiBkcmF3UG9seWdvbnMoY3R4LCBjb2xvciwgcG9seWdvbnMsIGN0eG1ldGhvZCkge1xuICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gIGZvciAodmFyIHBvbHlnb24gb2YgcG9seWdvbnMpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgZm9yICh2YXIgdmVydGV4IG9mIHBvbHlnb24pIHtcbiAgICAgIGN0eC5saW5lVG8oLi4udmVydGV4KVxuICAgIH1cbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4bWV0aG9kKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhd1BvbHlnb25TaGFwZShjdHgsIHNoYXBlLCBjb2xvcikge1xuICBjdHguc2F2ZSgpO1xuICBjdHgudHJhbnNsYXRlKC4uLnNoYXBlLnBvcyk7XG4gIGN0eC5yb3RhdGUoZGVnMnJhZCgtc2hhcGUuYW5nbGUpKTtcbiAgZHJhd1BvbHlnb25zKGN0eCwgY29sb3IsIHNoYXBlLnBvbHlnb25zLCBjdHguZmlsbC5iaW5kKGN0eCkpO1xuICBjdHgucmVzdG9yZSgpO1xufVxuXG5mdW5jdGlvbiBkcmF3RHJhd2luZyhjdHgsIGxheWVyLCBzY2FsZWZhY3RvciwgZHJhd2luZywgY29sb3IpIHtcbiAgaWYgKFtcInNlZ21lbnRcIiwgXCJhcmNcIiwgXCJjaXJjbGVcIl0uaW5jbHVkZXMoZHJhd2luZy50eXBlKSkge1xuICAgIGRyYXdlZGdlKGN0eCwgc2NhbGVmYWN0b3IsIGRyYXdpbmcsIGNvbG9yKTtcbiAgfSBlbHNlIGlmIChkcmF3aW5nLnR5cGUgPT0gXCJwb2x5Z29uXCIpIHtcbiAgICBkcmF3UG9seWdvblNoYXBlKGN0eCwgZHJhd2luZywgY29sb3IpO1xuICB9IGVsc2Uge1xuICAgIGRyYXd0ZXh0KGN0eCwgZHJhd2luZywgY29sb3IsIGxheWVyID09IFwiQlwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkcmF3Q2lyY2xlKGN0eCwgcmFkaXVzLCBjdHhtZXRob2QpIHtcbiAgY3R4LmJlZ2luUGF0aCgpO1xuICBjdHguYXJjKDAsIDAsIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICBjdHguY2xvc2VQYXRoKCk7XG4gIGN0eG1ldGhvZCgpO1xufVxuXG5mdW5jdGlvbiBkcmF3UGFkKGN0eCwgcGFkLCBjb2xvciwgb3V0bGluZSkge1xuICBjdHguc2F2ZSgpO1xuICBjdHgudHJhbnNsYXRlKC4uLnBhZC5wb3MpO1xuICBjdHgucm90YXRlKGRlZzJyYWQocGFkLmFuZ2xlKSk7XG4gIGlmIChwYWQub2Zmc2V0KSB7XG4gICAgY3R4LnRyYW5zbGF0ZSguLi5wYWQub2Zmc2V0KTtcbiAgfVxuICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICB2YXIgY3R4bWV0aG9kID0gb3V0bGluZSA/IGN0eC5zdHJva2UuYmluZChjdHgpIDogY3R4LmZpbGwuYmluZChjdHgpO1xuICBpZiAocGFkLnNoYXBlID09IFwicmVjdFwiKSB7XG4gICAgdmFyIHJlY3QgPSBbLi4ucGFkLnNpemUubWFwKGMgPT4gLWMgKiAwLjUpLCAuLi5wYWQuc2l6ZV07XG4gICAgaWYgKG91dGxpbmUpIHtcbiAgICAgIGN0eC5zdHJva2VSZWN0KC4uLnJlY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHguZmlsbFJlY3QoLi4ucmVjdCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHBhZC5zaGFwZSA9PSBcIm92YWxcIikge1xuICAgIGRyYXdPYmxvbmcoY3R4LCBjb2xvciwgcGFkLnNpemUsIGN0eG1ldGhvZCk7XG4gIH0gZWxzZSBpZiAocGFkLnNoYXBlID09IFwiY2lyY2xlXCIpIHtcbiAgICBkcmF3Q2lyY2xlKGN0eCwgcGFkLnNpemVbMF0gLyAyLCBjdHhtZXRob2QpO1xuICB9IGVsc2UgaWYgKHBhZC5zaGFwZSA9PSBcInJvdW5kcmVjdFwiKSB7XG4gICAgZHJhd1JvdW5kUmVjdChjdHgsIGNvbG9yLCBwYWQuc2l6ZSwgcGFkLnJhZGl1cywgY3R4bWV0aG9kKTtcbiAgfSBlbHNlIGlmIChwYWQuc2hhcGUgPT0gXCJjdXN0b21cIikge1xuICAgIGRyYXdQb2x5Z29ucyhjdHgsIGNvbG9yLCBwYWQucG9seWdvbnMsIGN0eG1ldGhvZCk7XG4gIH1cbiAgaWYgKHBhZC50eXBlID09IFwidGhcIiAmJiAhb3V0bGluZSkge1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiNDQ0NDQ0NcIjtcbiAgICBpZiAocGFkLmRyaWxsc2hhcGUgPT0gXCJvYmxvbmdcIikge1xuICAgICAgZHJhd09ibG9uZyhjdHgsIFwiI0NDQ0NDQ1wiLCBwYWQuZHJpbGxzaXplLCBjdHhtZXRob2QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmF3Q2lyY2xlKGN0eCwgcGFkLmRyaWxsc2l6ZVswXSAvIDIsIGN0eG1ldGhvZCk7XG4gICAgfVxuICB9XG4gIGN0eC5yZXN0b3JlKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdNb2R1bGUoY3R4LCBsYXllciwgc2NhbGVmYWN0b3IsIG1vZHVsZSwgcGFkY29sb3IsIG91dGxpbmVjb2xvciwgaGlnaGxpZ2h0KSB7XG4gIGlmIChoaWdobGlnaHQpIHtcbiAgICAvLyBkcmF3IGJvdW5kaW5nIGJveFxuICAgIGlmIChtb2R1bGUubGF5ZXIgPT0gbGF5ZXIpIHtcbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjI7XG4gICAgICBjdHgudHJhbnNsYXRlKC4uLm1vZHVsZS5iYm94LnBvcyk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gcGFkY29sb3I7XG4gICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgIDAsIDAsXG4gICAgICAgIC4uLm1vZHVsZS5iYm94LnNpemUpO1xuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHBhZGNvbG9yO1xuICAgICAgY3R4LnN0cm9rZVJlY3QoXG4gICAgICAgIDAsIDAsXG4gICAgICAgIC4uLm1vZHVsZS5iYm94LnNpemUpO1xuICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG4gIH1cbiAgLy8gZHJhdyBkcmF3aW5nc1xuICBmb3IgKHZhciBkcmF3aW5nIG9mIG1vZHVsZS5kcmF3aW5ncykge1xuICAgIGlmIChkcmF3aW5nLmxheWVyID09IGxheWVyKSB7XG4gICAgICBkcmF3RHJhd2luZyhjdHgsIGxheWVyLCBzY2FsZWZhY3RvciwgZHJhd2luZy5kcmF3aW5nLCBwYWRjb2xvcik7XG4gICAgfVxuICB9XG4gIC8vIGRyYXcgcGFkc1xuICBmb3IgKHZhciBwYWQgb2YgbW9kdWxlLnBhZHMpIHtcbiAgICBpZiAocGFkLmxheWVycy5pbmNsdWRlcyhsYXllcikpIHtcbiAgICAgIGRyYXdQYWQoY3R4LCBwYWQsIHBhZGNvbG9yLCBmYWxzZSk7XG4gICAgICBcbiAgICAgIFxuICAgICAgaWYgKHBhZC5waW4xICYmIGdsb2JhbERhdGEuZ2V0SGlnaGxpZ2h0UGluMSgpKSBcbiAgICAgIHtcbiAgICAgICAgZHJhd1BhZChjdHgsIHBhZCwgb3V0bGluZWNvbG9yLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhd0VkZ2VzKGNhbnZhcywgc2NhbGVmYWN0b3IpIHtcbiAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gIHZhciBlZGdlY29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRvcG1vc3RkaXYpLmdldFByb3BlcnR5VmFsdWUoJy0tcGNiLWVkZ2UtY29sb3InKTtcbiAgZm9yICh2YXIgZWRnZSBvZiBwY2JkYXRhLmVkZ2VzKSB7XG4gICAgZHJhd2VkZ2UoY3R4LCBzY2FsZWZhY3RvciwgZWRnZSwgZWRnZWNvbG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkcmF3TW9kdWxlcyhjYW52YXMsIGxheWVyLCBzY2FsZWZhY3RvciwgaGlnaGxpZ2h0ZWRSZWZzKSB7XG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBjdHgubGluZVdpZHRoID0gMyAvIHNjYWxlZmFjdG9yO1xuICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRvcG1vc3RkaXYpO1xuICB2YXIgcGFkY29sb3IgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCctLXBhZC1jb2xvcicpO1xuICB2YXIgb3V0bGluZWNvbG9yID0gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnLS1waW4xLW91dGxpbmUtY29sb3InKTtcbiAgaWYgKGhpZ2hsaWdodGVkUmVmcy5sZW5ndGggPiAwKSB7XG4gICAgcGFkY29sb3IgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCctLXBhZC1jb2xvci1oaWdobGlnaHQnKTtcbiAgICBvdXRsaW5lY29sb3IgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCctLXBpbjEtb3V0bGluZS1jb2xvci1oaWdobGlnaHQnKTtcbiAgfVxuICBmb3IgKHZhciBpIGluIHBjYmRhdGEubW9kdWxlcykge1xuICAgIHZhciBtb2QgPSBwY2JkYXRhLm1vZHVsZXNbaV07XG4gICAgdmFyIGhpZ2hsaWdodCA9IGhpZ2hsaWdodGVkUmVmcy5pbmNsdWRlcyhtb2QucmVmKTtcbiAgICBpZiAoaGlnaGxpZ2h0ZWRSZWZzLmxlbmd0aCA9PSAwIHx8IGhpZ2hsaWdodCkge1xuICAgICAgZHJhd01vZHVsZShjdHgsIGxheWVyLCBzY2FsZWZhY3RvciwgbW9kLCBwYWRjb2xvciwgb3V0bGluZWNvbG9yLCBoaWdobGlnaHQpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkcmF3U2lsa3NjcmVlbihjYW52YXMsIGxheWVyLCBzY2FsZWZhY3RvcilcbntcbiAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gIGZvciAodmFyIGQgb2YgcGNiZGF0YS5zaWxrc2NyZWVuW2xheWVyXSlcbiAge1xuICAgIGlmIChbXCJzZWdtZW50XCIsIFwiYXJjXCIsIFwiY2lyY2xlXCJdLmluY2x1ZGVzKGQudHlwZSkpXG4gICAge1xuICAgICAgZHJhd2VkZ2UoY3R4LCBzY2FsZWZhY3RvciwgZCwgXCIjYWE0XCIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChkLnR5cGUgPT0gXCJwb2x5Z29uXCIpXG4gICAge1xuICAgICAgZHJhd1BvbHlnb25TaGFwZShjdHgsIGQsIFwiIzRhYVwiKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGRyYXd0ZXh0KGN0eCwgZCwgXCIjNGFhXCIsIGxheWVyID09IFwiQlwiKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJDYW52YXMoY2FudmFzKSB7XG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBjdHguc2F2ZSgpO1xuICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIGN0eC5yZXN0b3JlKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdIaWdobGlnaHRzT25MYXllcihjYW52YXNkaWN0KSB7XG4gIGNsZWFyQ2FudmFzKGNhbnZhc2RpY3QuaGlnaGxpZ2h0KTtcbiAgZHJhd01vZHVsZXMoY2FudmFzZGljdC5oaWdobGlnaHQsIGNhbnZhc2RpY3QubGF5ZXIsXG4gICAgY2FudmFzZGljdC50cmFuc2Zvcm0ucywgZ2xvYmFsRGF0YS5nZXRIaWdobGlnaHRlZFJlZnMoKSk7XG59XG5cbmZ1bmN0aW9uIGRyYXdIaWdobGlnaHRzKCkge1xuICBkcmF3SGlnaGxpZ2h0c09uTGF5ZXIoYWxsY2FudmFzLmZyb250KTtcbiAgZHJhd0hpZ2hsaWdodHNPbkxheWVyKGFsbGNhbnZhcy5iYWNrKTtcbn1cblxuZnVuY3Rpb24gZHJhd0JhY2tncm91bmQoY2FudmFzZGljdCkge1xuICBjbGVhckNhbnZhcyhjYW52YXNkaWN0LmJnKTtcbiAgY2xlYXJDYW52YXMoY2FudmFzZGljdC5zaWxrKTtcbiAgZHJhd0VkZ2VzKGNhbnZhc2RpY3QuYmcsIGNhbnZhc2RpY3QudHJhbnNmb3JtLnMpO1xuICBkcmF3TW9kdWxlcyhjYW52YXNkaWN0LmJnLCBjYW52YXNkaWN0LmxheWVyLCBjYW52YXNkaWN0LnRyYW5zZm9ybS5zLCBbXSk7XG4gIGRyYXdTaWxrc2NyZWVuKGNhbnZhc2RpY3Quc2lsaywgY2FudmFzZGljdC5sYXllciwgY2FudmFzZGljdC50cmFuc2Zvcm0ucyk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVDYW52YXMoY2FudmFzLCBmbGlwLCB0cmFuc2Zvcm0pIHtcbiAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gIGN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gIHZhciBmb250c2l6ZSA9IDEuNTU7XG4gIGN0eC5zY2FsZSh0cmFuc2Zvcm0uem9vbSwgdHJhbnNmb3JtLnpvb20pO1xuICBjdHgudHJhbnNsYXRlKHRyYW5zZm9ybS5wYW54LCB0cmFuc2Zvcm0ucGFueSk7XG4gIGlmIChmbGlwKSB7XG4gICAgY3R4LnNjYWxlKC0xLCAxKTtcbiAgfVxuICBjdHgudHJhbnNsYXRlKHRyYW5zZm9ybS54LCB0cmFuc2Zvcm0ueSk7XG4gIGN0eC5yb3RhdGUoZGVnMnJhZChib2FyZFJvdGF0aW9uKSk7XG4gIGN0eC5zY2FsZSh0cmFuc2Zvcm0ucywgdHJhbnNmb3JtLnMpO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlTGF5ZXIoY2FudmFzZGljdCkge1xuICB2YXIgZmxpcCA9IChjYW52YXNkaWN0LmxheWVyID09IFwiQlwiKTtcbiAgZm9yICh2YXIgYyBvZiBbXCJiZ1wiLCBcInNpbGtcIiwgXCJoaWdobGlnaHRcIl0pIHtcbiAgICBwcmVwYXJlQ2FudmFzKGNhbnZhc2RpY3RbY10sIGZsaXAsIGNhbnZhc2RpY3QudHJhbnNmb3JtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByb3RhdGVWZWN0b3IodiwgYW5nbGUpIHtcbiAgYW5nbGUgPSBkZWcycmFkKGFuZ2xlKTtcbiAgcmV0dXJuIFtcbiAgICB2WzBdICogTWF0aC5jb3MoYW5nbGUpIC0gdlsxXSAqIE1hdGguc2luKGFuZ2xlKSxcbiAgICB2WzBdICogTWF0aC5zaW4oYW5nbGUpICsgdlsxXSAqIE1hdGguY29zKGFuZ2xlKVxuICBdO1xufVxuXG5mdW5jdGlvbiBhcHBseVJvdGF0aW9uKGJib3gpIHtcbiAgdmFyIGNvcm5lcnMgPSBbXG4gICAgW2Jib3gubWlueCwgYmJveC5taW55XSxcbiAgICBbYmJveC5taW54LCBiYm94Lm1heHldLFxuICAgIFtiYm94Lm1heHgsIGJib3gubWlueV0sXG4gICAgW2Jib3gubWF4eCwgYmJveC5tYXh5XSxcbiAgXTtcbiAgY29ybmVycyA9IGNvcm5lcnMubWFwKCh2KSA9PiByb3RhdGVWZWN0b3IodiwgYm9hcmRSb3RhdGlvbikpO1xuICByZXR1cm4ge1xuICAgIG1pbng6IGNvcm5lcnMucmVkdWNlKChhLCB2KSA9PiBNYXRoLm1pbihhLCB2WzBdKSwgSW5maW5pdHkpLFxuICAgIG1pbnk6IGNvcm5lcnMucmVkdWNlKChhLCB2KSA9PiBNYXRoLm1pbihhLCB2WzFdKSwgSW5maW5pdHkpLFxuICAgIG1heHg6IGNvcm5lcnMucmVkdWNlKChhLCB2KSA9PiBNYXRoLm1heChhLCB2WzBdKSwgLUluZmluaXR5KSxcbiAgICBtYXh5OiBjb3JuZXJzLnJlZHVjZSgoYSwgdikgPT4gTWF0aC5tYXgoYSwgdlsxXSksIC1JbmZpbml0eSksXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVjYWxjTGF5ZXJTY2FsZShjYW52YXNkaWN0KSB7XG4gIHZhciBjYW52YXNkaXZpZCA9IHtcbiAgICBcIkZcIjogXCJmcm9udGNhbnZhc1wiLFxuICAgIFwiQlwiOiBcImJhY2tjYW52YXNcIlxuICB9IFtjYW52YXNkaWN0LmxheWVyXTtcbiAgdmFyIHdpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzZGl2aWQpLmNsaWVudFdpZHRoICogMjtcbiAgdmFyIGhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc2RpdmlkKS5jbGllbnRIZWlnaHQgKiAyO1xuICB2YXIgYmJveCA9IGFwcGx5Um90YXRpb24ocGNiZGF0YS5lZGdlc19iYm94KTtcbiAgdmFyIHNjYWxlZmFjdG9yID0gMC45OCAqIE1hdGgubWluKFxuICAgIHdpZHRoIC8gKGJib3gubWF4eCAtIGJib3gubWlueCksXG4gICAgaGVpZ2h0IC8gKGJib3gubWF4eSAtIGJib3gubWlueSlcbiAgKTtcbiAgaWYgKHNjYWxlZmFjdG9yIDwgMC4xKSB7XG4gICAgc2NhbGVmYWN0b3IgPSAxO1xuICB9XG4gIGNhbnZhc2RpY3QudHJhbnNmb3JtLnMgPSBzY2FsZWZhY3RvcjtcbiAgdmFyIGZsaXAgPSAoY2FudmFzZGljdC5sYXllciA9PSBcIkJcIik7XG4gIGlmIChmbGlwKSB7XG4gICAgY2FudmFzZGljdC50cmFuc2Zvcm0ueCA9IC0oKGJib3gubWF4eCArIGJib3gubWlueCkgKiBzY2FsZWZhY3RvciArIHdpZHRoKSAqIDAuNTtcbiAgfSBlbHNlIHtcbiAgICBjYW52YXNkaWN0LnRyYW5zZm9ybS54ID0gLSgoYmJveC5tYXh4ICsgYmJveC5taW54KSAqIHNjYWxlZmFjdG9yIC0gd2lkdGgpICogMC41O1xuICB9XG4gIGNhbnZhc2RpY3QudHJhbnNmb3JtLnkgPSAtKChiYm94Lm1heHkgKyBiYm94Lm1pbnkpICogc2NhbGVmYWN0b3IgLSBoZWlnaHQpICogMC41O1xuICBmb3IgKHZhciBjIG9mIFtcImJnXCIsIFwic2lsa1wiLCBcImhpZ2hsaWdodFwiXSkge1xuICAgIGNhbnZhcyA9IGNhbnZhc2RpY3RbY107XG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSAod2lkdGggLyAyKSArIFwicHhcIjtcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gKGhlaWdodCAvIDIpICsgXCJweFwiO1xuICB9XG4gIGNvbnNvbGUubG9nKFwiU2NhbGUgZmFjdG9yIFwiICsgY2FudmFzZGl2aWQgKyBcIjogXCIsIGNhbnZhc2RpY3QudHJhbnNmb3JtKTtcbn1cblxuZnVuY3Rpb24gcmVkcmF3Q2FudmFzKGxheWVyZGljdCkge1xuICBwcmVwYXJlTGF5ZXIobGF5ZXJkaWN0KTtcbiAgZHJhd0JhY2tncm91bmQobGF5ZXJkaWN0KTtcbiAgZHJhd0hpZ2hsaWdodHNPbkxheWVyKGxheWVyZGljdCk7XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZUNhbnZhcyhsYXllcmRpY3QpIHtcbiAgcmVjYWxjTGF5ZXJTY2FsZShsYXllcmRpY3QpO1xuICByZWRyYXdDYW52YXMobGF5ZXJkaWN0KTtcbn1cblxuZnVuY3Rpb24gcmVzaXplQWxsKCkge1xuICByZXNpemVDYW52YXMoYWxsY2FudmFzLmZyb250KTtcbiAgcmVzaXplQ2FudmFzKGFsbGNhbnZhcy5iYWNrKTtcbn1cblxuZnVuY3Rpb24gYmJveFNjYW4obGF5ZXIsIHgsIHkpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBpIGluIHBjYmRhdGEubW9kdWxlcykge1xuICAgIHZhciBtb2R1bGUgPSBwY2JkYXRhLm1vZHVsZXNbaV07XG4gICAgaWYgKG1vZHVsZS5sYXllciA9PSBsYXllcikge1xuICAgICAgdmFyIGIgPSBtb2R1bGUuYmJveDtcbiAgICAgIGlmIChiLnBvc1swXSA8PSB4ICYmIGIucG9zWzBdICsgYi5zaXplWzBdID49IHggJiZcbiAgICAgICAgYi5wb3NbMV0gPD0geSAmJiBiLnBvc1sxXSArIGIuc2l6ZVsxXSA+PSB5KSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKG1vZHVsZS5yZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZSwgbGF5ZXJkaWN0KSB7XG4gIGlmIChlLndoaWNoICE9IDEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlc3RhcnR4ID0gZS5vZmZzZXRYO1xuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlc3RhcnR5ID0gZS5vZmZzZXRZO1xuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlZG93bnggPSBlLm9mZnNldFg7XG4gIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3dueSA9IGUub2Zmc2V0WTtcbiAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZWRvd24gPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVNb3VzZUNsaWNrKGUsIGxheWVyZGljdCkge1xuICB2YXIgeCA9IGUub2Zmc2V0WDtcbiAgdmFyIHkgPSBlLm9mZnNldFk7XG4gIHZhciB0ID0gbGF5ZXJkaWN0LnRyYW5zZm9ybTtcbiAgaWYgKGxheWVyZGljdC5sYXllciA9PSBcIkJcIikge1xuICAgIHggPSAoMiAqIHggLyB0Lnpvb20gLSB0LnBhbnggKyB0LngpIC8gLXQucztcbiAgfSBlbHNlIHtcbiAgICB4ID0gKDIgKiB4IC8gdC56b29tIC0gdC5wYW54IC0gdC54KSAvIHQucztcbiAgfVxuICB5ID0gKDIgKiB5IC8gdC56b29tIC0gdC55IC0gdC5wYW55KSAvIHQucztcbiAgdmFyIHYgPSByb3RhdGVWZWN0b3IoW3gsIHldLCAtYm9hcmRSb3RhdGlvbik7XG4gIHZhciByZWZsaXN0ID0gYmJveFNjYW4obGF5ZXJkaWN0LmxheWVyLCB2WzBdLCB2WzFdKTtcbiAgaWYgKHJlZmxpc3QubGVuZ3RoID4gMCkge1xuICAgIG1vZHVsZXNDbGlja2VkKHJlZmxpc3QpO1xuICAgIGRyYXdIaWdobGlnaHRzKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlTW91c2VVcChlLCBsYXllcmRpY3QpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBpZiAoZS53aGljaCA9PSAxICYmXG4gICAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZWRvd24gJiZcbiAgICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlZG93bnggPT0gZS5vZmZzZXRYICYmXG4gICAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZWRvd255ID09IGUub2Zmc2V0WSkge1xuICAgIC8vIFRoaXMgaXMganVzdCBhIGNsaWNrXG4gICAgaGFuZGxlTW91c2VDbGljayhlLCBsYXllcmRpY3QpO1xuICAgIGxheWVyZGljdC50cmFuc2Zvcm0ubW91c2Vkb3duID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlLndoaWNoID09IDMpIHtcbiAgICAvLyBSZXNldCBwYW4gYW5kIHpvb20gb24gcmlnaHQgY2xpY2suXG4gICAgbGF5ZXJkaWN0LnRyYW5zZm9ybS5wYW54ID0gMDtcbiAgICBsYXllcmRpY3QudHJhbnNmb3JtLnBhbnkgPSAwO1xuICAgIGxheWVyZGljdC50cmFuc2Zvcm0uem9vbSA9IDE7XG4gICAgcmVkcmF3Q2FudmFzKGxheWVyZGljdCk7XG4gIH0gZWxzZSBpZiAoIWdsb2JhbERhdGEuZ2V0UmVkcmF3T25EcmFnKCkpIHtcbiAgICByZWRyYXdDYW52YXMobGF5ZXJkaWN0KTtcbiAgfVxuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlZG93biA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmUoZSwgbGF5ZXJkaWN0KSB7XG4gIGlmICghbGF5ZXJkaWN0LnRyYW5zZm9ybS5tb3VzZWRvd24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB2YXIgZHggPSBlLm9mZnNldFggLSBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlc3RhcnR4O1xuICB2YXIgZHkgPSBlLm9mZnNldFkgLSBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlc3RhcnR5O1xuICBsYXllcmRpY3QudHJhbnNmb3JtLnBhbnggKz0gMiAqIGR4IC8gbGF5ZXJkaWN0LnRyYW5zZm9ybS56b29tO1xuICBsYXllcmRpY3QudHJhbnNmb3JtLnBhbnkgKz0gMiAqIGR5IC8gbGF5ZXJkaWN0LnRyYW5zZm9ybS56b29tO1xuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlc3RhcnR4ID0gZS5vZmZzZXRYO1xuICBsYXllcmRpY3QudHJhbnNmb3JtLm1vdXNlc3RhcnR5ID0gZS5vZmZzZXRZO1xuICBpZiAoZ2xvYmFsRGF0YS5nZXRSZWRyYXdPbkRyYWcoKSkge1xuICAgIHJlZHJhd0NhbnZhcyhsYXllcmRpY3QpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1vdXNlV2hlZWwoZSwgbGF5ZXJkaWN0KSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgdmFyIHQgPSBsYXllcmRpY3QudHJhbnNmb3JtO1xuICB2YXIgd2hlZWxkZWx0YSA9IGUuZGVsdGFZO1xuICBpZiAoZS5kZWx0YU1vZGUgPT0gMSkge1xuICAgIC8vIEZGIG9ubHksIHNjcm9sbCBieSBsaW5lc1xuICAgIHdoZWVsZGVsdGEgKj0gMzA7XG4gIH0gZWxzZSBpZiAoZS5kZWx0YU1vZGUgPT0gMikge1xuICAgIHdoZWVsZGVsdGEgKj0gMzAwO1xuICB9XG4gIHZhciBtID0gTWF0aC5wb3coMS4xLCAtd2hlZWxkZWx0YSAvIDQwKTtcbiAgLy8gTGltaXQgYW1vdW50IG9mIHpvb20gcGVyIHRpY2suXG4gIGlmIChtID4gMikge1xuICAgIG0gPSAyO1xuICB9IGVsc2UgaWYgKG0gPCAwLjUpIHtcbiAgICBtID0gMC41O1xuICB9XG4gIHQuem9vbSAqPSBtO1xuICB2YXIgem9vbWQgPSAoMSAtIG0pIC8gdC56b29tO1xuICB0LnBhbnggKz0gMiAqIGUub2Zmc2V0WCAqIHpvb21kO1xuICB0LnBhbnkgKz0gMiAqIGUub2Zmc2V0WSAqIHpvb21kO1xuICByZWRyYXdDYW52YXMobGF5ZXJkaWN0KTtcbiAgY29uc29sZS5sb2cobGF5ZXJkaWN0LnRyYW5zZm9ybS56b29tKTtcbn1cblxuZnVuY3Rpb24gYWRkTW91c2VIYW5kbGVycyhkaXYsIGxheWVyZGljdCkge1xuICBkaXYub25tb3VzZWRvd24gPSBmdW5jdGlvbihlKSB7XG4gICAgaGFuZGxlTW91c2VEb3duKGUsIGxheWVyZGljdCk7XG4gIH07XG4gIGRpdi5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICBoYW5kbGVNb3VzZU1vdmUoZSwgbGF5ZXJkaWN0KTtcbiAgfTtcbiAgZGl2Lm9ubW91c2V1cCA9IGZ1bmN0aW9uKGUpIHtcbiAgICBoYW5kbGVNb3VzZVVwKGUsIGxheWVyZGljdCk7XG4gIH07XG4gIGRpdi5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oZSkge1xuICAgIGhhbmRsZU1vdXNlVXAoZSwgbGF5ZXJkaWN0KTtcbiAgfVxuICBkaXYub253aGVlbCA9IGZ1bmN0aW9uKGUpIHtcbiAgICBoYW5kbGVNb3VzZVdoZWVsKGUsIGxheWVyZGljdCk7XG4gIH1cbiAgZm9yICh2YXIgZWxlbWVudCBvZiBbZGl2LCBsYXllcmRpY3QuYmcsIGxheWVyZGljdC5zaWxrLCBsYXllcmRpY3QuaGlnaGxpZ2h0XSkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0Qm9hcmRSb3RhdGlvbih2YWx1ZSkge1xuICBib2FyZFJvdGF0aW9uID0gdmFsdWUgKiA1O1xuICBnbG9iYWxEYXRhLndyaXRlU3RvcmFnZShcImJvYXJkUm90YXRpb25cIiwgYm9hcmRSb3RhdGlvbik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm90YXRpb25EZWdyZWVcIikudGV4dENvbnRlbnQgPSBib2FyZFJvdGF0aW9uO1xuICByZXNpemVBbGwoKTtcbn1cblxuZnVuY3Rpb24gaW5pdFJlbmRlcigpIHtcbiAgYWxsY2FudmFzID0ge1xuICAgIGZyb250OiB7XG4gICAgICB0cmFuc2Zvcm06IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgczogMSxcbiAgICAgICAgcGFueDogMCxcbiAgICAgICAgcGFueTogMCxcbiAgICAgICAgem9vbTogMSxcbiAgICAgICAgbW91c2VzdGFydHg6IDAsXG4gICAgICAgIG1vdXNlc3RhcnR5OiAwLFxuICAgICAgICBtb3VzZWRvd246IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGJnOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkZfYmdcIiksXG4gICAgICBzaWxrOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkZfc2xrXCIpLFxuICAgICAgaGlnaGxpZ2h0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkZfaGxcIiksXG4gICAgICBsYXllcjogXCJGXCIsXG4gICAgfSxcbiAgICBiYWNrOiB7XG4gICAgICB0cmFuc2Zvcm06IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgczogMSxcbiAgICAgICAgcGFueDogMCxcbiAgICAgICAgcGFueTogMCxcbiAgICAgICAgem9vbTogMSxcbiAgICAgICAgbW91c2VzdGFydHg6IDAsXG4gICAgICAgIG1vdXNlc3RhcnR5OiAwLFxuICAgICAgICBtb3VzZWRvd246IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGJnOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkJfYmdcIiksXG4gICAgICBzaWxrOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkJfc2xrXCIpLFxuICAgICAgaGlnaGxpZ2h0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkJfaGxcIiksXG4gICAgICBsYXllcjogXCJCXCIsXG4gICAgfVxuICB9O1xuICBhZGRNb3VzZUhhbmRsZXJzKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnJvbnRjYW52YXNcIiksIGFsbGNhbnZhcy5mcm9udCk7XG4gIGFkZE1vdXNlSGFuZGxlcnMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrY2FudmFzXCIpLCBhbGxjYW52YXMuYmFjayk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZXNpemVBbGwsIGluaXRSZW5kZXIsIHJlZHJhd0NhbnZhcywgZHJhd0hpZ2hsaWdodHMsXG4gIHNldEJvYXJkUm90YXRpb25cbn07IiwiLypcbiAgU3BsaXQuanMgLSB2MS4zLjVcbiAgTUlUIExpY2Vuc2VcbiAgaHR0cHM6Ly9naXRodWIuY29tL25hdGhhbmNhaGlsbC9TcGxpdC5qc1xuKi9cbiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOmUuU3BsaXQ9dCgpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9d2luZG93LHQ9ZS5kb2N1bWVudCxuPVwiYWRkRXZlbnRMaXN0ZW5lclwiLGk9XCJyZW1vdmVFdmVudExpc3RlbmVyXCIscj1cImdldEJvdW5kaW5nQ2xpZW50UmVjdFwiLHM9ZnVuY3Rpb24oKXtyZXR1cm4hMX0sbz1lLmF0dGFjaEV2ZW50JiYhZVtuXSxhPVtcIlwiLFwiLXdlYmtpdC1cIixcIi1tb3otXCIsXCItby1cIl0uZmlsdGVyKGZ1bmN0aW9uKGUpe3ZhciBuPXQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gbi5zdHlsZS5jc3NUZXh0PVwid2lkdGg6XCIrZStcImNhbGMoOXB4KVwiLCEhbi5zdHlsZS5sZW5ndGh9KS5zaGlmdCgpK1wiY2FsY1wiLGw9ZnVuY3Rpb24oZSl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGV8fGUgaW5zdGFuY2VvZiBTdHJpbmc/dC5xdWVyeVNlbGVjdG9yKGUpOmV9O3JldHVybiBmdW5jdGlvbih1LGMpe2Z1bmN0aW9uIHooZSx0LG4pe3ZhciBpPUEoeSx0LG4pO09iamVjdC5rZXlzKGkpLmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGUuc3R5bGVbdF09aVt0XX0pfWZ1bmN0aW9uIGgoZSx0KXt2YXIgbj1CKHksdCk7T2JqZWN0LmtleXMobikuZm9yRWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZS5zdHlsZVt0XT1uW3RdfSl9ZnVuY3Rpb24gZihlKXt2YXIgdD1FW3RoaXMuYV0sbj1FW3RoaXMuYl0saT10LnNpemUrbi5zaXplO3Quc2l6ZT1lL3RoaXMuc2l6ZSppLG4uc2l6ZT1pLWUvdGhpcy5zaXplKmkseih0LmVsZW1lbnQsdC5zaXplLHRoaXMuYUd1dHRlclNpemUpLHoobi5lbGVtZW50LG4uc2l6ZSx0aGlzLmJHdXR0ZXJTaXplKX1mdW5jdGlvbiBtKGUpe3ZhciB0O3RoaXMuZHJhZ2dpbmcmJigodD1cInRvdWNoZXNcImluIGU/ZS50b3VjaGVzWzBdW2JdLXRoaXMuc3RhcnQ6ZVtiXS10aGlzLnN0YXJ0KTw9RVt0aGlzLmFdLm1pblNpemUrTSt0aGlzLmFHdXR0ZXJTaXplP3Q9RVt0aGlzLmFdLm1pblNpemUrdGhpcy5hR3V0dGVyU2l6ZTp0Pj10aGlzLnNpemUtKEVbdGhpcy5iXS5taW5TaXplK00rdGhpcy5iR3V0dGVyU2l6ZSkmJih0PXRoaXMuc2l6ZS0oRVt0aGlzLmJdLm1pblNpemUrdGhpcy5iR3V0dGVyU2l6ZSkpLGYuY2FsbCh0aGlzLHQpLGMub25EcmFnJiZjLm9uRHJhZygpKX1mdW5jdGlvbiBnKCl7dmFyIGU9RVt0aGlzLmFdLmVsZW1lbnQsdD1FW3RoaXMuYl0uZWxlbWVudDt0aGlzLnNpemU9ZVtyXSgpW3ldK3Rbcl0oKVt5XSt0aGlzLmFHdXR0ZXJTaXplK3RoaXMuYkd1dHRlclNpemUsdGhpcy5zdGFydD1lW3JdKClbR119ZnVuY3Rpb24gZCgpe3ZhciB0PXRoaXMsbj1FW3QuYV0uZWxlbWVudCxyPUVbdC5iXS5lbGVtZW50O3QuZHJhZ2dpbmcmJmMub25EcmFnRW5kJiZjLm9uRHJhZ0VuZCgpLHQuZHJhZ2dpbmc9ITEsZVtpXShcIm1vdXNldXBcIix0LnN0b3ApLGVbaV0oXCJ0b3VjaGVuZFwiLHQuc3RvcCksZVtpXShcInRvdWNoY2FuY2VsXCIsdC5zdG9wKSx0LnBhcmVudFtpXShcIm1vdXNlbW92ZVwiLHQubW92ZSksdC5wYXJlbnRbaV0oXCJ0b3VjaG1vdmVcIix0Lm1vdmUpLGRlbGV0ZSB0LnN0b3AsZGVsZXRlIHQubW92ZSxuW2ldKFwic2VsZWN0c3RhcnRcIixzKSxuW2ldKFwiZHJhZ3N0YXJ0XCIscykscltpXShcInNlbGVjdHN0YXJ0XCIscykscltpXShcImRyYWdzdGFydFwiLHMpLG4uc3R5bGUudXNlclNlbGVjdD1cIlwiLG4uc3R5bGUud2Via2l0VXNlclNlbGVjdD1cIlwiLG4uc3R5bGUuTW96VXNlclNlbGVjdD1cIlwiLG4uc3R5bGUucG9pbnRlckV2ZW50cz1cIlwiLHIuc3R5bGUudXNlclNlbGVjdD1cIlwiLHIuc3R5bGUud2Via2l0VXNlclNlbGVjdD1cIlwiLHIuc3R5bGUuTW96VXNlclNlbGVjdD1cIlwiLHIuc3R5bGUucG9pbnRlckV2ZW50cz1cIlwiLHQuZ3V0dGVyLnN0eWxlLmN1cnNvcj1cIlwiLHQucGFyZW50LnN0eWxlLmN1cnNvcj1cIlwifWZ1bmN0aW9uIFModCl7dmFyIGk9dGhpcyxyPUVbaS5hXS5lbGVtZW50LG89RVtpLmJdLmVsZW1lbnQ7IWkuZHJhZ2dpbmcmJmMub25EcmFnU3RhcnQmJmMub25EcmFnU3RhcnQoKSx0LnByZXZlbnREZWZhdWx0KCksaS5kcmFnZ2luZz0hMCxpLm1vdmU9bS5iaW5kKGkpLGkuc3RvcD1kLmJpbmQoaSksZVtuXShcIm1vdXNldXBcIixpLnN0b3ApLGVbbl0oXCJ0b3VjaGVuZFwiLGkuc3RvcCksZVtuXShcInRvdWNoY2FuY2VsXCIsaS5zdG9wKSxpLnBhcmVudFtuXShcIm1vdXNlbW92ZVwiLGkubW92ZSksaS5wYXJlbnRbbl0oXCJ0b3VjaG1vdmVcIixpLm1vdmUpLHJbbl0oXCJzZWxlY3RzdGFydFwiLHMpLHJbbl0oXCJkcmFnc3RhcnRcIixzKSxvW25dKFwic2VsZWN0c3RhcnRcIixzKSxvW25dKFwiZHJhZ3N0YXJ0XCIscyksci5zdHlsZS51c2VyU2VsZWN0PVwibm9uZVwiLHIuc3R5bGUud2Via2l0VXNlclNlbGVjdD1cIm5vbmVcIixyLnN0eWxlLk1velVzZXJTZWxlY3Q9XCJub25lXCIsci5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwiLG8uc3R5bGUudXNlclNlbGVjdD1cIm5vbmVcIixvLnN0eWxlLndlYmtpdFVzZXJTZWxlY3Q9XCJub25lXCIsby5zdHlsZS5Nb3pVc2VyU2VsZWN0PVwibm9uZVwiLG8uc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIixpLmd1dHRlci5zdHlsZS5jdXJzb3I9aixpLnBhcmVudC5zdHlsZS5jdXJzb3I9aixnLmNhbGwoaSl9ZnVuY3Rpb24gdihlKXtlLmZvckVhY2goZnVuY3Rpb24odCxuKXtpZihuPjApe3ZhciBpPUZbbi0xXSxyPUVbaS5hXSxzPUVbaS5iXTtyLnNpemU9ZVtuLTFdLHMuc2l6ZT10LHooci5lbGVtZW50LHIuc2l6ZSxpLmFHdXR0ZXJTaXplKSx6KHMuZWxlbWVudCxzLnNpemUsaS5iR3V0dGVyU2l6ZSl9fSl9ZnVuY3Rpb24gcCgpe0YuZm9yRWFjaChmdW5jdGlvbihlKXtlLnBhcmVudC5yZW1vdmVDaGlsZChlLmd1dHRlciksRVtlLmFdLmVsZW1lbnQuc3R5bGVbeV09XCJcIixFW2UuYl0uZWxlbWVudC5zdHlsZVt5XT1cIlwifSl9dm9pZCAwPT09YyYmKGM9e30pO3ZhciB5LGIsRyxFLHc9bCh1WzBdKS5wYXJlbnROb2RlLEQ9ZS5nZXRDb21wdXRlZFN0eWxlKHcpLmZsZXhEaXJlY3Rpb24sVT1jLnNpemVzfHx1Lm1hcChmdW5jdGlvbigpe3JldHVybiAxMDAvdS5sZW5ndGh9KSxrPXZvaWQgMCE9PWMubWluU2l6ZT9jLm1pblNpemU6MTAwLHg9QXJyYXkuaXNBcnJheShrKT9rOnUubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIGt9KSxMPXZvaWQgMCE9PWMuZ3V0dGVyU2l6ZT9jLmd1dHRlclNpemU6MTAsTT12b2lkIDAhPT1jLnNuYXBPZmZzZXQ/Yy5zbmFwT2Zmc2V0OjMwLE89Yy5kaXJlY3Rpb258fFwiaG9yaXpvbnRhbFwiLGo9Yy5jdXJzb3J8fChcImhvcml6b250YWxcIj09PU8/XCJldy1yZXNpemVcIjpcIm5zLXJlc2l6ZVwiKSxDPWMuZ3V0dGVyfHxmdW5jdGlvbihlLG4pe3ZhciBpPXQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gaS5jbGFzc05hbWU9XCJndXR0ZXIgZ3V0dGVyLVwiK24saX0sQT1jLmVsZW1lbnRTdHlsZXx8ZnVuY3Rpb24oZSx0LG4pe3ZhciBpPXt9O3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0fHx0IGluc3RhbmNlb2YgU3RyaW5nP2lbZV09dDppW2VdPW8/dCtcIiVcIjphK1wiKFwiK3QrXCIlIC0gXCIrbitcInB4KVwiLGl9LEI9Yy5ndXR0ZXJTdHlsZXx8ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbj17fSxuW2VdPXQrXCJweFwiLG47dmFyIG59O1wiaG9yaXpvbnRhbFwiPT09Tz8oeT1cIndpZHRoXCIsXCJjbGllbnRXaWR0aFwiLGI9XCJjbGllbnRYXCIsRz1cImxlZnRcIixcInBhZGRpbmdMZWZ0XCIpOlwidmVydGljYWxcIj09PU8mJih5PVwiaGVpZ2h0XCIsXCJjbGllbnRIZWlnaHRcIixiPVwiY2xpZW50WVwiLEc9XCJ0b3BcIixcInBhZGRpbmdUb3BcIik7dmFyIEY9W107cmV0dXJuIEU9dS5tYXAoZnVuY3Rpb24oZSx0KXt2YXIgaSxzPXtlbGVtZW50OmwoZSksc2l6ZTpVW3RdLG1pblNpemU6eFt0XX07aWYodD4wJiYoaT17YTp0LTEsYjp0LGRyYWdnaW5nOiExLGlzRmlyc3Q6MT09PXQsaXNMYXN0OnQ9PT11Lmxlbmd0aC0xLGRpcmVjdGlvbjpPLHBhcmVudDp3fSxpLmFHdXR0ZXJTaXplPUwsaS5iR3V0dGVyU2l6ZT1MLGkuaXNGaXJzdCYmKGkuYUd1dHRlclNpemU9TC8yKSxpLmlzTGFzdCYmKGkuYkd1dHRlclNpemU9TC8yKSxcInJvdy1yZXZlcnNlXCI9PT1EfHxcImNvbHVtbi1yZXZlcnNlXCI9PT1EKSl7dmFyIGE9aS5hO2kuYT1pLmIsaS5iPWF9aWYoIW8mJnQ+MCl7dmFyIGM9Qyh0LE8pO2goYyxMKSxjW25dKFwibW91c2Vkb3duXCIsUy5iaW5kKGkpKSxjW25dKFwidG91Y2hzdGFydFwiLFMuYmluZChpKSksdy5pbnNlcnRCZWZvcmUoYyxzLmVsZW1lbnQpLGkuZ3V0dGVyPWN9MD09PXR8fHQ9PT11Lmxlbmd0aC0xP3oocy5lbGVtZW50LHMuc2l6ZSxMLzIpOnoocy5lbGVtZW50LHMuc2l6ZSxMKTt2YXIgZj1zLmVsZW1lbnRbcl0oKVt5XTtyZXR1cm4gZjxzLm1pblNpemUmJihzLm1pblNpemU9ZiksdD4wJiZGLnB1c2goaSksc30pLG8/e3NldFNpemVzOnYsZGVzdHJveTpwfTp7c2V0U2l6ZXM6dixnZXRTaXplczpmdW5jdGlvbigpe3JldHVybiBFLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gZS5zaXplfSl9LGNvbGxhcHNlOmZ1bmN0aW9uKGUpe2lmKGU9PT1GLmxlbmd0aCl7dmFyIHQ9RltlLTFdO2cuY2FsbCh0KSxvfHxmLmNhbGwodCx0LnNpemUtdC5iR3V0dGVyU2l6ZSl9ZWxzZXt2YXIgbj1GW2VdO2cuY2FsbChuKSxvfHxmLmNhbGwobixuLmFHdXR0ZXJTaXplKX19LGRlc3Ryb3k6cH19fSk7XG4iXX0=
