//彼此不依赖，其中任何一个被 reject ，对其它都没有影响
// 期望知道每个 promise 的执行结果

const p1=Promise.resolve(1);
const p2=Promise.resolve(2);
const p3=new Promise((resolve,reject)=>{
    setTimeout(reject,1000,'3')
})

// allSettled return Promise<[...]>
// Promise.allSettled() 可以获取数组中每个 promise 的结果，无论成功或失败
Promise.allSettled([p1,p2,p3])
.then((values)=>{
    console.log(values);
})
/*
[
  { status: 'fulfilled', value: 1 },
  { status: 'fulfilled', value: 2 },
  { status: 'rejected', reason: '3' }
]

*/

const promises=[p1,p2,p3]

// 对于不支持Promise.allSettled的浏览器,polyfill：rewrite Promise
if(!Promise.allSettled){
const rejectHandler=reason=>({status:'rejected',reason})
const resolveHandler=value=>({status:'resolved',value})
Promise.prototype.allSettled=promises=>{
    // 将promises 数组进行all resolve
    return Promise.all(promises.map(promise=>{
        Promise.resolve(promise)
        .then(resolveHandler,rejectHandler)
    }))

}
Promise.allSettled(promises)
    .then((res)=>{
        console.log('res allSetted',res);
    })
} // end of if
