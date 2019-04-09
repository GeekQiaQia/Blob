### 问题（issue）： vuex 是通过什么样的方式提供响应式数据的？


 

###  问题（issue）： $store 是如何挂载到实例this上的？   

    import Vuex from 'vuex'
    import Vue from 'vue'
    import App from './App.vue'
    
    Vue.use(Vuex);
    
    const store=new Vuex.Store({});
    
    new Vue({
    store,
    render:h=>h(App),
    }).$mount('#App');
    
