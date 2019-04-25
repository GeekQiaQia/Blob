**readonly和disabled的区别**

readonly：
- 针对input(text / password)和textarea有效，在设置为true的情况下，用户可以获得焦点，但是不能编辑，在提交表单时，输入项会作为form的内容提交。

disabled：
- 针对所有表单元素（select，button，input，textarea等），在设置为disabled为true的情况下，表单输入项不能获得焦点，用户的所有操作无意义，在提交表单时，表单输入项不会被提交。

- disabled和readonly的文本输入框只能通过脚本进行修改value属性。

<form action="#" onsubmit="onSubmit(event)">
First name:<br>
<input type="text" name="firstname" readonly value="Mickey">
<br>
Last name:<br>
<input type="text" name="lastname" value="Mouse">
<br><br>
full name:<br>
<input type="text" name="fullname" disabled value="Mickey Mouse"> <br><br>
<input type="submit" value="Submit" >
</form> 

    <form action="#" onsubmit="onSubmit(event)">
    First name:<br>
    <input type="text" name="firstname" readonly value="Mickey">
    <br>
    Last name:<br>
    <input type="text" name="lastname" value="Mouse">
    <br><br>
    full name:<br>
    <input type="text" name="fullname" disabled value="Mickey Mouse"> <br><br>
    <input type="submit" value="Submit" >
    </form> 
点击button 如下：

    https://juejin.im/editor/drafts/5cc1d8ec5188252d710bc3ab?firstname=Mickey&lastname=Mouse#

