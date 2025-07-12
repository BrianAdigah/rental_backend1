const {PaymentCategory} = require('../models/paymentCategory.model');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const paymentCategoryList = await PaymentCategory.find();

    if(!paymentCategoryList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(paymentCategoryList);
})

router.get('/:id', async(req,res)=>{
    const paymentCategory = await PaymentCategory.findById(req.params.id);

    if(!paymentCategory) {
        res.status(500).json({message: 'The paymentCategory with the given ID was not found.'})
    } 
    res.status(200).send(paymentCategory);
})



router.post('/', async (req,res)=>{
    let paymentCategory = new PaymentCategory({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        notes: req.body.notes,
        paymentCategoryID: req.body.paymentCategoryID,
    })
    paymentCategory = await paymentCategory.save();

    if(!paymentCategory)
    return res.status(400).send('the paymentCategory cannot be created!')

    res.send(paymentCategory);
})


router.put('/:id',async (req, res)=> {
    const paymentCategory = await PaymentCategory.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            notes: req.body.notes,
            paymentCategoryID: req.body.paymentCategoryID,
        },
        { new: true}
    )

    if(!paymentCategory)
    return res.status(400).send('the paymentCategory cannot be created!')

    res.send(paymentCategory);
})

router.delete('/:id', (req, res)=>{
    PaymentCategory.findByIdAndRemove(req.params.id).then(paymentCategory =>{
        if(paymentCategory) {
            return res.status(200).json({success: true, message: 'the paymentCategory is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "paymentCategory not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;