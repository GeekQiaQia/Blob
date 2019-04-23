flux 设计思想改变了原有的MVC设计思想带来的多数据流（多C）带来的数据状态的混乱，以及难以追踪记录的现象；它模仿服务端对数据状态的修改：
    
- 即接收一个url路由,进行路由匹配，如果匹配成功，则在对应handler()中处理相关逻辑操作；
- 如果匹配失败，则对应errorHandler()中处理相关失败逻辑操作；正是这种集中统一的数据处理方式，使得服务端数据管理可控可追踪；

现在流行的VUEX redux等状态管理都是flux思想的实现；

在学习分析ElementUI:table 组件的过程中发现：
- table-store.js中对数据状态的改变和管理也是flux思想的实现，这种优秀的设计思想应该应用到我们自己的组件开发和设计中；
- 下面我们一起来看看table 组件中flux思想是如何实现的，如果你用过vuex,你一定会觉得异常熟悉：

     1. 如图所示：在源码table-store.js中，我们可以看到在函数表达式：

    const TableStore = function(table, initialState = {})
中申明定义了this.states={}的数据状态对象；
![](https://user-gold-cdn.xitu.io/2019/4/23/16a4adddc7154441?w=1366&h=739&f=png&s=152252)

          this.states = {
            rowKey: null,
            _columns: [],
            originColumns: [],
            columns: [],
            fixedColumns: [],
            rightFixedColumns: [],
            leafColumns: [],
            fixedLeafColumns: [],
            rightFixedLeafColumns: [],
            leafColumnsLength: 0,
            fixedLeafColumnsLength: 0,
            rightFixedLeafColumnsLength: 0,
            isComplex: false,
            filteredData: null,
            data: null,
            sortingColumn: null,
            sortProp: null,
            sortOrder: null,
            isAllSelected: false,
            selection: [],
            reserveSelection: false,
            selectable: null,
            currentRow: null,
            hoverRow: null,
            filters: {},
            expandRows: [],
            defaultExpandAll: false,
            selectOnIndeterminate: false
          };
          
          
    2.在TableStore原型上定义了mutations对象，TableStore.prototype.mutations={}；
    其中定义了states相关的逻辑函数；如setData(states,data);
    
![](https://user-gold-cdn.xitu.io/2019/4/23/16a4ae3cc7d4f823?w=1013&h=592&f=png&s=76753)

    3.在TableStore原型上定义了commit方法，如下图所示：
    
![](https://user-gold-cdn.xitu.io/2019/4/23/16a4ae718f56db91?w=1002&h=592&f=png&s=75014)

    TableStore.prototype.commit = function(name, ...args) {
      const mutations = this.mutations;
      if (mutations[name]) {
        mutations[name].apply(this, [this.states].concat(args));
      } else {
        throw new Error(`Action not found: ${name}`);
      }
    };
    
- 其中参数name就是vuex中的执行动作Action；
- mutations[name]判断mutations对象中是否存在该动作Action对应的方法；如果存在，则执行该方法；不存在则抛出异常“Action not found”
- 通过[this.states].concat(args)传参=》[{},...args];
- 通过object.apply(this,[{},...args]);改变调用方法mutations[name]的this指向；
    