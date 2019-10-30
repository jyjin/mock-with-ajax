## monk 和 http 结合的使用demo

- 需要根据自己的http请求工具稍作修改
- 必须以request(url, data, isMock)的格式发送http请求

#### 例子

isMock参数存在则从monk取数据
```
// 从mock取数据
    get(`/im-manage/${token}/user/${orgId}/query`, null, 1).then(json => {
      console.log('json == ', json)
      this.setState({
        mockData: json
      })
    })

```

isMock参数不存在则从后端取真实数据
```
    // 从真实后端取数据
    get(`/im-manage/${token}/user/${orgId}/query`, null).then(json => {
      console.log('json == ', json)
      this.setState({
        serverData: json
      })
    })
```