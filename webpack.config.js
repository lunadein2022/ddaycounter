const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpack } = require("webpack");

module.exports = {
    target: false,
    mode: 'production',
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.bundle.js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
        new webpack.web.JsonpTemplatePlugin(options.output),
        new webpack.LoaderTargetPlugin('web'),
    ],
};