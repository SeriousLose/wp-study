const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const RemoveCommentsPlugin = require('./plugin/remove-comments-plugin')
const path = require('path');

const allModes = [
  'eval',
  'eval-cheap-source-map',
  // 'cheap-module-eval-source-map',
  // 'eval-source-map',
  // 'cheap-source-map',
  // 'cheap-module-source-map',
  // 'inline-cheap-source-map',
  // 'inline-cheap-module-source-map',
  // 'source-map',
  // 'inline-source-map',
  // 'hidden-source-map',
  // 'nosources-source-map'
]

module.exports = allModes.map(item => ({
  // 样式文件路径
  entry: './index.js',
  mode: 'none',
  devtool: `${item}`,
  output: {
    filename: `${item}.js`,   // 输出文件名称
    path: path.resolve(__dirname, './../dist/'),  //获取输出路径
  },
  // devtool: item,
  module: {
    rules: [
      {
        test: /\.css$/, // 根据打包过程中所遇到文件路径匹配是否使用这个 loader
        use: [
          'style-loader',
          'css-loader', // 指定具体的 loader
        ]
      },
      {
        test: /\.md$/,
        // 直接使用相对路径
        use: [
          'html-loader',
          './config/loader/markdown-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: `${item}.html`,
      meta: {
        viewport: 'width=device-width'
      },
      template: './src/index.html'
    }),
    // 用于生成 about.html
    // new HtmlWebpackPlugin({
    //   filename: 'about.html'
    // }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "../src/assets"),
    //       to: path.resolve(__dirname, "./../dist/assets"),
    //     },
    //   ],
    // }),
    // new RemoveCommentsPlugin()
  ]
}))