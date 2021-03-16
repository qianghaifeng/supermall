<template>
  <div id="detail">
    <detail-nav-bar class="detail-bar" @titleClick="titleClick" ref="nav" />
    <scroll
      class="scrollContent"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info ref="shop" :shop="shop" />
      <detail-good-info
        ref="goodInfo"
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <!-- .native 修饰符什么时候使用  -->
    <!--当我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符才能进行监听  -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addtoCart"/>
    <toast :message="message" :show="show" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodInfo from "./childComps/DetailGoodInfo";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { debounce } from "common/utils/utils";
import { backTopMixin } from "common/utils/mixin";
import { getDetailData, Goods, Shop, getRecommend } from "network/detail";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import Toast from "components/common/toast/Toast";

export default {
  name: "Detail",
  mixins: [backTopMixin],
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      saveY: 0,
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: {},
      currentIndex: -1,
      message: '',
      show: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast,
  },
  created() {
    this.iid = this.$route.params.iid;
    // 请求数据
    this.getSwiperData(this.trim(this.iid));
    // 请求推荐数据
    this.getRecommends();
    // 给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.shop.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    });
  },
  // mixins:[itemListenerMixin],
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);

    this.$bus.$on("imageLoad", () => {
      refresh();
    });

  },
  methods: {
    trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    getSwiperData(iid) {
      getDetailData(iid).then((res) => {
        let data = res.result;
        this.topImages = data.itemInfo.topImages;
        // 获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        // 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo);

        // 商品的详情信息
        this.detailInfo = data.detailInfo;

        // 获取评论信息
        if (data.rate.list.length !== 0) {
          this.commentInfo = data.rate.list[0];
        }
        // 第一次获取，值不对
        // 值不对的原因:this.$refs.params.$el压根没有渲染
        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.shop.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);

        // this.$nextTick(() => {
        // 2.第二次获取：值不对
        // 值不对的原因是图片没有计算到内

        // 根据最新的数据，对应的DOM是已经被渲染出来了
        // 但是图片依然是没有加载完的
        // offsetTop值不对的时候，都是因为图片的位置
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.shop.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);
        // });
      });
    },
    getRecommends() {
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      });
    },
    imageLoad() {
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.listenShowBackTop(position);
    },
    addtoCart() {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 将商品添加到购物车里
      // this.$store.commit('addCart',product);
      this.$store.dispatch('addCart',product).then(res => {
        // console.log(res);
        // this.message = res;
        // this.show = true;

        // setTimeout(() => {
        //   this.message = '';
        //   this.show = false;
        // }, 1500)
        this.$toast.show(res,2000)
      });
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1000;
  height: 100vh;
  background-color: #fff;
}

.scrollContent {
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
}

.detail-bar {
  position: relative;
  z-index: 1000;
}
</style> 