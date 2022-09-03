const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');
const publicInfoRouter = require('./src/routers/publicInfoRouter');
const userRelatedRouter = require("./src/routers/usersServicesRouter");
const brandImageRouter = require("./src/routers/carBrandRouter");

const EXPRESS_PORT = 5000;
const FRONTEND_REQUEST_PORT = EXPRESS_PORT; //TODO: check in prod
const SOCKETIO_PORT = 4000;
const compression = require('compression');
require('./src/routers/socketIORouter')(SOCKETIO_PORT, FRONTEND_REQUEST_PORT);

global.appRoot = path.resolve(__dirname);
mongoose.connect('mongodb://mongo:27017/FindME');
app.use(compression())
app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(appRoot, "build"))); //TODO uncomment in build

app.use(express.json());

app.use('/api/auth', userRelatedRouter);
app.use('/api/car_brand', brandImageRouter);
app.use('/', publicInfoRouter);

app.use((req, res)=> {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(EXPRESS_PORT,() =>{
    console.log('Node API server started on localhost:' + EXPRESS_PORT);
});
