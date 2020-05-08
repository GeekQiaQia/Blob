[官方参考](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/01wxs-module.html)

[github示例](https://github.com/GeekQiaQia/wxComponents)
### wxs 的详细语法可参考[官方说明](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/01wxs-module.html)
### 划重点

*  .wxs 文件可以被其他的 .wxs 文件 或 WXML 中的 <wxs> 标签引用。
*  每个 wxs 模块均有一个内置的 module 对象。
*  exports: 通过该属性，可以对外共享本模块的私有变量与函数。
### 需求：
#### 在.wxml 文件开发的过程中，有需要对view层展示的数据做一些过滤显示，而不改变JS中源数据
如下图所示，在view层需要展示**金融学**的第一个字：

![](https://user-gold-cdn.xitu.io/2020/5/8/171f256a25186ba6?w=718&h=788&f=png&s=34615)

### step1: 在utils文件夹下建立common.wxs公用文件，定义tofiltFirstWord过滤函数

    function toFixed(num, bit = 0, isNum = false) {
      if (isNaN(num)) {
        return ''
      } else if (isNum) {
        return (num.toFixed(bit) - 0)
      } else {
        return num.toFixed(bit)
      }
    }
    
    function splice(str = '', start, end) {
      return str.slice(start, end)
    }
    
    function tofiltFirstWord(text){
    	if(text!==''&&text!==undefined){
    		var  firstWord=text.split('')[0];
    		return firstWord
    	}else{
    		return ;
    	}
    }
    
    module.exports = {
      toFixed: toFixed,
      tofiltFirstWord:tofiltFirstWord,
      splice: splice
    };
    
### step2：在需要过滤函数的.wxml文件中，引入.wxs模块，并定义引入模块名    
 如下图所示，在my-notebooks.wxml文件中，引入
    
    <wxs module="filter" src="../../utils/common.wxs"/>
并定义模块名为**filter**,在需要过滤的地方之间通过模块名调用.wxs中定义的过滤函数；

    {{filter.tofiltFirstWord("金融学")}}
![](https://user-gold-cdn.xitu.io/2020/5/8/171f25cde2838582?w=1574&h=787&f=png&s=123207)

根据业务需求，定义其他如时间格式，等过滤函数；

[github示例](https://github.com/GeekQiaQia/wxComponents)
