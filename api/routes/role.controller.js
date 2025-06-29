const {Role} = require('../models/role.model');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const roleList = await Role.find();

    if(!roleList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(roleList);
})

router.get('/:id', async(req,res)=>{
    const role = await Role.findById(req.params.id);

    if(!role) {
        res.status(500).json({message: 'The role with the given ID was not found.'})
    } 
    res.status(200).send(role);
})



router.post('/', async (req,res)=>{
    let role = new Role({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        notes: req.body.notes,
        roleID: req.body.roleID,
    })
    role = await role.save();

    if(!role)
    return res.status(400).send('the role cannot be created!')

    res.send(role);
})


router.put('/:id',async (req, res)=> {
    const role = await Role.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            notes: req.body.notes,
            roleID: req.body.roleID,
        },
        { new: true}
    )

    if(!role)
    return res.status(400).send('the role cannot be created!')

    res.send(role);
})

router.delete('/:id', (req, res)=>{
    Role.findByIdAndRemove(req.params.id).then(role =>{
        if(role) {
            return res.status(200).json({success: true, message: 'the role is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "role not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;