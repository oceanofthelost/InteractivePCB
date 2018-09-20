@echo off
title Test



npx browserify .\src\ibom.js .\src\render.js  .\vender\split.js --outfile index.js