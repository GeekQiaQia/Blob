
# 如何使元素居中：

## 水平居中：
针对inline, 内联块inline-block, 内联表inline-table, inline-flex元素及    img,span,button等元素

    .text_div{
    	text-align:center;
    }
    

## 垂直居中：
- 单行内联(inline-)元素垂直居中 

通过设置内联元素的高度(height)和行高(line-height)相等，从而使元素垂直居中。


    .text_div{
    height: 120px;
    line-height: 120px;
    }


- flex布局
- 
    .center-flex {
    display: flex;
    flex-direction: column;//上下排列
    justify-content: center;
    }


## 垂直水平居中：
- flex 布局；
-

    .parent {
    
    display: flex;
    justify-content: center;
    align-items: center;
    }