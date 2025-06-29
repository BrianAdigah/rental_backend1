const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    createdAt: {
         type: Date, 
         default: Date.now 
        },

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role', required: true 
    },
})


exports.Employee = mongoose.model('Employee', employeeSchema);

