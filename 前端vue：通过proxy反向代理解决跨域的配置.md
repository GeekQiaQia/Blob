vue.config.js

     // 开启反向代理
        devServer: {
            open:true,
            host:'localhost',
            port: 8080, // 端口
            https:false,
            hotOnly:false,
            // 通过反向代理解决跨域设置
            /**
             * @description:
             *          讲解举例：用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替；
             *          比如：需要请求接口：https://www.easy-mock.com/api/rest/login ；只需要调用/api/rest/login
             *                axios.post("/api/rest/login",params)
             * */
            proxy: {
             // 配置跨域
    
                '/api':{
                    //target:'https://www.easy-mock.com', // 设置代理
                   // target:'https://vuets-api.herokuapp.com/api/',
                    target:'http://10.10.29.26:8882',  // 代理的接口域名以及端口号；
                    ws:true,   // 支持ws协议；websocket的缩写；
                    changeOrigin:true,// 是否跨域
                    pathRewrite:{     // 路径替换
                        '^/api':''
                    }
                }
            }
        }
        
        
![](https://user-gold-cdn.xitu.io/2019/10/29/16e16f4f75c93bd7?w=1450&h=901&f=png&s=137651)

[github: Vue-TypeScript项目示例](https://github.com/GeekQiaQia/vueWithTSPro.git)