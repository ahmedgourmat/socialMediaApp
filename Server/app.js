const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./config/DB')
const userRoutes = require('./routes/UserRoutes')
const chatRoutes = require('./routes/ChatRoutes')
const messageRoutes = require('./routes/MessageRoutes')
const postRoutes = require('./routes/PostRoutes')
const savesRoutes = require('./routes/SavesRoutes')
const commentsRoutes = require('./routes/CommentsRoutes')
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/chat', chatRoutes)
app.use('/api/v1/message', messageRoutes)
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/saves', savesRoutes)
app.use('/api/v1/comments', commentsRoutes)


const start = () => {
    connectDB(process.env.MONGOO_URI)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log('server is listening to the port ', process.env.PORT)
            })
        })
        .catch(err => {
            console.log(err)
        })
}

start()