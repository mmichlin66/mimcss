const dev_ifdefLoaderOptions = { DEBUG: true };
const prod_ifdefLoaderOptions = { DEBUG: false };


function config( outFileName, mode, devtool, ifdefLoaderOptions)
{
    return {
        entry: "./lib/mimcssTypes.js",

        output:
        {
            filename: outFileName,
            path: __dirname + "/lib",
            library: 'mimcss',
            libraryTarget: 'umd',
            globalObject: 'this'
        },

        mode: mode,
        devtool: devtool,
        resolve: { extensions: [".js"] },

        module:
        {
            rules:
            [
                { test: /\.js$/, use: [{ loader: "ifdef-loader", options: ifdefLoaderOptions }] },
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
            ]
        }
    }
}



module.exports =
[
    config( "mimcss.dev.js", "development", "#inline-source-map", dev_ifdefLoaderOptions),
    config( "mimcss.js", "production", "source-map", prod_ifdefLoaderOptions),
];


