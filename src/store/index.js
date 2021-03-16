import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import  actions  from "./actions";
import getters from "./getters";

// 1。安装插件
Vue.use(Vuex)

// 2.创建Store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
    // mutations唯一的目的就是修改state中状态
    // mutations 中的每个方法尽可能完成的事件比较单一一点
    
    // addCart(state,payload) {
      // payload为新添加的商品
      // let oldProduct = null;
      // for(let item of state.cartList) {
      //   if (item.iid == payload.iid) {
      //     oldProduct = item;
      //   }
      // }

    //   // 1.查找之前数组中是否有该商品
    //   let oldProduct = state.cartList.find(item => item.iid === payload.iid);
      
    //   // 2.判断oldProduct
    //   if (oldProduct) {
    //     oldProduct.count += 1
    //   } else {
    //     payload.count = 1
    //     state.cartList.push(payload)
    //   }
    //   console.log(state.cartList);
    // }
})

// 3.挂载到vue实例上
export default store