const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');
const {createServer} = require('http');
const http = createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["authorization"],
        credentials: true
    }
});
var cookie = require("cookie")
const {saveCheck, getLastKnownData} = require('./src/controllers/hardwareIOController');
const publicInfoRouter = require('./src/routers/publicInfoRouter');
const userRelatedRouter = require("./src/routers/usersServicesRouter");
const {verify} = require("jsonwebtoken");
const {authenticateToken, generateAccessToken, parseJwt} = require("./src/auth/manageToken");
const {Promise} = require("mongoose");
const brandImageRouter = require("./src/routers/carBrandRouter");
const {PlateModel} = require("./src/controllers/plateController");
const {UserModel} = require("./src/controllers/userController");

const EXPRESS_PORT = 5000;
const SOCKETIO_PORT = 4000;

global.appRoot = path.resolve(__dirname);
mongoose.connect('mongodb://localhost:27017/FindME');

app.use(cors());

//app.use(express.static(path.join(appRoot, "build")));

http.listen(SOCKETIO_PORT, ()=>{
    console.log("SocketIO listen on port " + SOCKETIO_PORT)
})

app.use(express.json());

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    });

    socket.on('client connection', () => {
        const token = cookie.parse(socket.handshake.headers.cookie).token;
        console.log(token);
        Promise.resolve()
            .then(()=>authenticateToken(token))
            .then((user) => {
                const username = user.username;
                const email = user.email;
                PlateModel.findOne({username: username})
                    .then((plate) => {
                        getLastKnownData(plate.deviceID)
                            .then(([res, alarm]) => {
                                socket.emit({username: username, email: email}, [res, alarm]);
                            })
                            .catch(err => console.log(err));
                    });
            })
            .catch((err) => console.log(err))

    });

    socket.on("normal state", (msg)=> {
        saveCheck(JSON.parse(msg), false)
            .then((new_doc) => [new_doc, PlateModel.findOne({deviceID: new_doc.deviceID})])
            .then(([new_doc, plate]) => [new_doc, UserModel.findOne({username: plate.username})])
            .then(([new_doc, user]) => {
                io.emit({username : user.username, email: user.email}.toString(), [new_doc, false])
            })
    });

    socket.on("alarm state", (msg)=>{
        saveCheck(JSON.parse(msg), true)
            .then((new_doc) => [new_doc, PlateModel.findOne({deviceID: new_doc.deviceID})])
            .then(([new_doc, plate]) => [new_doc, UserModel.findOne({username: plate.username})])
            .then(([new_doc, user]) => {
                io.emit({username : user.username, email: user.email}.toString(), [new_doc, true])
            })
    });
});

app.use('/api/auth', userRelatedRouter);
app.use('/api/car_brand', brandImageRouter);
app.use('/', publicInfoRouter);

app.use((req, res)=> {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(EXPRESS_PORT,() =>{
    console.log('Node API server started on localhost:' + EXPRESS_PORT);
});
