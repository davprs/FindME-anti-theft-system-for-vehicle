const mongoose = require('mongoose');
const PlateModel = require("../models/plateModel")(mongoose);

module.exports.PlateModel = PlateModel;

module.exports.newPlate = async (jsonInfo) => {
    const new_info = PlateModel(jsonInfo);
    return new_info;
}



