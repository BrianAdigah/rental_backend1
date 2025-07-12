const {Unit} = require('../models/unit.model');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const unitList = await Unit.find();

    if(!unitList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(unitList);
})

router.get('/:id', async(req,res)=>{
    const unit = await Unit.findById(req.params.id);

    if(!unit) {
        res.status(500).json({message: 'The unit with the given ID was not found.'})
    } 
    res.status(200).send(unit);
})



router.post('/', async (req,res)=>{
    let unit = new Unit({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        notes: req.body.notes,
        unitID: req.body.unitID,
    })
    unit = await unit.save();

    if(!unit)
    return res.status(400).send('the unit cannot be created!')

    res.send(unit);
})


router.put('/:id',async (req, res)=> {
    const unit = await Unit.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            notes: req.body.notes,
            unitID: req.body.unitID,
        },
        { new: true}
    )

    if(!unit)
    return res.status(400).send('the unit cannot be created!')

    res.send(unit);
})

router.delete('/:id', (req, res)=>{
    Unit.findByIdAndRemove(req.params.id).then(unit =>{
        if(unit) {
            return res.status(200).json({success: true, message: 'the unit is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "unit not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;