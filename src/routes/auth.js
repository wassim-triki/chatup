const express = require('express');
const router = express.Router();

//import controllers
const {
  createUser,
  signinUser,
  getUsers,
  logoutUser,
  getAuthUser,
} = require('../controllers/auth');
const authentication = require('../middlewares/authentication');

//import middlewares
router.post('/signup', createUser);
router.post('/signin', signinUser);
router.get('/logout', authentication, logoutUser);
router.get('/users', authentication, getUsers);
router.get('/test', getUsers);
router.get('/me', authentication, getAuthUser);

module.exports = router;
