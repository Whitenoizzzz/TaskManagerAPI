const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{   // these are the basic validations we can perform 
    type:String,
    required : [true, 'must provide name'],
    trim: true,
    maxlength : [20, 'name cannot be more than 2o characters'],
    },
    completed: 
    {
        type : Boolean,
        default : false,
    }
})

module.exports = mongoose.model('Task',TaskSchema)