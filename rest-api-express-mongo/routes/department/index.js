const express = require('express');
const department = require('../../models/department-model');
const router = express.Router()
//Post Method
router.post('/', async (req, res) => {
    const data = new department({
        name: req.body.name,
        desc: req.body.desc
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
        const data = await department.find();
        res.send(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/:id', async (req, res) => {
    try{
        const data = await department.findById(req.params.id);
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

        const result = await department.findByIdAndUpdate(
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
        const data = await department.findByIdAndDelete(id)
        res.send({message:`Document with ${data.name} has been deleted..`})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;