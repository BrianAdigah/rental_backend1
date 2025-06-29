const mongoose = require('mongoose');

const leaseSchema = new mongoose.Schema({
    resident: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Resident', 
     required: true 
    },
    unit: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Unit',
     required: true
    },
    Agreement: {
        type: String, 
   },
    startDate: {
        type: Date,
        required: true 
    },
    endDate: {
         type: Date 
    },

    status: {
         type: String,
         enum: ['active', 'terminated', 'expired'],
          default: 'active' 
    }
});
exports.Lease = mongoose.model('Lease', leaseSchema);

