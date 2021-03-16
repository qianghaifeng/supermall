<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="good-info">
    <div>{{detailInfo.desc}}</div>
    <div>{{detailInfo.detailImage[0].key}}</div>
    <div>
      <img v-for="(item,index) in detailInfo.detailImage[0].list"  :key="index" :src="item" @load="imageLoad" alt="" class="imgC">
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailGoodInfo',
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imageCount: 0,
      isFlag: true
    }
  },
  methods: {
    imageLoad() {
      if (this.isFlag) {
        this.imageCount = this.detailInfo.detailImage[0].list.length;
        this.isFlag = false;
      }
      if (++this.counter === this.imageCount) {
        this.$emit("imageLoad");
      }
    }
  },
  }
</script>

<style scoped>
.good-info {
  width: 100%;

}
.imgC {
  width: 100%;
}
</style>