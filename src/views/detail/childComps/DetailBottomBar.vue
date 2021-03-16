<template>
  <div class="bottom-bar"  @click="addtoCart">
    加入购物车
  </div>
</template>

<script>
export default {
  name:'DetailBottomBar',
  methods: {
    addtoCart() {
      this.$emit('addCart');
    }
  }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    position: fixed;
    background-color: aqua;
    color: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    line-height: 49px;
    font-size: 24px;
  }
</style>