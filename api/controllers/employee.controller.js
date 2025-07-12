const {Employee} = require('../models/employee.model');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const employeeList = await Employee.find();

    if(!employeeList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(employeeList);
})

router.get('/:id', async(req,res)=>{
    const employee = await Employee.findById(req.params.id);

    if(!employee) {
        res.status(500).json({message: 'The employee with the given ID was not found.'})
    } 
    res.status(200).send(employee);
})



router.post('/', async (req,res)=>{
    let employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        notes: req.body.notes,
        employeeID: req.body.employeeID,
    })
    employee = await employee.save();

    if(!employee)
    return res.status(400).send('the employee cannot be created!')

    res.send(employee);
})


router.put('/:id',async (req, res)=> {
    const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            notes: req.body.notes,
            employeeID: req.body.employeeID,
        },
        { new: true}
    )

    if(!employee)
    return res.status(400).send('the employee cannot be created!')

    res.send(employee);
})

router.delete('/:id', (req, res)=>{
    Employee.findByIdAndRemove(req.params.id).then(employee =>{
        if(employee) {
            return res.status(200).json({success: true, message: 'the employee is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "employee not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;