const express = require('express');
const {
  myChats,
  deleteChats,
  sendRequest,
  acceptRequest,
  declineRequest,
  openChat,
  chatMessages,
  sendMessage,
  deleteMessages,
} = require('../controllers/chat');
const authentication = require('../middlewares/authentication');
const { Chat } = require('../models/chat');
const router = express.Router();

router.get('/myChats', authentication, myChats);
router.post('/sendRequest', authentication, sendRequest);
router.post('/acceptRequest', authentication, acceptRequest);
router.post('/declineRequest', authentication, declineRequest);

router.post('/sendMessage', authentication, sendMessage);
router.get('/:chatId', authentication, openChat);
router.get('/:chatId/messages', authentication, chatMessages);
router.delete('/delete', deleteChats);
router.delete('/deleteMessages', deleteMessages);
router.post('/all', async (req, res) => {
  const chats = await Chat.find();
  res.json(chats);
});

module.exports = router;
