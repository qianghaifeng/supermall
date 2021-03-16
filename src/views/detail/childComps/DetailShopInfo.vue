<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="" />
      <span class="shop-title">{{ shop.name }}</span>
    </div>
    <div class="shop-detail">
      <div class="shop-middle-left">
        <div class="info-sells">
          <div class="sell-count">
            {{ shop.sells | sellCountFilter}}
          </div>
          <div class="sell-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="good-count">
            {{ shop.goodsCount }}
          </div>
          <div class="good-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-right">
        <table>
          <tr v-for="item in shop.score" :key="item.index">
            <td>{{ item.name }}</td>
            <td :class="{ 'score-better':item.isBetter }">{{ item.score }}</td>
            <td :class="{'better-more': item.isBetter}">{{ item.isBetter ? "高" : "低" }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter(value) {
      let result = value;
      if (result > 10000) {
        result = (result / 10000).toFixed(1) + '万';
      }
      return result;
    }
  }
};
</script>

<style scoped>
.shop-info {
  padding: 20px 15px;
}
.shop-top span {
  font-size: 20px;
  margin-left: 8px;
  vertical-align: middle;
}
.shop-top img {
  width: 60px;
  height: 60px;
  vertical-align: middle;
  border-radius: 30px;
}
.shop-top {
  margin-bottom: 40px;
}
.shop-detail {
  display: flex;
  justify-content: space-around;
}
.shop-middle-left {
  display: flex;
}
.info-sells {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.sell-count {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
}
.sell-text {
  font-size: 14px;
}
.info-goods {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: 10px;
}
.good-count {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
}
.good-text {
  font-size: 14px;
}
.score-better {
  color: var(--color-text);
}
.better-more {
  background-color: var(--color-text);
  color: #fff;
}
</style>