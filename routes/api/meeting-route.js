const express = require('express');
const router = express.Router();
const {
    getAllMeeting,
    getMeetingById,
    addMeeting,
    updateMeeting,
    removeMeeting,
  } = require('../../controllers/meeting-controller');

router
    .route('/')
    .get(getAllMeeting)
    .post(addMeeting);

router
    .route('/:id')
    .get(getMeetingById)
    .put(updateMeeting)
    .delete(removeMeeting);

module.exports = router;