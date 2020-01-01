//创建了一个http 服务
const http=require('http')
// var app = http.createServer(handler)
var fs = require('fs');
var app = http.createServer()

app.on('request',(req,res)=>{
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        }
    );
})

app.listen(8888,()=>{
    console.log("服务连接成功！")
});

// function handler (req, res) {
//   fs.readFile(__dirname + '/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }

//     res.writeHead(200);
//     res.end(data);
//   });
// }

//调用socket.io
var io = require('socket.io')(app);

//表示监听用户连接的事件
/**
 * socket表示用户的连接
 * socket.emit表示触发某个事件
 * socket.on表示注册某个事件，如果我需要获取浏览器的数据，需要注册一个事件，等待浏览器触发，传来参数
 */
io.on('connection', function (socket) {
    console.log('新用户连接了：',socket);
    // socket.emit表示给浏览器发送数据 
    // 参数1表示事件的名称
    socket.emit('send', { hello: 'world' });
    /**
     * 参数1： 事件名：作意
     * 参数2   获取到的数据
     */
    socket.on('myOtherEvent', function (data) {
        console.log(data);//node app.js =>终端控制台可看到客户端传来的{my:'data'}
        //相反服务器想到给浏览器发送数据
        socket.emit('send',data)
    });
});