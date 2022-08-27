const cookie = require("cookie");
const {authenticateToken} = require("../auth/manageToken");
const {Promise} = require("mongoose");
const {PlateModel} = require("../controllers/plateController");
const {getLastKnownData, saveCheck, isLastTheftInTimeWindow} = require("../controllers/hardwareIOController");
const {UserModel} = require("../controllers/userController");
const {createServer} = require('http');
const express = require('express');
const app = express();
const http = createServer(app);
const io = require('socket.io')(http, {
    cors: {
        cookie: true,
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["authorization"],
        credentials: true
    }
});



module.exports = (SOCKETIO_PORT) => {
    http.listen(SOCKETIO_PORT, ()=>{
        console.log("SocketIO listen on port " + SOCKETIO_PORT)
    })
    io.on('connection', (socket) => {
        console.log('connected');
        socket.on('disconnect', () => {
            console.log('user disconnected')
        });

        async function checkSocketsInRoom(roomName) {
            const sockets = await io.in(roomName).fetchSockets();
            for (const socket of sockets) {
                try {
                    const token = cookie.parse(socket.handshake.headers.cookie).token;
                    authenticateToken(token);
                } catch (e) {
                    socket.leave(roomName);
                    socket.disconnect();
                }
            }
        }

        socket.on('request last known status', () => {
            let token = "";
            try {
                token = cookie.parse(socket.handshake.headers.cookie).token;
            } catch (e) {
                console.log(e);
            }
            console.log(token);
            Promise.resolve()
                .then(() => authenticateToken(token))
                .then((user) => {
                    const username = user.username;
                    const email = user.email;
                    const addressName = JSON.stringify({username: username, email: email});
                    PlateModel.findOne({username: username})
                        .then((plate) => {
                            getLastKnownData(plate.deviceID)
                                .then(([res, alarm]) => {
                                    socket.emit(addressName, [res, alarm], (response) => {
                                        try {
                                            authenticateToken(response.token)
                                        } catch (e) {
                                            console.log("socket leaving room " + addressName)
                                            socket.leave(addressName);
                                            socket.disconnect();
                                        }
                                    })
                                })
                                .then(() => {
                                    console.log("socket in room " + addressName)
                                    socket.join(addressName);
                                })
                                .catch(err => {
                                    console.log("EA" + err)
                                    console.log("socket leaving room " + addressName)
                                    socket.leave(addressName);
                                });
                        })
                        .catch((err) => console.log("EB" + err));
                })
                .catch((err) => {
                    console.log(err);
                    socket.disconnect();
                })

        });
        socket.on("normal state", (msg) => {
            saveCheck(JSON.parse(msg), false)
                .then(async (new_doc) => {
                    const plate = await PlateModel.findOne({deviceID: new_doc.deviceID});
                    return [new_doc, plate]
                })
                .then(async (res) => {
                    const user = await UserModel.findOne({username: res[1].username})
                    return [res[0], user];
                })
                .then(async ([new_doc, user]) => {
                    let roomName = JSON.stringify({username: user.username, email: user.email});
                    await checkSocketsInRoom(roomName);
                    socket.to(roomName).emit(roomName, [new_doc, false]);
                })
                .catch(err => console.log(err))
        });

        socket.on("alarm state", (msg) => {
            saveCheck(JSON.parse(msg), true)
                .then(async (new_doc) => {
                    const plate = await PlateModel.findOne({deviceID: new_doc.deviceID});
                    return [new_doc, plate]
                })
                .then(async (res) => {
                    const user = await UserModel.findOne({username: res[1].username})
                    return [res[0], res[1], user];
                })
                .then(async ([new_doc, plate, user]) => {
                    let roomName = JSON.stringify({username: user.username, email: user.email});
                    await checkSocketsInRoom(roomName);
                    io.to(roomName).emit(roomName, [new_doc, true]);
                    return [new_doc, plate, user];
                })
                .then(async ([new_doc, plate, user]) => {

                    isLastTheftInTimeWindow(new_doc, 4)
                        .then((res) => {
                            const notify = !Boolean(res);
                            if (notify) {
                                console.log("sending email!!!")
                                //sendNotificationEmail(user, plate); //TODO remove in prod

                            }
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        });
    });
}