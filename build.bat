@echo off
tsc -b src && webpack --config src/webpack.config.js
