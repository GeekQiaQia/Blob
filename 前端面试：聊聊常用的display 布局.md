  第一个案例是让两个元素分别向左和向右对齐，如果是过去，我一定会用float来实现，但其实用table可以这么做：

    

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
* {
    box-sizing: border-box;
}
.content {
    display: table;
    border: 1px solid #06c;
    padding: 15px 5px;
    max-width: 1000px;
    margin: 10px auto;
    min-width: 320px;
    width: 100%;
}
.box {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    text-align: center;
    display: inline-block;
    font-size: 40px;
    line-height: 100px;
}
.right {
    text-align: right;
    display: table-cell
}
.left {
    text-align: left;
    display: table-cell
}
　

<div class="content">
    <div class="left">
        <div class="box">B</div>
    </div>
    <div class="right">
        <div class="box">A</div>
    </div>
</div>

<div class="outter">
        <div class="inner inner1">1</div>
        <div class="inner inner2">2</div>
        <div class="inner inner3">3</div>
</div>
1
2
3
4
5
.outter{
    background: pink;
    width:500px;
    height: 200px;
    display:table;
    margin:0 auto;
}
.outter .inner{height: 100px;color:#fff;display: table-cell; vertical-align: middle;}
.inner1{background: purple;}
.inner2{background: red;}
.inner3{background: green;}
--------------------- 
作者：做枚温婉的妹纸吧哈哈 
来源：CSDN 
原文：https://blog.csdn.net/vivianhope/article/details/47999211 
版权声明：本文为博主原创文章，转载请附上博文链接！