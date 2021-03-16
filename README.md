# 开始项目

## 一. 初始化工作

### 1.项目划分

### 2.引入css文件  normalize.css 和 base.css

### 3.在项目文件下创建vue.config.js 配置路径别名  @ 对应 src

### 4.创建 .editorconfig 文件 如果是项目组长必须配置  文件得到代码风格控制

## 二. 底部导航栏 tabbar -> 路由映射关系 (项目模块划分)

## 三. 修改网页图标

## 四. 首页功能

### 1.顶部导航栏 抽取公共组件

### 2.封装网络请求(axios)，request

### 3.开始制作轮播图功能

### 4.推荐信息展示

### 5.featureView 功能展示

### 6.TabControl的封装 并且使用粘性布局

### 7.点击tabControl切换请求

### 8.better-Scroll 滚动的使用  （对滚动进行重构）

1>.默认情况下BScroll是不可以实时的监听滚动位置
probe 侦测
probeType
0,1 都不是侦测实时的位置
 2  在手指滚动的过程中进行侦测,手指离开后的惯性滚动过程不进行侦测。
 3  只要是滚动，都进行侦测

     this.bs = new BScroll(wrapper,{
       probeType:3
    })
    this.bs.on('scroll',(position) => {
      log(position);
    })

### 9.返回顶部按钮事件 (显示和取消功能)

### 10.  滚动bug解决 和 上拉加载更多

1.如何将不是父子组件中的事件传递？
 因为涉及到非父子组件的通信，所以我们选择了事件总线。
  bus -> 总线
  Vue.prototype.$bus = new Vue()
  this.$bus.$emit("事件名称",参数)
  this.$bus.$on("事件名称",回调函数(参数))

### 11.对于refresh非常频繁的问题,进行防抖操作

  防抖 debounce / 节流 throttle

### 12.修改tabContent吸顶效果

### 13.当点击其他页面时，首页还停留在原先滚动的地方

1.让home不要销毁掉

### 14.跳转到详情页并且携带iid

## 五 详情页

### 1.导航栏的封装

### 2.商品详情

### 3.商品信息

### 4.评价

### 5.点击标题，滚动到对应的主题

在detail的监听标题的点击，获取index
滚动到对应的主题：
  获取所有主题的offsetTop
  问题：在哪里能获取到正确的offsetTop
  1.created肯定不行，压根不能获取到元素
  2.mounted也不行，数据还没有获取到
  3.获取到数据的回调中也不行,DOM还没有渲染完
  4.$nextTick也不行，因为图片的高度没有被计算在类
  5.在图片加载完成后,获取的高度才是正确的

## 细节问题

### 1.fastclick减少点击延迟

安装fastclick
导入
调用attach函数

### 使用vue-lazyload

安装
导入
Vue.use()
修改img :src -> v-lazy

### postcss-px-to-viewport 单位转化插件

安装插件
在postcss.config.js中配置
