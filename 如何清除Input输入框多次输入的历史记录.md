## h5 如何清除Input输入框多次输入的历史记录？

### 前言

#### **定义和用法**

**autocomplete 属性**规定输入字段是否应该启用自动完成功能。

自动完成**允许浏览器**预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。

注释：

    autocomplete 属性适用于 <form>，以及下面的 <input> 类型：
    text, search, url, telephone, email, password, datepickers, range 以及 color。


#### **语法：**

    <input autocomplete="value">

    属性值
    值	描述
    on	默认。规定启用自动完成功能。
    off	规定禁用自动完成功能。
    
#### **举例**
 在以下代码中：启用了自动完成功能的表单，但是在type="email"中，禁用了自动完成功能：
 
<form action="demo_form.asp" method="get" autocomplete="on">
  First name:<input type="text" name="fname" /><br />
  Last name: <input type="text" name="lname" /><br />
  E-mail: <input type="email" name="email" autocomplete="off" /><br />
  <input type="submit" />
</form>


    <form action="demo_form.asp" method="get" autocomplete="on">
      First name:<input type="text" name="fname" /><br />
      Last name: <input type="text" name="lname" /><br />
      E-mail: <input type="email" name="email" autocomplete="off" /><br />
      <input type="submit" />
    </form>
    
## 原理是什么？

 autocomplete 属性是 HTML5 中的新属性。   
 
 
* 当 属性value="on"时候，将启用自动完成功能，浏览器将历史输入值缓存，方便客户下次快速选择输入历史记录；
 
* 当 属性value="off"时候，将关闭自动完成功能，这时候，可以防止浏览器软件或者恶意插件对拦截获取客户历史输入记录；防止泄密；





