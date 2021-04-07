---
theme: mk-cute
highlight: tomorrow-night-eighties
---
# 如何使用javascript在浏览器端下载png/jpg等图片类型文件
## 需求背景
当我们前端下载一个文件的时候，chrome等浏览器遇到可以解析的文件，会优先打开该文件而不是下载，比如png/jpg等图片类型文件、pdf类型文件等。而有时我们的需求是希望点击下载交互时，实现文件下载而不是打开；以下以图片url文件举例：
## 解决方案1：url转为Blob文件对象
### 图片url转换为Blob类文件对象封装
```js
/**
 * @description url转换为blob类型
 */
export const urlToBlob = (the_url, callback) => {
  let xhr = new XMLHttpRequest();  // 初始化实例对象
  xhr.open('get', the_url, true); // 初始化一个异步请求
  xhr.responseType = 'blob';  // 实例返回类型/ArrayBuffer/Blob/Document;
  xhr.onload = function() {
    if (this.status == 200) {
      if (callback) {
        callback(this.response);
      }
    }
  };
  xhr.send();
};


```
### 调用urlToBlob下载图片
```js
 urlToBlob(pictureUrl, res => {
        var link = document.createElement('a');
        var href = window.URL.createObjectURL(res); // 创建下载的链接
        link.href = href;
        link.download = 'Download.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      message.success('生成海报成功！');
```
## 扩展知识点
### 什么是 Blob 类文件对象
[Blob|MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0bf8638f142413ab64a488c1ee68db8~tplv-k3u1fbpfcp-watermark.image)

### 什么是 XMLHttpRequest
[XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/284f815ac1474ad68c070ca81d36a87f~tplv-k3u1fbpfcp-watermark.image)
