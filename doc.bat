@echo off
rem typedoc --mode modules --out ./reference src/api src/styles/UtilTypes.ts src/styles/ColorTypes.ts src/styles/ImageTypes.ts src/styles/StyleTypes.ts src/styles/SelectorTypes.ts src/styles/MediaTypes.ts src/styles/FontFaceTypes.ts src/rules/RuleTypes.ts --readme none --excludeExternals --excludeNotExported --excludePrivate --ignoreCompilerErrors
typedoc --excludeExternals --excludeNotExported --excludePrivate
