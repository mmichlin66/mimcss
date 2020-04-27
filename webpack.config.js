// define preprocessor variables for ifdef-loader
const dev_ifdefLoaderOptions = { DEBUG: true };
const prod_ifdefLoaderOptions = { DEBUG: false };



module.exports =
[
    // development
    {
        entry: "./lib/mimcssTypes.js",

        output:
        {
            filename: "mimcss.dev.js",
            path: __dirname + "/lib",
            library: 'mimcss',
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
                {
                    test: /\.js$/,
                    use: [{ loader: "ifdef-loader", options: dev_ifdefLoaderOptions }]
                },
            ]
        },
    },

    // production
    {
        entry: "./lib/mimcssTypes.js",

        output:
        {
            filename: "mimcss.js",
            path: __dirname + "/lib",
            library: 'mimcss',
            libraryTarget: 'umd',
            globalObject: 'this'
        },

        mode: "production",
        devtool: "source-map",
        optimization: { minimize: true },

        resolve: { extensions: [".js"] },
        module:
        {
            rules:
            [
                {
                    test: /\.js$/,
                    use: [{ loader: "ifdef-loader", options: prod_ifdefLoaderOptions }]
                },
            ]
        },
    }
];