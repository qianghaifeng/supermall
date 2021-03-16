import { ADD_COUNTER,ADD_TO_CART } from "./mutation-type";

export default {
  addCart(context,payload) {
    return new Promise((resolve,reject) => {
        // 1.查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
    // 2判断oldProduct
    if (oldProduct) {
      context.commit(ADD_COUNTER,oldProduct);
      resolve("添加的商品数量加1");
    }else {
      payload.count = 1
      context.commit(ADD_TO_CART,payload);
      resolve("添加一个新的商品");
    }
    reject("滴滴滴");
    })
  }
}