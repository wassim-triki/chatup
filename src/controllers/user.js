const { User } = require('../models/user');
const { Chat } = require('../models/chat');

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
  try {
    const requests = await User.findOne({ _id: req.userId })
      .select(`receivedRequests -_id`)
      .populate('receivedRequests');
    res.status(200).json(requests.receivedRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    res.end();
  }
};
module.exports.deleteUser = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json({ message: 'All Users Deleted.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
