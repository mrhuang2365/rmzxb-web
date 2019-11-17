# 项目介绍
人大政协报

# 前端打包
npm run build
# 前端启动
npm run dev


#### api说明

>* 状态码
>> 401：无登录授权
>> 200: 接口正常
>> 其他：当做异常处理

>* 状态码为200时response返回
```
response:{
  body:          返回体 
  error: 0,       0:代表成功， 1：代表有错误
  message: '',    当error为1时 必须存在message
}
```

## License

[MIT](http://opensource.org/licenses/MIT)
