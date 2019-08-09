## 定义和用法

* open() 方法用于打开一个新的浏览器窗口或查找一个已命名的窗口。

        window.open(URL,name,features,replace)


![](https://user-gold-cdn.xitu.io/2019/8/9/16c7525911c8b9b1?w=833&h=366&f=png&s=65536)

* 打开一个新窗口

        window.open("relative url","_blank");

[参考:https://www.w3school.com.cn/jsref/met_win_open.asp](https://www.w3school.com.cn/jsref/met_win_open.asp)



## 模板文件下载前端解决方案:

需求：

- 当用户点击“模板下载”按钮，此时web客户端执行文件下载（如:“.xlsx”格式文件），（此过程不经过请求后端以文件服务器url地址请求的方式下载或者后端返回文件流的方式，前台对文件流进行处理的方式下载；）如图所示：

![](https://user-gold-cdn.xitu.io/2019/5/30/16b09029f1c1bfbf?w=529&h=334&f=png&s=16655)

分析:
- 通过将需要下载的静态**资源文件**存放在web端，当点击<button>下载模板</button>按钮的时候，执行window.open("relative URL");// ps:<a> 标签兼容性不好；
- "relative URL" 为打包以后相对于根页面index.html文件的相对目录；
- 在vue项目中cli 3.x脚手架创建的项目，将不需要被打包编译的资源文件存放在public目录之下
- 在vue项目中cli 2.x脚手架创建的项目，将不需要被打包编译的资源文件存放在static目录之下

如图所示：为cli 3.x 项目下模板文件存放路径；以及打包编译后dist目录

![](https://user-gold-cdn.xitu.io/2019/5/30/16b09126f735ba86?w=465&h=820&f=png&s=41597)
**此时点击下载，将执行web端资源文件下载，这种情况适用于格式固定的模板文件下载前端解决方案；**

代码：

    <em @click="fetchTemplate">下载模板</em>
 
uploadFile.vue

     <el-upload
                    class="upload-excel"
                    drag
                    show-file-list
                    :limit="uploadLimit"
                    :on-exceed="handleExceed"
                    :before-upload="beforeUploadExcel"
                    :on-success="handleUploadSuccess"
                    :on-error="handleUploadError"
                    :action="actionUrl"
                    multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>浏览文件上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传一个xlsx/xls格式文件，且不超过10MB <em @click="fetchTemplate">下载模板</em> </div>
            </el-upload>
            <span slot="footer" class="dialog-footer  uploadFooter">
                    <el-button type="primary"  :disabled="canReview" class="btn confirmBtn" @click="uploadDialogVisible = false;reviewExcelData()">预览</el-button>
                    <el-button class=" btn cancelBtn" @click="uploadDialogVisible = false">取 消</el-button>
                 </span>
          </el-dialog>
          

javascript：

    <script>
    exprot default{
        method:{
            fetchTemplate(){
          window.open("./file/uploadFile.xls");
        }
        }
    }
    </scritp>
    
    
 [参考](https://juejin.im/post/5cefd0f46fb9a07efa08fd85)