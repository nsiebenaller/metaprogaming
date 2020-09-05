const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
    entry: ["babel-polyfill", "./src/client/index.tsx"],
    output: {
        publicPath: "/",
        path: path.join(__dirname, outputDirectory),
        filename: "./js/[name].bundle.js",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                    },
                ],
                exclude: /node_modules/,
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.css$/,
                loader: "css-loader",
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "./Less",
                            hmr: process.env.NODE_ENV === "development",
                        },
                    },
                    { loader: "css-loader" },
                    {
                        loader: "less-loader",
                        options: {
                            strictMath: true,
                            noIeCompat: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|jpeg)$/,
                loader: "url-loader?limit=100000",
            },
        ],
    },
    resolve: {
        extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".json", ".less"],
    },
    devServer: {
        port: 3001,
        historyApiFallback: {
            index: "./public/",
            disableDotRule: true,
        },
        proxy: {
            "/api": "http://localhost:3000",
            "/images": "http://localhost:3000",
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
                "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
        },
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new webpack.HotModuleReplacementPlugin(),
        // new HtmlWebpackPlugin({
        //     template: "./public/index.html",
        //     favicon: "./public/favicon.ico",
        //     title: "Meta Pro Gaming",
        // }),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "./css/[id].css",
        }),
        new CopyPlugin([{ from: "./src/client/Assets", to: "assets" }]),
    ],
};
