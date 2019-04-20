
#wrapper{float:left;width:100%;}  
#content{margin:0 25%;}  
#navigation{float:left;width:25%;margin-left:-100%;}  
#extra{float:left;width:25%;margin-left:-25%;}  


目前只知道float在绝对定位和display为none时不生效



display:-webkit-box;
    
    <style type="text/css">
    
    .box{
    
    display: -webkit-box;
    
    }
    
    .left,.right {
    
       padding: 5px;
    
       border: 1px solid #333;
    
       }
    
    </style>
    
    <div class="box">
    
       <div class="left">第一个div<br /><br /><br /></div>
    
       <div class="right">第二个div</div>
    
    </div>


display:table-cell;


    <style>
    
    .left,.right{
    
    display: table-cell;
    
    border:1px solid #333;
    
    padding:5px
    
    }
    
    </style>
    
    <div class="left">心心相惜<br /><br /><br /></div>
    
    <div class="right">哈哈哈哈哈</div>


3、父级div定义 overflow:hidden
对父级CSS选择器加overflow:hidden样式，可以清除父级内使用float产生浮动。优点是可以很少CSS代码即可解决浮动产生。

2、clear:both清除浮动
这个css clear清除float产生浮动，可以不用对父级设置高度 也无需计算父级高度，方便适用，但会多加CSS和HTML标签。

1、对父级设置适合CSS高度

小结，使用设置高度样式，清除浮动产生，前提是对象内容高度要能确定并能计算好

