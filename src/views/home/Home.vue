<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isShow"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentP"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperLoad="swiperLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- .native 修饰符什么时候使用  -->
    <!--当我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符才能进行监听  -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";


import { getHomeData, getHomeGoods } from "network/home";
import { debounce } from "common/utils/utils";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import {backTopMixin} from "common/utils/mixin";

export default {
  name: "Home",

  mixins: [backTopMixin],

  data() {
    return {
      banners: [],
      recommends: [],
      currentType: "pop",
     
      tabOffsetTop: 0,
      isShow: false,
      saveY:0,
      itemImgListener : null,
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  
  created() {
    // 1.请求多个数据
    this.getHomeData();
    // 请求商品信息
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200);

    this.itemImgListener = () => {
      refresh();
    }
    this.$bus.$on("imageLoad", this.itemImgListener);
  },
  
  
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0,this.saveY,0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentCount = index;
      this.$refs.tabControl2.currentCount = index;
    },

    // 监听位置
    contentP(position) {
      this.listenShowBackTop(position);

      this.isShow = position.y < -this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperLoad() {
      // 获取距离顶部高度
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    getHomeData() {
      getHomeData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  /* vh -> 100个视口 */
  height: 100vh;
}

.home-nav {
  background-color: var(--color-text);
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动而设置的属性 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10; */
}

.tab-control {
  position: sticky;
  top: 40px;
  background-color: #fff;
  z-index: 10;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>