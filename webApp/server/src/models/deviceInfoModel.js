getModelFromSchema = (Schema) => {
    return new Schema({
        deviceID: String,
        gpsPos: {
            x: Number,
            y: Number,
        },
        bat: Number,
        simSig: Number,
        gpsSig: Number
    }, {timestamps: true});
}

module.exports.alarmModel = (mongoose)=> {
    const Schema = mongoose.Schema;
    const InfoSchema = getModelFromSchema(Schema);
    return mongoose.model('deviceInfoModel1', InfoSchema, 'theftAlarms');
};

module.exports.normalModel = (mongoose)=> {
    const Schema = mongoose.Schema;
    const InfoSchema = getModelFromSchema(Schema);
    return mongoose.model('deviceInfoModel2', InfoSchema, 'normalCheck');
};
