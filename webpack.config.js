require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const outputDirectory = "dist";

module.exports = {
    entry: "./src/client/index.tsx",
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
                    loader: "swc-loader",
                    options: {
                        sync: true,
                    },
                },
            },
            {
                test: /\.ts(x?)$/,
                use: {
                    loader: "swc-loader",
                    options: {
                        sync: true,
                    },
                },
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
        alias: {
            "@Store": path.resolve(__dirname, "src/client/Store/Store.tsx"),
            "@": path.resolve(__dirname, "src/client/"),
        },
    },
    devServer: {
        port: 3001,
        historyApiFallback: {
            index: "./public/",
            disableDotRule: true,
        },
        proxy: [
            {
                context: ["/api", "/images", "/s3"],
                target: "http://localhost:3000",
            },
        ],
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
        new webpack.DefinePlugin({
            "process.env": {
                THEME: JSON.stringify(process.env.THEME),
                BUCKET: JSON.stringify(process.env.BUCKET),
            },
        }),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "./css/[id].css",
        }),
    ],
};
