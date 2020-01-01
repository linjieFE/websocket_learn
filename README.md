## WebSocket 学习笔记
-- [官方地址](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)
https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket
## 显示WebSocket在浏览器端如何使用
1) h5 已经直接提人工工人了 WebSocket 的API,所以我们可以直接去使用
   跟Date() Math 一样:
   1.创建websocket => 直接new WebSocket()
    参数1 : websocket 服务地址
    ```
    var socket = new WebSocket('ws://echo.websocket.org') // 'ws://echo.websocket.org' 为官方默认给的服务地址
    ```
![Alt 例图1](./1.jpeg "控制台查看websocket请求")
```
/*
### ps:中间提交的时候遇到权限报错403
### github push错误
fatal: unable to access ‘https://github.com/用户名/项目名.git/’: The requested URL returned error: 403 
解决方案：
step1：终端=> vim .git/config
————————————————*/
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = git@github.com:github的名字/库的名字.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master

————————————————//再次push 应该就能拨开云雾见天日了
```

## 第二课 建立websocket 服务器
1）[git为我们提供了一个本地服务器搭建的依赖](https://github.com/sitegui/nodejs-websocket)
https://github.com/sitegui/nodejs-websocket
通过 
```
 npm install nodejs-websocket
 或者 一般 yarn 比较快
 yarn add nodejs-websocket
```

## 第三socket.io框架
-- socket.io是不是库，可以浏览器和服务器之间实现实时，双向和基于事情和通信
--- 1、node  详见https://socket.io/docs/#Using-with-Node-http-server
--- 2、express
```
 yarn add socket.io
 或
 npm install socket.io --save
```
[中文文档](https://www.w3cschool.cn/socket/)https://www.w3cschool.cn/socket/
[官方文档](https://socket.io/)https://socket.io/

### 基于express
```
yarn add socket.io express
```