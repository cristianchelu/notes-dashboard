const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HTML_PATH = resolve(__dirname, "src", "client", "public", "index.html");

const commonConfig = {
    target: "web",
    entry: ["./src/client/index.jsx"],
    output: {
        publicPath: "/",
        path: resolve(__dirname, "build"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: HTML_PATH,
            alwaysWriteToDisk: true,
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false,
        }),
    ],
    resolve: {
        modules: ["node_modules", join("src", "client")],
        extensions: [".js", ".jsx", ".json"],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                },
            },
        },
    },
    stats: {
        assetsSort: "!size",
        children: false,
        chunks: false,
        colors: true,
        entrypoints: false,
        modules: false,
    },
};

module.exports = commonConfig;