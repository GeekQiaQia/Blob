## 在微信小程序中使用Echarts
在小程序中如何引用ECharts:
[引用方式可查看ECharts官网](https://echarts.baidu.com/tutorial.html#%E5%9C%A8%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts)

在开发过程中，我们需要从后台获取需要ECharts 展示的data数据；然后传递到**ec-charts** 组件当中，展示最新获取到的动态图表；

![](https://user-gold-cdn.xitu.io/2019/4/13/16a15062c7989c15?w=281&h=87&f=png&s=4389)

## 微信小程序中如何给ECharts 中动态传参到data[] ?

“talk is cheap,show me the code ”

// 以下以ECharts-Pie 作为示例：

detail.wxss:

    .pieContainer {
      position:absolute;
      top:60vh;
      bottom:0;
      left:18px;
      right:0;
      width:50vw;
      height:100px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:space-between;
      box-sizing:border-box;
    
    } 
    ec-canvas {
    width: 100%;
    height: 100%;
    /*border:1px solid red;*/
    }

detail.wxml:

    <view class="pieContainer">
    
      <ec-canvas 
      id="mychart-dom-pie" 
      canvas-id="mychart-pie"
      ec="{{ ec }}"
      bind:init="echartInit" 
      data-record="{{recordData}}">
      
      </ec-canvas>
    </view>
与官网相比：

* wxml文件中，ec-canvas标签中，比官网示例中多了一个data-record 属性；属性中绑定的是detail.js中data 数据如下：


detail.js:

     // pages/detail/detail.js
    import * as echarts from '../../packages/ec-canvas/echarts';
    
    const app = getApp();
    function initChart(canvas, width, height,recordData) {
    const chart = echarts.init(canvas, null, {
    width: width,
    height: height
    });
    
    canvas.setChart(chart);
    
    var option = {
    backgroundColor: "#ffffff",
    color: ["#14DA12","#DA0D07","#FFDB5C" ],
    series: [{
    label: {
    normal: {
    fontSize: 14
    }
    },
    labelLine:{
    normal:{
    length:5,  // 改变标示线的长度
    lineStyle: {
    color: "black"  // 改变标示线的颜色
    }
    },
    },
    name:'赴约记录',
    type: 'pie',
    center: ['50%', '50%'],
    radius: [0, '60%'],
    data:[],
    itemStyle: {
    emphasis: {
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowColor: 'rgba(0, 2, 2, 0.3)'
    }
    }
    }]
    };
    
    option.series[0].data=recordData;
    chart.setOption(option);
    return chart;
    }
    
    
    Page({
    
      /**
       * 页面的初始数据
       */
      data: {
      
      ec: {
      },
      recordData:[{
      value: 9,
      name: '赴约'
      }, {
      value: 1,
      name: '爽约'
      },{
      value: 2,
      name: '取消'
      }
      ]
      },
    
    echartInit(e) {
       console.log(e);
       let recordData=e.target.dataset.record;
    initChart(e.detail.canvas, e.detail.width, e.detail.height,recordData);
    },
    
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
      this.setData({
      signature: app.globalData.accountInfo.signature
      });
      },
    
      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function () {
    
      },
    
    
      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function () {
    
      },
    
      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function () {
    
      },
    
      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function () {
    
      },
    
      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {
    
      },
    
      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {
    
      },
    
      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function () {
    
      }
    })

与官网示例相比，在以上代码中：

* function initChart(canvas, width, height,recordData)；多了一个参数recordData；
*  将option.series[0].data数组设置为空数组，并由传参的方式传递赋值：option.series[0].data=recordData;

## 思考总结：
在wxml中ec-chart 组件引入后，相当于一个html标签，绑定的函数仍有一样的event参数；

我们通过浏览器查看以下代码中的log日志发现：
 
    echartInit(e) {
       console.log(e);
       let recordData=e.target.dataset.record;
    initChart(e.detail.canvas, e.detail.width, e.detail.height,recordData);
    },


![](https://user-gold-cdn.xitu.io/2019/4/13/16a15016504eb8dc?w=979&h=346&f=png&s=42570)


e.target.dataset.record正是 detail.wxml 中的data-record 属性：

     <ec-canvas 
      id="mychart-dom-pie" 
      canvas-id="mychart-pie"
      ec="{{ ec }}"
      bind:init="echartInit" 
      data-record="{{recordData}}">
      
      </ec-canvas>
      
    传递数据内容正是detail.js中的data 属性值：
    recordData:[{
      value: 9,
      name: '赴约'
      }, {
      value: 1,
      name: '爽约'
      },{
      value: 2,
      name: '取消'
      }
      ]
    
