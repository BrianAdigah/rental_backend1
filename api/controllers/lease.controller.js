const {Lease} = require('../models/lease.model');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const leaseList = await Lease.find();

    if(!leaseList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(leaseList);
})

router.get('/:id', async(req,res)=>{
    const lease = await Lease.findById(req.params.id);

    if(!lease) {
        res.status(500).json({message: 'The lease with the given ID was not found.'})
    } 
    res.status(200).send(lease);
})



router.post('/', async (req,res)=>{
    let lease = new Lease({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        notes: req.body.notes,
        leaseID: req.body.leaseID,
    })
    lease = await lease.save();

    if(!lease)
    return res.status(400).send('the lease cannot be created!')

    res.send(lease);
})


router.put('/:id',async (req, res)=> {
    const lease = await Lease.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            notes: req.body.notes,
            leaseID: req.body.leaseID,
        },
        { new: true}
    )

    if(!lease)
    return res.status(400).send('the lease cannot be created!')

    res.send(lease);
})

router.delete('/:id', (req, res)=>{
    Lease.findByIdAndRemove(req.params.id).then(lease =>{
        if(lease) {
            return res.status(200).json({success: true, message: 'the lease is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "lease not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;