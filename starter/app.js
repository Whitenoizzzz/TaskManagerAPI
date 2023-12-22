
const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

app.use(express.static('./public'))
app.use (express.json()) // to read the data sent using put or post(js)

app.use('/api/v1/tasks',tasks) // for routes

const port = 3000;

const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port , console.log(`Server is running ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()

