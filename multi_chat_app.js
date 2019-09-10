const server=require("http").createServer().listen(3000);
const io=require("socket.io")(server);

let clientCount=0;
io.on("connection",socket=>{
    clientCount++;
    let nickName="user "+clientCount;
    //广播信息
    io.emit("enter",nickName+" 进入聊天室!!!");
    socket.on("message",data=>{
        io.emit("dialog",nickName+": "+data);
    })
    socket.on("disconnect",_=>{
        io.emit("exit",nickName+" 离开了聊天室");
    })
})