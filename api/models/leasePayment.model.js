const mongoose = require('mongoose');

const leasePaymentSchema = new mongoose.Schema({
  lease: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Lease', 
     required: true 
    },
  paymentCategory: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'PaymentCategory' 
    },
  paymentType: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'PaymentType' 
    },
  amount: {
     type: Number, 
     required: true 
    },
  paymentDate: {
     type: Date, 
     default: Date.now 
    },
  recordedBy: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Employee' 
    }
});

exports.PaymentCategory = mongoose.model('LeasePayment', leasePaymentSchema);

