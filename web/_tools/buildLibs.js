let p = require("path");
let ps = require("process");
let cps = require("child_process");

buildLib("mimcss");
buildLib("mimbl");
buildLib("mimurl");
buildLib("mimcl");
buildLib("mim-tsplay");
buildLib("mimcss-demo");

console.log("buildLibs.js script has finished");



function buildLib(libName) {
    ps.chdir(p.join(__dirname, "..\\..\\..\\" + libName));
    console.log("Build " + libName);
    exec("npm run build", undefined, true);
    // exec( "tsc -b && webpack", undefined, true);
}



function exec(cmd, options, logErrorMessage) {
    try { cps.execSync(cmd, options); } catch (err) { if (logErrorMessage) console.log(err.message); }
}