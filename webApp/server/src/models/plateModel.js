module.exports = (mongoose)=> {
    const Schema = mongoose.Schema;
    const PlateSchema = new Schema({
        username: {type: String, unique: true, required: true},
        plate: {type: String, unique: true, required: true},
    });
    return mongoose.model('IDK', PlateSchema, 'plates');
};
