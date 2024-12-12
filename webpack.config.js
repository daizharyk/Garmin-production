const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "src/js/index.js"),
    animation: path.resolve(__dirname, "src/js/animation.js"),
    html: path.resolve(__dirname, "src/js/htmlBuilder.js"),
    itempage: path.resolve(__dirname, "src/js/itempage.js"),
    itemService: path.resolve(__dirname, "src/js/itemService.js"),
    signIn: path.resolve(__dirname, "src/js/signIn.js"),
    login: path.resolve(__dirname, "src/js/login.js"),
    register: path.resolve(__dirname, "src/js/register.js"),
    registration: path.resolve(__dirname, "src/js/registration.js"),
    authState: path.resolve(__dirname, "src/js/authState.js"),
    accountProfile: path.resolve(__dirname, "src/js/accountProfile.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "img/[name][ext]",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3001,
    open: true,
    hot: false,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3005",
        changeOrigin: true,
        logLevel: "info",
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|webp)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]",
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      title: "Garmin",
      filename: "index.html",
      template: "src/index.html",
      chunks: ["animation", "main", "authState"],
      templateParameters: {
        footer: fs.readFileSync(
          path.resolve(__dirname, "src/pages/components/footer.html"),
          "utf-8"
        ),
      },
    }),
    new HtmlWebpackPlugin({
      title: "Product Page",
      filename: "pages/itempage.html",
      template: "src/pages/itempage.html",
      chunks: ["itempage", "animation", "authState"],
      templateParameters: {
        footer: fs.readFileSync(
          path.resolve(__dirname, "src/pages/components/footer.html"),
          "utf-8"
        ),
      },
    }),
    new HtmlWebpackPlugin({
      title: "Shipping",
      filename: "pages/shipping.html",
      template: "src/pages/shipping.html",
      chunks: ["animation", "authState"],
      templateParameters: {
        footer: fs.readFileSync(
          path.resolve(__dirname, "src/pages/components/footer.html"),
          "utf-8"
        ),
      },
    }),
    new HtmlWebpackPlugin({
      title: "Login Page",
      filename: "pages/signIn.html",
      template: "src/pages/signIn.html",
      chunks: ["signIn", "login"],
    }),
    new HtmlWebpackPlugin({
      title: "Registration Page",
      filename: "pages/registration.html",
      template: "src/pages/registration.html",
      chunks: ["register", "registration"],
    }),
    new HtmlWebpackPlugin({
      title: "Account | Profile",
      filename: "pages/accountProfile.html",
      template: "src/pages/accountProfile.html",
      chunks: ["main", "animation", "authState", "accountProfile"],
      templateParameters: {
        footer: fs.readFileSync(
          path.resolve(__dirname, "src/pages/components/footer.html"),
          "utf-8"
        ),
      },
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/img", to: "img" }],
    }),
  ],
};
