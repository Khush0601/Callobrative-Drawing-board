const canvas=document.getElementById('canvas')
const ctx=canvas.getContext('2d')

canvas.width=window.innerWidth*0.6;
canvas.height=window.innerHeight*0.6;

//we now need to handle the mouse event
let drawing=false;
const socket = io();
// start drawing when mouse is pressed
canvas.addEventListener('mousedown',()=>{
    drawing=true;
    ctx.beginPath();
})
 // Stop drawing when mouse is released
canvas.addEventListener('mouseup',()=>{
    drawing=false;
    ctx.closePath();
})
// Draw when the mouse is moved
canvas.addEventListener('mousemove',(e)=>{
if(!drawing)  return
   

const rect=canvas.getBoundingClientRect()
const x=e.clientX - rect.left;
const y=e.clientY - rect.top;

ctx.lineWidth=5;
ctx.lineCap='round';
ctx.strokeStyle = "black";
ctx.lineTo(x,y)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(x,y)

// emit the drawing data to the backend server 
socket.emit('drawing',{x,y})
})

//Integration of socket.io data
socket.on('drawing',(data)=>{
const {x,y}=data;
ctx.lineWidth=5;
ctx.lineCap='round';
ctx.strokeStyle = "black";

ctx.lineTo(x,y)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(x,y)
})





