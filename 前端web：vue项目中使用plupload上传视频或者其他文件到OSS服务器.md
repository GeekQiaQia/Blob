[项目案例：](https://github.com/GeekQiaQia/plupload-vue)

参考： [web端上传视频到云服务器](https://help.aliyun.com/document_detail/31925.html?spm=a2c4g.11186623.6.1518.504a6e28kYHbMY)
开发环境及依赖：

* 开发工具：[HBuilderX](https://www.dcloud.io/hbuilderx.html)；
* 项目：[uni-app/vue](https://uniapp.dcloud.io/)
* 主要依赖：[plupload](https://www.npmjs.com/package/plupload)

## 采用oss文件存储有三种方式：
* [Web端PostObject直传方式](https://help.aliyun.com/document_detail/31923.html?spm=a2c4g.11186623.6.1517.410649e8Pu25Ij)；
* [javascript 客户端签名直传](https://help.aliyun.com/document_detail/31925.html?spm=a2c4g.11186623.6.1518.4b2f4367SZDSGj)；
* [服务端签名后直传（上传回调）](https://help.aliyun.com/document_detail/31926.html?spm=a2c4g.11186623.6.1519.122749e8l2sOHi)
![](https://user-gold-cdn.xitu.io/2020/3/24/1710b5a679680fd3?w=1403&h=911&f=png&s=159872)

## 推荐使用服务端签名后直传的方式：

* [原理介绍](https://help.aliyun.com/document_detail/31926.html?spm=a2c4g.11186623.6.1519.410649e8XYfKJo)
    
![](https://user-gold-cdn.xitu.io/2020/3/24/1710b5e2367c0950?w=1307&h=1065&f=png&s=161181)

## web端上传视频核心代码分析

 * 安装依赖： npm install pluplad -s 
    
   * 在mounted周期函数中初始化plupload对象;

            methods:{
    
                /**
    			 * @description 初始化函数；
    			 * */
    			init() {
    			
    				this.initplupLoader();
    				this.initLoaderInfo();
    				this.toGetUserId();
    			}
    
            }
             mounted() {
             
        		this.init();
        	}
    * 使用new plupload.Uploader()新建一个上传文件对象；
![](https://user-gold-cdn.xitu.io/2020/3/24/1710b683d60b1b6c?w=1434&h=861&f=png&s=132582)
    * 在传参对象中filters作为文件上传过滤条件
    
            filters: {
    						mime_types: [ //只允许上传视频文件 过滤条件；
    						    
    							//在微信浏览器上不支持打开本地相册或者文件夹，需屏蔽掉过滤条件，此时可通过FilesAdded回调函数中进行文件过滤；
    							 <!--{-->
    							 <!--	title: "files",-->
    							 <!--	extensions: "mp4,M4V,mov,MP4,m4v,MOV,jpeg"-->
    							 <!--},-->
    							 // {
    							 //                    title: "files",
    							 //                    // extensions: "jpg,png,gif,jpeg"
    							 //                }
    							 
    						],
    						max_file_size: '100mb', //最大只能上传10mb的文件
    						prevent_duplicates: true //不允许选取重复文件
    					},
    * 文件选择成功回调函数 **FilesAdded: function(up, files)**，可以在此时进行文件上传之前的处理；
   
        	/**
						 * @description 文件选择成功回调函数；
						 * */
						FilesAdded: function(up, files) {
						
							let file=files[0];
							self.fileAddedFileName=file.name;
							self.fileAddedFileSize=file.size;
							console.log(self.fileAddedFileName);
							self.showFlug = true;
							let fileName=self.fileAddedFileName;
							let videoType=fileName.split(".")[1];
							console.log(videoType);
							if(videoType=="mp4"||videoType=="MP4"||videoType=="M4V"||videoType=="m4v"||videoType=="mov"||videoType=="MOV"){
								console.log(videoType);
								// 如果符合文件过滤条件，则调用上传函数；调用上传函数顺序可根据需求和设计调整；
								 self.startUpload();
								 
							}else{
								console.log("您选择的文件后缀不对哦");
								uni.showToast({
									title: "您选择的文件后缀不对哦",
									icon: "none",
									duration: 2000
								});
							}
						    
						},
	* 开始上传前回调函数**BeforeUpload: function(up, file**)，可以在此时进行提示设置；
	
	    	/**
						 * @description  开始上传前回调函数；
						 * */
						BeforeUpload: function(up, file) {
						    self.tipText="视频上传中";
							//mp4,M4V,mov,MP4,m4v,MOV
							console.log(file);
							self.set_upload_param(up, file.name, true);
						
						   
						},
    * 文件上传进度条回调函数**UploadProgress: function(up, file)** ，可以在此时设置进度条百分比；
        
        	/**
						 * @description  文件上传进度条回调函数
						 * */
						UploadProgress: function(up, file) {
							console.log(file);
							self.width=file.percent;
						},
    * 文件上传成功回调函数 **FileUploaded: function(up, file, info)**，可以在此时处理文件成功获得处理；
        
        			        /**
						 * @description  文件上传成功回调函数；
						 * */ 
						FileUploaded: function(up, file, info) {
						
							console.log(info);
							
							if (info.status == 200){

						         // 其他code==200处理代码块
								 
						
							}else{
							
			                                // 其他code代码处理代码块
								
								
							}
						},
	* 上传文件异常处理回到函数 **Error: function(up, err)**，可在此时处理异常提示；	
	    
        		/**
						 * @description  文件限制错误回调函数；
						 * */
						Error: function(up, err) {
					
						     if (err.code == -600) {
						              
									uni.showToast({
										title: "您选择的文件太大了哦",
										icon: "none",
										duration: 2000
									});
						            }
						            else 
						            {
										uni.showToast({
											title: err.response,
											icon: "none",
											duration: 2000
										});
						             
						            }
								}
* 根据文档介绍，设置从服务端签名接口返回的文件上传参数；
![](https://user-gold-cdn.xitu.io/2020/3/24/1710b6a029c0ae3c?w=817&h=564&f=png&s=49504)
    * 'key': self.g_object_name, // 文件服务器存储路径以及文件名；
    * 'signature': self.signature, // 服务端获取到的签名

参考： [web端上传视频到云服务器](https://help.aliyun.com/document_detail/31925.html?spm=a2c4g.11186623.6.1518.504a6e28kYHbMY)
****