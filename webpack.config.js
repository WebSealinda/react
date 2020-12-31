const HtmlWebpackPlugin = require('html-webpack-plugin')
const PurifycssWebpack = require('purifycss-webpack')
const UglifyjsWebpackplugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const { resolve } = require('path')
const glob = require('glob')
const json = require('./src/mock')

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: {
    home: path.join(__dirname, 'src/index.js'),
    help: path.join(__dirname, 'src/help/index.js')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name]-[hash:8].js',
    chunkFilename: '[name]-[id]-[hash:8].js'
  },
  devServer: {
    contentBase: './dist',
    port: '8000',
    inline: true,
    historyApiFallback: true,
    before(app) {
      app.get('/api/data', (req, res) => {
        res.json(json)
      })
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        include: [/src/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true // 使用 css 的压缩功能
              }
            },
           'sass-loader'
          ]
        })
        // loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [resolve('src')],
        use: ['babel-loader']
      },
      {
        enforce: 'pre',  // 指定为前置类型
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 单位是 Byte，当文件小于 8KB 时作为 DataURL 处理
            },
          },
        ],
      },
      {
        test: /\.(png.jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { // 压缩 jpeg 的配置
                progressive: true,
                quality: 65
              },
              optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                enabled: false,
              },
              pngquant: { // 使用 imagemin-pngquant 压缩 png
                quality: '65-90',
                speed: 4
              },
              gifsicle: { // 压缩 gif 的配置
                interlaced: false,
              },
              webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                quality: 75
              },
            }
          },
        ]
      }
    ]
  },
  resolve: {
    // modules: [
    //   "node-modules",
    //   path.resolve(__dirname, 'src')
    // ],
    alias: {
      components: path.resolve(__dirname, 'src/components')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',  // 配置输出文件名和路径
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true // 压缩 HTML 中出现的 JS 代码
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new PurifycssWebpack({ // 去重去无效代码
      paths: glob.sync(path.join(__dirname, '/src/*.js'))
    }),
    require('autoprefixer'),
    new UglifyjsWebpackplugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash:8].css',
    })
  ],
}