---
theme: mk-cute
highlight: atelier-lakeside-dark
---
# [windows 命令- robocopy](<https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/robocopy>)
## 问题背景
  由于在前端项目执行publicDir 设置的时候，执行`npm run build`产生无限嵌套的`dist`文件夹，此时使用`delete`/或各种`文件粉碎机`都无法删除文件到垃圾桶，
如图所示：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5707e6c6e95d41bd85b8431270c9bb6b~tplv-k3u1fbpfcp-watermark.image)

## 解决方案
* 在无限嵌套的文件夹`dist`同级目录下新建`EmptyFile`文件夹


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2d1367f1d7c4bb28142fed5b9980b62~tplv-k3u1fbpfcp-watermark.image)

* 在cmd命令行中执行 
```
Robocopy /MIR EmptyFile dist
```
## 命令解释
* `RoboCopy`是一个命令行的目录复制命令。 

          #!命令：Robocopy /MIR source destination 

* 其中`/MIR`表示（mirror）镜像目录树，意思为复制子目录，包括空的子目录和删除源中不再存在的目标文件/目录。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03b51cc1dda947f98c72bc698b4b0f70~tplv-k3u1fbpfcp-watermark.image)
