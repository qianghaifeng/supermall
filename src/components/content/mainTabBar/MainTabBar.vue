<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <img src="~assets/img/tabbar/home.png" slot="item-icon" />
        <img src="~assets/img/tabbar/home_1.png" slot="item-icon-active" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img src="~assets/img/tabbar/bill.png" slot="item-icon" />
        <img src="~assets/img/tabbar/bill_1.png" slot="item-icon-active" />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img src="~assets/img/tabbar/message.png" slot="item-icon" />
        <img src="~assets/img/tabbar/message_1.png" slot="item-icon-active" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img src="~assets/img/tabbar/me.png" slot="item-icon" />
        <img src="~assets/img/tabbar/me_1.png" slot="item-icon-active" />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar"
import TabBarItem from "../../common/tabbar/TabBarItem"
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  },
};
</script>

<style>
  
</style>
