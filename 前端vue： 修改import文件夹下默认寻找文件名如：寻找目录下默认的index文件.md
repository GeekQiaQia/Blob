在配置文件package.js 文件中:

设置在import router from './router';里面写的是一个文件夹的名字,而不是具体的文件的时候，让它指定去寻找默认文件名文件；例如：index.ts;

如下图所示:
![](https://user-gold-cdn.xitu.io/2019/10/17/16dd7b721ea595f3?w=1382&h=878&f=png&s=126671)
* 1、只需要修改package.json文件中的“main”属性值，“main”:"./index";
* 2、此时引用文件 import router from './router';就会自动寻找./router路径下index.ts文件：

如下图所示：
![](https://user-gold-cdn.xitu.io/2019/10/17/16dd7b5c43e77037?w=1282&h=863&f=png&s=91318)