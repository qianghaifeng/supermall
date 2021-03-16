<template>
  <div id="cart">
    <nav-bar class="nav-bar">
    <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import { mapGetters } from 'vuex';
import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';
export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  name:'Cart',
  data() {
    return {

    }
  },
  computed: {
    // cartLength() {
    //   return this.$store.state.cartList.length;
    // }
       // 两种语法
    ...mapGetters(['cartLength','cartList'])
  }
   
    // ...mapGetters({
    //   length:'cartLength',
    //   list:'cartList'
    // })
 
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-text);
    color: #fff;
  }
</style>
