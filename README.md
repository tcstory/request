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

`method`: 请求的类型,缺少此参数会**报错**

`url`: 缺少此参数会**报错**

`xhrFields`: 传入一个对象,这个对象的键值对会设置在原生的`xhr`对象上

`timeout`: 默认值为**5秒**

`contentType`: 用于设置请求发送的数据类型,目前只支持`json`和`FormData`的实例对象,默认值为`application/json`

`data`: 请求发送给服务器的数据

`success`: 请求成功后执行的回调函数, 参数为`success(response, xhr)`

`error`: 请求失败后执行的回调函数, 参数为`error(xhr)`

`timeoutFunc`: 处理请求超时的回调函数, 没有参数


**补充**:

1. 带凭证的网络请求, 可以简写为`cross: true`
2. 目前支持的方法有`get`,`delete`,`post`
3. 默认情况下,会把请求的结果当做json来处理,如果响应头没有表明结果是`json`,则给回调函数传入`xhr.responseText`
4. 该库使用`new XMLHttpRequest()`来构造`xhr`对象
5. 设置`request.debug = true`后,会打印出相关报错信息
