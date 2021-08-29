const express = require('express');
const router = express.Router();
const {
    getAllUser,
    getUserById,
    addUser,
    updateUser,
    removeUser,
    addUserToMeeting
  } = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUser)
    .post(addUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);

router
  .route('/:userID/:meetingID')
  .post(addUserToMeeting)

module.exports = router;