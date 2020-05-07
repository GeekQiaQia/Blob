[官方参考](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)

[github示例](https://github.com/GeekQiaQia/wxComponents)

    系统：windows
    开发工具：微信开发者工具Nightly v1.02.2004102

## 微信小程序自定义tabbar，

 ### 详细如[官方教程](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)如上所述：

* step1: 在app.json中将**custom**字段设置为**true**,即为自定义模式；false为默认模式；
* step2:其余 tabBar 相关配置**list:[]**等也补充完整。
* step3:所有 tab 页的 json 里需声明 **usingComponents** 项，也可以在 app.json 全局开启。
* step4:在项目根目录自定义组件：custom-bat-bar文件夹；如下图所示：

![](https://user-gold-cdn.xitu.io/2020/5/7/171eea362eb32a6d?w=1609&h=877&f=png&s=430221)
## 问题：以上所有的配置都没有问题的情况下，自定义babbar就是不显示；如下图所示：
![](https://user-gold-cdn.xitu.io/2020/5/7/171ee9b9666405d7?w=1615&h=896&f=png&s=389973)
## 分析排查问题：
* step1: 在app.json中将**custom**字段设置为**false**为默认模式，此时tabbar显示没有问题，说明资源没有问题；
* step2:可能由于微信开发者工具存在遗留**bug**;
    * 检查project.config.json配置文件，libVersion：**2.4.2**版本有问题； 
    * 将以上配置改为"libVersion": "**2.5.0**",或者官方demo片段中该字段的最新版本；
## 自定义tabbar正常显示：
![](https://user-gold-cdn.xitu.io/2020/5/7/171eeda4fd6d3dfe?w=1613&h=929&f=png&s=409118)

[github示例](https://github.com/GeekQiaQia/wxComponents)