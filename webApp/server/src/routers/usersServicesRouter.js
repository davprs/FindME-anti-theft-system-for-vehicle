const userRelatedRouter = require("express").Router();
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
            res.send({token : generateAccessToken({
                "username": req.body["username"],
                "email":    req.body["email"]
            }),
                brand : req.body.brand});
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
}).post("/login", (req, res) => {

    return Promise.resolve()
        .then(async () => await UserModel.findOne({email: req.body.email, password: req.body.password}))
        .then(async (user) => [user, await PlateModel.findOne({username: user.username})])
        .then(([user, plate]) => {
            res.send({token : generateAccessToken({
                "username": user.username,
                "email":    user.email
            }),
                brand : plate.brand});
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
})
    .post('/verify/:token', (req, res) => {
        Promise.resolve()
            .then(async () => await authenticateToken(req.params.token))
            .then(() => res.sendStatus(200))
            .catch((err) => {
                console.log(err);
                res.sendStatus(403);
            });
    })



module.exports = userRelatedRouter;