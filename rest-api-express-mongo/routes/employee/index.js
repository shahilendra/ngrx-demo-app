const express = require('express');
const employee = require('../../models/employee-model');
const router = express.Router()
//Post Method
router.post('/', async (req, res) => {
    const data = new employee({
        name: req.body.name,
        age: req.body.age
    });
    try {
        const dataToSave = await data.save();
        res.status(200).send(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/', async (req, res) => {
    try{
        const data = await employee.find();
        res.send(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/:id', async (req, res) => {
    try{
        const data = await employee.findById(req.params.id);
        res.send(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await employee.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await employee.findByIdAndDelete(id)
        res.send({message:`Document with ${data.name} has been deleted..`})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;