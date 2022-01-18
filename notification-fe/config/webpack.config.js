const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const webpack = require('webpack');

const entryPath = path.resolve(__dirname, '../src/index.js');
module.exports = function (webpackEnv) {
    const isDev = webpackEnv === 'development';
    return {
        // entry: './src/index.js',
        entry: [
            entryPath,
            'webpack-hot-middleware/client?noInfo=true&reload=true'
        ],
        output: {
            // filename: 'bundle.js',
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, '../dist'),
            clean: true, //清理原来构建的dist目录
            publicPath: '/'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "development",
                template: path.resolve(__dirname, '../public/index.html'),
                // favicon: path.resolve(__dirname, '../public/favicon.ico')
            }),
            new WebpackManifestPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                    ]
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
            open: true
        }
    }
}