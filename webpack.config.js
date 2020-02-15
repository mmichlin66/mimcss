const TerserPlugin = require('terser-webpack-plugin');

let isProd = process.argv.indexOf('-p') !== -1;
let mode = isProd ? "production" : "development";
let devtool = isProd ? "source-map" : "#inline-source-map";
let outputFilename = isProd ? "mimcss.js" : "mimcss.dev.js";
let minimize = isProd ? true : false;
// let minimizer = isProd ? new TerserPlugin() : undefined;


// define preprocessor variables for ifdef-loader
const ifdefLoaderOptions =
{
    DEBUG: !isProd,
    USE_STATS: !isProd,

    //"ifdef-verbose": true,       // add this for verbose output
    //"ifdef-triple-slash": false  // add this to use double slash comment instead of default triple slash
};



//const DtsBundleWebpack = require('dts-bundle-webpack');
//const DtsBundleOptions = {
//    name: "mimcss",
//    main: "lib/index.d.ts",
//    out: "mimcss.d.ts",
//	outputAsModuleFolder: false,
//	removeSource: true
//};


module.exports =
{
    entry: "./src/mimcssTypes.ts",

    output:
    {
        filename: outputFilename,
        path: __dirname + "/lib",
		library: 'mimcss',
		libraryTarget: 'umd',
		globalObject: 'this'
    },

    mode: mode,
    //mode: "production",
    //mode: "none",

    // optimization: { minimize: minimize, minimizer: [minimizer] },

    // Enable sourcemaps for debugging webpack's output.
    devtool: devtool,
    //devtool: "source-map",

    resolve:
    {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },

    //plugins: [
    //    new DtsBundleWebpack( DtsBundleOptions)
    //],
    
    module:
    {
        rules:
        [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            //{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {
                test: /\.tsx?$/,
                use:
                [
                    //{ loader: "awesome-typescript-loader" },
                    { loader: "ts-loader" },
                    { loader: "ifdef-loader", options: ifdefLoaderOptions }
                ]
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals:
    {
    }
};