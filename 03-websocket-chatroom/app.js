const ws = require('nodejs-websocket')
const PORT = 8080
const TYPE_ENTER=0//表示进入聊天室的消息
const TYPE_LEAVE=1//表示离开聊天室的消息
const TYPE_NORMAL=2//正常聊天的消息

//记录当前用户的数量，初始值为0
let count = 0

/**
 * 分析
 * 消息不应该是简单的字符串
 * 这个消息不应该是个对象
 * type:消息类型 0.表示进入聊天室的消息 1.表示离开聊天室的消息 2.正常聊天的消息
 * msg: 消息的内容
 * time: 聊天发送的具体时间
 */
const server = ws.createServer(connect =>{
    count++
    console.log(`第${count}新用户的连接上来`)

    //定义一个用户名称
    connect.user = `用户${count}`
    //1.告诉所有人有人加入了聊天室的消息
    broadcast({
        type: TYPE_ENTER,
        msg:`${connect.user}进入了聊天室`,
        time:new Date().toLocaleTimeString()
    })
    //收到的浏览器发来的消息触发
    connect.on('text',data=>{
        console.log(`收到浏览器发来的消息${data}`)
        //2.当我们接收到某一个用户的信息时，告诉所有人，发出一消息是什么。
        /** 
         * connect.send 只能给当前用户发消息*/ 
        broadcast({
            type: TYPE_NORMAL,
            msg:data,
            time:new Date().toLocaleTimeString()
        })
    })

    //关闭连接的时候 触发
    connect.on('close',data=>{
        console.log(`关闭连接${data}`)
        //3.告诉所有人离开的了聊天室
        count--
        broadcast({
            type: TYPE_LEAVE,
            msg:`${connect.user}离开了聊天室`,
            time:new Date().toLocaleTimeString()
        })
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
    // server.connections 表示所有的用户 ！注意！：msg只能传递字符串
    server.connections.forEach(item=>{
        item.send(JSON.stringify(msg))
    })
}

server.listen(PORT,()=>{
    console.log('监听了端口'+PORT)
})