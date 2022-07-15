const { json } = require('body-parser');
const { Chat } = require('../models/chat');
const { User } = require('../models/user');

module.exports.sendRequest = async (req, res) => {
  try {
    const receiverId = req.body.id;
    const senderId = req.userId;
    const chat = await Chat.findOne({
      users: { $all: [receiverId, senderId] },
    });
    // if chat already exists
    if (chat) throw new Error(`User Already in Your Chats`);
    const receiver = await User.findOne({ _id: receiverId });
    // if user deleted his acocunt
    if (!receiver) throw new Error(`User Does Not Exist.`);
    const sender = await User.findOne({ _id: senderId });
    // if already sent
    if (
      sender.sentRequests.includes(receiverId) ||
      receiver.sentRequests.includes(senderId)
    ) {
      throw new Error(`Request Already Pending.`);
    } else {
      await User.updateOne(
        { _id: senderId },
        { $push: { sentRequests: [receiverId], $position: 0 } }
      );
      await User.updateOne(
        { _id: receiverId },
        { $push: { receivedRequests: [senderId], $position: 0 } }
      );
    }
    res.status(200).json({ message: 'Request Sent.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.acceptRequest = async (req, res) => {
  try {
    const senderId = req.body.id;
    const receiverId = req.userId;
    const sender = await User.findOne({ _id: senderId });
    if (!sender) throw new Error(`User Does Not Exist.`);
    const receiver = await User.findOne({ _id: receiverId });
    await User.updateOne(
      { _id: senderId },
      { $pull: { sentRequests: receiverId } }
    );
    await User.updateOne(
      { _id: receiverId },
      { $pull: { receivedRequests: senderId } }
    );
    const newChat = {
      chatName: 'sender',
      isGroupChat: false,
      users: [senderId, receiverId],
    };
    const createdChat = await Chat.create(newChat);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      'users',
      '-password'
    );

    res.status(201).json({
      message: `${sender.firstName} Added to your Chat.`,
      chat: fullChat,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.myChats = async (req, res) => {
  try {
    const userId = req.userId;
    const chats = await Chat.find({ users: userId })
      .populate('users', '-password')
      .populate('latestMessage');

    // const filteredChats = [];
    // for (let i = 0; i < chats.length; i++) {
    //   const users = chats[i].users.filter((u) => u._id.toString() !== userId);
    //   const { _id, createdAt, updatedAt, __v } = chats[i];
    //   filteredChats.push({ _id, users, createdAt, updatedAt, __v });
    // }
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    res.end();
  }
};
module.exports.deleteChats = async (req, res) => {
  try {
    await Chat.deleteMany();
    res.status(200).json({ message: 'All Chats Are Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    res.end();
  }
};
