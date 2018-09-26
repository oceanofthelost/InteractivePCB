@echo off
title Test



npx browserify .\src\pcbfont.js .\src\ibom.js .\src\render.js .\src\htmlFunctions.js .\vender\split.js --debug --outfile index.js