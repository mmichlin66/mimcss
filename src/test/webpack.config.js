module.exports =
[
    // development
    {
        entry: "./lib/test/specs/first.js",

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
    }
];