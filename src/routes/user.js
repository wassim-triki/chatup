const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  searchUsers,
  deleteAllRequests,
  deleteAllContacts,
  getContacts,
  getRequests,
  deleteUser,
} = require('../controllers/user');
const authentication = require('../middlewares/authentication');

// router.get('/', getAllUsers);
router.get('/', authentication, searchUsers);
router.put('/deleteAllRequests', authentication, deleteAllRequests);
router.put('/deleteAllContacts', authentication, deleteAllContacts);
router.get('/contacts', authentication, getContacts);
router.get('/requests', authentication, getRequests);
router.delete('/delete', authentication, deleteUser);

module.exports = router;
