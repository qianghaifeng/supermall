<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="secetedAll" @click.native="checkClick"/>
      <span class="select-all">全选</span>
    </div>
    <div class="total-price">
      总计: {{totalPrice}}
    </div>
    <div class="cacluate" @click="caclClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/common/checkButton/CheckButton';
import { mapGetters } from 'vuex';

export default {
  name:'CartBottomBar',
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      console.log(this.cartList);
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => {
        return item.checked
      }).length
    },
    secetedAll() {
      if (this.cartList.length === 0) {
        return false
      }

      // 1.使用filter
      // return !(this.cartList.filter(item => {
      //   return !item.checked
      // }).length)

      // 2.使用find
      return  !this.cartList.find(item => !item.checked)

      // 3.普通遍历
      // for(let item of this.cartList) {
      //   if (!item.checked) {
      //     return false
      //   }
      //   return true
      // }
    }
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    checkClick() {
      if (this.secetedAll) {  //全部选中
        this.cartList.forEach(item => item.checked = false)
      }else { //部分选中或者全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    caclClick() {
      this.count = 0;
      for(let item of this.cartList) {
        if (item.checked) {
          this.count++;
        }
      }
      if(this.count == 0) {
        this.$toast.show("请选择你要购买的商品");
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  position: absolute;
  display: flex;
  height: 40px;
  background-color: #eee;
  bottom: 49px;
  right: 0;
  left: 0;
  align-items: center;
}
.check-content {
  display: flex;
  align-items: center;
  height: 40px; 
  width: 60px;
  margin-left: 10px;
}
.select-all {
  margin-left: 10px;
}
.total-price {
  flex: 1;
  margin-left: 30px;
}
.cacluate {
  height: 40px;
  width: 90px;
  line-height: 40px;
  text-align: center; 
  color: #fff;
  background-color: var(--color-text);
}
</style>