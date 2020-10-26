const path = require("path");
// const autoprefixer = require("autoprefixer");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "../index.jsx") // 직접 코드 수정하는 부분
  },
  output: {
    path: path.resolve(__dirname, "../dist"), //output으로 나올 파일이 저장될 경로
    filename: "bundle.js",
    chunkFilename: "[name].js",
    publicPath: "../dist"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/react']
            }
          },
          
        ]
      },
    //   {
    //     test: /\.tsx?$/,
    //     exclude: "/node_modules/",
    //     use: [
    //       {
    //         loader: "ts-loader"
    //       }
    //     ]
    //   },
    //   {
    //     test: /\.(svg|png)$/,
    //     exclude: /stories/,
    //     use: {
    //       loader: "url-loader",
    //       options: {
    //         name: "[name].[ext]?[hash]"
    //         // publicPath: './dist/',
    //         // limit: 10000 // 10kb
    //       }
    //     }
    //   },
    //   {
    //     test: /\.svg$/,
    //     exclude: /stories/,
    //     issuer: /\.jsx?$/,
    //     use: [
    //       {
    //         loader: "babel-loader"
    //       },
    //       {
    //         loader: "react-svg-loader",
    //         options: {
    //           jsx: true,
    //           name: "[name].[ext]?[hash]"
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     test: /\.(css|scss)$/,
    //     use: [
    //       MiniCssExtractPlugin.loader,
    //       // require.resolve('style-loader'),
    //       {
    //         loader: require.resolve("css-loader"),
    //         options: {
    //           importLoaders: 1,
    //           modules: {
    //             localIdentName: "[name]_[local]_[hash:base64:5]"
    //           },
    //           url: true
    //         }
    //       },
    //       {
    //         loader: require.resolve("postcss-loader"),
    //         options: {
    //           ident: "postcss",
    //           plugins: () => [
    //             require("postcss-flexbugs-fixes"),
    //             autoprefixer({
    //               flexbox: "no-2009"
    //             })
    //           ]
    //         }
    //       },
    //       require.resolve("resolve-url-loader"),
    //       {
    //         loader: "sass-loader",
    //         options: {
    //         }
    //       }
    //     ]
    //   }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: "../css/bundle.css",
    //   chunkFilename: "[name].css",
    //   ignoreOrder: true
    // })
  ],
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "../src")],
    extensions: [
    //   ".ts",
    //   ".tsx",
      ".js",
      ".jsx",
    //   ".json",
    //   ".css",
    //   ".scss",
    //   ".svg"
    ]
  }
};