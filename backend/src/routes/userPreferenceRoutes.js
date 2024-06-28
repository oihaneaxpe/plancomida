const express = require('express');
const router = express.Router();
const userPreferenceController = require('../controllers/userPreferenceController');
const UserPreference = require('../models/userPreferenceModel');

router.get('/user-preference/user/:userId/preference', userPreferenceController.getUserPreferenceWithDetails);
router.post('/user-preference/user/:userId/preference', userPreferenceController.saveUserPreference);

module.exports = router;
