const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry:{
        index: {
            import: './src/index.js',
            dependOn: 'shared',
        },
        shared: 'lodash'
    } ,//added new elements to split the code in chunks and require them when needed 
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }, //input and output files and directories
    resolve: {
        extensions: ['.js', '.jsx']
    }, //extensions to work with
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(html)$/,
                use: [
                    { loader: 'html-loader'} 
                ] //this time we use a loader inside an object inside an array
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ] //reglas a aplicar para los archivos y extensiones
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            watch: true
        },
        watchFiles: path.join(__dirname, "./**"), 
        historyApiFallback: true,   // para tener una historia en el navegador
        compress: true,
        port: 3006,
        open: true
    }, //configuraciones de devServer
    optimization: {
        runtimeChunk: 'single',
      }, //this will apply optimization
}