<template>
  <div class="cart-list">
   <scroll class="content" ref="scroll">
     <cart-list-item v-for="item in cartList" :key="item.index" :product="item"/>
   </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';
import CartListItem from './CartListItem';
import { mapGetters } from 'vuex';

export default {
  components: { 
    Scroll,
    CartListItem,
  },
  name:'CartList',
  data() {
    return {

    }
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  computed: {
    ...mapGetters({
      cartList:'cartList'
    })
  }
  }
</script>

<style scoped>
.content {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 89px;
  top: 44px;
}
</style>