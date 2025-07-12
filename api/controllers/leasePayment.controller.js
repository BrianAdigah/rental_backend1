const {LeasePayment} = require('../models/leasePayment.model');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const leasePaymentList = await LeasePayment.find();

    if(!leasePaymentList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(leasePaymentList);
})

router.get('/:id', async(req,res)=>{
    const leasePayment = await LeasePayment.findById(req.params.id);

    if(!leasePayment) {
        res.status(500).json({message: 'The leasePayment with the given ID was not found.'})
    } 
    res.status(200).send(leasePayment);
})



router.post('/', async (req,res)=>{
    let leasePayment = new LeasePayment({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        notes: req.body.notes,
        leasePaymentID: req.body.leasePaymentID,
    })
    leasePayment = await leasePayment.save();

    if(!leasePayment)
    return res.status(400).send('the leasePayment cannot be created!')

    res.send(leasePayment);
})


router.put('/:id',async (req, res)=> {
    const leasePayment = await LeasePayment.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            notes: req.body.notes,
            leasePaymentID: req.body.leasePaymentID,
        },
        { new: true}
    )

    if(!leasePayment)
    return res.status(400).send('the leasePayment cannot be created!')

    res.send(leasePayment);
})

router.delete('/:id', (req, res)=>{
    LeasePayment.findByIdAndRemove(req.params.id).then(leasePayment =>{
        if(leasePayment) {
            return res.status(200).json({success: true, message: 'the leasePayment is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "leasePayment not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;