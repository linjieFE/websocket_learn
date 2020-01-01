/**
 * 启动聊天的服务端程序
 */
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8888,()=>{
    console.log('express服务启动成功了！')
});
// WARNING: app.listen(8888) will NOT work here!
//把public目录设置成静态资源
app.use(require('express').static('public'))
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('send', { hello: 'world' });
  socket.on('myOtherEvent', function (data) {
    console.log(data);
  });
});