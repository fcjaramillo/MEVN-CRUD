const express = require('express')
const router = express.Router();

const Task = require('../models/Task')

router.get('/', async (req, res) => {
    const tasks = await Task.find()
    //console.log(tasks)
    res.json(tasks)
})

router.get('/:id', async (req,res) =>{
    const task = await Task.findById(req.params.id)
    res.json(task)
})

router.post('/', async (req,res) => {
    const task = new Task(req.body)
    await task.save()
    res.json({
        status : 'tarea guardada'
    })
    //console.log(req.body)
})

router.put('/:id', async (req, res) => {
    console.log(req.params.id)
    await Task.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        status: 'Task router'
    })
})

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.json({
        status: 'Task router'
    })
})

module.exports = router

