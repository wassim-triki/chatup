const getChatUser = (authUser, chatUsers) => {
  return chatUsers[0]._id === authUser._id ? chatUsers[1] : chatUsers[0];
};

export default getChatUser;
