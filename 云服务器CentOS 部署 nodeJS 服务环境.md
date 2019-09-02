## 登录

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf1a373ec80d86?w=2344&h=668&f=png&s=78953)
* 选择一种登录方式；

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf1a40f5eb8d86?w=729&h=458&f=png&s=29996)
* 选择密码登录

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf1a4c1117dda7?w=2542&h=1275&f=png&s=95020)

## 更新系统和安装 git、vim、curl
    yum update -y
    yum install curl git -y
## 通过nvm 安装Node.js

* 安装nvm

        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
* 验证安装是否成功

       source ~/.bashrc
        nvm --version
看到输出版本信息 0.33.5 表示安装成功
*   查看最新 8.x 版本 Node.js 版本并安装

        nvm ls-remote
        nvm install v8.2.1
        node -v
看到输出版本信息 v8.2.1 表示安装成功
## 安装 MySQL 5.7

        yum install https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm -y
        yum install mysql-community-server -y
 * 启动 mysql
 
        systemctl start mysqld
        systemctl enable mysqld
![](https://user-gold-cdn.xitu.io/2019/9/2/16cf17f3c25c9830?w=1366&h=158&f=png&s=21343)
 * 查找 root 的初始密码
 
        cat /var/log/mysqld.log | grep password
* 更改密码

      mysql_secure_installation
回车后输入查找到的密码，然后按照料提示更改密码

**注意新密码必须包含特殊字符、数字、和大小写字母且不得少于8位，否则更改失败。**
![](https://user-gold-cdn.xitu.io/2019/9/2/16cf17dfe15c68d6?w=1324&h=837&f=png&s=75839)

* 验证 mysql 是否安装成功

        mysql -uroot -p
    
![](https://user-gold-cdn.xitu.io/2019/9/2/16cf17fe031fcf54?w=1515&h=264&f=png&s=27372)
* exit 退出数据库操作
![](https://user-gold-cdn.xitu.io/2019/9/2/16cf1810f74dbae5?w=1541&h=736&f=png&s=87227)

## 开始运行nodeJS 服务；
* 下载 项目 的源码

        mkdir /var/www
        cd /var/www
        git clone https://github.com/sourceName/projectName
* 如果是国内推荐使用淘宝镜像
    
        npm config set registry https://registry.npm.taobao.org
        
        npm config get registry https://registry.npm.taobao.org

* 全局安装ThinkJS 命令（以thinkJS 框架为例）

       npm install -g think-cli
        thinkjs --version
*  安装依赖    

        cd /var/www/projectName
        npm install
 * 创建输入库并导入数据库
 
        mysql -uroot -p -e "create database databaseName character set utf8mb4"
        mysql -uroot -p 密码 < /var/www/projectName/sqlName.sql

* 修改 Nideshop 的数据库配置

        vim src/common/config/database.js
    输入 i  进入编辑状态，修改成功后 wq 保存退出；
* 编译项目

       npm run compile
* 以生产模式启动

        node production.js
* 打开另一个终端验证是否启动成功
    
        curl -I http://127.0.0.1:8360/

输出 HTTP/1.1 200 OK，则表示成功

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf1b4a215fa6da?w=1401&h=156&f=png&s=15986)

