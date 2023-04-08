const express = require('express')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()

// all routes
const taskRoutes = require('./routes/taskRoutes')

// middleware
app.use(express.json())

// routes
app.get('/hello', (req, res) => {
    res.send('task manager app running')
})

app.use('/api/v1/tasks', taskRoutes)


const port = 3000

// app.listen(port, console.log(`server is listening on port ${port}`))
const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}....`))
        // console.log(process.env)
    }catch(err){
        console.log(err)
    }
}

start()