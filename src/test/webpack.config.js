module.exports =
[
    // development
    {
        entry:
        [
            "./lib/test/specs/activation.js",
            "./lib/test/specs/styleRules.js",
            "./lib/test/specs/counters.js",
            "./lib/test/specs/propsLength.js",
            "./lib/test/specs/propsBorderImage.js",
        ],

        output:
        {
            filename: "mimcss.tests.dev.js",
            path: __dirname + "/../../lib",
            library: 'mimcss-tests',
            libraryTarget: 'umd',
            globalObject: 'this'
        },

        mode: "development",
        devtool: "#inline-source-map",

        resolve: { extensions: [".js"] },
        module:
        {
            rules:
            [
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
            ]
        },
    }
];