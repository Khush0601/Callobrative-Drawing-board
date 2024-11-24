
const express=require("express")
const http=require('http')
const {Server}=require("socket.io");

const app=express()
const server=http.createServer(app)
const io=new Server(server)

// serve the static files from "public"  folder
app.use(express.static('public'));

//handle the socket connection
io.on('connection',(socket)=>{
        console.log('New client connected');
    // handle the message event
    socket.on('drawing',(data)=>{
        //broadcast the message to all connected clients
        socket.broadcast.emit('drawing',data)
    })
    //handle the disconnect event:
    socket.on('disconnect',()=>{
        console.log('client disconnected')
    })
})

server.listen(3000,()=>{
    console.log('server running on port 3000')
})
