# STATUS: CLOSED [COMMIT: e9fd3]

# DESCRIPTION:
    The 'Value' and 'Footprint' columns are not displayed correctly. 'Value' is 
    printing the package type, and 'Footprint' is displaying the reference designator.

# RESOLUTION: 
    This bug was introduced when the 'Qty' field was removed from from 'pcbdata.json'. 
    Two lines in the function 'populateBomBody()', in file 'ibom.js'

    (1)  td = document.createElement("TD");
    (2)  td.innerHTML = highlightFilter(references.join(", "));
    (3)  tr.appendChild(td);
    (4)  // Value
    (5)  td = document.createElement("TD");
    (6)  td.innerHTML = highlightFilter(bomentry[1]);
    (7)  tr.appendChild(td);
    (8)  // Footprint
    (9)  td = document.createElement("TD");
    (10) td.innerHTML = highlightFilter(bomentry[2]);
    (11) tr.appendChild(td);

    The functions on line (6) and (10) are referencing the wrong index.

    The fix is below on lines (6) and (10). The index has been subtracted by 1, so that 
    the correct value is indexed.

    (1)  td = document.createElement("TD");
    (2)  td.innerHTML = highlightFilter(references.join(", "));
    (3)  tr.appendChild(td);
    (4)  // Value
    (5)  td = document.createElement("TD");
    (6)  td.innerHTML = highlightFilter(bomentry[0]);
    (7)  tr.appendChild(td);
    (8)  // Footprint
    (9)  td = document.createElement("TD");
    (10) td.innerHTML = highlightFilter(bomentry[1]);
    (11) tr.appendChild(td);

