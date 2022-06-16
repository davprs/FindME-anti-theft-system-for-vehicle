const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');
const {createServer} = require('http');
const http = createServer(app);
const {Server} = require('socket.io');
const io = new Server(http);
const {saveCheck} = require('./src/controllers/hardwareIOController');
var publicInfoRouter = require('./src/routers/publicInfoRouter');

const EXPRESS_PORT = 3000;
const SOCKETIO_PORT = 4000;

global.appRoot = path.resolve(__dirname);
mongoose.connect('mongodb://localhost:27017/FindME');

app.use(cors());

app.use(express.static(path.join(appRoot, "build")));

http.listen(SOCKETIO_PORT, ()=>{
    console.log("SocketIO listen on port " + SOCKETIO_PORT)
})

app.use(express.json());

io.on('connection', (socket) => {
    console.log(socket.handshake.address + " connected");
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    });

    socket.on("normal state", (msg)=>{
        saveCheck(JSON.parse(msg), false);
        io.emit("state check", msg)
    });

    socket.on("alarm state", (msg)=>{
        saveCheck(JSON.parse(msg), true);
        io.emit("state check", msg)
    });
});

app.use('/', publicInfoRouter);

app.use((req, res)=> {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(EXPRESS_PORT,() =>{
    console.log('Node API server started on localhost:' + EXPRESS_PORT);
});
