
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = {
  optimization:{
    minimize: true ,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
mode: "development", 
  entry: {
  main: path.resolve(__dirname, 'src/js/index.js'),
  animation: path.resolve(__dirname, 'src/js/animation.js'),
  html: path.resolve(__dirname, 'src/js/html.js'),
  itempage: path.resolve(__dirname, 'src/js/itempage.js'),
  },
output:{
  path: path.resolve(__dirname, "dist"),
  filename: "[name][contenthash].js",
  clean: true,
  assetModuleFilename: "[name][ext]",
} ,
devServer:{
  static: {
    directory: path.resolve(__dirname, 'dist')
  },
    port: 3001,
    open: true,
    hot: true ,
  
},
module: {
  rules: [
    
    {
      test: /\.(png|svg|jpg|jpeg|webp)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'img/[name][ext][query]', // Все изображения будут перемещаться в dist/img
      },
  },
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
  },
  
],
},

  plugins: [
  new HtmlWebpackPlugin({
  title: "Garmin",
  filename: "index.html",
  template: "src/index.html",
  chunks: ["animation" , "main"],
  }),
  new HtmlWebpackPlugin({
  title: "Product Page",
  filename: "pages/itempage.html",
  template: "src/pages/itempage.html",
  chunks: ["itempage" , "animation"],
  }),
  new HtmlWebpackPlugin({
  title: "Shipping",
  filename: "pages/shipping.html",
  template: "src/pages/shipping.html",
  chunks: ["animation"],
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: 'src/img', to: 'img' }, 
    ],
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: 'src/data/item.json', to: 'data/item.json' }, 
    ],
  }),
],
};