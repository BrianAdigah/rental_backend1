const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
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


exports.Auth = mongoose.model('Auth', authSchema);
export default Auth;
