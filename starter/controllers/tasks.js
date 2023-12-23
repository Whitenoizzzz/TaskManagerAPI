//callback functions for all the routes. Defined in a seperate file for clean code
const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async(req,res)=>{
        const tasks = await Task.find({});
        res.status(200).json({tasks}); // {tasks} is ES6 shortcut for {tasks:tasks} , if property
                                       // has same name as value
})

const createTask = asyncWrapper(async (req,res)=>{

    const task = await Task.create(req.body)
    res.status(201).json({task})
   
})

const getTask = asyncWrapper(async (req,res,next)=>{

    const {id:taskID} = req.params;
    const task = await Task.findOne({ _id : taskID})
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`,404))
    }  
    
    res.status(200).json({task})
    
})

const updateTask = asyncWrapper(async (req,res,next)=>{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id : taskID}, req.body,{ // The id is for identification
            new:true,                                                    // second parameter is for putting
            runValidators : true,                                      // changes and the third object is that
        })                                                // task returns the updated value and basic validation applies
        if(!task){
            return next(createCustomError(`No task with id : ${taskID}`,404))
        } 
        res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req,res,next)=>{
      const {id:taskID} = req.params;
      const task = await Task.findOneAndDelete( {_id:taskID});
      if(!task){
        return next(createCustomError(`No task with id : ${taskID}`,404))
    } 
     res.status(200).json({task : null, status : 'success'})
})

module.exports = { 
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}