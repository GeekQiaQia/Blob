## 什么是函数去抖（debounce）?

网上有段有趣的段子很能解释函数去动抖的现象：

假设你正在乘电梯上楼，当电梯门关闭之前发现有人也要乘电梯，礼貌起见，你会按下开门开关，然后等他进电梯； 如果在电梯门关闭之前，又有人来了，你会继续开门； 这样一直进行下去，你可能需要等待几分钟，最终没人进电梯了，才会关闭电梯门，然后上楼。

**所以debounce的作用是，**当调用动作触发一段时间后，才会执行该动作，若在这段时间间隔内又调用此动作则将重新计算时间间隔。

## 举例：
在开发过程中，最常见的场景是处理在input输入框中输入值防止抖动：

<input type="text" >显示输入<span id="inputContent"></span>

	<input type=text oninput="ontextInput(event)" value=0 />显示输入<span id="inputContent"></span>

    <script>
		function ontextInput(e){
			let value=e.target.value;
			
			clearTimeout(timer);
			let timer=setTimeout(function(){

			$("#inputContent")[0].textContent.textContent=value;

		},500);
	
		}
	</script>