<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends" :key="item.index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  props: {
    recommends: {
      type:Array,
      default() {
        return []
      }
    }
  }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 15px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 68px;
    height: 68px;
  }
</style>