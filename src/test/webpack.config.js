module.exports =
[
    // development
    {
        entry:
        [
            "./lib/test/specs/testActivation.js",
            "./lib/test/specs/testStyleRules.js",
            "./lib/test/specs/testColors.js",
            "./lib/test/specs/testCounters.js",
            "./lib/test/specs/testPropsLength.js",
            "./lib/test/specs/testPropsBorderImage.js",
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