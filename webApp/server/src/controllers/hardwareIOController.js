const mongoose = require('mongoose');
const NormalDeviceInfo= require("../models/deviceInfoModel.js").normalModel(mongoose);
const AlarmDeviceInfo= require("../models/deviceInfoModel.js").alarmModel(mongoose);

module.exports.saveCheck = async (jsonInfo, alarmState) => {
    let new_info;
    if (alarmState) {
        new_info = new AlarmDeviceInfo(jsonInfo);
        new_info.save((err, info) => {
            if (err) {
                console.log(err);
            }
        });
    } else {
        new_info = new NormalDeviceInfo(jsonInfo);
        let doc = await NormalDeviceInfo.findOneAndUpdate({deviceID: new_info.deviceID}, {$set: {
            bat: new_info.bat,
            gpsPos: new_info.gpsPos,
            gpsSig: new_info.gpsSig,
            simSig: new_info.simSig
            }}, {
            new: true,
            upsert: true
        });
        console.log(doc);
    }
}



