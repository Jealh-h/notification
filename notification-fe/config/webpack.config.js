const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ComporessionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

const entryPath = path.resolve(__dirname, '../src/index.js');
module.exports = function (webpackEnv) {
    const isDev = webpackEnv === 'development';
    return {
        // entry: './src/index.js',
        entry: [
            entryPath,
            // 'webpack-hot-middleware/client?noInfo=true&reload=true'
        ],
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
            // "@douyinfe/semi-icons": "commonjs2 @douyinfe/semi-icons",
            // "@douyinfe/semi-illustrations": "commonjs2 @douyinfe/semi-illustrations",
            // "@douyinfe/semi-ui": "commonjs2 @douyinfe/semi-ui"
        },
        performance: {
            hints: false
        },
        output: {
            // filename: 'bundle.js',
            filename: '[name].[contenthash].bundle.js',
            path: path.resolve(__dirname, '../dist'),
            clean: true, //清理原来构建的dist目录
            publicPath: './',
            assetModuleFilename: "assets"
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "development",
                template: path.resolve(__dirname, '../public/index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            }),
            new WebpackManifestPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new ComporessionPlugin({
                filename: '[file].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(js|css)$'),
                threshold: 512,
                minRatio: 0.8
            })
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // 'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.less$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader',
                    ],
                },
                // 图片
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        outputPath: 'cdn-assets/',
                    },
                },
                // 字体
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                // js
                {
                    test: /\.(js|jsx|ts|tsx)/i,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    }
                }
            ]
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/'),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.less'],
        },
        mode: webpackEnv,
        devtool: isDev ? 'inline-source-map' : false,
        devServer: {
            port: 4000,
            open: true,
            contentBase: __dirname + '/dist'
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    douyinfe: {
                        test: /[\\/]node_modules[\\/]@douyinfe[\\/]/,
                        name: 'douyinfe',
                        chunks: 'all',
                    },
                },
            },
        },
    }
}