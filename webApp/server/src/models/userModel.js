module.exports = (mongoose)=> {
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        username: {type: String, unique: true, required: true},
        firstName: String,
        email: {type: String, unique: true, required: true},
        lastName: String,
        password: String
    });
    return mongoose.model('users', UserSchema, 'users');
};
