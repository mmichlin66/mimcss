let p = require("path");
let ps = require("process");
let cps = require("child_process");

ps.chdir(p.join(__dirname, ".."));
console.log("Current directory: " + ps.cwd());

console.log("Copy libraries to " + p.join(ps.cwd(), "lib"));
exec("xcopy ..\\..\\mimcss\\lib\\mimcss.js      lib\\ /i /y /d");
exec("xcopy ..\\..\\mimcss\\lib\\mimcss.dev.js  lib\\ /i /y /d");
exec("xcopy ..\\..\\mimurl\\lib\\mimurl.js      lib\\ /i /y /d");
exec("xcopy ..\\..\\mimbl\\lib\\mimbl.js        lib\\ /i /y /d");
exec("xcopy ..\\..\\mimcl\\lib\\mimcl.js        lib\\ /i /y /d");

console.log("Copy require.js to " + p.join(ps.cwd(), "demo"));
exec("xcopy ..\\..\\mimcss\\web\\assets\\require.js demo\\ /i /y /d");


// playground
console.log("Copy libraries to " + p.join(ps.cwd(), "demo"));
exec("xcopy ..\\..\\mim-tsplay\\lib\\*.ttf                 demo\\ /i /y /d");
exec("xcopy ..\\..\\mim-tsplay\\lib\\*.worker.js           demo\\ /i /y /d");
exec("xcopy ..\\..\\mim-tsplay\\lib\\mim-tsplay.js         demo\\ /i /y /d");
exec("xcopy ..\\..\\mimcss-demo\\lib\\mimcss-demo.js       demo\\ /i /y /d");

console.log("Copy mimcss types to " + p.join(ps.cwd(), "demo/types/mimcss"));
exec("xcopy ..\\..\\mimcss\\lib\\index.d.ts                demo\\types\\mimcss\\ /i /y /d");
exec("xcopy ..\\..\\mimcss\\lib\\api\\*.d.ts               demo\\types\\mimcss\\api\\ /i /y /d");

console.log("Copy mimbl types to " + p.join(ps.cwd(), "demo/types/mimbl"));
exec("xcopy ..\\..\\mimbl\\lib\\index.d.ts                 demo\\types\\mimbl\\ /i /y /d");
exec("xcopy ..\\..\\mimbl\\lib\\api\\*.d.ts                demo\\types\\mimbl\\api\\ /i /y /d");
exec("xcopy ..\\..\\mimbl\\lib\\jsx\\*.d.ts                demo\\types\\mimbl\\jsx\\ /i /y /d");

console.log("copyLibs.js script has finished");



function exec(cmd, logErrorMessage) {
    try { cps.execSync(cmd); } catch (err) { if (logErrorMessage) console.log(err.message); }
}