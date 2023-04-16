const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper (async(req, res) => {
    // res.send('get all tasks')
    // try{
    //     const tasks = await Task.find({})
    //     res.status(200).json({
    //         status: "success",
    //         data: {
    //             tasks,
    //             nbHits: tasks.length
    //         }
    //     })
    // }catch(err){
    //     res.status(500).json({
    //         message: err
    //     })
    // }
    const tasks = await Task.find({})
    res.status(200).json({
        status: "success",
        data: {
            tasks,
            nbHits: tasks.length
        }
    })
})

const createTask = asyncWrapper(async (req, res) => {
    // try{
    //     const task = await Task.create(req.body)
    //     // res.json(req.body)
    //     res.status(201).json({ task })
    // }catch(err){
    //     console.log(err)
    //     res.status(500).json({
    //         message: err
    //     })
    // }
    const task = await Task.create(req.body)
    res.status(201).json({
        status: "success",
        data: {
            task
        }
    })
})

const getTask = asyncWrapper(async (req, res, next) => {
    // try {
    //     // const taskId = req.params.id
    //     const {id: taskId} = req.params
    //     const task = await Task.findOne({_id: taskId})

    //     if(!task){
    //         return res.status(404).json({
    //             message: `no task with id ${taskId}`
    //         })
    //     }

    //     res.status(200).json({task})
    // } catch (err) {
    //     res.status(500).json({
    //         message: err
    //     })
    // }
    const {id: taskId} = req.params
    const task = await Task.findOne({ _id: taskId})
    if(!task){
        const error = new Error('Not found')
        error.status = 404

        return res.status(404).json({
            status: "failed",
            msg: `no task with id: ${taskId}`
        })

        return next(error)
    }

    res.status(200).json({
        status: "success",
        data: {
            task
        }
    })
})

const updateTask = asyncWrapper(async(req, res) => {
    // try {
    //     const {id: taskId} = req.params
    //     const task = await Task.findOneAndUpdate({
    //         _id: taskId
    //     }, req.body, {
    //         new: true,
    //         runValidators: true
    //     })

    //     if(!task){
    //         return res.status(4040).json({
    //             msg: `NO task with id : ${taskId}`
    //         })
    //     }

    //     res.status(200).json({
    //         id: taskId,
    //         data: req.body
    //     })
    // } catch (err) {
    //     res.status(500).json({
    //         message: err
    //     })
    // }

    const {id: taskId} = req.params
    const task = await Task.findOneAndUpdate({ _id: taskId}, req.body, {
        new: true,
        runValidators: true
    })

    if(!task){
        return res.status(404).json({
            status: "failed",
            msg: `no task with id: ${taskId}`
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            task
        }
    })
})

const deleteTask = asyncWrapper(async(req, res) => {
    // try {
    //     const {id: taskId} = req.params
    //     const task = await Task.findOneAndDelete({_id: taskId}, req.body)
    //     if(!task){
    //         return res.status(404).json({
    //             message: `no task no task with id: ${taskId}`
    //         })
    //     }
    //     res.status(200).json({task})
    // } catch (err) {
    //     res.status(500).json({
    //         message: err
    //     })
    // }
    const {id: taskId} = req.params
    const task = await Task.findOneAndDelete({ _id: taskId})
    if(!task){
        return res.status(404).json({
            status: "failed",
            msg: `no task with id: ${taskId}`
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            task
        }
    })
})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}