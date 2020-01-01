const ws = require('nodejs-websocket')
const PORT = 8080

//记录当前用户的数量，初始值为0
let count = 0
const server = ws.createServer(connect =>{
    count++
    console.log(`第${count}新用户的连接上来`)

    //定义一个用户名称
    connect.user = `用户${count}`
    //1.告诉所有人有人加入了聊天室
    broadcast(`${connect.user}进入了聊天室`)
    //收到的浏览器发来的消息触发
    connect.on('text',data=>{
        console.log(`收到浏览器发来的消息${data}`)
        //2.当我们接收到某一个用户的信息时，告诉所有人，发出一消息是什么。
        /** 
         * connect.send 只能给当前用户发消息*/ 
        broadcast(data)
    })

    //关闭连接的时候 触发
    connect.on('close',data=>{
        console.log(`关闭连接${data}`)
        //3.告诉所有人离开的了聊天室
        count--
        broadcast(`${connect.user}离开了聊天室`)
    })
    //发生异常时触发
    connect.on('error',data=>{
        console.log(`发生异常${data}`)
    })
})

 //定义一个广播方法 给所有的用户发消息 
    /** 
     * 参见：（https://github.com/sitegui/nodejs-websocket）
     * server.connections
       function broadcast(server, msg) {
            server.connections.forEach(function (conn) {
                conn.sendText(msg)
            })
       }
    */
function broadcast(msg){
    // server.connections 表示所有的用户
    server.connections.forEach(item=>{
        item.send(msg)
    })
}

server.listen(PORT,()=>{
    console.log('监听了端口'+PORT)
})