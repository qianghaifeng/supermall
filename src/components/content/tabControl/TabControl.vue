<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="item.index"
     class="tab-control-item" :class="{active:index === currentCount}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentCount:0
    }
  },
  methods: {
    itemClick(index) {
      this.currentCount = index;
      this.$emit('tabClick',index);
    }
  }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    width: 100%;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-text);
    padding: 5px;
  }

</style>