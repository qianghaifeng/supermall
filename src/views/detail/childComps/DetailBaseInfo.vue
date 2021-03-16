<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">
      {{ goods.title }}
    </div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 2"
        :key="index"
      >
        <img :src="goods.services[index].icon" />
        <span>{{ goods.services[index].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info {
  padding: 5px;
}
.info-title {
  color: #000;
  font-weight: 500;
  margin-bottom: 10px;
}
.info-price {
  position: relative;
}
.n-price {
  color: var(--color-text);
  font-size: 20px;
  margin-right: 5px;
}
.o-price {
  color: #999;
  font-size: 12px;
  margin-right: 5px;
  /* 给文字加上删除 */
  text-decoration-line: line-through;
}
.discount {
  background-color: var(--color-text);
  color: #fff;
  font-size: 12px;
  padding: 5px 8px;
  border-radius: 20px;
}
.info-other {
  display: flex;
  padding: 20px 5px 10px;
  justify-content: space-between;
  border-bottom: 1px solid #eaeaea;
}

.info-service {
  display: flex;
  justify-content: space-between;
  padding: 20px 5px;
  border-bottom: 1px solid #EAEAEA;
}

.info-service-item {
  font-size: 14px;
}
.info-service-item img {
  width: 14px;
  height: 14px;
  /* 如果处于相同行时，这个属性可以使 img 和 span 水平对齐 */
  vertical-align: middle;
}
.info-service-item span {
  /* 如果处于相同行时，这个属性可以使 img 和 span 水平对齐 */
  vertical-align: middle;
}
</style>