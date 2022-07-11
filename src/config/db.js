const mongoose = require('mongoose');

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.MONGO_URI, connectionParams);
    console.log('DB CONNECTED 👌');
  } catch (err) {
    console.log('DB CONNECTION ERROR 😨: ', err);
  }
};
