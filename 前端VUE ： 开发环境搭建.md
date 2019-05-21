## 官网下载安装nodeJS

 官网地址：**https://nodejs.org/en/download/** 

并配置环境变量；
### 环境配置
- 在安装目录创建如下文件夹:

    node_cache node_global

![](https://user-gold-cdn.xitu.io/2019/5/20/16ad35baa2b9a56a?w=1014&h=613&f=png&s=106123)
- 环境配置主要配置的是npm安装的全局模块所在的路径，以及缓存cache的路径;
- cmd 执行如下命令：

        npm config set prefix "D:\Develop\nodejs\node_global"
        npm config set cache "D:\Develop\nodejs\node_cache"



![](https://user-gold-cdn.xitu.io/2019/5/20/16ad3113af1354bc?w=416&h=592&f=png&s=62715)

    D:\Program Files\nodejs\node_cache;D:\Program Files\nodejs\



![](https://user-gold-cdn.xitu.io/2019/5/20/16ad3143d46693c1?w=422&h=598&f=png&s=57005)

    D:\Program Files\nodejs\node_global\node_modules


![](https://user-gold-cdn.xitu.io/2019/5/20/16ad31382d1c68be?w=419&h=597&f=png&s=63600)

    D:\Program Files\nodejs\



## 修改npm的registry为淘宝镜像(npm.taobao.org)：

1.npm包使用阿里的淘宝源

直接在命令行设置

    npm config set registry https://registry.npm.taobao.org

检测是否成功

    npm config get registry
    
    https://registry.npm.taobao.org

## 安装vueJS 调试工具 devtools
- 下载压缩包 [https://github.com/vuejs/vue-devtools](https://github.com/vuejs/vue-devtools)
- 打开项目下载依赖执行npm install
- npm run build 
- 修改manifest.json 中的属性"persistent"：true
![](https://user-gold-cdn.xitu.io/2019/5/20/16ad33ceddfcf219?w=893&h=925&f=png&s=109876)
- 打开谷歌浏览器的扩展程序功能，勾选开发者模式
- 将shells>chorme文件夹直接拖到页面中，完成安装
![](https://user-gold-cdn.xitu.io/2019/5/20/16ad351c3f453fd3?w=1918&h=373&f=png&s=46039)

![](https://user-gold-cdn.xitu.io/2019/5/20/16ad353046e4c688?w=1918&h=830&f=png&s=80852)

**Now you kan create a new world!**

**你可以创造一个新世界了**
