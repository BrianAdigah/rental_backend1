const {PaymentType} = require('../models/paymentType.model');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const paymentTypeList = await PaymentType.find();

    if(!paymentTypeList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(paymentTypeList);
})

router.get('/:id', async(req,res)=>{
    const paymentType = await PaymentType.findById(req.params.id);

    if(!paymentType) {
        res.status(500).json({message: 'The paymentType with the given ID was not found.'})
    } 
    res.status(200).send(paymentType);
})



router.post('/', async (req,res)=>{
    let paymentType = new PaymentType({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        notes: req.body.notes,
        paymentTypeID: req.body.paymentTypeID,
    })
    paymentType = await paymentType.save();

    if(!paymentType)
    return res.status(400).send('the paymentType cannot be created!')

    res.send(paymentType);
})


router.put('/:id',async (req, res)=> {
    const paymentType = await PaymentType.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            notes: req.body.notes,
            paymentTypeID: req.body.paymentTypeID,
        },
        { new: true}
    )

    if(!paymentType)
    return res.status(400).send('the paymentType cannot be created!')

    res.send(paymentType);
})

router.delete('/:id', (req, res)=>{
    PaymentType.findByIdAndRemove(req.params.id).then(paymentType =>{
        if(paymentType) {
            return res.status(200).json({success: true, message: 'the paymentType is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "paymentType not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;