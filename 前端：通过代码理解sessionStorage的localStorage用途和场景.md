# 通过代码：
## 理解sessionStorage的localStorage用途和场景

### webstorage
 webstorage是本地存储，存储在客户端，包括localStorage和sessionStorage。

### localStorage
 - localStorage生命周期是永久；
 - 这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。
 - 存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

### sessionStorage
 - sessionStorage仅在当前会话下有效，关闭页面或浏览器后被清除。
 - 存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。
 - 源生接口可以接受，亦可再次封装来对Object和Array有更好的支持。

localStorage和sessionStorage使用时使用相同的API：

    sessionStorage.setItem("key","value")/getItem("key")/removeItem("key")/clear()；
	
以vuex中 module:site.js 为例：

	const state = {
	  auth: false,
	  token: 'N/A'
	};
	
	const getters = {
	  auth(state) {
	    let session;
	    if(!state.auth){
	      session=sessionStorage.getItem('auth')||[];
	      try{
	        session=JSON.parse(session);
	      }catch (e){
	        console.log(e.message);
	      }
	      return session;
	    }
	    return state.auth;
	  },
	
	  token(state) {
	    if(state.token==='N/A'){
	      state.token=localStorage.getItem('token')||'N/A';
	    }
	    return state.token;
	  }
	};
	
	const mutations = {
	  auth(state, auth) {
	    state.auth = auth;
	    sessionStorage.setItem('auth',JSON.stringify(auth));
	  },
	  logout(state){
	    state.auth=false;
	    sessionStorage.clear('auth');
	  },
	  token(state, token) {
	    state.token=token;
	    localStorage.setItem('token',token);
	  }
	};
	
	export default {
	  state,
	  getters,
	  mutations
	}

### Cookie

 - 生命期为只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
 - 存放数据大小为4K左右 。有个数限制（各浏览器不同），一般不能超过20个。
 - 与服务器端通信：**每次都会携带在HTTP头中，**如果使用cookie保存过多数据会带来性能问题。但Cookie需要程序员自己封装，源生的Cookie接口不友好；

	cookie的优点：具有极高的扩展性和可用性
	
    	1.通过良好的编程，控制保存在cookie中的session对象的大小。
    	2.通过加密和安全传输技术，减少cookie被破解的可能性。
    	3.只有在cookie中存放不敏感的数据，即使被盗取也不会有很大的损失。
    	4.控制cookie的生命期，使之不会永远有效。这样的话偷盗者很可能拿到的就   是一个过期的cookie。
    	
    	cookie的缺点：
    	1.cookie的长度和数量的限制。每个domain最多只能有20条cookie，每个cookie长度不能超过4KB。否则会被截掉。
    	2.安全性问题。如果cookie被人拦掉了，那个人就可以获取到所有session信息。加密的话也不起什么作用。
    	3.有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务端保存一个计数器。若吧计数器保存在客户端，则起不到什么作用。


[参考](https://segmentfault.com/a/1190000012057010);
