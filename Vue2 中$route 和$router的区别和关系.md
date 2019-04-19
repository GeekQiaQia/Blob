这是因为，params只能用name来引入路由，下面是正确的写法：

复制代码
this.$router.push({
   name:"detail",
   params:{
    name:'nameValue',
    code:10011
 }
});
复制代码

query要用path来引入，params要用name来引入，

已经是$route而不是$router了哦！！


在vue2.0里页面参数是 this.$route.query或者 this.$route.params 接收router-link传的参数。

在路由跳转的时候除了用router-link标签以外需要在script标签在事件里面跳转，所以有个方法就是在script标签里面写this.$router.push('要跳转的路径名')，
--------------------- 


$route为当前router跳转对象里面可以获取name、path、query、params等

$router为VueRouter实例，想要导航到不同URL，则使用$router.push方法

返回上一个history也是使用$router.go方法