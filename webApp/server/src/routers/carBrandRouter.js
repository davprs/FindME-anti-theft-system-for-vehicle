const {getImageUrl, getBrandNames} = require("../controllers/carBrandController");
const carBrandRouter = require("express").Router();


carBrandRouter
    .get('/names', (req, res) => {
        getBrandNames()
            .then(paths => res.send(paths))
            .catch(err => res.sendStatus(400))
    })
    .get('/image/:brand', (req, res) => {
        console.log("get" + req.params.brand);
        getImageUrl(req.params.brand)
            .then(path => res.send(path))
            .catch(err => res.sendStatus(404))
})

module.exports = carBrandRouter;