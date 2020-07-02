
![](https://user-gold-cdn.xitu.io/2020/6/22/172d9aede6a0d896?w=791&h=689&f=png&s=150596)
## 需求：
如上图所示：
* 当右边的页面点击“<button>转发笔记</button>”后，调用wx.navigateBack()退出**页面栈**,返回到上一级页面，即左边的页面；
* 返回到左边的页面后，需要重新刷新数据，发送api请求;
## 问题：
* 正常情况下，微信小程序的navigateBack导航接口不会引起生命周期函数的触发，无法传参，重新调用api请求接口，从而达到刷新数据的需求；
## 解决方案：
* 获取当前页面栈数组对象；
    *    let pages=getCurrentPages();
* 获取上一页页面的page对象：“beforePage”，在执行navigateBack之前，执行页面对象“**beforePage**”的请求api函数；
* 代码示例：

             // 返回到上个页面
			let pages=getCurrentPages();
				
			let beforePage=pages[pages.length-2];
			//getNoteDetail为上一个页面的刷新数据函数；
			beforePage.getNoteDetail(note);
			wx.navigateBack({
				delta:1,
			})
    