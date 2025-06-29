const {Resident} = require('../models/resident.model');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const residentList = await Resident.find();

    if(!residentList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(residentList);
})

router.get('/:id', async(req,res)=>{
    const resident = await Resident.findById(req.params.id);

    if(!resident) {
        res.status(500).json({message: 'The resident with the given ID was not found.'})
    } 
    res.status(200).send(resident);
})



router.post('/', async (req,res)=>{
    let resident = new Resident({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        notes: req.body.notes,
        residentID: req.body.residentID,
    })
    resident = await resident.save();

    if(!resident)
    return res.status(400).send('the resident cannot be created!')

    res.send(resident);
})


router.put('/:id',async (req, res)=> {
    const resident = await Resident.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            notes: req.body.notes,
            residentID: req.body.residentID,
        },
        { new: true}
    )

    if(!resident)
    return res.status(400).send('the resident cannot be created!')

    res.send(resident);
})

router.delete('/:id', (req, res)=>{
    Resident.findByIdAndRemove(req.params.id).then(resident =>{
        if(resident) {
            return res.status(200).json({success: true, message: 'the resident is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "resident not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;