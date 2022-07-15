const express = require('express');
const { userChats, deleteChats, sendRequest } = require('../controllers/chat');
const authentication = require('../middlewares/authentication');
const { Chat } = require('../models/chat');
const router = express.Router();

router.post('/', authentication, userChats);
router.post('/sendRequest', authentication, sendRequest);
router.delete('/delete', deleteChats);
router.post('/all', async (req, res) => {
  const chats = await Chat.find();
  res.json(chats);
});

module.exports = router;
