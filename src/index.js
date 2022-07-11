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
const connection = require('./config/db');
const socket = require('socket.io');

//middlewares
app.use(express.json());

const whitelist = [
  'http://localhost:3000',
  ' https://app-chatup.herokuapp.com',
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log('origin:', origin);
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
app.use('/api/auth/', authRoute);
app.use('/api/users', usersRoute);

// app.use((req, res, next) => {
//   return res.status(404).json({ message: 'Bad request.' });
// });
// //
//db connection
connection();

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  console.log('path.join: ', path.join(__dirname, 'client/build'));
  fs.readdir(path.join(__dirname, 'client/build'), function (err, images) {
    if (err) {
      console.log('err:', err);
      return;
    }
    console.log('not err:', images);
  });
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    console.log('routes to react', req.url);
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = socket(server, {
  cors: {
    origin: whitelist,
    methods: ['GET', 'POST', 'PUT'],
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
const getUserSocket = (uid) => onlineUsers.find(({ userId }) => userId === uid);

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on('user_connected', (userId) => {
    addOnlineUser(userId, socket.id);
    console.log('Online users: ', onlineUsers.length);
  });
  socket.on('user_disconnected', (socketId) => {
    removeOnlineUser(socketId);
    console.log('Online users: ' + onlineUsers.length);
  });
  socket.on('send_notification', ({ senderId, receiverId }) => {
    const receiver = getUserSocket(receiverId);
    const socketId = receiver?.socketId || null;
    const isOnline = socketId != null;
    if (isOnline && senderId) {
      socket.to(socketId).emit('receive_notification', senderId);
    }
  });
  socket.on('accept_request', ({ senderId, receiverId }) => {
    const sender = getUserSocket(senderId);
    const senderSocket = sender?.socketId || null;
    console.log('sender:', senderSocket, 'receiverId:', receiverId);
    socket.to(senderSocket).emit('accepted_request', receiverId);
  });
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});
