const Task = require('../models/Task')

const getAllTasks = async(req, res) => {
    // res.send('get all tasks')
    try{
        const tasks = await Task.find({})
        res.status(200).json({
            tasks
        })
    }catch(err){
        res.status(500).json({
            message: err
        })
    }
}

const createTask = async (req, res) => {
    try{
        const task = await Task.create(req.body)
        // res.json(req.body)
        res.status(201).json({ task })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: err
        })
    }
}

const getTask = async (req, res) => {
    try {
        // const taskId = req.params.id
        const {id: taskId} = req.params
        const task = await Task.findOne({_id: taskId})

        if(!task){
            return res.status(404).json({
                message: `no task with id ${taskId}`
            })
        }

        res.status(200).json({task})
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const updateTask = (req, res) => {
    res.send('update task')
}

const deleteTask = async(req, res) => {
    try {
        const {id: taskId} = req.params
        const task = await Task.findOneAndDelete({_id: taskId})
        if(!task){
            return res.status(404).json({
                message: 'no task found'
            })
        }
        res.status(200).json({message: 'task has successfully deleted'})
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}