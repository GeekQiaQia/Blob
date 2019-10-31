**举例如下所示：**

formatAmount()方法为金额千分位格式化函数：如200000.00 格式化为：200,000.00
    [金额千分位格式化函数](https://juejin.im/post/5dbab1caf265da4cf77c86d0)
## 第一种解决方案或者思路：
### 如果只需要监听对象中的一个属性的情况下：
*    可以通过computed:作为中间层，当对象newAddData.ticketAmountTotal属性发生变化大时候，
    对实时计算得到的ticketAmountTotal，进行watch监听,
     当实例对象中的ticketAmountTotal发生改变的时候，执行handler(newValue,oldValue)函数;
 #### 通过computed:作为中间层进行监听；
example.vue:
     
     <template>
     <div>
      <span style="display: inline-block;width:235px;text-align: center">金额:{{formatTicketAmount }}元 </span>
     </div>
     </template>
     
     <scritp>
      export default {
     data(){
         return{
             newAddData:{
                 ticketAmountTotal:20000.00
             }，
             formatTicketAmount:"0"
         }
     }
         computed:{
             ticketAmountTotal(){
          return this.newAddData.ticketAmountTotal;
        },
         },
           watch: {
            ticketAmountTotal: {
              handler(newValue, oldValue) {
                console.log(newValue);
                console.log(oldValue);
                this.formatTicketAmount = commonFun.formatAmount(newValue);
              },
              deep: true
            },
        }
     }
     
     </script>
     
## 第二种解决方案/思路
### deep属性
* 当需要监听一个对象的改变时，普通的watch方法无法监听到对象内部属性的改变，只有data中的数据才能够监听到变化，此时就需要deep属性对对象进行深度监听
* 设置deep: true 可以监听到newAddData.ticketAmountTotal属性的变化，此时会给newAddData的所有属性都加上这个监听器，当对象属性较多时，每个属性值的变化都会执行handler。如果只需要监听对象中的一个属性值，则可以做以下优化：使用字符串的形式监听对象属性：
#### 所有属性都进行监听
    example.vue: **所有属性都进行监听**
         
         <template>
         <div>
          <span style="display: inline-block;width:235px;text-align: center">金额:{{formatTicketAmount }}元 </span>
         </div>
         </template>
         
         <scritp>
          export default {
         data(){
             return{
                 newAddData:{
                     ticketAmountTotal:20000.00
                 }，
                 formatTicketAmount:"0"
             }
         }
    
               watch: {
                newAddData: {
                  handler(newValue, oldValue) {
                    console.log(newValue);
                    console.log(oldValue);
                    this.formatTicketAmount =commonFun.formatAmount(newValue.ticketAmountTotal) ;
                  },
                  deep: true
                },
            }
         }
         
         </script>
     
#### 使用字符串的形式监听指定对象属性
     example.vue:**使用字符串的形式监听对象属性**：
       
         <template>
         <div>
          <span style="display: inline-block;width:235px;text-align: center">金额:{{formatTicketAmount }}元 </span>
         </div>
         </template>
         
         <scritp>
          export default {
         data(){
             return{
                 newAddData:{
                     ticketAmountTotal:20000.00
                 }，
                 formatTicketAmount:"0"
             }
         }
    
               watch: {
                'newAddData.ticketAmountTotal': {
                  handler(newValue, oldValue) {
                    console.log(newValue);
                    console.log(oldValue);
                    this.formatTicketAmount = commonFun.formatAmount(newValue);
                  },
                  deep: true
                },
            }
         }
         
         </script>


