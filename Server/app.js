const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); // Import http module to create server
const { Server } = require('socket.io'); // Import socket.io
const connectDB = require('./config/DB');
const userRoutes = require('./routes/UserRoutes');
const chatRoutes = require('./routes/ChatRoutes');
const messageRoutes = require('./routes/MessageRoutes');
const postRoutes = require('./routes/PostRoutes');
const savesRoutes = require('./routes/SavesRoutes');
const commentsRoutes = require('./routes/CommentsRoutes');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Create HTTP server instance

// Initialize Socket.io with CORS options
const io = new Server(server, {
    cors: {
        origin: '*', // Adjust to your client’s origin in production
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());

io.on('connection', (socket) => {

    socket.on('joinRoom', (roomId) => {
        console.log('a user added the room')
        socket.join(roomId);
    });

    socket.on('sendMessage', (message) => {

        const chat = message.chat

        if (!chat.users) {
            console.log('there is no users here')
        }

        chat.users.forEach(user => {
            if (message.sender._id === user._id) return

            socket.in(chat._id).emit('messageRecieved', message)

        });

    })

    socket.on('typing', (chatId, user) => {
        socket.in(chatId).emit('typing', true)
        console.log(`user ${user.name} is typing`)
    })

    socket.on('stop typing', (chatId, user) => {
        socket.in(chatId).emit('stop typing', false)
        console.log(`user ${user.name} is stop typing`)
    })


    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/saves', savesRoutes);
app.use('/api/v1/comments', commentsRoutes);

// Socket.io configuration

// Start the server and connect to DB
const start = () => {
    connectDB(process.env.MONGOO_URI)
        .then(() => {
            server.listen(process.env.PORT, () => { // Use server instance here
                console.log('Server is listening on port', process.env.PORT);
            });
        })
        .catch(err => {
            console.log(err);
        });
};

start();
