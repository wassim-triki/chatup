const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const MAX_AGE = parseInt(process.env.MAX_AGE);
const EXPIRES_IN = parseInt(process.env.EXPIRES_IN);
const SALT = parseInt(process.env.SALT);
const NODE_ENV = process.env.NODE_ENV;
const hashPassword = async (pwd) => {
  const salt = await bcrypt.genSalt(parseInt(SALT));
  return bcrypt.hash(pwd, salt);
};
const capitalize = (str) => {
  if (str) {
    const arr = str.split(' ');
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length) {
        arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
      }
    }
    const newStr = arr.join(' ');
    return newStr;
  }
};
const removeExtraSpaces = (str) => str.replace(/\s\s+/g, ' ');

module.exports.createUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      throw new Error('Email Already In Use.');
    }
    let userData = {};
    for (const key in req.body) {
      if (req.body[key]) {
        userData = {
          ...userData,
          [key]: req.body[key],
          email: req.body.email.toLowerCase(),
        };
      }
    }
    const hashedPassword = await hashPassword(userData.password);
    userData.password = hashedPassword;
    userData.firstName = removeExtraSpaces(
      capitalize(userData.firstName)
    ).trim();
    userData.lastName = removeExtraSpaces(capitalize(userData.lastName)).trim();
    const response = await User.create(userData);
    // console.log('User created: ', response);
    res.status(201).json({ message: 'Signed up' });
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};
const signJWT = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: EXPIRES_IN });

module.exports.signinUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() }).populate(
    'receivedRequests'
  );
  if (user && (await bcrypt.compare(password, user.password))) {
    delete password;
    const {
      _id,
      email,
      firstName,
      lastName,
      createdAt,
      updatedAt,
      picture,
      contacts,
      receivedRequests,
      sentRequests,
    } = user;
    const data = {
      _id,
      email,
      firstName,
      lastName,
      createdAt,
      updatedAt,
      picture,
      contacts,
      receivedRequests,
      sentRequests,
    };
    const token = signJWT(_id);
    return res
      .cookie('access_token', token, {
        httpOnly: true,
        maxAge: MAX_AGE,
        secure: NODE_ENV === 'production',
      })
      .status(200)
      .json({
        message: 'Signed in',
        user: data,
      });
  }
  res.status(401).json({ message: 'Incorrect email/password' });
  res.end();
};
module.exports.getUsers = async (req, res) => {
  try {
    const allUsers = await User.find().lean();
    const usersToSend = allUsers.filter(({ _id }) => req?.userId != _id);
    return res.status(200).json(usersToSend);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.logoutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      maxAge: 10000,
      secure: NODE_ENV === 'production',
    };
    res.cookie('access_token', 'expired_token', options);
    return res.status(200).json({ message: 'Logged out.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports.getAuthUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }).populate(
      'receivedRequests'
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
