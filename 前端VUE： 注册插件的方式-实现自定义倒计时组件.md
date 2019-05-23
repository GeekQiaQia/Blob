每天都要学习一点点啊
## 开发需求：发送验证码后倒计时提示

![](https://user-gold-cdn.xitu.io/2019/5/23/16ae28a91c1dc368?w=340&h=290&f=png&s=11453)

## 自定义组件的方式

    function install(Vue,options={}){
         
        }
    export default install
## 全局注册自定义组件

通过Vue.use();

main.js
    
    import countDown from './components/common/countDown'
    Vue.use(countDown);
## 页面刷新不影响倒计时状态
 原理：本地存储
 
 主要通过localStorage()存储当前countdown倒计时时间状态；
 
## 自定义组件代码细节

talk is cheap,show me the code

![](https://user-gold-cdn.xitu.io/2019/5/23/16ae278eb389d333?w=939&h=299&f=png&s=17059)

### countDown.vue
    
    <template>
        <div class="counter">
            <span>{{timeCounter<10&&timeCounter>0?"0"+timeCounter:timeCounter}}</span>{{tips}}
        </div>
    </template>
    
    <script>
        export default {
            name: "countDown",
            props:['seconds','name','tips'],
            data() {
                return {
                    timeCounter:0
                }
            },
            methods: {
                timeCount(){
                    //
                    let startTime=localStorage.getItem(`_${this.name}_`);
                    let nowTime= new Date().getTime();
                    if(startTime){
                        let counter=this.seconds-parseInt((nowTime-startTime)/1000 ,10);
                        this.timeCounter=counter<0?0:counter;
                    }else{
                        this.timeCounter=this.seconds;
                        localStorage.setItem(`_${this.name}_`,nowTime);
                    }
                    let timer=setInterval(()=>{
                        if(this.timeCounter>0&&this.timeCounter<=this.seconds){
                            this.timeCounter--;
                        }else{
                            localStorage.removeItem(`_${this.name}_`)
                            clearInterval(timer);
                            this.onTimeout();
                        }
                    },1000)
                },
                onTimeout(){
                    this.$emit("onTimeout");
                }
                   },
            computed: {},
            watch: {},
            created: function () {
            },
            mounted: function () {
                this.timeCount();
                },
            updated: function () {
    
            }
        }
    </script>
    
    <style scoped>
    
    </style>
    
### countDown.js

    import countDown from './countDown.vue'

    function install(Vue,options={}){
        Vue.component('count-down', countDown)
    }
    export default install
    if(typeof module==="object"&&module.exports){
        module.exports.install=install;
    }
    
## 如何使用vue倒计时countdown自定义组件

     <count-down v-if="hasSendCode"  @onTimeout="handleTimeout" seconds="60" name="getCode" tips="s后重新发送"></count-down>
        
        接口定义：
        onTimeout         当倒计时结束以后调用的函数
        seconds           自定义倒计时时间
        name              当前倒计时名称
        tips              自定义提示内容
        
        类定义：
        counter           根据UI设计需求自定义样式
        

举例：

    // 举例：倒计时结束执行函数处理；
    handleTimeout(){
      console.log("timeout of the clock");
      this.hasSendCode=!this.hasSendCode;
    }
        
    //举例：axios post请求过程中对hasSendCode 状态的处理,判断是否显示倒计时
     getverifyCode(reqData)
              .then(res=>{
                if(res.data&&res.data.CODE==="1007"){
                  this.hasSendCode=false;
                  this.$message({
                    message:"该手机号尚未注册！",
                    type:"warning"
                  });
                }else if(res.data.CODE==="200"){
                  this.hasSendCode=true;
                  this.$message({
                    message:"手机验证码发送成功，请在规定时间内完成验证",
                    type:"success"
                  });
                }
              })
              .catch(err=>{
                console.log(err);
                this.hasSendCode=false;
                this.$message({
                  message:err.toString(),
                  type:"error"
                });
              });
    
[github地址](https://github.com/GeekQiaQia/vueJS-countDown)
大家可以提出自己的需求和存在的问题，我们共同完善
    
    
    
    