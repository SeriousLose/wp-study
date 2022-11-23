module.exports = {
  // 样式文件路径
  entry: './index.js',
  mode: 'none',
  output: {
    filename: 'bundle.js'
  },
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
  }
}