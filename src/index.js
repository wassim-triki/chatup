require('dotenv').config();
const express = require('express');
const path = require('path');
var fs = require('fs');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/user');
const chatsRoute = require('./routes/chat');
const connection = require('./config/db');
const socket = require('socket.io');
const { User } = require('./models/user');
var morgan = require('morgan');

//middlewares
app.use(express.json());
app.use(morgan('tiny'));

const whitelist = [
  'http://localhost:3000',
  'https://app-chatup.herokuapp.com',
  'https://chat-up-1.herokuapp.com',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/chat', chatsRoute);

app.enable('trust proxy');
app.use((req, res, next) => {
  console.log('req.headers.host:', req.headers.host);
  console.log('req.url:', req.url);
  req.secure ? next() : res.redirect('https://' + req.headers.host + req.url);
});

// app.use((req, res, next) => {
//   return res.status(404).json({ message: 'Bad request.' });
// });
// db connection
connection();

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '..', 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
  });
}

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  if (!process.env.NODE_ENV) {
    const host = `http://localhost:${port}`;
    console.log(`Running on ${host}`);
  }
});
const io = socket(server, {
  cors: {
    origin: whitelist,
    credentials: true,
  },
});

let onlineUsers = [];
const addOnlineUser = (uid, sid) => {
  if (!onlineUsers.some(({ userId }) => userId === uid)) {
    onlineUsers.push({ userId: uid, socketId: sid });
  } else {
    let index;
    if (
      onlineUsers.some(({ userId, socketId }, idx) => {
        if (userId === uid && socketId !== sid) {
          index = idx;
          return true;
        } else return false;
      })
    ) {
      onlineUsers[index].socketId = sid;
    }
  }
};
const removeOnlineUser = (_socketId) => {
  onlineUsers = onlineUsers.filter(({ socketId }) => socketId !== _socketId);
};
const getUserById = (uid) => onlineUsers.find(({ userId }) => userId === uid);
const getUserBySocket = (socket) =>
  onlineUsers.find(({ socketId }) => socketId === socket);

io.on('connection', (socket) => {
  socket.on('user_connected', (userId) => {
    addOnlineUser(userId, socket.id);
    console.log('Online users: ', onlineUsers.length);
    socket.emit('online_users', onlineUsers);
  });
  socket.on('send_notification', async ({ senderId, receiverId }) => {
    const receiver = getUserById(receiverId);
    const socketId = receiver?.socketId || null;
    const isOnline = socketId != null;
    if (isOnline && senderId) {
      const sender = await User.findOne({ _id: senderId });
      socket.to(socketId).emit('receive_notification', sender);
    }
  });
  socket.on('accept_request', async ({ senderId, chat }) => {
    const sender = getUserById(senderId);
    const senderSocket = sender?.socketId || null;
    console.log(chat);
    socket.to(senderSocket).emit('accepted_request', chat);
  });
  socket.on('send_message', ({ receiver, message }) => {
    const user = getUserById(receiver) || null;
    if (!user) return;
    const { socketId } = user;
    console.log(message);
    socket.to(socketId).emit('receive_message', message);
  });
  socket.on('disconnect', () => {
    removeOnlineUser(socket.id);
    console.log('Online users: ' + onlineUsers.length);
  });
});
