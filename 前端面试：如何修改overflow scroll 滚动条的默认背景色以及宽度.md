# 如何修改overflow:scroll 滚动条的默认背景色以及宽度；
使用-webkit-scrolbar 自定义样式；


**talk is cheap ,show me the code:**

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
  
</head>
<style>
    /**
	  使用CSS自定义样式
	*/
    /*定义了滚动条整体样式；*/ 
	::-webkit-scrollbar{
          height: 28px !important;
		width: 28px !important;
        }
		
    /*定义了滚动条滑块的样式*/
        ::-webkit-scrollbar-thumb {
              border-radius: 0;
			border-style: dashed;
			background-color: rgba(12, 80, 235, 0.4);
			border-color: #e2242400;
			border-width: 1.5px;
			background-clip: padding-box;
        }
		
		/*定义了轨道的样式*/ 
		
		::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #EDEDED;
    }	
    ::-webkit-scrollbar-thumb:hover {
            background: rgba(157, 165, 183, 0.7)
        }

    .container{
		width:500px;
		height:500px;
		background:yellow;
		overflow:scroll;
	}
	.content{
		width:600px;
		height:600px;
		font-size:32px;
	
		
	}
</style>
<body>
<div class="container">
  <div class="content">
    所有主流浏览器都支持 overflow 属性。
	
注释：任何的版本的 Internet Explorer （包括 IE8）都不支持属性值 "inherit"。
定义和用法
overflow 属性规定当内容溢出元素框时发生的事情。

说明
这个属性定义溢出元素内容区的内容会如何处理。如果值为 scroll，不论是否需要，
用户代理都会提供一种滚动机制。因此，有可能即使元素框中可以放下所有内容也会出现滚动条。
visible	默认值。内容不会被修剪，会呈现在元素框之外。
hidden	内容会被修剪，并且其余内容是不可见的。
scroll	内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
auto	如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
inherit	规定应该从父元素继承 overflow 属性的值。

  </div> 
</div>

</body>
</html>

### code：
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Title</title>
      
    </head>
    <style>
    /**
    	  使用CSS自定义样式
    	*/
    /*定义了滚动条整体样式；*/ 
    	::-webkit-scrollbar{
      height: 28px !important;
    		width: 28px !important;
    }
    		
    /*定义了滚动条滑块的样式*/
    ::-webkit-scrollbar-thumb {
      border-radius: 0;
    			border-style: dashed;
    			background-color: rgba(12, 80, 235, 0.4);
    			border-color: #e2242400;
    			border-width: 1.5px;
    			background-clip: padding-box;
    }
    		
    		/*定义了轨道的样式*/ 
    		
    		::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #EDEDED;
    }	
    ::-webkit-scrollbar-thumb:hover {
    background: rgba(157, 165, 183, 0.7)
    }
    
    .container{
    		width:500px;
    		height:500px;
    		background:yellow;
    		overflow:scroll;
    	}
    	.content{
    		width:600px;
    		height:600px;
    		font-size:32px;
    	
    		
    	}
    </style>
    <body>
    <div class="container">
      <div class="content">
    所有主流浏览器都支持 overflow 属性。
    	
    注释：任何的版本的 Internet Explorer （包括 IE8）都不支持属性值 "inherit"。
    定义和用法
    overflow 属性规定当内容溢出元素框时发生的事情。
    
    说明
    这个属性定义溢出元素内容区的内容会如何处理。如果值为 scroll，不论是否需要，
    用户代理都会提供一种滚动机制。因此，有可能即使元素框中可以放下所有内容也会出现滚动条。
    visible	默认值。内容不会被修剪，会呈现在元素框之外。
    hidden	内容会被修剪，并且其余内容是不可见的。
    scroll	内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
    auto	如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
    inherit	规定应该从父元素继承 overflow 属性的值。
    
      </div> 
    </div>
    
    </body>
    </html>
    
