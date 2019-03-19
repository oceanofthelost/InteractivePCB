# Bug Listing For Interactive BOM

## BUG 0001 [CLOSED]
### Description
BOM is displaying data in wrong column. 


## BUG 0002 [CLOSED] 
### Description
Highlight pin 1 not functioning. When a part is selected, the part will be selected but pin 1 will not be highlighted. 


## BUG 0003 [OPEN] 
### Description
If a box is checked, then the sort ascending or descending is pressed, the resulting check boxes become garbled.


## BUG 0004 [OPEN]
### Description
If an Eagle part has a double quote character in any attribute field, the resulting JSON is invalid. 

### Potential Resolution
When running the EagleCAD ULP, scan through a string an replace a double quote character with a space character.



