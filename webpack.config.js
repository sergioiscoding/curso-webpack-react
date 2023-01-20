const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); 
const { cleanWebpackPlugin } = require('clean-webpack-plugin');

//importing resources

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
        filename: '[name].bundle.js',
        publicPath: "/"
    }, //input and output files and directories
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "@components": path.resolve(__dirname, './src/components/'),
            "@styles": path.resolve(__dirname, './src/styles/')
        }
    }, //extensions and alias to work with
    mode: 'production',
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
        }),
        new cleanWebpackPlugin()
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
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin()  
        ],
        runtimeChunk: 'single',
      }, //this will apply optimization
}