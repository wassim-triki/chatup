const { User } = require('../models/user');

module.exports.getAllUsers = async (req, res) => {
  if (!req.query) return;
  try {
    const users = await User.find().lean();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.searchUsers = async (req, res) => {
  try {
    const search = req.query.search?.trim();
    console.log(search);
    const query = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
          ],
        }
      : {}; //TO-DO combine search for both fields

    let users = await User.find(query);
    if (search) {
      users = users.filter(({ _id }) => _id != req.userId);
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: 'Failed To Load Search Results.' });
  } finally {
    res.end();
  }
};

module.exports.acceptRequest = async (req, res) => {
  try {
    const senderId = req.body.id;
    const receiver = await User.findOne({ _id: req.userId });

    const sender = await User.findOne({ _id: senderId });
    if (!sender) throw new Error('Sender Does Not Exist');
    if (receiver.contacts.includes(sender._id))
      throw new Error(`${sender.email} Is Already In Your Contacts.`);

    const updatedReceivedRequests = receiver.receivedRequests.filter(
      (id) => id.toString() !== sender._id.toString()
    );
    const updatedSentRequests = sender.sentRequests.filter((id) => {
      return id.toString() !== receiver._id.toString();
    });
    // User.updateOne({_id:receiver._id},{$pull:{receivedRequests:}})
    sender.sentRequests = updatedSentRequests;
    receiver.receivedRequests = updatedReceivedRequests;
    receiver.contacts.push(sender);
    sender.contacts.push(receiver);
    receiver.markModified('object');
    sender.markModified('object');
    await receiver.save();
    await sender.save();
    res.status(201).json({ message: `${sender.firstName} Added To Contacts.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  } finally {
    res.end();
  }
};
module.exports.sendRequest = async (req, res) => {
  try {
    const receiverId = req.body.id;
    const receiver = await User.findOne({ _id: receiverId });
    if (!receiver)
      throw new Error(`User With email ${receiver.email} Does Not Exist.`);
    const sender = await User.findOne({ _id: req.userId });
    if (receiver.contacts.includes(sender._id))
      throw new Error(`${receiver.firstName} Is Already In Your Contacts.`);
    if (
      !receiver.sentRequests.includes(sender._id) &&
      !receiver.receivedRequests.includes(sender._id)
    ) {
      receiver.receivedRequests.unshift(sender);
      sender.sentRequests.unshift(receiver);
      receiver.markModified('object');
      sender.markModified('object');
      await receiver.save();
      await sender.save();
      res.status(201).json({
        message: `Request Sent To ${receiver.firstName}`,
      });
    } else {
      throw new Error(`Request Already Sent.`);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  } finally {
    res.end();
  }
};

module.exports.deleteAllRequests = async (req, res) => {
  try {
    await User.updateMany(
      {},
      {
        sentRequests: [],
        receivedRequests: [],
      }
    );
    res.status(201).send({ messasge: 'All Requests Deleted.' });
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};
module.exports.deleteAllContacts = async (req, res) => {
  try {
    await User.updateMany(
      {},
      {
        contacts: [],
      }
    );
    res.status(201).send({ messasge: 'All Contacts Deleted.' });
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

const getData = async (field, req, res) => {
  try {
    const { [field]: ids } = await User.findOne({ _id: req.userId }).select(
      `${field} -_id`
    );
    const promises = ids.map((id) => User.findOne({ _id: id }));
    const data = await Promise.all(promises);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    res.end();
  }
};

module.exports.getContacts = async (req, res) => {
  await getData('contacts', req, res);
};
module.exports.getRequests = async (req, res) => {
  await getData('receivedRequests', req, res);
};
module.exports.deleteUser = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json({ message: 'All Users Deleted.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
