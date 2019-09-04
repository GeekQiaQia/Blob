[UmiJS 入门教程](https://umijs.org/zh/guide/getting-started.html#%E8%84%9A%E6%89%8B%E6%9E%B6)

[Ant Design Pro 入门教程](https://pro.ant.design/docs/getting-started-cn)


Ant Design Pro教程写的挺好，但是新手在入门的时候，会遇到各种奇葩的问题；本人在windows 系统；安装部署的时候，出现了一系列的抓狂的问题；总结分享以便重复采坑；

**yarn**和**npm**是两家不同的包管理工具；尽管官网推荐使用yarn,但是我已经习惯了npm,本人推荐npm;
 ## 安装
 #### 默认你本地已安装好node和git环境
    
    npm init
    npm install create-umi -g
    ps:(npm create umi/yarn crete umi 在windows 系统可能会出现“文件名、目录名或卷标语法不正确”的提示)  

![](https://user-gold-cdn.xitu.io/2019/9/4/16cfbd27a7d6657a?w=1662&h=164&f=png&s=20041)

  * 新建项目名为：antDPro；

        E:\github\geekantDPro>create-umi antDPro
        ? Select the boilerplate type (Use arrow keys)
        > ant-design-pro  - Create project with a layout-only ant-design-pro boilerplate, use together with umi block.
          app             - Create project with a simple boilerplate, support typescript.
          block           - Create a umi block.
          library         - Create a library with umi.
          plugin          - Create a umi plugin.

* 选择开发语言

![](https://user-gold-cdn.xitu.io/2019/9/4/16cfa5b69308f765?w=1557&h=223&f=png&s=20270)

* 报错: git clone https://github.com/ant-design/ant-design-pro --depth=1  antDPro

![](https://user-gold-cdn.xitu.io/2019/9/4/16cfa5d5b5a3b44b?w=1513&h=234&f=png&s=28475)

* 在新建目录cd antDPro ,打开gitBash;执行git clone --depth=1 https://github.com/ant-design/ant-design-pro.git antDPro


![](https://user-gold-cdn.xitu.io/2019/9/4/16cfa6c47bb572a4?w=595&h=146&f=png&s=22714)

* 执行npm install 下载依赖；npm run start;启动项目；

![](https://user-gold-cdn.xitu.io/2019/9/4/16cfa73970628072?w=595&h=376&f=png&s=46876)

* 启动完成后会自动打开浏览器访问 http://localhost:8000，你看到下面的页面就代表成功了。

![](https://user-gold-cdn.xitu.io/2019/9/4/16cfa75b8b8a522e?w=2556&h=1299&f=png&s=106229)
