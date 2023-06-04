const http=require("http");
const express=require("express");
const socketIo=require("socket.io");
const cors=require("cors");

const app=express();
const port=4500 || process.env.PORT;
const users=[{}];
app.get("/",(req,res)=>{
    res.send("hello world")
})

const server=http.createServer(app);
const io=socketIo(server);

//middleware
app.use(cors());

io.on("connection",(socket)=>{
    console.log("new connection");
    socket.on('joined',({Name}) =>{
        users[socket.id]=Name;
        console.log(`${Name} has joined`);
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} Joined`});
        socket.emit("welcome",{user:"Admin",message:`Welcome to the chat, ${Name}`});
    });
    socket.on('disconnect',()=>{
        console.log("User Left",`${users[socket.id]}`);
        // socket.broadcast.emit("leave",{user : "Admin",message : `${users[socket.id]} has left`});
        io.emit("leave",{user : "Admin",message : `${users[socket.id]} has left`});
    });
    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id})
    })
    
});

server.listen(port,()=>{
    try {
        console.log(`sever running on port ${port}`);
    } catch (error) {
        console.log("server is not running",error);
    }
});

