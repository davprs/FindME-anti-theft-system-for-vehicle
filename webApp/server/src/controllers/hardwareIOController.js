const mongoose = require('mongoose');
const NormalDeviceInfo= require("../models/deviceInfoModel.js").normalModel(mongoose);
const AlarmDeviceInfo= require("../models/deviceInfoModel.js").alarmModel(mongoose);

module.exports.saveCheck = async (jsonInfo, alarmState) => {
    let doc;
    if (alarmState) {
        doc = new AlarmDeviceInfo(jsonInfo);
        doc.save((err, info) => {
            if (err) {
                throw new Error(doc);
            }
        });
    } else {
        const new_info = new NormalDeviceInfo(jsonInfo);
        doc = await NormalDeviceInfo.findOneAndUpdate({deviceID: new_info.deviceID}, {$set: {
            bat: new_info.bat,
            gpsPos: new_info.gpsPos,
            gpsSig: new_info.gpsSig,
            simSig: new_info.simSig
            }}, {
            new: true,
            upsert: true
        }).catch(err => new Error(err));
    }

    return doc;
}

module.exports.getLastKnownData = (deviceID) => {
    return Promise.all([getLastNormal(deviceID), getLastTheft(deviceID)])
        .then((values) => {
            if (values[0].updatedAt > values[1].updatedAt){
                return [values[0], false];
            }
            return [values[1], true];
        });
}

module.exports.isLastTheftInTimeWindow = async (new_doc, timeWindow) => {
    return await AlarmDeviceInfo.findOne({
        deviceID: new_doc.deviceID, createdAt: {
            $gte: new Date(new Date(new_doc.createdAt) - 1000 * timeWindow),
            $lt: new Date(new_doc.createdAt)
        }
    });
}

getLastNormal = (deviceID) => {
    return NormalDeviceInfo.findOne({"deviceID": deviceID});
}

getLastTheft = (deviceID) => {
    return AlarmDeviceInfo.findOne({"deviceID": deviceID}).sort({createdAt: -1});

}



