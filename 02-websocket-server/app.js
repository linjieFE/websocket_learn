//1. 第一步，导入nodejs-websocket包
const ws = require('nodejs-websocket')
const PROT = 3000

//2. 第二步，创建一个server
// 2。1 如果处理用户的请求

//每当客户端有一个用户连接上来，函数就会被执行，会给当前用户创建一个connect 对象
const server = ws.createServer(connect=>{
    console.log(connect)
    console.log("有用户连接上来了！")
    //每当一个接收到用户传递过来的数据，text事件就会被触发
    connect.on('text',data=>{
        console.log('接收到了用户传来的数据',data)
        //给用户一个响应的数据 把接收到的数据传给客户端
        //2.2 把数据做一些处理 把小写转成大写
        connect.send(data.toUpperCase()+'!!!')
    })    

    //关闭浏览器窗口的时候
    connect.on('close',()=>{
        console.log('当服务断开的时候，触发此事件')
    })

    //关闭浏览器窗口的时候 注册一个Error事件 接收报错信息，让服务台提示友好
    connect.on('error',()=>{
        console.log('用户连接异常')
    })
})

server.listen(PROT,()=>{
    console.log("websocket启动成功了,监听了端口！"+PROT)
})
//3.终端 => node ./app.js