const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {Timestamp: true});


exports.User = mongoose.model('User', userSchema);
export default User;
