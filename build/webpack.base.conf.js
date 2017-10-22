var path = require('path')
var config = require('../config')
var utils = require('./util')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var webpack = require('webpack')


process.noDeprecation = true

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
        entry: {
            index: './src/index.js',
        },
        output: {
            path: path.join(__dirname, "../"),
            filename: '[name].js',
            publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
        },
        module: {
            rules: [{
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        extractCSS: process.env.NODE_ENV === 'production'
                    }
                }, {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: [resolve('src')]
                },{
                    test: /\.css$/,
                    loaders: 'style-loader!css-loader'
                },{
                    test: /\.scss$/,
                    loaders: ["style-loader", "css-loader", "sass-loader"]
                },{
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }]
    },
    plugins: [
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/base.html',
            inject: false,
            template: path.join(__dirname, '../template/base.ejs'),
            chunks: ['manifest','vendor']
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'template/index.html',
            inject: false,
            template: path.join(__dirname, '../template/index.ejs'),
            chunks: ['index']
        }),
        new HtmlWebpackHarddiskPlugin()
    ]
}