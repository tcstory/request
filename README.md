### 一个简单的网络请求函数

api风格模仿jquery

### 使用方法

```
request({
    method: 'get',
    url: 'xxxxx',
    success: function(){
        console.log("请求成功")
    },
    error: function(){
        console.log("请求失败")
    }
})
```

### 参数

`method`: 请求的类型,目前支持`get`和`post`,缺少此参数会**报错**

`url`: 缺少此参数会**报错**

`xhrFields`: 传入一个对象,这个对象的键值对会设置在原生的`xhr`对象上

`timeout`: 默认值为**5秒**

`contentType`: 用于设置`post`请求发送的数据类型,目前只支持`json`,默认值为`application/json`

`data`: `post`请求发送给服务器的数据,**只能**传入一个原生的`Javascript`对象

`success`: 请求成功后执行的回调函数

`error`: 请求失败后执行的回调函数

**补充**: 可以设置当使用`request`函数的时候,能同时发起的最多的网络请求数量
`request.maxConnection=2`,意味着,如果前两个网络请求没有返回,无法继续再发起网络请求,默认值为`2`