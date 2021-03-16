import Toast from './Toast'

const  obj = {}

// 当main中 执行到use()就开始调用传入的函数的 install 函数，并且会传过来一个参数 vue
obj.install = function(Vue) {

    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast);

    // 2.new的方法，根据组件构造器，可以创建一个组件对象
    const toast = new toastContrustor();

    // 3.将组件对象手动的挂载某一个元素上
    toast.$mount(document.createElement('div'));

    // 4.total.$el对应的就是div
    document.body.appendChild(toast.$el);

    Vue.prototype.$toast = toast;

}

export default obj