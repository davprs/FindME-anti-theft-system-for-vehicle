const mongoose = require('mongoose');
const UserModel= require("../models/userModel")(mongoose);

module.exports.UserModel = UserModel;

module.exports.newUser = async (jsonInfo) => {
    const new_info = UserModel(jsonInfo);
    return new_info;
}



