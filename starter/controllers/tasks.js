//callback functions for all the routes. Defined in a seperate file for clean code
const Task = require('../models/Task')

const getAllTasks = async(req,res)=>{
    try {
        const tasks = await Task.find({});
        res.status(200).json({tasks}); // {tasks} is ES6 shortcut for {tasks:tasks} , if property
                                       // has same name as value
    } catch (error) {
        res.status(500).json({msg : error});
    }
}

const createTask = async (req,res)=>{
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg : error})
    }
   
}

const getTask = async (req,res)=>{
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOne({ _id : taskID})
        if(!task){
            return res.status(404).json({msg : `No task with id : ${taskID}`})
        }  
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg : error})
    }
    
}

const updateTask = async (req,res)=>{
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id : taskID}, req.body,{ // The id is for identification
            new:true,                                                    // second parameter is for putting
            runValidators : true,                                      // changes and the third object is that
        })                                                // task returns the updated value and basic validation applies
        if(!task){
            return res.status(404).json({msg : `No task with id : ${taskID}`})
        } 
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg : error})
    }
}

const deleteTask = async (req,res)=>{
    try {
      const {id:taskID} = req.params;
      const task = await Task.findOneAndDelete( {_id:taskID});
      if(!task){
        return res.status(404).json({msg : `No task with id : ${taskID}`})
    } 
     res.status(200).json({task : null, status : 'success'})
    } catch (error) {
        res.status(500).json({msg : error})
    }
}

module.exports = { 
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}