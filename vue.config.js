module.exports = {
  configureWebpack: {
    resolve: {
      // 配置后缀
      extensions: [],
      // 别名
      alias: {
        // @ 代表 src
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  } 
}