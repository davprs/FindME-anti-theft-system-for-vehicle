module.exports = (mongoose)=> {
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        username: {type: String, unique: true, required: true},
        firstName: String,
        email: String,
        lastName: String,
        password: String
    });
    return mongoose.model('userModel', UserSchema, 'users');
};
