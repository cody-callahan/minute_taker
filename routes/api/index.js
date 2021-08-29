const router = require('express').Router();
const meetingRoutes = require('./meeting-route');
const userRoutes = require('./user-route');

router.use('/meetings', meetingRoutes);
router.use('/users', userRoutes);

module.exports = router;