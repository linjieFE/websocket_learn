const ws = require('nodejs-websocket')
const PORT = 8080
const server = ws.createServer(connect =>{
    console.log('新的连接')
    //收到的浏览器发来的消息触发
    connect.on('text',data=>{
        console.log(`收到浏览器发来的消息${data}`)
    })
    //关闭连接的时候 触发
    connect.on('close',data=>{
        console.log(`关闭连接${data}`)
    })
    //发生异常时触发
    connect.on('error',data=>{
        console.log(`发生异常${data}`)
    })
})

server.listen(PORT,()=>{
    console.log('监听了端口'+PORT)
})