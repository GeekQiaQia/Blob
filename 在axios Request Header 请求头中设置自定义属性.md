    在axios Request Header 请求头中设置自定义属性

        import axios from 'axios';

* 在Request Header中设置key值为token的header属性;
   
        examples:

         axios.defaults.headers.common['token'] = “token value”
        
        dynamic examples:
      
         toGenereateToken(){
          generateToken()
                  .then(res => {
                    if (res && res.data && res.data.code == 200) {
                      console.log(res.data.result);
                      axios.defaults.headers.common['token'] = res.data.result;
                     
                    } else {
                      this.$message({
                        message: res.data.message,
                        type: "error"
                      });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                    this.$message({
                      message: tips.serverErrorTip,
                      type: "error"
                    });
                  });
        },
        
        

![](https://user-gold-cdn.xitu.io/2019/9/16/16d3831830e70058?w=1566&h=185&f=png&s=27426)

* 删除Request Header中设置的key值；

  
    
        delete  axios.defaults.headers.common['Authorization'] ;
    

![](https://user-gold-cdn.xitu.io/2019/9/16/16d3832327617b07?w=1591&h=209&f=png&s=32177)