const path = require("path");
const userRelatedRouter = require("express").Router();
const USER_RELATED_PATHS = ["/signup", "/signin", "/dashboard"];
const {generateAccessToken,authenticateToken} = require('../auth/manageToken');
const {newUser, UserModel} = require("../controllers/userController");
const {newPlate, PlateModel} = require("../controllers/plateController");
const {mongoose, Promise} = require("mongoose");

userRelatedRouter.post("/signup", async (req, res) => {
    let session = null;

    return Promise.resolve()
        .then(() => mongoose.startSession())
        .then((_session) => {
            session = _session;
            return session.withTransaction(async () => {
                await UserModel.create(await newUser(req.body));
                await PlateModel.create(await newPlate(req.body));

            });
        })
        .then(() => {
            res.send(generateAccessToken({
                "username": req.body["username"],
                "email":    req.body["email"],
                "password": req.body["password"]}));
        })
        .catch((err) => {
            console.log("ERRORE");
            console.log(err);
            res.sendStatus(400);
        })
}).post("/signin", (req, res) => {
    authenticateToken(req.body);
    // TODO : ...
})



module.exports = userRelatedRouter;