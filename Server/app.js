const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./config/DB')
const userRoutes = require('./routes/UserRoutes')
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use('/api/v1/user', userRoutes)

const start = ()=>{
    connectDB(process.env.MONGOO_URI)
    .then(()=>{
        app.listen(process.env.PORT , ()=>{
            console.log('server is listening to the port ',process.env.PORT)
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

start()