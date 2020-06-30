const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
        // filename: 'bundle.min.[hash].js'
    },
    mode: 'development',
    devServer: {
        // publicPath:'/dist'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
            // hash:true
        })
    ],
    module: {
        rules:[
            {test:/\.css$/, use:['style-loader', 'css-loader']},
            {test:/\.less$/, use:['style-loader', 'css-loader', 'less-loader']},
            {test:/\.scss$/, use:['style-loader', 'css-loader', 'sass-loader']},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/, use:'url-loader?limit=400*1024&name=[hash:8]-[name].[ext]'},
            {test:/\.(ttf|eot|svg|woff|woff2)$/, use:'url-loader'},
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/},
            {test:/\.vue$/, use:'vue-loader'},
        ]
    }
};