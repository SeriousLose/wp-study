// ./remove-comments-plugin.js
class RemoveCommentsPlugin {
  apply (compiler) {
    console.log('RemoveCommentsPlugin 启动')
    // compiler => 包含了我们此次构建的所有配置信息

    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        console.log(name) // 输出文件名称
        // console.log(compilation.assets[name].source()) // 输出文件内容
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source();
          console.log(typeof contents);
          if(typeof contents == 'string'){
            const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
            compilation.assets[name] = {
              source: () => noComments,
              size: () => noComments.length
            }
          }
        }
      }
    })
  }
}

module.exports=RemoveCommentsPlugin