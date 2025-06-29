const mongoose = require('mongoose');

const residentSchema = mongoose.Schema({
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
    documents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ResidentDocument'
      },
    notes: {
        type: String,
    },
})


exports.Resident = mongoose.model('Resident', residentSchema);

