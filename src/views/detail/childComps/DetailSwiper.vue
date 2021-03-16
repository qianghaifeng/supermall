<template>
  <swiper class="swiperCat">
    <swiper-item
      v-for="item in topImages"
      :key="item.index"
      class="swiper-item"
    >
      <img :src="item" alt="" @load="swiperImg"/>
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  components: {
    Swiper,
    SwiperItem,
  },
  name: "DetailSwiper",
  data() {
    return {
      isLoad:true
    }
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    swiperImg() {
      if (this.isLoad) {
          this.$bus.$emit("imageLoad");
          this.isLoad = false;
      }
    }
  }
};
</script>

<style scoped>
.swiperCat {
  overflow: hidden;
  height: 300px;
}

</style>