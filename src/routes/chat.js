const express = require('express');
const {
  myChats,
  deleteChats,
  sendRequest,
  acceptRequest,
} = require('../controllers/chat');
const authentication = require('../middlewares/authentication');
const { Chat } = require('../models/chat');
const router = express.Router();

router.get('/myChats', authentication, myChats);
router.post('/sendRequest', authentication, sendRequest);
router.post('/acceptRequest', authentication, acceptRequest);
router.delete('/delete', deleteChats);
router.post('/all', async (req, res) => {
  const chats = await Chat.find();
  res.json(chats);
});

module.exports = router;
