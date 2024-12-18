const path = require('path');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: [
        './src/js/index.js',
        './src/scss/index.scss'
    ],
    plugins: [new MiniCssExtractPlugin({
        filename: "bundle.css",
    })],
    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/i,
                exclude: /node_modules/,
                generator: {
                    filename: 'bundle.css'
                },
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',   // Resolves @import and url()
                        options: { url: true }, // Enable url() handling
                    },
                    'sass-loader'
                ],

            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',  // Ensures images are output to `dist` folder
                generator: {
                    filename: 'assets/[name][ext]'  // Adjusts output path for images in `dist`
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true,
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                generator: [
                    {
                        // You can apply generator using `?as=webp`, you can use any name and provide more options
                        preset: "webp",
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: ["imagemin-webp"],
                        },
                    },
                ],
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["imagemin-mozjpeg"],
                        ],
                    },
                },
            }),
        ],
    },
};