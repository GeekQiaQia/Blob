# elementUI 源码分析之dom.js;

## 前言：
    elementUI 中对dom样式的操作，使用了Web API接口中对element 对象的
    1.classList属性/className属性/contains等属性；

**科普：**

    Element.classList 是一个只读属性，返回一个元素的类属性的实时DOMTokenList 集合。

使用 classList 是替代element.className作为空格分隔的字符串访问元素的类列表的一种方便的方法

**方法**：
    
    add( String [, String] )
    添加指定的类值。如果这些类已经存在于元素的属性中，那么它们将被忽略。
    
    remove( String [,String] )
    删除指定的类值。
    
    item ( Number )
    按集合中的索引返回类值。
    
    toggle ( String [, force] )
    当只有一个参数时：切换 class value; 即如果类存在，则删除它并返回false，如果不存在，则添加它并返回true。
    当存在第二个参数时：如果第二个参数的计算结果为true，则添加指定的类值，如果计算结果为false，则删除它
    
    contains( String )
    检查元素的类属性中是否存在指定的类值。
    
    replace( oldClass, newClass )
    用一个新类替换已有类。   

## hasClass()

    /**
    
      判断element标签对象是否包含某一个类；
    */
  
         
        /* istanbul ignore next */
    export function hasClass(el, cls) {
      if (!el || !cls) return false;
      if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
      if (el.classList) {
        return el.classList.contains(cls);
      } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
      }
    };

 ## addClass()
 
        /* istanbul ignore next 
         向一个element 标签对象中添加一个类
        */
    export function addClass(el, cls) {
          if (!el) return;
          var curClass = el.className;
          var classes = (cls || '').split(' ');
    
      for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;
    
        if (el.classList) {
          el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
          curClass += ' ' + clsName;
        }
      }
      if (!el.classList) {
        el.className = curClass;
      }
    };
    
## removeClass()

        /**
         移除一个element 标签对象的class ;
        */
        /* istanbul ignore next */
    export function removeClass(el, cls) {
      if (!el || !cls) return;
      var classes = cls.split(' ');
      var curClass = ' ' + el.className + ' ';
    
      for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) continue;
    
        if (el.classList) {
          el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
          curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
      }
      if (!el.classList) {
        el.className = trim(curClass);
      }
    };
    
element.classsList /className 实练有助于理解哦   
![](https://user-gold-cdn.xitu.io/2019/4/23/16a499d8eb7680b1?w=553&h=20&f=png&s=4361)

    chrome console：
    
    var dom =document.getElementById("datatable")
 
    dom.classList
    
    DOMTokenList(3) ["barhide-x", "p-scrollbar", "bar-y", value: "barhide-x p-scrollbar bar-y"]0: "barhide-x"1: "p-scrollbar"2: "bar-y"length: 3value: "barhide-x p-scrollbar bar-y"]
    __proto__: DOMTokenList
    
    dom.className
    "barhide-x p-scrollbar bar-y"
    
    dom.classList.remove("bar-y");
  
    dom.classList
    
    DOMTokenList(2) ["barhide-x", "p-scrollbar", value: "barhide-x p-scrollbar"]0: "barhide-x"1: "p-scrollbar"length: 2value: "barhide-x p-scrollbar"__proto__: DOMTokenList
    
    dom.classList.remove("p-scrollbar");
    
    dom.classList.remove("barhide-x");
    
    dom.classList
    
    DOMTokenList [value: ""]length: 0value: ""__proto__: DOMTokenList
    
    dom.className
    ""

[参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)