const path = require("path");
const publicInfoRouter = require("express").Router();
const PUBLIC_PATHS = ["/", "/home", "/contatti", "/info", "/login"];

publicInfoRouter.get(PUBLIC_PATHS, (req, res)=>{
    //res.sendFile(path.join(appRoot, "build", "index.html"));  //TODO remove after build
}).use((req, res)=>{
    //res.sendStatus(404).sendFile(path.join(appRoot, "build", "index.html")); //TODO remove after build
})



module.exports = publicInfoRouter;