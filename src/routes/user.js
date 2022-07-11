const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  searchUsers,
  sendRequest,
  deleteAllRequests,
  deleteAllContacts,
  acceptRequest,
  getContacts,
  getRequests,
  deleteUser,
} = require('../controllers/user');
const authentication = require('../middlewares/authentication');

// router.get('/', getAllUsers);
router.get('/', authentication, searchUsers);
router.get('/', searchUsers);
router.put('/sendRequest', authentication, sendRequest);
router.put('/acceptRequest', authentication, acceptRequest);
router.put('/deleteAllRequests', authentication, deleteAllRequests);
router.put('/deleteAllContacts', authentication, deleteAllContacts);
router.get('/contacts', authentication, getContacts);
router.get('/requests', authentication, getRequests);
router.delete('/delete', authentication, deleteUser);

module.exports = router;
